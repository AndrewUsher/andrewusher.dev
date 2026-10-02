import { resolve } from 'node:path'
import type { FeatureExtractionPipeline } from '@huggingface/transformers'
import { MODEL_DIRECTORY } from './config'

let extractor: Promise<FeatureExtractionPipeline> | undefined

export function getEmbedder(): Promise<FeatureExtractionPipeline> {
  extractor ??= import('@huggingface/transformers').then(async ({ pipeline, env }) => {
    // Model files are bundled at build time. Production never downloads weights.
    env.allowRemoteModels = false
    env.useFSCache = false
    return pipeline('feature-extraction', resolve(MODEL_DIRECTORY), {
      dtype: 'q8',
      device: 'cpu',
      local_files_only: true,
      session_options: { intraOpNumThreads: 1, interOpNumThreads: 1 },
    })
  }).catch(error => {
    extractor = undefined
    throw error
  })
  return extractor
}

export async function embedText(text: string): Promise<number[]> {
  const model = await getEmbedder()
  // Keep question/context embeddings inside the same input window as chunks.
  const ids = model.tokenizer.encode(text, { add_special_tokens: false }).slice(0, 254)
  const bounded = model.tokenizer.decode(ids, { skip_special_tokens: true })
  const result = await model(bounded, { pooling: 'mean', normalize: true })
  return Array.from(result.data, Number)
}
