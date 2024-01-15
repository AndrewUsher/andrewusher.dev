var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/lib/logger.server.ts
import pino from "pino";
var logger, init_logger_server = __esm({
  "app/lib/logger.server.ts"() {
    "use strict";
    logger = pino({
      level: process.env.PINO_LOG_LEVEL || "error"
    });
  }
});

// app/msw/handlers.ts
import { rest } from "msw";
var handlers, init_handlers = __esm({
  "app/msw/handlers.ts"() {
    "use strict";
    init_logger_server();
    handlers = [
      rest.get("*", (req) => (logger.debug({
        msg: `MSW :: Request for ${req.url.href}`,
        params: req.url.search
      }), req.passthrough()))
    ];
  }
});

// app/msw/server.ts
var server_exports = {};
__export(server_exports, {
  server: () => server
});
import { setupServer } from "msw/node";
var server, init_server = __esm({
  "app/msw/server.ts"() {
    "use strict";
    init_handlers();
    server = setupServer(...handlers);
  }
});

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
init_logger_server();
import { renderToString } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import { jsxDEV } from "react/jsx-dev-runtime";
process.env.ENABLE_MSW === "true" && Promise.resolve().then(() => (init_server(), server_exports)).then(({ server: server2 }) => {
  server2.listen();
});
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  logger.debug(
    `${request.method} request made to ${request.url} - Status code: ${responseStatusCode}`
  );
  let markup = renderToString(
    /* @__PURE__ */ jsxDEV(RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
      fileName: "app/entry.server.tsx",
      lineNumber: 24,
      columnNumber: 5
    }, this)
  );
  return responseHeaders.set("Content-Type", "text/html"), responseHeaders.set("X-Frame-Options", "DENY"), new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

