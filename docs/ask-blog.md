# Ask my blog

Issue [#338](https://github.com/AndrewUsher/andrewusher.dev/issues/338) adds a
small, blog-only chat widget backed by published posts. It is off by default.

## Configuration

Set these server-side environment variables in Vercel (and `.env` for local
development), then redeploy:

```dotenv
ASK_BLOG_ENABLED=true
OPENAI_API_KEY=your-provider-key
REDIS_URL=redis://your-redis-server
# Optional: defaults to the Redis connection string as the HMAC secret.
ASK_BLOG_RATE_LIMIT_SALT=a-long-random-secret
# Optional:
ASK_BLOG_ANSWER_MODEL=gpt-4.1-mini
```

No credentials are sent to the browser. With the feature enabled but no OpenAI
key, chat returns matching excerpts and links instead of generating answers.
Redis is required; requests fail closed if shared rate limiting is unavailable.

`ASK_BLOG_ENABLED=false` disables the launcher and POST endpoint. The server
checks the flag on every request, and the widget checks availability on load and
navigation. Vercel environment changes require redeployment. Enabling after a
disabled build also requires rebuilding: the model/index and widget are included
only when enabled. Changing published content requires a fresh build.

## Index and retrieval

Enabled builds and dev-server starts generate `.cache/ask-blog/index.json`.
`pnpm index:blog` generates it independently. All posts with
`isPublished: true` are included; drafts, journal, projects, external embeds,
MDX imports, interactive components, and raw HTML are excluded. Prose and fenced
code are preserved. Older posts with whitespace before frontmatter are supported.

Markdown/MDX is parsed as an AST, split by headings, then divided into
tokenizer-bounded overlapping chunks. Heading anchors use GithubSlugger, matching
the rendered pages; enabled builds verify every citation against generated HTML
and confirm coverage of every published post.

Embedding inference runs locally in Node using Transformers.js 3.8.1 and
`Xenova/all-MiniLM-L6-v2`, revision
`751bff37182d3f1213fa05d7196b954e230abad9`. Both build and runtime use the same
quantized ONNX weights, tokenizer, mean pooling, normalized 384-dimensional
vectors, and CPU execution. The first build downloads about 23 MB of weights
plus tokenizer/configuration files from Hugging Face. Runtime never downloads
model files or calls an embedding service. Unchanged chunk embeddings are reused
when `.cache/ask-blog` survives between builds; correctness does not require it.

The index and exact model files are bundled with the Vercel Node function.
Non-Linux-x64 ONNX binaries and GPU provider libraries are excluded from that
bundle. The pipeline is lazily initialized and reused within each warm instance.
The optional ONNX install script is disabled in pnpm because CPU binaries already
ship in the package; this avoids unnecessary CUDA downloads on Linux builders.

Chat combines BM25 keyword ranking and cosine similarity through reciprocal-rank
fusion, taking up to six chunks with a per-heading diversity limit. Follow-ups
include the two most recent user questions in retrieval. A local inference
failure falls back to keyword retrieval. Regular site search still uses Pagefind;
this server-side lexical retriever is the agreed adjustment to the issue.

## Answers, UI, and limits

OpenAI streams answers from the selected excerpts. Prompts require refusing
unsupported questions and treating excerpts and previous messages as data.
Citation destinations always come from index metadata. Provider-created links,
images, and raw HTML are discarded. Final Markdown/code uses the site's five
Shiki themes. Incomplete streams and non-refusal answers without valid citation
numbers fall back to excerpts rather than being finalized as answers.

The launcher appears on the blog index and individual posts, above scroll-to-top.
The native modal dialog handles focus containment and Escape, and fills the
viewport on mobile. An Astro-persisted React island retains conversations during
navigation, including navigation away from the blog. Reloading or Clear chat
removes the conversation. Nothing is written to browser storage.

- 10 requests per IP per hour, atomically counted in Redis with a one-hour TTL.
  Redis keys contain an HMAC of the address, never the raw address.
- One active request per panel; Stop cancels it.
- 2,000 characters per question; six recent messages, plus the new question.
- At most 600 output tokens, bounded excerpts, and a 45-second provider deadline.
- Request bodies are bounded even without `Content-Length`.
- No application-persisted questions or transcripts. Only latency, token counts,
  and failure flags are logged. OpenAI receives the question, recent history,
  and retrieved excerpts; provider retention follows your OpenAI account policy.

Configure a $10/month budget alert in the OpenAI project and monitor usage. This
is a target, **not an application-enforced dollar ceiling**. Redis and hosting
costs are separate. Use the feature flag to shut down generation and the widget.

## Verification

```sh
npm test -- src/features/ask-blog
npm run lint
ASK_BLOG_ENABLED=true npm run build
pnpm verify:blog
pnpm benchmark:blog
ASK_BLOG_ENABLED=true pnpm exec playwright test e2e/ask-blog.spec.ts --project=chromium
```

API tests mock provider responses, Redis, and query inference; they make no paid
model calls. Retrieval benchmarks run the real local model and assert known
sources for direct questions and paraphrases. Browser tests mock chat responses
to check navigation, keyboard behavior, mobile layout, and failure feedback.

Before enabling in production, run a Vercel preview smoke test with the feature
enabled and real Redis/provider configuration. Check function bundle size, cold
and warm inference latency, citation links, question follow-ups, refusals, and
budget telemetry. macOS benchmarks do not establish deployed Linux latency.