// app/components/root/Footer.tsx
import { Link } from "@remix-run/react";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
function Footer() {
  return /* @__PURE__ */ jsxDEV2("footer", { className: "bg-gray-50 text-gray-500 dark:bg-neutral-700 dark:text-slate-300", children: /* @__PURE__ */ jsxDEV2("div", { className: "mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxDEV2("div", { className: "mx-auto max-w-3xl", children: [
    /* @__PURE__ */ jsxDEV2("nav", { className: "grid grid-cols-2 gap-4 text-center sm:grid-cols-3 lg:grid-cols-6", children: [
      /* @__PURE__ */ jsxDEV2(Link, { to: "/about", className: "hover:opacity-75", children: "About Me" }, void 0, !1, {
        fileName: "app/components/root/Footer.tsx",
        lineNumber: 10,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV2(Link, { to: "/blog", className: "hover:opacity-75", children: "Blog" }, void 0, !1, {
        fileName: "app/components/root/Footer.tsx",
        lineNumber: 13,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV2(Link, { to: "/contact", className: "hover:opacity-75", children: "Get in Touch" }, void 0, !1, {
        fileName: "app/components/root/Footer.tsx",
        lineNumber: 16,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV2(Link, { to: "/contact", className: "hover:opacity-75", children: "Office Hours" }, void 0, !1, {
        fileName: "app/components/root/Footer.tsx",
        lineNumber: 19,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV2(Link, { to: "/projects", className: "hover:opacity-75", children: "Projects" }, void 0, !1, {
        fileName: "app/components/root/Footer.tsx",
        lineNumber: 22,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV2(Link, { to: "/uses", className: "hover:opacity-75", children: "Uses" }, void 0, !1, {
        fileName: "app/components/root/Footer.tsx",
        lineNumber: 25,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/root/Footer.tsx",
      lineNumber: 9,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV2("div", { className: "mt-8 flex justify-center space-x-6", children: [
      /* @__PURE__ */ jsxDEV2(
        "a",
        {
          href: "https://twitter.com/AndrewUsher17",
          target: "_blank",
          rel: "noreferrer",
          "aria-label": "Twitter",
          className: "hover:opacity-75",
          children: /* @__PURE__ */ jsxDEV2(
            "svg",
            {
              fill: "currentColor",
              viewBox: "0 0 24 24",
              "aria-hidden": "true",
              className: "h-6 w-6",
              children: /* @__PURE__ */ jsxDEV2("path", { d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" }, void 0, !1, {
                fileName: "app/components/root/Footer.tsx",
                lineNumber: 44,
                columnNumber: 17
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/components/root/Footer.tsx",
              lineNumber: 38,
              columnNumber: 15
            },
            this
          )
        },
        void 0,
        !1,
        {
          fileName: "app/components/root/Footer.tsx",
          lineNumber: 31,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV2(
        "a",
        {
          href: "https://github.com/AndrewUsher",
          target: "_blank",
          rel: "noreferrer",
          "aria-label": "GitHub",
          className: "hover:opacity-75",
          children: /* @__PURE__ */ jsxDEV2(
            "svg",
            {
              fill: "currentColor",
              viewBox: "0 0 24 24",
              "aria-hidden": "true",
              className: "h-6 w-6",
              children: /* @__PURE__ */ jsxDEV2(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
                  clipRule: "evenodd"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/root/Footer.tsx",
                  lineNumber: 61,
                  columnNumber: 17
                },
                this
              )
            },
            void 0,
            !1,
            {
              fileName: "app/components/root/Footer.tsx",
              lineNumber: 55,
              columnNumber: 15
            },
            this
          )
        },
        void 0,
        !1,
        {
          fileName: "app/components/root/Footer.tsx",
          lineNumber: 48,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/root/Footer.tsx",
      lineNumber: 30,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV2("div", { className: "mt-8 flex justify-center space-x-6", children: /* @__PURE__ */ jsxDEV2(
      "a",
      {
        href: "https://www.buymeacoffee.com/andrewusher",
        target: "_blank",
        rel: "noreferrer",
        children: /* @__PURE__ */ jsxDEV2(
          "img",
          {
            src: "https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png",
            loading: "lazy",
            alt: "Buy Me A Coffee",
            style: { height: "60px", width: "217px" }
          },
          void 0,
          !1,
          {
            fileName: "app/components/root/Footer.tsx",
            lineNumber: 75,
            columnNumber: 15
          },
          this
        )
      },
      void 0,
      !1,
      {
        fileName: "app/components/root/Footer.tsx",
        lineNumber: 70,
        columnNumber: 13
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/root/Footer.tsx",
      lineNumber: 69,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/root/Footer.tsx",
    lineNumber: 8,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/components/root/Footer.tsx",
    lineNumber: 7,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/root/Footer.tsx",
    lineNumber: 6,
    columnNumber: 5
  }, this);
}

// app/components/root/Header.tsx
import { Link as Link2, NavLink as RemixNavLink } from "@remix-run/react";
import { Fragment, jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var NavLink = ({ children, to }) => {
  let linkClasses = "ml-8 block lg:text-xl first:ml-0 dark:text-white text-base";
  return to === "/resume.pdf" ? /* @__PURE__ */ jsxDEV3("a", { href: to, className: linkClasses, target: "_blank", rel: "noreferrer", children: "Resume" }, void 0, !1, {
    fileName: "app/components/root/Header.tsx",
    lineNumber: 8,
    columnNumber: 7
  }, this) : /* @__PURE__ */ jsxDEV3(RemixNavLink, { className: linkClasses, to, children }, void 0, !1, {
    fileName: "app/components/root/Header.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
};
function Header() {
  return /* @__PURE__ */ jsxDEV3(Fragment, { children: /* @__PURE__ */ jsxDEV3("div", { className: "mx-auto flex max-w-screen-xl flex-col items-center justify-between p-8 lg:flex-row", children: [
    /* @__PURE__ */ jsxDEV3("h1", { className: "text-4xl font-bold dark:text-white", children: /* @__PURE__ */ jsxDEV3(Link2, { to: "/", children: "Andrew Usher" }, void 0, !1, {
      fileName: "app/components/root/Header.tsx",
      lineNumber: 25,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/root/Header.tsx",
      lineNumber: 24,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV3("nav", { className: "hidden justify-between lg:flex", children: [
      /* @__PURE__ */ jsxDEV3(NavLink, { to: "/about", children: "About Me" }, void 0, !1, {
        fileName: "app/components/root/Header.tsx",
        lineNumber: 28,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV3(NavLink, { to: "/blog", children: "Blog" }, void 0, !1, {
        fileName: "app/components/root/Header.tsx",
        lineNumber: 29,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV3(NavLink, { to: "/resume.pdf", children: "Resume" }, void 0, !1, {
        fileName: "app/components/root/Header.tsx",
        lineNumber: 30,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/root/Header.tsx",
      lineNumber: 27,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV3("nav", { className: "mt-6 flex lg:hidden", children: [
      /* @__PURE__ */ jsxDEV3(NavLink, { to: "/blog", children: "Blog" }, void 0, !1, {
        fileName: "app/components/root/Header.tsx",
        lineNumber: 33,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV3(NavLink, { to: "/contact", children: "Contact Me" }, void 0, !1, {
        fileName: "app/components/root/Header.tsx",
        lineNumber: 34,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV3(NavLink, { to: "/resume.pdf", children: "Resume" }, void 0, !1, {
        fileName: "app/components/root/Header.tsx",
        lineNumber: 35,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/root/Header.tsx",
      lineNumber: 32,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/root/Header.tsx",
    lineNumber: 23,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/root/Header.tsx",
    lineNumber: 22,
    columnNumber: 5
  }, this);
}

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-COSBDYQ4.css";

// app/root.tsx
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var meta = () => ({ title: "Andrew Usher" }), links = () => [{ rel: "stylesheet", href: tailwind_default }];
function App() {
  return /* @__PURE__ */ jsxDEV4("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV4("head", { children: [
      /* @__PURE__ */ jsxDEV4("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 27,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4("meta", { property: "og:url", content: "https://andrewusher.dev" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4("meta", { property: "og:title", content: "Andrew Usher" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(
        "meta",
        {
          name: "keywords",
          content: "Learn React, NPM Needs, Node.js, Learn TypeScript"
        },
        void 0,
        !1,
        {
          fileName: "app/root.tsx",
          lineNumber: 30,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV4("meta", { name: "twitter:creator", content: "@AndrewUsher17" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 34,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4("meta", { name: "twitter:site", content: "@AndrewUsher17" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 35,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4("meta", { name: "twitter:title", content: "Andrew Usher" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 36,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 37,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(
        "meta",
        {
          name: "theme-color",
          media: "(prefers-color-scheme: light)",
          content: "#7dd3fc"
        },
        void 0,
        !1,
        {
          fileName: "app/root.tsx",
          lineNumber: 38,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV4(
        "meta",
        {
          name: "theme-color",
          media: "(prefers-color-scheme: dark)",
          content: "#0284c7"
        },
        void 0,
        !1,
        {
          fileName: "app/root.tsx",
          lineNumber: 43,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV4(
        "link",
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png"
        },
        void 0,
        !1,
        {
          fileName: "app/root.tsx",
          lineNumber: 48,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV4(
        "link",
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png"
        },
        void 0,
        !1,
        {
          fileName: "app/root.tsx",
          lineNumber: 53,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV4(
        "link",
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png"
        },
        void 0,
        !1,
        {
          fileName: "app/root.tsx",
          lineNumber: 59,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV4("link", { rel: "manifest", href: "/site.webmanifest" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 65,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4("meta", { name: "color-scheme", content: "dark light" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 66,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 68,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 69,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 26,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4("body", { className: "font-merriweather-sans dark:bg-neutral-900", children: [
      /* @__PURE__ */ jsxDEV4("header", { className: "bg-white dark:bg-neutral-900", children: [
        /* @__PURE__ */ jsxDEV4("div", { className: "top-0 h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 73,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV4(Header, {}, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 74,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 72,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 76,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(Footer, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 77,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 78,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 79,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 80,
        columnNumber: 52
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 71,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 25,
    columnNumber: 5
  }, this);
}

// app/routes/journal.$slug.tsx
var journal_slug_exports = {};
__export(journal_slug_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => BlogPostPage,
  loader: () => loader,
  meta: () => meta2
});
import dayjs from "dayjs";
import { json } from "@remix-run/server-runtime";
import { Link as Link3, useLoaderData } from "@remix-run/react";
import snarkdown from "snarkdown";

// app/components/post/ReadingProgress/ReadingProgress.tsx
import { useEffect, useState } from "react";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
function useReadingProgress() {
  let [completion, setCompletion] = useState(0);
  return useEffect(() => {
    let updateScrollCompletion = () => {
      let currentScrollingProgress = window.scrollY, totalScrollHeight = document.body.scrollHeight - window.innerHeight;
      totalScrollHeight && setCompletion(
        Number((currentScrollingProgress / totalScrollHeight).toFixed(2)) * 100
      );
    };
    return window.addEventListener("scroll", updateScrollCompletion), () => {
      window.removeEventListener("scroll", updateScrollCompletion);
    };
  }, []), completion;
}
function ReadingProgressBar() {
  let completion = useReadingProgress();
  return /* @__PURE__ */ jsxDEV5(
    "span",
    {
      id: "progress-bar",
      style: {
        transform: `translateX(${completion - 100}%)`
      },
      className: "fixed bottom-0 h-1 w-full bg-sky-600 transition-transform duration-150"
    },
    void 0,
    !1,
    {
      fileName: "app/components/post/ReadingProgress/ReadingProgress.tsx",
      lineNumber: 33,
      columnNumber: 5
    },
    this
  );
}

// app/lib/contentful.server.ts
import { createClient } from "contentful";

// app/env.ts
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
var env = createEnv({
  server: {
    AIRTABLE_API_KEY: z.string(),
    CONTENTFUL_ACCESS_TOKEN: z.string(),
    CONTENTFUL_SPACE_ID: z.string()
  },
  /**
   * What object holds the environment variables at runtime.
   * Often `process.env` or `import.meta.env`
   */
  runtimeEnv: process.env
});

// app/lib/contentful.server.ts
var client = createClient({
  accessToken: env.CONTENTFUL_ACCESS_TOKEN,
  space: env.CONTENTFUL_SPACE_ID
}), getBlogPosts = async () => (await client.getEntries({
  content_type: "blog-post",
  order: ["-fields.date"]
})).items, getBlogPostBySlug = async (slug) => {
  let searchResults = await client.getEntries({
    content_type: "blog-post",
    "fields.slug": slug
  });
  if (!searchResults?.items?.length)
    throw new Error(`Post for slug ${slug} not found`);
  return searchResults.items[0].fields;
}, getJournalEntries = async () => (await client.getEntries({
  content_type: "journal-entry",
  order: ["-fields.date"]
})).items, getJournalEntriesBySlug = async (slug) => {
  let searchResults = await client.getEntries(
    {
      content_type: "journal-entry",
      "fields.slug": slug
    }
  );
  if (!searchResults.items.length)
    throw new Error(`Post for slug ${slug} not found`);
  return searchResults.items[0].fields;
}, getProjects = async () => await client.getEntries({
  content_type: "projects",
  order: ["-fields.date"]
});

// app/routes/journal.$slug.tsx
init_logger_server();
import { Fragment as Fragment2, jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
var loader = async ({ params }) => {
  try {
    if (!params.slug)
      throw json({ message: "not found" }, 404);
    let { content: mdContent, ...rest2 } = await getJournalEntriesBySlug(
      params.slug
    ), content = snarkdown(mdContent);
    return {
      ...rest2,
      content
    };
  } catch (err) {
    throw logger.error(err), json({ message: "not found" }, 404);
  }
}, meta2 = ({ data }) => data?.content ? {
  title: data.title,
  description: `${data.title} | Andrew Usher`
} : {
  title: "Not Found",
  description: "You landed on a page that Peter the Penguin wasn't able to find"
};
function BlogPostPage() {
  let post = useLoaderData(), formattedPublishDate = dayjs(post.date).format("MMMM DD, YYYY");
  return /* @__PURE__ */ jsxDEV6(Fragment2, { children: [
    /* @__PURE__ */ jsxDEV6("div", { className: "s mx-auto mt-8 max-w-screen-xl px-4", children: [
      /* @__PURE__ */ jsxDEV6("h1", { className: "mb-1 break-words text-3xl font-bold text-indigo-600 dark:text-indigo-200", children: post.title }, void 0, !1, {
        fileName: "app/routes/journal.$slug.tsx",
        lineNumber: 51,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV6(
        "time",
        {
          className: "text-indigo-400 opacity-80 dark:text-indigo-200",
          dateTime: post.date,
          children: [
            "Published on ",
            formattedPublishDate
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/routes/journal.$slug.tsx",
          lineNumber: 54,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV6("main", { className: "prose-lg pb-12 prose-ul:list-disc dark:prose-invert", children: /* @__PURE__ */ jsxDEV6(
        "div",
        {
          className: "mt-12",
          dangerouslySetInnerHTML: { __html: post.content }
        },
        void 0,
        !1,
        {
          fileName: "app/routes/journal.$slug.tsx",
          lineNumber: 61,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/journal.$slug.tsx",
        lineNumber: 60,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/journal.$slug.tsx",
      lineNumber: 50,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV6(ReadingProgressBar, {}, void 0, !1, {
      fileName: "app/routes/journal.$slug.tsx",
      lineNumber: 67,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/journal.$slug.tsx",
    lineNumber: 49,
    columnNumber: 5
  }, this);
}
function ErrorBoundary() {
  return /* @__PURE__ */ jsxDEV6("div", { className: "flex h-screen w-screen items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-400", children: /* @__PURE__ */ jsxDEV6("div", { className: "h-full rounded-md bg-white px-40 py-20 shadow-xl md:h-auto", children: /* @__PURE__ */ jsxDEV6("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsxDEV6("h1", { className: "text-9xl font-bold text-blue-600", children: "404" }, void 0, !1, {
      fileName: "app/routes/journal.$slug.tsx",
      lineNumber: 77,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV6("h6", { className: "mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl", children: [
      /* @__PURE__ */ jsxDEV6("span", { className: "text-red-500", children: "Oops!" }, void 0, !1, {
        fileName: "app/routes/journal.$slug.tsx",
        lineNumber: 80,
        columnNumber: 13
      }, this),
      " Page not found"
    ] }, void 0, !0, {
      fileName: "app/routes/journal.$slug.tsx",
      lineNumber: 79,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV6("p", { className: "mb-8 text-center text-gray-500 md:text-lg", children: "The page you\u2019re looking for doesn\u2019t exist." }, void 0, !1, {
      fileName: "app/routes/journal.$slug.tsx",
      lineNumber: 83,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV6(
      Link3,
      {
        to: "/",
        className: "bg-blue-100 px-6 py-2 text-sm font-semibold text-blue-800",
        children: "Go home"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/journal.$slug.tsx",
        lineNumber: 87,
        columnNumber: 11
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/journal.$slug.tsx",
    lineNumber: 76,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/journal.$slug.tsx",
    lineNumber: 75,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/journal.$slug.tsx",
    lineNumber: 74,
    columnNumber: 5
  }, this);
}

// mdx:routes/things-i-like.mdx
var things_i_like_exports = {};
__export(things_i_like_exports, {
  attributes: () => attributes2,
  default: () => things_i_like_default,
  filename: () => filename,
  handle: () => handle,
  headers: () => headers,
  meta: () => meta3
});
import { Fragment as Fragment3, jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
var attributes2 = {
  meta: {
    title: "Things I Like - Andrew Usher",
    description: "A list of things that I like, in no particular order"
  },
  headers: {
    "Cache-Control": "public, s-max-age=36000"
  }
}, MDXLayout = function({ children, ...rest2 }) {
  return /* @__PURE__ */ jsxDEV7("main", { className: "prose mx-auto max-w-screen-xl py-12 px-4 dark:prose-invert", children }, void 0, !1, {
    fileName: "mdx:routes/things-i-like.mdx",
    lineNumber: 13,
    columnNumber: 10
  }, this);
};
function _createMdxContent(props) {
  let _components = Object.assign({
    nav: "nav",
    ol: "ol",
    li: "li",
    a: "a",
    h2: "h2",
    h3: "h3",
    ul: "ul",
    h4: "h4",
    code: "code"
  }, props.components);
  return /* @__PURE__ */ jsxDEV7(Fragment3, { children: [
    /* @__PURE__ */ jsxDEV7(_components.nav, { className: "bg-slate-100 dark:bg-slate-800 p-8 shadow-lg", children: /* @__PURE__ */ jsxDEV7(_components.ol, { className: "toc-level toc-level-1", children: [
      /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h2", children: [
        /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h2", href: "#articles", children: "Articles" }, void 0, !1, {
          fileName: "mdx:routes/things-i-like.mdx",
          lineNumber: 29,
          columnNumber: 185
        }, this),
        /* @__PURE__ */ jsxDEV7(_components.ol, { className: "toc-level toc-level-2", children: [
          /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h3", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h3", href: "#career", children: "Career" }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 377
          }, this) }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 328
          }, this),
          /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h3", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h3", href: "#productivity", children: "Productivity" }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 532
          }, this) }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 483
          }, this),
          /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h3", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h3", href: "#programming", children: "Programming" }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 699
          }, this) }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 650
          }, this),
          /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h3", children: [
            /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h3", href: "#general", children: "General" }, void 0, !1, {
              fileName: "mdx:routes/things-i-like.mdx",
              lineNumber: 29,
              columnNumber: 864
            }, this),
            /* @__PURE__ */ jsxDEV7(_components.ol, { className: "toc-level toc-level-3", children: [
              /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h4", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h4", href: "#a11y", children: "A11y" }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 1054
              }, this) }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 1005
              }, this),
              /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h4", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h4", href: "#aiml", children: "AI/ML" }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 1205
              }, this) }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 1156
              }, this),
              /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h4", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h4", href: "#css", children: "CSS" }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 1357
              }, this) }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 1308
              }, this),
              /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h4", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h4", href: "#javascript", children: "JavaScript" }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 1506
              }, this) }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 1457
              }, this),
              /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h4", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h4", href: "#networking", children: "Networking" }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 1669
              }, this) }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 1620
              }, this),
              /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h4", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h4", href: "#node", children: "Node" }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 1832
              }, this) }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 1783
              }, this),
              /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h4", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h4", href: "#performance", children: "Performance" }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 1983
              }, this) }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 1934
              }, this),
              /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h4", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h4", href: "#react", children: "React" }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 2148
              }, this) }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 2099
              }, this),
              /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h4", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h4", href: "#react-query", children: "React Query" }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 2301
              }, this) }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 2252
              }, this),
              /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h4", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h4", href: "#remix", children: "Remix" }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 2466
              }, this) }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 2417
              }, this),
              /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h4", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h4", href: "#web", children: "Web" }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 2619
              }, this) }, void 0, !1, {
                fileName: "mdx:routes/things-i-like.mdx",
                lineNumber: 29,
                columnNumber: 2570
              }, this)
            ] }, void 0, !0, {
              fileName: "mdx:routes/things-i-like.mdx",
              lineNumber: 29,
              columnNumber: 955
            }, this)
          ] }, void 0, !0, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 815
          }, this),
          /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h3", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h3", href: "#tech", children: "Tech" }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 2802
          }, this) }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 2753
          }, this)
        ] }, void 0, !0, {
          fileName: "mdx:routes/things-i-like.mdx",
          lineNumber: 29,
          columnNumber: 278
        }, this)
      ] }, void 0, !0, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 136
      }, this),
      /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h2", children: [
        /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h2", href: "#videos", children: "Videos" }, void 0, !1, {
          fileName: "mdx:routes/things-i-like.mdx",
          lineNumber: 29,
          columnNumber: 2987
        }, this),
        /* @__PURE__ */ jsxDEV7(_components.ol, { className: "toc-level toc-level-2", children: [
          /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h3", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h3", href: "#life", children: "Life" }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 3175
          }, this) }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 3126
          }, this),
          /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h3", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h3", href: "#productivity-1", children: "Productivity" }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 3326
          }, this) }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 3277
          }, this),
          /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h3", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h3", href: "#typescript", children: "TypeScript" }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 3495
          }, this) }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 3446
          }, this)
        ] }, void 0, !0, {
          fileName: "mdx:routes/things-i-like.mdx",
          lineNumber: 29,
          columnNumber: 3076
        }, this)
      ] }, void 0, !0, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 2938
      }, this),
      /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h2", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h2", href: "#movies-and-tv-shows", children: "Movies and TV Shows" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 3692
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 3643
      }, this),
      /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h2", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h2", href: "#newsletters", children: "Newsletters" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 3873
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 3824
      }, this),
      /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h2", children: [
        /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h2", href: "#video-games", children: "Video Games" }, void 0, !1, {
          fileName: "mdx:routes/things-i-like.mdx",
          lineNumber: 29,
          columnNumber: 4038
        }, this),
        /* @__PURE__ */ jsxDEV7(_components.ol, { className: "toc-level toc-level-2", children: [
          /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h3", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h3", href: "#arcade", children: "Arcade" }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 4236
          }, this) }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 4187
          }, this),
          /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h3", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h3", href: "#atari", children: "Atari" }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 4391
          }, this) }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 4342
          }, this),
          /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h3", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h3", href: "#gameboy-advance", children: "Gameboy Advance" }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 4544
          }, this) }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 4495
          }, this),
          /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h3", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h3", href: "#nintendo-64", children: "Nintendo 64" }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 4717
          }, this) }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 4668
          }, this),
          /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h3", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h3", href: "#pc", children: "PC" }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 4882
          }, this) }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 4833
          }, this),
          /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h3", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h3", href: "#playstation", children: "PlayStation" }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 5029
          }, this) }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 4980
          }, this),
          /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h3", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h3", href: "#ps4", children: "PS4" }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 5194
          }, this) }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 5145
          }, this),
          /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h3", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h3", href: "#snes", children: "SNES" }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 5343
          }, this) }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 5294
          }, this),
          /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h3", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h3", href: "#xbox", children: "Xbox" }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 5494
          }, this) }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 5445
          }, this),
          /* @__PURE__ */ jsxDEV7(_components.li, { className: "toc-item toc-item-h3", children: /* @__PURE__ */ jsxDEV7(_components.a, { className: "toc-link toc-link-h3", href: "#xbox-360", children: "Xbox 360" }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 5645
          }, this) }, void 0, !1, {
            fileName: "mdx:routes/things-i-like.mdx",
            lineNumber: 29,
            columnNumber: 5596
          }, this)
        ] }, void 0, !0, {
          fileName: "mdx:routes/things-i-like.mdx",
          lineNumber: 29,
          columnNumber: 4137
        }, this)
      ] }, void 0, !0, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 3989
      }, this)
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 86
    }, this) }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 12
    }, this),
    `
`,
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h2, { id: "articles", children: "Articles" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 5836
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h3, { id: "career", children: "Career" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 5901
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "http://www.paulgraham.com/disagree.html", children: "How to Disagree" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 6e3
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 5984
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "http://www.paulgraham.com/love.html", children: "How to Do What You Love" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 6136
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 6120
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 5962
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h3, { id: "productivity", children: "Productivity" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 6283
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://bakadesuyo.com/2013/08/work-smarter-not-harder/", children: "Work Smarter Not Harder" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 6394
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 6378
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 6356
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h3, { id: "programming", children: "Programming" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 6561
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h3, { id: "general", children: "General" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 6632
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://lucumr.pocoo.org/2022/1/10/dependency-risk-and-funding/", children: "Dependency Risk and Funding" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 6733
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 6717
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://lepiter.io/feenk/developers-spend-most-of-their-time-figuri-9q25taswlbzjc5rsufndeu0py/", children: "Developers spend most of their time figuring the system out" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 6905
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 6889
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.codewithjason.com/dont-mix-refactorings-behavior-changes/", children: "Don\u2019t mix refactorings with behavior changes" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 7140
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 7124
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.onstartups.com/tabid/3339/bid/97052/How-To-Survive-a-Ground-Up-Rewrite-Without-Losing-Your-Sanity.aspx", children: "How To Survive a Ground-Up Rewrite Without Losing Your Sanity" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 7335
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 7319
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://chriskiehl.com/article/thoughts-after-6-years", children: "Software development topics I've changed my mind on after 6 years in the industry" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 7592
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 7576
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://codeclimate.com/blog/unexpected-outcomes-of-code-reviews/", children: "The Unexpected Outcomes of Code Review" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 7808
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 7792
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://future.com/negative-engineering-and-the-art-of-failing-successfully/", children: "What Is Negative Engineering?" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 7993
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 7977
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 6695
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h4, { id: "a11y", children: "A11y" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 8187
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://kittygiraudel.com/2021/02/17/hiding-content-responsibly/", children: "Hiding Content Responsibly" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 8282
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 8266
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 8244
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h4, { id: "aiml", children: "AI/ML" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 8461
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://tinyclouds.org/colorize", children: "Automatic Colorization" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 8557
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 8541
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 8519
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h4, { id: "css", children: "CSS" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 8699
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://ishadeed.com/article/defensive-css/", children: "Defensive CSS" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 8792
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 8776
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://alistapart.com/article/quantity-queries-for-css/", children: "Quantity Queries for CSS" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 8930
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 8914
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://web.dev/state-of-css-2022/", children: "State of CSS 2022" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 9092
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 9076
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/", children: "The Surprising Truth About Pixels and Accessibility" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 9225
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 9209
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.joshwcomeau.com/css/transforms/", children: "The World of CSS Transforms" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 9438
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 9422
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.joshwcomeau.com/css/understanding-layout-algorithms/", children: "Understanding Layout Algorithms" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 9590
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 9574
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 8754
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h4, { id: "javascript", children: "JavaScript" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 9774
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://tinyclouds.org/javascript_containers", children: "JavaScript Containers" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 9881
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 9865
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.smashingmagazine.com/2022/05/understanding-weak-reference-javascript/", children: "Understanding Weak Reference In JavaScript" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 10028
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 10012
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 9843
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h4, { id: "networking", children: "Networking" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 10240
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.petekeen.net/dns-the-good-parts", children: "DNS: The Good Parts" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 10347
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 10331
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 10309
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h4, { id: "node", children: "Node" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 10498
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://ruanmartinelli.com/posts/a-complete-guide-to-buffers", children: "A Complete Guide to Buffers in Node.js" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 10593
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 10577
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/", children: "Anatomy of an HTTP Transaction" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 10773
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 10757
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://mmazzarolo.com/blog/2022-02-05-creating-and-deploying-a-proxy-server-in-5-minutes/", children: "Creating and deploying a tiny proxy server on Vercel in 10 minutes" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 10950
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 10934
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://alexkondov.com/tao-of-node/", children: "Tao of Node - Design, Architecture & Best Practices" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 11188
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 11172
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://nodejs.org/en/docs/guides/working-with-different-filesystems/", children: "Working with Different Filesystems" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 11356
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 11340
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 10555
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h4, { id: "performance", children: "Performance" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 11548
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.smashingmagazine.com/2021/04/complete-guide-measure-core-web-vitals/", children: "An In-Depth Guide To Measuring Core Web Vitals" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 11657
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 11641
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.smashingmagazine.com/2020/09/introduction-running-lighthouse-programmatically/", children: "An Introduction To Running Lighthouse Programmatically" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 11865
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 11849
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://philipwalton.com/articles/cascading-cache-invalidation/", children: "Cascading Cache Invalidation" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 12091
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 12075
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://jakearchibald.com/2016/caching-best-practices/", children: "Caching best practices & max-age gotchas" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 12264
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 12248
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.smashingmagazine.com/2013/06/pinterest-paint-performance-case-study/", children: "Gone In 60 Frames Per Second: A Pinterest Paint Performance Case Study" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 12440
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 12424
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.smashingmagazine.com/2021/12/core-web-vitals-case-study-smashing-magazine/", children: "Improving Core Web Vitals, A Smashing Magazine Case Study" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 12672
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 12656
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://philipwalton.com/articles/my-challenge-to-the-web-performance-community/", children: "My Challenge to the Web Performance Community" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 12897
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 12881
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.smashingmagazine.com/2022/05/rethinking-server-timing-monitoring-tool/", children: "Rethinking Server-Timing As A Critical Monitoring Tool" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 13104
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 13088
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/", children: "Setting Height And Width On Images Is Important Again" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 13322
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 13306
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://htmlpreview.github.io/?https://github.com/lbke/ssr-theory/blob/main/readme.html", children: "Theoretical foundations for Server-Side Rendering and Static-rendering" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 13542
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 13526
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://philipwalton.com/articles/why-web-developers-need-to-care-about-interactivity/", children: "Why Web Developers Need to Care about Interactivity" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 13781
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 13765
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 11619
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h4, { id: "react", children: "React" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 14007
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.joshwcomeau.com/react/animating-the-unanimatable/", children: "Animating the Unanimatable" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 14104
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 14088
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.chakshunyu.com/blog/a-deep-dive-comparison-between-usememo-and-usecallback/", children: "Deep Dive Comparison Between useMemo And useCallback" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 14273
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 14257
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.chakshunyu.com/blog/exploring-react-18s-three-new-apis/", children: "Exploring React 18\u2019s three new APIs" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 14494
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 14478
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://blog.maximeheckel.com/posts/framer-motion-layout-animations/", children: "Everything about Framer Motion layout animations" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 14678
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 14662
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.chakshunyu.com/blog/a-fundamental-guide-to-react-suspense/", children: "Fundamental Guide To React Suspense" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 14876
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 14860
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.chakshunyu.com/blog/how-does-shallow-comparison-work-in-react/", children: "How Does Shallow Comparison Work In React?" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 15063
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 15047
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.chakshunyu.com/blog/an-introductory-guide-to-concurrent-rendering/", children: "Introductory Guide To Concurrent Rendering" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 15261
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 15245
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/", children: "Persisting React State in localStorage" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 15463
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 15447
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://legendapp.com/dev/react-and-native/", children: "React and React Native finally feel the same" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 15656
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 15640
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.chakshunyu.com/blog/why-use-mapdispatchtoprops/", children: [
        "Why I'll definitely use ",
        /* @__PURE__ */ jsxDEV7(_components.code, { children: "mapDispatchToProps" }, void 0, !1, {
          fileName: "mdx:routes/things-i-like.mdx",
          lineNumber: 29,
          columnNumber: 15935
        }, this),
        " in Redux"
      ] }, void 0, !0, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 15825
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 15809
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 14066
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h4, { id: "react-query", children: "React Query" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 16069
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://alexkondov.com/reading-source-code-react-query/", children: "Reading Source Code: React-Query" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 16178
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 16162
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 16140
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h4, { id: "remix", children: "Remix" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 16354
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.smashingmagazine.com/2022/03/remix-routes-demystified/", children: "Remix Routes Demystified" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 16451
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 16435
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 16413
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h4, { id: "web", children: "Web" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 16630
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://ma.ttias.be/double-clicking-on-the-web", children: "Double-clicking On The Web" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 16723
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 16707
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://jakearchibald.com/2013/progressive-enhancement-still-important/", children: "Progressive enhancement is still important" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 16877
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 16861
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://medium.com/@sebmarkbage/tooling-is-not-the-problem-of-the-web-cb0ae1fdbbc6", children: "Tooling is Not the Problem of the Web" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 17072
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 17056
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.robinwieruch.de/web-applications/", children: "Web Applications 101" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 17273
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 17257
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 16685
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h3, { id: "tech", children: "Tech" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 17427
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://marco.org/2013/10/25/younger-than-the-ipad-2", children: "Younger Than The iPad 2" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 17522
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 17506
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 17484
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h2, { id: "videos", children: "Videos" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 17686
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h3, { id: "life", children: "Life" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 17747
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.youtube.com/watch?v=0UhZDFK2Pwc", children: "I Journaled For 1,000 Days. Here's What I Learned" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 17842
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 17826
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 17804
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h3, { id: "productivity-1", children: "Productivity" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 18023
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.youtube.com/watch?v=YucXxma_-ko", children: "Distraction Detox: Change Your Life In 30 Days" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 18136
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 18120
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 18098
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h3, { id: "typescript", children: "TypeScript" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 18314
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.youtube.com/watch?v=xLDVfBUgD8U", children: "Do TypeScript without TypeScript" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 18421
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 18405
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 18383
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h2, { id: "movies-and-tv-shows", children: "Movies and TV Shows" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 18585
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Avatar:_The_Last_Airbender", children: "Avatar: The Last Airbender" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 18710
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 18694
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Avengers:_Endgame", children: "Avengers: Endgame" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 18874
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 18858
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Avengers:_Infinity_War", children: "Avengers: Infinity War" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 19020
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 19004
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Batman_Begins", children: "Batman Begins" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 19176
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 19160
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Batman_v_Superman:_Dawn_of_Justice", children: "Batman v Superman: Dawn of Justice" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 19314
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 19298
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Bird_Box_(film)", children: "Bird Box" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 19494
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 19478
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/The_Bourne_Identity_(2002_film)", children: "The Bourne Identity" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 19629
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 19613
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/The_Bourne_Supremacy_(film)", children: "The Bourne Supremacy" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 19791
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 19775
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/The_Bourne_Ultimatum_(film)", children: "The Bourne Ultimatum" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 19950
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 19934
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/The_Boys_(2019_TV_series)", children: "The Boys" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 20109
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 20093
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Chicken_Run", children: "Chicken Run" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 20254
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 20238
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/The_Chronicles_of_Narnia:_The_Lion,_the_Witch_and_the_Wardrobe", children: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 20388
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 20372
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Courage_the_Cowardly_Dog", children: "Courage the Cowardly Dog" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 20624
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 20608
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Dark_(TV_series)", children: "Dark" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 20784
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 20768
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/District_9", children: "District 9" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 20916
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 20900
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Elysium_(film)", children: "Elysium" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 21048
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 21032
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/A_Goofy_Movie", children: "A Goofy Movie" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 21181
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 21165
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Gumby", children: "Gumby" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 21319
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 21303
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Holes_(film)", children: "Holes" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 21441
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 21425
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/How_It%27s_Made", children: "How It\u2019s Made" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 21570
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 21554
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Inception", children: "Inception" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 21710
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 21694
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/The_Incredibles", children: "The Incredibles" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 21840
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 21824
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Incredibles_2", children: "The Incredibles 2" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 21982
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 21966
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Interstellar_(film)", children: "Interstellar" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 22124
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 22108
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Looney_Tunes", children: "Looney Tunes" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 22267
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 22251
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Justice_League_(TV_series)", children: "Justice League (TV series)" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 22403
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 22387
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/The_Mandalorian", children: "The Mandalorian" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 22567
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 22551
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/The_Martian_(film)", children: "The Martian" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 22709
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 22693
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Midnight_Mass_(miniseries)", children: "Midnight Mass" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 22850
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 22834
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Mindhunter_(TV_series)", children: "Mindhunter" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 23001
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 22985
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Nightcrawler_(film)", children: "Nightcrawler" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 23145
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 23129
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Ozark_(TV_series)", children: "Ozark" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 23288
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 23272
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/The_Polar_Express_(film)", children: "The Polar Express" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 23422
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 23406
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Rogue_One", children: "Rogue One: A Star Wars Story" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 23575
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 23559
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.netflix.com/title/81486558", children: "Tagged" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 23724
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 23708
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.netflix.com/title/80234731", children: "Trash Truck" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 23850
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 23834
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Wallace_and_Gromit", children: "Wallace and Gromit" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 23981
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 23965
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/The_Witcher_(TV_series)", children: "The Witcher" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 24129
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 24113
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Westworld_(TV_series)", children: "Westworld" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 24275
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 24259
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 18672
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h2, { id: "newsletters", children: "Newsletters" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 24424
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://dbweekly.com/", children: "DB Weekly" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 24533
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 24517
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "http://esnextnews.com/", children: "ES.next News" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 24645
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 24629
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://frontendfoc.us/", children: "Frontend Focus" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 24761
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 24745
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://jamstack.email/", children: "JAMStacked" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 24880
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 24864
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://javascriptweekly.com/", children: "JavaScript Weekly" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 24995
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 24979
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://ishadeed.com/article/defensive-css/", children: "Labnotes" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 25123
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 25107
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://nodeweekly.com/", children: "Node Weekly" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 25256
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 25240
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://ponyfoo.com/weekly", children: "Pony Foo Weekly" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 25372
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 25356
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://react.statuscode.com/", children: "React Status" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 25495
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 25479
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://softwareleadweekly.com/", children: "Software Lead Weekly" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 25618
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 25602
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://tailwindweekly.com/", children: "Tailwind Weekly" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 25751
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 25735
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://typescript-weekly.com/", children: "TypeScript Weekly" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 25875
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 25859
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 24495
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h2, { id: "video-games", children: "Video Games" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 26011
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h3, { id: "arcade", children: "Arcade" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 26082
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Hydro_Thunder", children: "Hydro Thunder" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 26181
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 26165
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Street_Fighter", children: "Street Fighter" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 26319
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 26303
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Tekken", children: "Tekken" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 26459
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 26443
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 26143
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h3, { id: "atari", children: "Atari" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 26590
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Galaga", children: "Galaga" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 26687
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 26671
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Pac-Man_(Atari_2600)", children: "Pac-Man" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 26811
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 26795
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Pitfall!", children: "Pitfall!" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 26950
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 26934
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Pong", children: "Pong" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 27078
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 27062
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Tetris", children: "Tetris" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 27198
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 27182
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 26649
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h3, { id: "gameboy-advance", children: "Gameboy Advance" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 27329
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_A_Link_to_the_Past", children: "The Legend of Zelda: A Link to the Past" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 27446
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 27430
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Pok%C3%A9mon_Emerald", children: "Pok\xE9mon Emerald" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 27636
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 27620
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Pok%C3%A9mon_FireRed_and_LeafGreen", children: "Pok\xE9mon FireRed and LeafGreen" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 27783
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 27767
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Pok%C3%A9mon_Ruby_and_Sapphire", children: "Pok\xE9mon Ruby and Sapphire" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 27958
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 27942
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 27408
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h3, { id: "nintendo-64", children: "Nintendo 64" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 28132
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Banjo-Kazooie_(video_game)", children: "Banjo-Kazooie" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 28241
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 28225
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Banjo-Tooie", children: "Banjo-Tooie" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 28392
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 28376
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Doom_64", children: "Doom 64" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 28526
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 28510
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/GoldenEye_007_(1997_video_game)", children: "GoldenEye 007" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 28652
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 28636
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_Majora%27s_Mask", children: "The Legend of Zelda: Majora's Mask" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 28808
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 28792
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_Ocarina_of_Time", children: "The Legend of Zelda: Ocarina of Time" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 28990
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 28974
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Mario_Kart_64", children: "Mario Kart 64" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 29174
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 29158
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Mario_Party_(video_game)", children: "Mario Party" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 29312
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 29296
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Pok%C3%A9mon_Stadium", children: "Pokemon Stadium" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 29459
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 29443
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Pok%C3%A9mon_Stadium_2", children: "Pokemon Stadium 2" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 29606
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 29590
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Star_Fox_64", children: "Star Fox 64" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 29757
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 29741
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Star_Wars_Episode_I%3A_Racer", children: "Star Wars Episode I: Racer" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 29891
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 29875
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Super_Mario_64", children: "Super Mario 64" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 30057
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 30041
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Super_Smash_Bros.", children: "Super Smash Bros." }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 30197
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 30181
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Wave_Race_64", children: "Wave Race N64" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 30343
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 30327
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 28203
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h3, { id: "pc", children: "PC" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 30487
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/RollerCoaster_Tycoon", children: "RollerCoaster Tycoon" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 30578
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 30562
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 30540
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h3, { id: "playstation", children: "PlayStation" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 30737
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Crash_Bandicoot_(video_game)", children: "Crash Bandicoot" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 30846
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 30830
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Star_Wars:_Episode_I_%E2%80%93_The_Phantom_Menace_(video_game)", children: "Star Wars: Episode I \u2013 The Phantom Menace" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 31001
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 30985
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Spyro_the_Dragon_(video_game)", children: "Spyro the Dragon" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 31216
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 31200
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 30808
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h3, { id: "ps4", children: "PS4" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 31380
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Deus_Ex%3A_Mankind_Divided", children: "Deus Ex: Mankind Divided" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 31473
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 31457
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 31435
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h3, { id: "snes", children: "SNES" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 31642
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Donkey_Kong_Country", children: "Donkey Kong Country" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 31737
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 31721
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Donkey_Kong_Country_2:_Diddy%27s_Kong_Quest", children: "Donkey Kong Country 2: Diddy\u2019s Kong Quest" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 31887
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 31871
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Super_Mario_World", children: "Super Mario World" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 32083
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 32067
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 31699
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h3, { id: "xbox", children: "Xbox" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 32236
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Halo:_Combat_Evolved", children: "Halo: Combat Evolved" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 32331
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 32315
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Lego_Star_Wars:_The_Video_Game", children: "Lego Star Wars: The Video Game" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 32483
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 32467
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Marvel:_Ultimate_Alliance", children: "Marvel: Ultimate Alliance" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 32655
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 32639
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/NBA_Street_Vol._2", children: "NBA Street Vol. 2" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 32817
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 32801
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Spider-Man_(2002_video_game)", children: "Spider-Man" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 32963
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 32947
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/SpongeBob_SquarePants:_Battle_for_Bikini_Bottom", children: "SpongeBob SquarePants: Battle for Bikini Bottom" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 33113
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 33097
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/SSX_3", children: "SSX 3" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 33319
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 33303
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Star_Wars:_Battlefront_(2004_video_game)", children: "Star Wars: Battlefront" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 33441
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 33425
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Star_Wars:_Battlefront_II", children: "Star Wars: Battlefront II" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 33615
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 33599
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Tiger_Woods_PGA_Tour_07", children: "Tiger Woods PGA Tour 07" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 33777
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 33761
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Tony_Hawk%27s_Pro_Skater_3", children: "Tony Hawk\u2019s Pro Skater 3" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 33935
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 33919
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 32293
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.h3, { id: "xbox-360", children: "Xbox 360" }, void 0, !1, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 34104
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV7(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_II", children: "Assassin's Creed II" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 34207
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 34191
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Batman:_Arkham_Asylum", children: "Batman: Arkham Asylum" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 34359
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 34343
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Batman:_Arkham_City", children: "Batman: Arkham City" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 34513
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 34497
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/BioShock", children: "BioShock" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 34663
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 34647
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Burnout_Paradise", children: "Burnout Paradise" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 34791
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 34775
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Call_of_Duty_4:_Modern_Warfare", children: "Call of Duty 4: Modern Warfare" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 34935
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 34919
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Call_of_Duty:_Modern_Warfare_2", children: "Call of Duty: Modern Warfare 2" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 35107
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 35091
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Dark_Souls", children: "Dark Souls" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 35279
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 35263
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Dark_Souls_II", children: "Dark Souls II" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 35411
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 35395
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Dead_Space_(video_game)", children: "Dead Space" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 35549
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 35533
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Dishonored", children: "Dishonored" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 35694
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 35678
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Deus_Ex%3A_Human_Revolution", children: "Deus Ex: Human Revolution" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 35826
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 35810
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/The_Elder_Scrolls_V:_Skyrim", children: "The Elder Scrolls V: Skyrim" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 35990
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 35974
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Fallout_3", children: "Fallout 3" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 36156
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 36140
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Far_Cry_3", children: "Far Cry 3" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 36286
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 36270
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Gears_of_War_2", children: "Gears of War 2" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 36416
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 36400
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Gears_of_War_3", children: "Gears of War 3" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 36556
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 36540
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.rockstargames.com/games/IV", children: "Grand Theft Auto IV" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 36696
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 36680
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://www.rockstargames.com/gta-v", children: "Grand Theft Auto V" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 36835
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 36819
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Halo_3", children: "Halo 3" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 36970
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 36954
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/L.A._Noire", children: "L.A Noire" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 37094
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 37078
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Mass_Effect_3", children: "Mass Effect 3" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 37225
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 37209
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Mortal_Kombat", children: "Mortal Kombat" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 37363
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 37347
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Project_Gotham_Racing_3", children: "Project Gotham Racing 3" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 37501
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 37485
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Tom_Clancy%27s_Rainbow_Six:_Vegas", children: "Rainbow Six Vegas" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 37659
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 37643
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Tom_Clancy%27s_Rainbow_Six:_Vegas_2", children: "Rainbow Six Vegas 2" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 37821
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 37805
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Rayman_Legends", children: "Rayman Legends" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 37987
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 37971
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/Super_Meat_Boy", children: "Super Meat Boy" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 38127
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 38111
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV7(_components.li, { children: /* @__PURE__ */ jsxDEV7(_components.a, { href: "https://en.wikipedia.org/wiki/The_Witcher_2:_Assassins_of_Kings", children: "The Witcher 2: Assassins of Kings" }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 38267
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/things-i-like.mdx",
        lineNumber: 29,
        columnNumber: 38251
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/things-i-like.mdx",
      lineNumber: 29,
      columnNumber: 34169
    }, this)
  ] }, void 0, !0, {
    fileName: "mdx:routes/things-i-like.mdx",
    lineNumber: 29,
    columnNumber: 10
  }, this);
}
function MDXContent(props = {}) {
  return /* @__PURE__ */ jsxDEV7(MDXLayout, { ...props, children: /* @__PURE__ */ jsxDEV7(_createMdxContent, { ...props }, void 0, !1, {
    fileName: "mdx:routes/things-i-like.mdx",
    lineNumber: 32,
    columnNumber: 32
  }, this) }, void 0, !1, {
    fileName: "mdx:routes/things-i-like.mdx",
    lineNumber: 32,
    columnNumber: 10
  }, this);
}
var things_i_like_default = MDXContent, filename = "things-i-like.mdx", headers = typeof attributes2 < "u" && attributes2.headers, meta3 = typeof attributes2 < "u" && attributes2.meta, handle = typeof attributes2 < "u" && attributes2.handle;

// app/routes/blog.$slug.tsx
var blog_slug_exports = {};
__export(blog_slug_exports, {
  ErrorBoundary: () => ErrorBoundary2,
  default: () => BlogPostPage2,
  links: () => links2,
  loader: () => loader2,
  meta: () => meta4
});
import dayjs2 from "dayjs";
import Giscus from "@giscus/react";
import { RiTwitterFill } from "react-icons/ri";
import { Link as Link4, useLoaderData as useLoaderData2, useLocation } from "@remix-run/react";
import {
  json as json2
} from "@remix-run/server-runtime";
init_logger_server();

// app/lib/mdx.server.ts
var parseMarkdown = async (content) => {
  let { remark } = await import("remark"), { default: remarkHtml } = await import("remark-html"), { default: remarkParse } = await import("remark-parse"), { default: remarkPrism } = await import("remark-prism");
  return (await remark().use(remarkParse).use(remarkPrism).use(remarkHtml, { sanitize: !1 }).process(content)).toString("utf-8");
};

// app/styles/prism-styles.css
var prism_styles_default = "/build/_assets/prism-styles-AHXEW4ZT.css";

// app/lib/generateTwitterShareURL.ts
function generateTwitterShareURL({ slug, title }) {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    `https://andrewusher.dev${slug}`
  )}&text=${encodeURIComponent(
    `I just read "${title}" by @AndrewUsher17, check it out!`
  )}`;
}

// app/routes/blog.$slug.tsx
import { Fragment as Fragment4, jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
var links2 = () => [
  {
    rel: "stylesheet",
    href: prism_styles_default
  }
], loader2 = async ({ params }) => {
  try {
    if (!params.slug)
      throw json2({ message: "not found" }, 404);
    let { content: mdContent, ...rest2 } = await getBlogPostBySlug(params.slug), content = await parseMarkdown(mdContent);
    return {
      ...rest2,
      content
    };
  } catch (err) {
    throw logger.error(err), json2({ message: "not found" }, 404);
  }
}, meta4 = ({ data }) => data?.content ? {
  title: data.title,
  description: `${data.title} | Andrew Usher`
} : {
  title: "Not Found",
  description: "You landed on a page that Peter the Penguin wasn't able to find"
};
function BlogPostPage2() {
  let post = useLoaderData2(), formattedPublishDate = dayjs2(post.date).format("MMMM DD, YYYY"), { pathname } = useLocation();
  return /* @__PURE__ */ jsxDEV8(Fragment4, { children: [
    /* @__PURE__ */ jsxDEV8("main", { className: "prose mx-auto max-w-screen-xl px-4 pb-12 prose-headings:text-blue-700 prose-h1:text-black prose-ul:list-disc dark:prose-invert", children: [
      /* @__PURE__ */ jsxDEV8("div", { className: "relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] w-screen bg-gradient-to-tl from-blue-400 to-emerald-400 py-20 px-4 text-center shadow-lg", children: [
        /* @__PURE__ */ jsxDEV8("h1", { className: "mb-1 break-words text-black", children: post.title }, void 0, !1, {
          fileName: "app/routes/blog.$slug.tsx",
          lineNumber: 68,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV8("time", { dateTime: post.date, children: [
          "Published on ",
          formattedPublishDate
        ] }, void 0, !0, {
          fileName: "app/routes/blog.$slug.tsx",
          lineNumber: 69,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/blog.$slug.tsx",
        lineNumber: 67,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV8(
        "div",
        {
          className: "mt-12",
          dangerouslySetInnerHTML: { __html: post.content }
        },
        void 0,
        !1,
        {
          fileName: "app/routes/blog.$slug.tsx",
          lineNumber: 71,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV8("div", { className: "mb-4 flex items-center bg-stone-200 px-4 py-2 dark:bg-stone-800", children: [
        /* @__PURE__ */ jsxDEV8(RiTwitterFill, { fill: "#1DA1F2", className: "h-16 w-16 md:h-8 md:w-8" }, void 0, !1, {
          fileName: "app/routes/blog.$slug.tsx",
          lineNumber: 76,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV8("p", { className: "ml-2", children: [
          "If you liked this article and think others should read it, please",
          " ",
          /* @__PURE__ */ jsxDEV8(
            "a",
            {
              href: generateTwitterShareURL({
                slug: pathname,
                title: post.title
              }),
              children: "share it on Twitter"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/blog.$slug.tsx",
              lineNumber: 79,
              columnNumber: 13
            },
            this
          ),
          "!"
        ] }, void 0, !0, {
          fileName: "app/routes/blog.$slug.tsx",
          lineNumber: 77,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/blog.$slug.tsx",
        lineNumber: 75,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV8(
        Giscus,
        {
          repo: "AndrewUsher/blog-comments",
          repoId: "R_kgDOHS90kA",
          category: "Announcements",
          categoryId: "DIC_kwDOHS90kM4CO-p9",
          mapping: "pathname",
          reactionsEnabled: "1",
          emitMetadata: "0",
          inputPosition: "top",
          theme: "preferred_color_scheme",
          lang: "en",
          loading: "lazy"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/blog.$slug.tsx",
          lineNumber: 90,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/blog.$slug.tsx",
      lineNumber: 66,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV8(ReadingProgressBar, {}, void 0, !1, {
      fileName: "app/routes/blog.$slug.tsx",
      lineNumber: 104,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/blog.$slug.tsx",
    lineNumber: 65,
    columnNumber: 5
  }, this);
}
function ErrorBoundary2() {
  return /* @__PURE__ */ jsxDEV8("div", { className: "flex h-screen w-screen items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-400", children: /* @__PURE__ */ jsxDEV8("div", { className: "h-full rounded-md bg-white px-40 py-20 shadow-xl md:h-auto", children: /* @__PURE__ */ jsxDEV8("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsxDEV8("h1", { className: "text-9xl font-bold text-blue-600", children: "404" }, void 0, !1, {
      fileName: "app/routes/blog.$slug.tsx",
      lineNumber: 114,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV8("h6", { className: "mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl", children: [
      /* @__PURE__ */ jsxDEV8("span", { className: "text-red-500", children: "Oops!" }, void 0, !1, {
        fileName: "app/routes/blog.$slug.tsx",
        lineNumber: 117,
        columnNumber: 13
      }, this),
      " Page not found"
    ] }, void 0, !0, {
      fileName: "app/routes/blog.$slug.tsx",
      lineNumber: 116,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV8("p", { className: "mb-8 text-center text-gray-500 md:text-lg", children: "The page you\u2019re looking for doesn\u2019t exist." }, void 0, !1, {
      fileName: "app/routes/blog.$slug.tsx",
      lineNumber: 120,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV8(
      Link4,
      {
        to: "/",
        className: "bg-blue-100 px-6 py-2 text-sm font-semibold text-blue-800",
        children: "Go home"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/blog.$slug.tsx",
        lineNumber: 124,
        columnNumber: 11
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/blog.$slug.tsx",
    lineNumber: 113,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/blog.$slug.tsx",
    lineNumber: 112,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/blog.$slug.tsx",
    lineNumber: 111,
    columnNumber: 5
  }, this);
}

// app/routes/projects.tsx
var projects_exports = {};
__export(projects_exports, {
  default: () => ProjectsRoute,
  loader: () => loader3,
  meta: () => meta5
});
import { useLoaderData as useLoaderData3 } from "@remix-run/react";

// app/components/shared/Projects/Projects.tsx
import { Fragment as Fragment5, jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
function Projects({ projects }) {
  return /* @__PURE__ */ jsxDEV9(Fragment5, { children: projects.map((project) => /* @__PURE__ */ jsxDEV9("article", { className: "mb-6", children: [
    /* @__PURE__ */ jsxDEV9("h3", { className: "mb-4 break-words text-2xl font-semibold tracking-wide tracking-tighter hover:text-sky-500 dark:text-white", children: /* @__PURE__ */ jsxDEV9("a", { href: project.liveProjectLink, target: "_blank", rel: "noreferrer", children: project.title }, void 0, !1, {
      fileName: "app/components/shared/Projects/Projects.tsx",
      lineNumber: 14,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/components/shared/Projects/Projects.tsx",
      lineNumber: 13,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV9("p", { className: "text-xl leading-8 dark:text-slate-300", children: project.summary }, void 0, !1, {
      fileName: "app/components/shared/Projects/Projects.tsx",
      lineNumber: 18,
      columnNumber: 11
    }, this)
  ] }, project.title, !0, {
    fileName: "app/components/shared/Projects/Projects.tsx",
    lineNumber: 12,
    columnNumber: 9
  }, this)) }, void 0, !1, {
    fileName: "app/components/shared/Projects/Projects.tsx",
    lineNumber: 10,
    columnNumber: 5
  }, this);
}

// app/routes/projects.tsx
init_logger_server();
import { Fragment as Fragment6, jsxDEV as jsxDEV10 } from "react/jsx-dev-runtime";
var loader3 = async () => {
  let data = await getProjects();
  return logger.debug(`Projects route - ${data.total} projects found`), data.items.map(({ fields }) => ({
    ...fields
  }));
}, meta5 = () => ({
  title: "Projects - Andrew Usher",
  description: "Projects that I've worked on solely/contributed to."
});
function ProjectsRoute() {
  let projects = useLoaderData3();
  return /* @__PURE__ */ jsxDEV10(Fragment6, { children: /* @__PURE__ */ jsxDEV10("main", { className: "mx-auto max-w-screen-xl p-8", children: /* @__PURE__ */ jsxDEV10(Projects, { projects }, void 0, !1, {
    fileName: "app/routes/projects.tsx",
    lineNumber: 28,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/projects.tsx",
    lineNumber: 27,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/projects.tsx",
    lineNumber: 26,
    columnNumber: 5
  }, this);
}

// app/routes/contact.tsx
var contact_exports = {};
__export(contact_exports, {
  action: () => action,
  default: () => ContactRoute
});
import { useFetcher } from "@remix-run/react";
import { json as json3 } from "@remix-run/server-runtime";

// app/components/shared/Input/Input.tsx
import { jsxDEV as jsxDEV11 } from "react/jsx-dev-runtime";
var Input = ({ label, id, ...rest2 }) => /* @__PURE__ */ jsxDEV11("div", { className: "relative mb-8 h-16", children: [
  /* @__PURE__ */ jsxDEV11(
    "label",
    {
      htmlFor: id,
      className: "absolute top-3 left-3 text-xs font-medium text-gray-500",
      children: label
    },
    void 0,
    !1,
    {
      fileName: "app/components/shared/Input/Input.tsx",
      lineNumber: 12,
      columnNumber: 7
    },
    this
  ),
  /* @__PURE__ */ jsxDEV11(
    "input",
    {
      id,
      name: id,
      className: "absolute inset-0 w-full rounded-lg border-gray-200 bg-transparent px-3 pb-3 pt-9 dark:text-white sm:text-sm",
      type: "text",
      ...rest2
    },
    void 0,
    !1,
    {
      fileName: "app/components/shared/Input/Input.tsx",
      lineNumber: 19,
      columnNumber: 7
    },
    this
  )
] }, void 0, !0, {
  fileName: "app/components/shared/Input/Input.tsx",
  lineNumber: 11,
  columnNumber: 5
}, this);

// app/components/shared/Textarea.tsx
import { jsxDEV as jsxDEV12 } from "react/jsx-dev-runtime";
var TextArea = ({ label, id, ...rest2 }) => /* @__PURE__ */ jsxDEV12("div", { className: "relative mb-8 h-32", children: [
  /* @__PURE__ */ jsxDEV12(
    "label",
    {
      htmlFor: id,
      className: "absolute top-3 left-3 text-xs font-medium text-gray-500",
      children: label
    },
    void 0,
    !1,
    {
      fileName: "app/components/shared/Textarea.tsx",
      lineNumber: 12,
      columnNumber: 7
    },
    this
  ),
  /* @__PURE__ */ jsxDEV12(
    "textarea",
    {
      id,
      name: id,
      className: "absolute inset-0 w-full rounded-lg border-gray-200 bg-transparent px-3 pb-3 pt-9 dark:text-white sm:text-sm",
      ...rest2
    },
    void 0,
    !1,
    {
      fileName: "app/components/shared/Textarea.tsx",
      lineNumber: 18,
      columnNumber: 7
    },
    this
  )
] }, void 0, !0, {
  fileName: "app/components/shared/Textarea.tsx",
  lineNumber: 11,
  columnNumber: 5
}, this);

// app/lib/airtable.server.ts
import Airtable from "airtable";
var base = Airtable.base("appSBBeNjLaqKqTAP"), addContactToTable = async ({
  body,
  email,
  name,
  subject
}) => {
  body && email && name && subject && base("Table 1").create(
    [
      {
        fields: {
          Body: body,
          Email: email,
          Name: name,
          Subject: subject
        }
      }
    ],
    { typecast: !1 },
    (err) => {
      if (err)
        throw console.error(err), err;
    }
  );
};

// app/routes/contact.tsx
import { jsxDEV as jsxDEV13 } from "react/jsx-dev-runtime";
var blockList = ["crytowar"];
function validateContactFormSubmission({
  body,
  email,
  name,
  subject
}) {
  let errors = {};
  if (body || (errors.body = "Message is required"), email || (errors.email = "Email is required"), name || (errors.name = "Name is required"), subject || (errors.subject = "Subject is required"), blockList.includes(name?.toLowerCase() || ""))
    throw new Error("User is blocked from sending contact");
  return Object.keys(errors).length ? errors : null;
}
var action = async ({ request }) => {
  try {
    let formData = await request.formData(), body = formData.get("body"), email = formData.get("email"), name = formData.get("name"), subject = formData.get("subject"), errors = validateContactFormSubmission({ body, email, name, subject });
    return errors && console.error(errors), await addContactToTable({ body, email, name, subject }), json3({ success: !0 });
  } catch (err) {
    console.error("Error when sending to table", err);
  }
};
function ContactRoute() {
  let fetcher = useFetcher(), submitted = fetcher.type === "done" && fetcher.data?.success === !0;
  return /* @__PURE__ */ jsxDEV13("main", { className: "mx-auto max-w-screen-md p-8", children: [
    /* @__PURE__ */ jsxDEV13("section", { className: "prose mb-8 dark:prose-invert", children: [
      /* @__PURE__ */ jsxDEV13("p", { children: "How can I help you?" }, void 0, !1, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 75,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV13("p", { children: "If you want us to work together on a project, or have any questions about what I do, don't hesitate to write me." }, void 0, !1, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 76,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV13("p", { children: "Here are a few tips on writing me:" }, void 0, !1, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 80,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV13("ul", { children: [
        /* @__PURE__ */ jsxDEV13("li", { children: "Use paragraphs, avoid large walls of text." }, void 0, !1, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 82,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV13("li", { children: "Number your asks if there are multiple" }, void 0, !1, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 83,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV13("li", { children: "Keep it as short as you can" }, void 0, !1, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 84,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV13("li", { children: "Post code on a git repo, Codepen or smaller stuff or errors in a Gist. Screenshots are helpful too!" }, void 0, !1, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 85,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 81,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/contact.tsx",
      lineNumber: 74,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV13(fetcher.Form, { method: "post", children: [
      /* @__PURE__ */ jsxDEV13(Input, { label: "Name", id: "name", required: !0 }, void 0, !1, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 92,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV13(Input, { label: "Email", id: "email", required: !0 }, void 0, !1, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 93,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV13(Input, { label: "Subject", id: "subject", required: !0 }, void 0, !1, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 94,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV13(TextArea, { label: "Body", id: "body", required: !0 }, void 0, !1, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 95,
        columnNumber: 9
      }, this),
      submitted ? /* @__PURE__ */ jsxDEV13("p", { className: "border-l-8 border-l-sky-500 bg-sky-200/50 p-4 dark:border-l-yellow-400 dark:bg-sky-700 dark:text-white", children: "Email sent! I'll be in touch soon!" }, void 0, !1, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 97,
        columnNumber: 11
      }, this) : /* @__PURE__ */ jsxDEV13(
        "button",
        {
          className: "group relative mb-12 inline-block",
          type: "submit",
          disabled: fetcher.state === "submitting",
          children: [
            /* @__PURE__ */ jsxDEV13("span", { className: "absolute inset-0 translate-x-2 translate-y-2 transform bg-blue-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0 dark:bg-blue-700" }, void 0, !1, {
              fileName: "app/routes/contact.tsx",
              lineNumber: 106,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV13("span", { className: "relative inline-block border-2 border-black px-5 py-3 font-bold uppercase tracking-widest dark:border-white dark:text-white", children: "Send Message" }, void 0, !1, {
              fileName: "app/routes/contact.tsx",
              lineNumber: 107,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/routes/contact.tsx",
          lineNumber: 101,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/contact.tsx",
      lineNumber: 91,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/contact.tsx",
    lineNumber: 73,
    columnNumber: 5
  }, this);
}

// app/routes/journal.tsx
var journal_exports = {};
__export(journal_exports, {
  default: () => Journal,
  loader: () => loader4
});
import { useLoaderData as useLoaderData4 } from "@remix-run/react";

// app/components/shared/Posts/index.tsx
import dayjs3 from "dayjs";
import { Link as Link5 } from "@remix-run/react";
import { Fragment as Fragment7, jsxDEV as jsxDEV14 } from "react/jsx-dev-runtime";
function Posts({ entrySlugStart, posts }) {
  return /* @__PURE__ */ jsxDEV14(Fragment7, { children: posts.map((post) => /* @__PURE__ */ jsxDEV14("article", { className: "mb-6", children: [
    /* @__PURE__ */ jsxDEV14("h3", { className: "mb-1 break-words text-2xl font-semibold tracking-wide dark:text-white", children: /* @__PURE__ */ jsxDEV14(
      Link5,
      {
        className: "tracking-tighter hover:text-sky-500",
        to: `${entrySlugStart}/${post.slug}`,
        children: post.title
      },
      void 0,
      !1,
      {
        fileName: "app/components/shared/Posts/index.tsx",
        lineNumber: 17,
        columnNumber: 13
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/shared/Posts/index.tsx",
      lineNumber: 16,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV14(
      "time",
      {
        dateTime: post.date,
        className: "text-sm tracking-wide text-slate-700 dark:text-slate-500",
        children: [
          "Published on ",
          dayjs3(post.date).format("MMMM DD, YYYY")
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/shared/Posts/index.tsx",
        lineNumber: 24,
        columnNumber: 11
      },
      this
    )
  ] }, post.title, !0, {
    fileName: "app/components/shared/Posts/index.tsx",
    lineNumber: 15,
    columnNumber: 9
  }, this)) }, void 0, !1, {
    fileName: "app/components/shared/Posts/index.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}

// app/routes/journal.tsx
import { Fragment as Fragment8, jsxDEV as jsxDEV15 } from "react/jsx-dev-runtime";
var loader4 = async () => (await getJournalEntries()).map(({ fields }) => ({
  ...fields
}));
function Journal() {
  let posts = useLoaderData4();
  return /* @__PURE__ */ jsxDEV15(Fragment8, { children: /* @__PURE__ */ jsxDEV15("main", { className: "mx-auto max-w-screen-xl p-8", children: /* @__PURE__ */ jsxDEV15(Posts, { entrySlugStart: "/journal", posts }, void 0, !1, {
    fileName: "app/routes/journal.tsx",
    lineNumber: 21,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/journal.tsx",
    lineNumber: 20,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/journal.tsx",
    lineNumber: 19,
    columnNumber: 5
  }, this);
}

// app/routes/about.tsx
var about_exports = {};
__export(about_exports, {
  default: () => AboutPage
});

// mdx:content/about.mdx
import { Fragment as Fragment9, jsxDEV as jsxDEV16 } from "react/jsx-dev-runtime";
function _createMdxContent2(props) {
  let _components = Object.assign({
    nav: "nav",
    ol: "ol",
    li: "li",
    a: "a",
    h2: "h2",
    p: "p"
  }, props.components);
  return /* @__PURE__ */ jsxDEV16(Fragment9, { children: [
    /* @__PURE__ */ jsxDEV16(_components.nav, { className: "bg-slate-100 dark:bg-slate-800 p-8 shadow-lg", children: /* @__PURE__ */ jsxDEV16(_components.ol, { className: "toc-level toc-level-1", children: /* @__PURE__ */ jsxDEV16(_components.li, { className: "toc-item toc-item-h2", children: /* @__PURE__ */ jsxDEV16(_components.a, { className: "toc-link toc-link-h2", href: "#about-me", children: "About Me" }, void 0, !1, {
      fileName: "mdx:content/about.mdx",
      lineNumber: 12,
      columnNumber: 185
    }, this) }, void 0, !1, {
      fileName: "mdx:content/about.mdx",
      lineNumber: 12,
      columnNumber: 136
    }, this) }, void 0, !1, {
      fileName: "mdx:content/about.mdx",
      lineNumber: 12,
      columnNumber: 86
    }, this) }, void 0, !1, {
      fileName: "mdx:content/about.mdx",
      lineNumber: 12,
      columnNumber: 12
    }, this),
    /* @__PURE__ */ jsxDEV16(_components.h2, { id: "about-me", children: "About Me" }, void 0, !1, {
      fileName: "mdx:content/about.mdx",
      lineNumber: 12,
      columnNumber: 330
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV16(_components.p, { children: "I'm a dedicated and dependable front-end web developer and designer that specializes in landing pages and personal portfolios. My goal is to use the Internet to reach out to others and assist them in establishing an online presence. I like to build things - usually with technology, and I believe technology should enhance every person's life." }, void 0, !1, {
      fileName: "mdx:content/about.mdx",
      lineNumber: 12,
      columnNumber: 395
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV16(_components.p, { children: "Throughout my life, I've had a passion for computers. As a teenager, I toyed around in programs like Adobe Illustrator and got pretty good at it. Now, I'm super passionate about web design and development, and I have one year of study behind me." }, void 0, !1, {
      fileName: "mdx:content/about.mdx",
      lineNumber: 12,
      columnNumber: 779
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV16(_components.p, { children: "I also enjoy cycling around the city and exploring, and have been riding bikes for over 10 years and have completed trips ranging from 20 to 40 miles. I'm inspired by a cup of hot chocolate, good music, and interesting documentaries." }, void 0, !1, {
      fileName: "mdx:content/about.mdx",
      lineNumber: 12,
      columnNumber: 1065
    }, this)
  ] }, void 0, !0, {
    fileName: "mdx:content/about.mdx",
    lineNumber: 12,
    columnNumber: 10
  }, this);
}
function MDXContent2(props = {}) {
  let { wrapper: MDXLayout3 } = props.components || {};
  return MDXLayout3 ? /* @__PURE__ */ jsxDEV16(MDXLayout3, { ...props, children: /* @__PURE__ */ jsxDEV16(_createMdxContent2, { ...props }, void 0, !1, {
    fileName: "mdx:content/about.mdx",
    lineNumber: 16,
    columnNumber: 44
  }, this) }, void 0, !1, {
    fileName: "mdx:content/about.mdx",
    lineNumber: 16,
    columnNumber: 22
  }, this) : _createMdxContent2(props);
}
var about_default = MDXContent2;
var headers2 = typeof attributes < "u" && attributes.headers, meta6 = typeof attributes < "u" && attributes.meta, handle2 = typeof attributes < "u" && attributes.handle;

// app/content/timeline.ts
var timelineData = [
  {
    date: "August 2018",
    heading: "Moved into my first apartment \u{1F3E0}",
    description: null
  },
  {
    date: "May 2018",
    heading: "Started First Dev Job @ AutoZone \u{1F697}",
    description: null
  },
  {
    date: "May 2017",
    heading: "Graduated highschool",
    description: null
  },
  {
    date: "August 2011",
    heading: "Started playing basketball \u{1F3C0}",
    description: null
  },
  {
    date: "February 9, 1999",
    heading: "I was Born \u{1F476}\u{1F3FE}",
    description: null
  }
];

// app/routes/about.tsx
import { Fragment as Fragment10, jsxDEV as jsxDEV17 } from "react/jsx-dev-runtime";
function AboutPage() {
  return /* @__PURE__ */ jsxDEV17(Fragment10, { children: /* @__PURE__ */ jsxDEV17("div", { className: "mx-auto min-h-[80vh] max-w-screen-xl p-8", children: [
    /* @__PURE__ */ jsxDEV17("div", { className: "prose mb-8 max-w-screen-xl dark:prose-invert lg:prose-xl", children: /* @__PURE__ */ jsxDEV17(about_default, {}, void 0, !1, {
      fileName: "app/routes/about.tsx",
      lineNumber: 10,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/about.tsx",
      lineNumber: 9,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV17("ol", { className: "relative border-l border-emerald-400 dark:border-emerald-600", children: timelineData.map((entry2) => /* @__PURE__ */ jsxDEV17("li", { className: "mb-10 ml-4", children: [
      /* @__PURE__ */ jsxDEV17("div", { className: "dark:bg-blue-6 00 absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-blue-400  dark:border-gray-900" }, void 0, !1, {
        fileName: "app/routes/about.tsx",
        lineNumber: 15,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV17("time", { className: "mb-2 block text-lg font-bold leading-none text-blue-400", children: entry2.date }, void 0, !1, {
        fileName: "app/routes/about.tsx",
        lineNumber: 16,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV17("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: entry2.heading }, void 0, !1, {
        fileName: "app/routes/about.tsx",
        lineNumber: 19,
        columnNumber: 15
      }, this),
      entry2.description && /* @__PURE__ */ jsxDEV17("p", { className: "mb-4 text-base font-normal text-gray-500 dark:text-gray-400", children: entry2.description }, void 0, !1, {
        fileName: "app/routes/about.tsx",
        lineNumber: 23,
        columnNumber: 17
      }, this)
    ] }, entry2.heading, !0, {
      fileName: "app/routes/about.tsx",
      lineNumber: 14,
      columnNumber: 13
    }, this)) }, void 0, !1, {
      fileName: "app/routes/about.tsx",
      lineNumber: 12,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/about.tsx",
    lineNumber: 8,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/about.tsx",
    lineNumber: 7,
    columnNumber: 5
  }, this);
}

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  headers: () => headers3,
  links: () => links3,
  loader: () => loader5,
  meta: () => meta7
});
import {
  BookOpenIcon,
  BuildingOfficeIcon,
  CommandLineIcon,
  HeartIcon,
  RectangleGroupIcon,
  UserIcon
} from "@heroicons/react/24/solid";
import { motion as motion2 } from "framer-motion";
import { Link as Link6, useLoaderData as useLoaderData5 } from "@remix-run/react";

// app/components/home/RecentPosts/RecentPosts.tsx
import dayjs4 from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { jsxDEV as jsxDEV18 } from "react/jsx-dev-runtime";
dayjs4.extend(customParseFormat);
function RecentPosts({ posts }) {
  return /* @__PURE__ */ jsxDEV18("section", { children: [
    /* @__PURE__ */ jsxDEV18("h2", { className: "mb-8 text-4xl font-bold tracking-tight dark:text-white", children: "Recent Blog Posts" }, void 0, !1, {
      fileName: "app/components/home/RecentPosts/RecentPosts.tsx",
      lineNumber: 16,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV18(Posts, { entrySlugStart: "/blog", posts }, void 0, !1, {
      fileName: "app/components/home/RecentPosts/RecentPosts.tsx",
      lineNumber: 19,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/home/RecentPosts/RecentPosts.tsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
}

// app/components/home/RecentProjects/RecentProjects.tsx
import { motion } from "framer-motion";
import { jsxDEV as jsxDEV19 } from "react/jsx-dev-runtime";
function RecentProjects({ projects }) {
  return /* @__PURE__ */ jsxDEV19(
    motion.section,
    {
      initial: { opacity: 0, y: 400 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, stiffness: 50, delay: 0.2 },
      children: [
        /* @__PURE__ */ jsxDEV19("h2", { className: "mb-8 text-4xl font-bold tracking-tight dark:text-white", children: "Recent Projects" }, void 0, !1, {
          fileName: "app/components/home/RecentProjects/RecentProjects.tsx",
          lineNumber: 17,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV19(Projects, { projects }, void 0, !1, {
          fileName: "app/components/home/RecentProjects/RecentProjects.tsx",
          lineNumber: 20,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/home/RecentProjects/RecentProjects.tsx",
      lineNumber: 12,
      columnNumber: 5
    },
    this
  );
}

// app/seo.ts
import { initSeo } from "remix-seo";
var { getSeo, getSeoLinks, getSeoMeta } = initSeo({
  canonical: "https://andrewusher.dev",
  defaultTitle: "Andrew Usher",
  twitter: {
    card: "summary",
    creator: "@AndrewUsher17",
    site: "@AndrewUsher17"
  }
});

// app/routes/index.tsx
import { Fragment as Fragment11, jsxDEV as jsxDEV20 } from "react/jsx-dev-runtime";
function Paragraph({ children }) {
  return /* @__PURE__ */ jsxDEV20(
    motion2.p,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.8 },
      children
    },
    void 0,
    !1,
    {
      fileName: "app/routes/index.tsx",
      lineNumber: 24,
      columnNumber: 5
    },
    this
  );
}
function ExternalLink({ href, children }) {
  return /* @__PURE__ */ jsxDEV20("a", { className: "underline", href, children }, void 0, !1, {
    fileName: "app/routes/index.tsx",
    lineNumber: 36,
    columnNumber: 5
  }, this);
}
function IntroSectionCard({
  body,
  heading,
  icon: Icon,
  url
}) {
  return /* @__PURE__ */ jsxDEV20(
    Link6,
    {
      to: url,
      className: "card flex items-center rounded p-6 shadow-lg transition ease-in-out hover:scale-105 dark:bg-slate-800",
      children: [
        /* @__PURE__ */ jsxDEV20("section", { children: /* @__PURE__ */ jsxDEV20(Icon, { className: "mr-4 h-10 w-10 text-sky-600" }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 66,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 65,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV20("section", { children: [
          /* @__PURE__ */ jsxDEV20("h2", { className: "mb-2 text-3xl font-bold text-sky-600", children: heading }, void 0, !1, {
            fileName: "app/routes/index.tsx",
            lineNumber: 69,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV20("p", { className: "text-lg", children: body }, void 0, !1, {
            fileName: "app/routes/index.tsx",
            lineNumber: 70,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/index.tsx",
          lineNumber: 68,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/routes/index.tsx",
      lineNumber: 61,
      columnNumber: 5
    },
    this
  );
}
var headers3 = () => ({
  "Cache-Control": "public, max-age=3600, s-max-age=36000, stale-while-revalidate=72000"
}), loader5 = async () => {
  let [blogPosts, projects] = await Promise.all([
    getBlogPosts(),
    getProjects()
  ]);
  return {
    recentBlogPosts: blogPosts.slice(0, 5).map(({ fields }) => ({
      date: fields.date,
      slug: fields.slug,
      title: fields.title
    })),
    recentProjects: projects.items.map(({ fields }) => ({
      liveProjectLink: fields.liveProjectLink,
      summary: fields.summary,
      title: fields.title
    }))
  };
}, [seoMeta, seoLinks] = getSeo(), links3 = () => [...seoLinks], meta7 = () => ({ ...seoMeta });
function Index() {
  let { recentBlogPosts, recentProjects } = useLoaderData5();
  return /* @__PURE__ */ jsxDEV20(Fragment11, { children: /* @__PURE__ */ jsxDEV20("div", { className: "mx-auto max-w-screen-xl p-8 pt-0", children: [
    /* @__PURE__ */ jsxDEV20("div", { className: "prose dark:prose-invert lg:prose-xl", children: [
      /* @__PURE__ */ jsxDEV20(Paragraph, { children: [
        "Greetings! I am a systems engineer at",
        " ",
        /* @__PURE__ */ jsxDEV20(ExternalLink, { href: "https://autozone.com", children: "AutoZone" }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 115,
          columnNumber: 13
        }, this),
        ", where I lead a team of React developers in the development of the B2C web application. In my leisure time, I enjoy experimenting with new front-end technologies by creating personal projects. Outside of work, I engage in physical activities such as basketball and cycling in downtown Memphis. For additional information about me, please refer to my profile."
      ] }, void 0, !0, {
        fileName: "app/routes/index.tsx",
        lineNumber: 113,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV20(Paragraph, { children: /* @__PURE__ */ jsxDEV20(Link6, { to: "/about", children: "Read more about me here." }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 124,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 123,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/index.tsx",
      lineNumber: 112,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV20("div", { className: "my-12 grid grid-cols-1 gap-8 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxDEV20(
        IntroSectionCard,
        {
          body: "Loose collection of thoughts, things learned, and who-knows-whats about JavaScript, React, and TypeScript",
          heading: "Blog",
          icon: RectangleGroupIcon,
          url: "/blog"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/index.tsx",
          lineNumber: 128,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV20(
        IntroSectionCard,
        {
          body: "Public collection of personal things I've written over the years",
          heading: "Journal",
          icon: BookOpenIcon,
          url: "/journal"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/index.tsx",
          lineNumber: 134,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV20(
        IntroSectionCard,
        {
          body: "All of the fun things I've been working on",
          heading: "Projects",
          icon: BuildingOfficeIcon,
          url: "/projects"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/index.tsx",
          lineNumber: 140,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV20(
        IntroSectionCard,
        {
          body: "List of my daily drivers and necessities anyways, mostly revolving around my love for Apple",
          heading: "Uses",
          icon: CommandLineIcon,
          url: "/uses"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/index.tsx",
          lineNumber: 146,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV20(
        IntroSectionCard,
        {
          body: "A list of things that I like, in no particular order",
          heading: "Things I Like",
          icon: HeartIcon,
          url: "/things-i-like"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/index.tsx",
          lineNumber: 152,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV20(
        IntroSectionCard,
        {
          body: "Any questions? Project ideas? Get in touch with me!",
          heading: "Get In Touch",
          icon: UserIcon,
          url: "/contact"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/index.tsx",
          lineNumber: 158,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/index.tsx",
      lineNumber: 127,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV20(RecentProjects, { projects: recentProjects }, void 0, !1, {
      fileName: "app/routes/index.tsx",
      lineNumber: 165,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV20(RecentPosts, { posts: recentBlogPosts }, void 0, !1, {
      fileName: "app/routes/index.tsx",
      lineNumber: 166,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/index.tsx",
    lineNumber: 111,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/index.tsx",
    lineNumber: 110,
    columnNumber: 5
  }, this);
}

// app/routes/blog.tsx
var blog_exports = {};
__export(blog_exports, {
  default: () => Blog,
  loader: () => loader6
});
import { useLoaderData as useLoaderData6 } from "@remix-run/react";
import { Fragment as Fragment12, jsxDEV as jsxDEV21 } from "react/jsx-dev-runtime";
var loader6 = async () => (await getBlogPosts()).map(({ fields }) => ({
  ...fields
}));
function Blog() {
  let posts = useLoaderData6();
  return /* @__PURE__ */ jsxDEV21(Fragment12, { children: /* @__PURE__ */ jsxDEV21("main", { className: "mx-auto max-w-screen-xl p-8", children: /* @__PURE__ */ jsxDEV21(Posts, { entrySlugStart: "/blog", posts }, void 0, !1, {
    fileName: "app/routes/blog.tsx",
    lineNumber: 20,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/blog.tsx",
    lineNumber: 19,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/blog.tsx",
    lineNumber: 18,
    columnNumber: 5
  }, this);
}

// mdx:routes/uses.mdx
var uses_exports = {};
__export(uses_exports, {
  attributes: () => attributes3,
  default: () => uses_default,
  filename: () => filename2,
  handle: () => handle3,
  headers: () => headers4,
  meta: () => meta8
});
import { Fragment as Fragment13, jsxDEV as jsxDEV22 } from "react/jsx-dev-runtime";
var attributes3 = {
  meta: {
    title: "Uses - Andrew Usher",
    description: "Software/hardware that I use daily."
  },
  headers: {
    "Cache-Control": "public, s-max-age=36000"
  }
}, MDXLayout2 = function({ children }) {
  return /* @__PURE__ */ jsxDEV22("main", { className: "prose max-w-screen-xl mx-auto py-12 p-8 dark:prose-invert", children }, void 0, !1, {
    fileName: "mdx:routes/uses.mdx",
    lineNumber: 13,
    columnNumber: 10
  }, this);
};
function _createMdxContent3(props) {
  let _components = Object.assign({
    nav: "nav",
    ol: "ol",
    li: "li",
    a: "a",
    h2: "h2",
    ul: "ul",
    strong: "strong"
  }, props.components);
  return /* @__PURE__ */ jsxDEV22(Fragment13, { children: [
    /* @__PURE__ */ jsxDEV22(_components.nav, { className: "bg-slate-100 dark:bg-slate-800 p-8 shadow-lg", children: /* @__PURE__ */ jsxDEV22(_components.ol, { className: "toc-level toc-level-1", children: [
      /* @__PURE__ */ jsxDEV22(_components.li, { className: "toc-item toc-item-h2", children: /* @__PURE__ */ jsxDEV22(_components.a, { className: "toc-link toc-link-h2", href: "#hardware", children: "Hardware" }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 185
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 136
      }, this),
      /* @__PURE__ */ jsxDEV22(_components.li, { className: "toc-item toc-item-h2", children: /* @__PURE__ */ jsxDEV22(_components.a, { className: "toc-link toc-link-h2", href: "#desktop-pc", children: "Desktop PC" }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 344
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 295
      }, this),
      /* @__PURE__ */ jsxDEV22(_components.li, { className: "toc-item toc-item-h2", children: /* @__PURE__ */ jsxDEV22(_components.a, { className: "toc-link toc-link-h2", href: "#software", children: "Software" }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 507
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 458
      }, this),
      /* @__PURE__ */ jsxDEV22(_components.li, { className: "toc-item toc-item-h2", children: /* @__PURE__ */ jsxDEV22(_components.a, { className: "toc-link toc-link-h2", href: "#chrome-extensions", children: "Chrome Extensions" }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 666
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 617
      }, this),
      /* @__PURE__ */ jsxDEV22(_components.li, { className: "toc-item toc-item-h2", children: /* @__PURE__ */ jsxDEV22(_components.a, { className: "toc-link toc-link-h2", href: "#linux-apps", children: "Linux Apps" }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 843
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 794
      }, this),
      /* @__PURE__ */ jsxDEV22(_components.li, { className: "toc-item toc-item-h2", children: /* @__PURE__ */ jsxDEV22(_components.a, { className: "toc-link toc-link-h2", href: "#mac-apps", children: "Mac Apps" }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 1006
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 957
      }, this),
      /* @__PURE__ */ jsxDEV22(_components.li, { className: "toc-item toc-item-h2", children: /* @__PURE__ */ jsxDEV22(_components.a, { className: "toc-link toc-link-h2", href: "#mobile-apps", children: "Mobile Apps" }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 1165
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 1116
      }, this)
    ] }, void 0, !0, {
      fileName: "mdx:routes/uses.mdx",
      lineNumber: 27,
      columnNumber: 86
    }, this) }, void 0, !1, {
      fileName: "mdx:routes/uses.mdx",
      lineNumber: 27,
      columnNumber: 12
    }, this),
    `
`,
    `
`,
    /* @__PURE__ */ jsxDEV22(_components.h2, { id: "hardware", children: "Hardware" }, void 0, !1, {
      fileName: "mdx:routes/uses.mdx",
      lineNumber: 27,
      columnNumber: 1328
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV22(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://www.amazon.com/Apple-i7-7700HQ-Quad-Core-Bluetooth-Refurbished/dp/B07K1KNH29", children: "2017 MacBook Pro 15 Inch" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 1431
        }, this),
        " - Work laptop"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 1415
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://www.bestbuy.com/site/macbook-air-13-3-laptop-apple-m1-chip-8gb-memory-256gb-ssd-latest-model-space-gray/5721600.p?skuId=5721600", children: "M1 Macbook Air" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 1639
        }, this),
        " - Personal laptop"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 1623
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://www.amazon.com/Apple-iPhone-Graphite-Carrier-Subscription/dp/B08L5P2CRK", children: "iPhone 12 Pro Max" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 1892
        }, this),
        " - Personal phone"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 1876
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        "Keyboard: ",
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://www.apple.com/shop/product/MK2A3LL/A/magic-keyboard-us-english", children: "Magic Keyboard" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 2105
        }, this)
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 2075
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        "Mouse: ",
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://www.apple.com/shop/product/MK2E3AM/A/magic-mouse", children: "Magic Mouse" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 2282
        }, this)
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 2255
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        "Monitors: ",
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://www.bestbuy.com/site/samsung-ur55-series-28-ips-4k-uhd-monitor-black/6386391.p?skuId=6386391", children: "Samsung UR55 4K Monitor" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 2445
        }, this),
        " and ",
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://www.amazon.com/gp/product/B071L1KDVB/ref=ppx_yo_dt_b_asin_title_o08_s00?ie=UTF8&psc=1", children: "LG 29UM59-A" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 2620
        }, this)
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 2415
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/uses.mdx",
      lineNumber: 27,
      columnNumber: 1393
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV22(_components.h2, { id: "desktop-pc", children: "Desktop PC" }, void 0, !1, {
      fileName: "mdx:routes/uses.mdx",
      lineNumber: 27,
      columnNumber: 2817
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV22(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.strong, { children: "CPU" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 2924
        }, this),
        ": AMD Ryzen 5 2600X"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 2908
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.strong, { children: "RAM" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 3034
        }, this),
        ": 16GB G.SKILL Ripjaws V @ 3200MHz"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 3018
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.strong, { children: "GPU" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 3159
        }, this),
        ": GIGABYTE Radeon RX 580 GAMING 8GB"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 3143
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.strong, { children: "Display" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 3285
        }, this),
        ": ",
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://www.bestbuy.com/site/samsung-ur55-series-28-ips-4k-uhd-monitor-black/6386391.p?skuId=6386391", children: "Samsung UR55 4K Monitor" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 3343
        }, this),
        " and ",
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://www.amazon.com/gp/product/B071L1KDVB/ref=ppx_yo_dt_b_asin_title_o08_s00?ie=UTF8&psc=1", children: "LG 29UM59-A" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 3518
        }, this)
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 3269
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.strong, { children: "Motherboard" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 3708
        }, this),
        ": MSI PRO B450-A PRO MAX AM4 AMD B450 SATA 6Gb/s ATX"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 3692
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.strong, { children: "Power Supply" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 3859
        }, this),
        ": EVGA 600 BR"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 3843
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.strong, { children: "Mouse" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 3972
        }, this),
        ": ",
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://www.amazon.com/dp/B08D7293XC/?coliid=I1MS32RMOJARLB&colid=1CSW165RQ9BV8&psc=1&ref_=lv_ov_lig_dp_it", children: "Logitech G305" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 4028
        }, this)
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 3956
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.strong, { children: "Keyboard" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 4241
        }, this),
        ": ",
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://www.amazon.com/Logitech-G613-Lightspeed-Mechanical-Multihost-Connectivity/dp/B07796MBJ7?ref_=ast_sto_dp&th=1&psc=1", children: "Logitech G613" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 4300
        }, this)
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 4225
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.strong, { children: "Case" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 4525
        }, this),
        ": SilentiumPC Regnum RG4T"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 4509
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/uses.mdx",
      lineNumber: 27,
      columnNumber: 2886
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV22(_components.h2, { id: "software", children: "Software" }, void 0, !1, {
      fileName: "mdx:routes/uses.mdx",
      lineNumber: 27,
      columnNumber: 4649
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV22(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://www.google.com/chrome/canary/", children: "Chrome Canary" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 4752
        }, this),
        " - Browser"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 4736
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "http://figma.com/", children: "Figma" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 4898
        }, this),
        " - Design"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 4882
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://fishshell.com/", children: "Fish" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 5015
        }, this),
        " - Shell/terminal scripting language of choice"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 4999
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://code.visualstudio.com/", children: "VSCode" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 5173
        }, this),
        " - Code editor"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 5157
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/uses.mdx",
      lineNumber: 27,
      columnNumber: 4714
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV22(_components.h2, { id: "chrome-extensions", children: "Chrome Extensions" }, void 0, !1, {
      fileName: "mdx:routes/uses.mdx",
      lineNumber: 27,
      columnNumber: 5316
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV22(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://chrome.google.com/webstore/detail/lustre/cjmfiochlaffhnellbhffgnjocahinnh?hl=en", children: "Lustre" }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 5437
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 5421
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://chrome.google.com/webstore/detail/modern-design-for-wikiped/emdkdnnopdnajipoapepbeeiemahbjcn", children: "Modern Design for Wikipedia" }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 5612
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 5596
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://www.octotree.io/", children: "Octotree" }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 5821
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 5805
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://chrome.google.com/webstore/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall", children: "OneTab" }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 5935
      }, this) }, void 0, !1, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 5919
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/uses.mdx",
      lineNumber: 27,
      columnNumber: 5399
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV22(_components.h2, { id: "linux-apps", children: "Linux Apps" }, void 0, !1, {
      fileName: "mdx:routes/uses.mdx",
      lineNumber: 27,
      columnNumber: 6111
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV22(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://www.gitkraken.com/", children: "Gitkraken" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 6218
        }, this),
        " - Git GUI"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 6202
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://wiki.gnome.org/Apps/Lollypop", children: "Lollypop" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 6349
        }, this),
        " - Music client"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 6333
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://shutter-project.org/", children: "Shutter" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 6494
        }, this),
        " - Screenshot tool"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 6478
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://www.thunderbird.net/en-US/", children: "Thunderbird" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 6633
        }, this),
        " - Email client"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 6617
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/uses.mdx",
      lineNumber: 27,
      columnNumber: 6180
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV22(_components.h2, { id: "mac-apps", children: "Mac Apps" }, void 0, !1, {
      fileName: "mdx:routes/uses.mdx",
      lineNumber: 27,
      columnNumber: 6786
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV22(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://fig.io/", children: "Fig" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 6889
        }, this),
        " - Autocomplete for popular terminal commands"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 6873
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://hazeover.com/", children: "HazeOver" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 7038
        }, this),
        " - Dins all windows except for active one"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 7022
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://getkap.co/", children: "Kap" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 7194
        }, this),
        " - Screen capturing tool"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 7178
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://apps.apple.com/us/app/magnet/id441258766?mt=12", children: "Magnet" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 7325
        }, this),
        " - Window manager"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 7309
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://www.raycast.com/", children: "Raycast" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 7488
        }, this),
        " - Spotlight search replacement"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 7472
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/uses.mdx",
      lineNumber: 27,
      columnNumber: 6851
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV22(_components.h2, { id: "mobile-apps", children: "Mobile Apps" }, void 0, !1, {
      fileName: "mdx:routes/uses.mdx",
      lineNumber: 27,
      columnNumber: 7643
    }, this),
    `
`,
    /* @__PURE__ */ jsxDEV22(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://apps.apple.com/us/app/apollo-for-reddit/id979274575", children: "Apollo" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 7752
        }, this),
        " - Reddit client"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 7736
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://apps.apple.com/us/app/dark-sky-weather/id517329357", children: "Dark Sky" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 7919
        }, this),
        " - My favorite weather app, even though ",
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://www.theverge.com/2021/6/10/22527878/dark-sky-apple-ios-app-website-api-shut-down-end-of-2022", children: "it's shutting down at the end of 2022 :(" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 8072
        }, this)
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 7903
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://apps.apple.com/us/app/feedly-smart-news-reader/id396069556", children: "Feedly" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 8294
        }, this),
        " - My RSS reader of choice"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 8278
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://apps.apple.com/us/app/notion-notes-docs-tasks/id1232780281", children: "Notion" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 8478
        }, this),
        " - My personal swiss army knife for note taking/task management/scheduling"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 8462
      }, this),
      `
`,
      /* @__PURE__ */ jsxDEV22(_components.li, { children: [
        /* @__PURE__ */ jsxDEV22(_components.a, { href: "https://apps.apple.com/us/app/shazam-music-discovery/id284993459", children: "Shazam" }, void 0, !1, {
          fileName: "mdx:routes/uses.mdx",
          lineNumber: 27,
          columnNumber: 8710
        }, this),
        " - Makes it easy to find songs when I'm out and about"
      ] }, void 0, !0, {
        fileName: "mdx:routes/uses.mdx",
        lineNumber: 27,
        columnNumber: 8694
      }, this),
      `
`
    ] }, void 0, !0, {
      fileName: "mdx:routes/uses.mdx",
      lineNumber: 27,
      columnNumber: 7714
    }, this)
  ] }, void 0, !0, {
    fileName: "mdx:routes/uses.mdx",
    lineNumber: 27,
    columnNumber: 10
  }, this);
}
function MDXContent3(props = {}) {
  return /* @__PURE__ */ jsxDEV22(MDXLayout2, { ...props, children: /* @__PURE__ */ jsxDEV22(_createMdxContent3, { ...props }, void 0, !1, {
    fileName: "mdx:routes/uses.mdx",
    lineNumber: 30,
    columnNumber: 32
  }, this) }, void 0, !1, {
    fileName: "mdx:routes/uses.mdx",
    lineNumber: 30,
    columnNumber: 10
  }, this);
}
var uses_default = MDXContent3, filename2 = "uses.mdx", headers4 = typeof attributes3 < "u" && attributes3.headers, meta8 = typeof attributes3 < "u" && attributes3.meta, handle3 = typeof attributes3 < "u" && attributes3.handle;

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-6QD4UZJM.js", imports: ["/build/_shared/chunk-ZP5BL7UK.js", "/build/_shared/chunk-GIAAE3CH.js", "/build/_shared/chunk-V3L5CSOZ.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-XU7DNSPJ.js", "/build/_shared/chunk-BOXFZXVX.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-U5WCEHHU.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/about": { id: "routes/about", parentId: "root", path: "about", index: void 0, caseSensitive: void 0, module: "/build/routes/about-L7TE637Z.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/blog": { id: "routes/blog", parentId: "root", path: "blog", index: void 0, caseSensitive: void 0, module: "/build/routes/blog-N3GJCHIX.js", imports: ["/build/_shared/chunk-VYW7GV45.js", "/build/_shared/chunk-MOV4MZIU.js", "/build/_shared/chunk-3LA25QSP.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/blog.$slug": { id: "routes/blog.$slug", parentId: "routes/blog", path: ":slug", index: void 0, caseSensitive: void 0, module: "/build/routes/blog.$slug-W4RH5J6C.js", imports: ["/build/_shared/chunk-NMZL6IDN.js", "/build/_shared/chunk-TCB2J7O7.js", "/build/_shared/chunk-66LBSA4R.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/contact": { id: "routes/contact", parentId: "root", path: "contact", index: void 0, caseSensitive: void 0, module: "/build/routes/contact-HBMDYA7D.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: "index", index: void 0, caseSensitive: void 0, module: "/build/routes/index-QUAA62P3.js", imports: ["/build/_shared/chunk-6G2SWWGE.js", "/build/_shared/chunk-VYW7GV45.js", "/build/_shared/chunk-MOV4MZIU.js", "/build/_shared/chunk-3LA25QSP.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/journal": { id: "routes/journal", parentId: "root", path: "journal", index: void 0, caseSensitive: void 0, module: "/build/routes/journal-ECOE2RZE.js", imports: ["/build/_shared/chunk-VYW7GV45.js", "/build/_shared/chunk-MOV4MZIU.js", "/build/_shared/chunk-3LA25QSP.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/journal.$slug": { id: "routes/journal.$slug", parentId: "routes/journal", path: ":slug", index: void 0, caseSensitive: void 0, module: "/build/routes/journal.$slug-XHAXDSRM.js", imports: ["/build/_shared/chunk-TCB2J7O7.js", "/build/_shared/chunk-66LBSA4R.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/projects": { id: "routes/projects", parentId: "root", path: "projects", index: void 0, caseSensitive: void 0, module: "/build/routes/projects-UIJHQEQC.js", imports: ["/build/_shared/chunk-6G2SWWGE.js", "/build/_shared/chunk-66LBSA4R.js", "/build/_shared/chunk-3LA25QSP.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/things-i-like": { id: "routes/things-i-like", parentId: "root", path: "things-i-like", index: void 0, caseSensitive: void 0, module: "/build/routes/things-i-like-OBDYNZSY.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/uses": { id: "routes/uses", parentId: "root", path: "uses", index: void 0, caseSensitive: void 0, module: "/build/routes/uses-OZBCGMIL.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "01017163", hmr: { runtime: "/build/_shared/chunk-V3L5CSOZ.js", timestamp: 1705279285884 }, url: "/build/manifest-01017163.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/journal.$slug": {
    id: "routes/journal.$slug",
    parentId: "routes/journal",
    path: ":slug",
    index: void 0,
    caseSensitive: void 0,
    module: journal_slug_exports
  },
  "routes/things-i-like": {
    id: "routes/things-i-like",
    parentId: "root",
    path: "things-i-like",
    index: void 0,
    caseSensitive: void 0,
    module: things_i_like_exports
  },
  "routes/blog.$slug": {
    id: "routes/blog.$slug",
    parentId: "routes/blog",
    path: ":slug",
    index: void 0,
    caseSensitive: void 0,
    module: blog_slug_exports
  },
  "routes/projects": {
    id: "routes/projects",
    parentId: "root",
    path: "projects",
    index: void 0,
    caseSensitive: void 0,
    module: projects_exports
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "root",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: contact_exports
  },
  "routes/journal": {
    id: "routes/journal",
    parentId: "root",
    path: "journal",
    index: void 0,
    caseSensitive: void 0,
    module: journal_exports
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: "index",
    index: void 0,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/blog": {
    id: "routes/blog",
    parentId: "root",
    path: "blog",
    index: void 0,
    caseSensitive: void 0,
    module: blog_exports
  },
  "routes/uses": {
    id: "routes/uses",
    parentId: "root",
    path: "uses",
    index: void 0,
    caseSensitive: void 0,
    module: uses_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
