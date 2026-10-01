import { getCollection } from 'astro:content'
import { OGImageRoute } from 'astro-og-canvas'
import { resolve } from 'node:path'
import { slugifyTag } from '../../lib/tags'

const blogPosts = await getCollection('blogPosts')

const pages: Record<string, { title: string; tags: string[] | undefined }> = {}
for (const post of blogPosts) {
  if (post.data.isPublished) {
    pages[post.data.slug + '.png'] = {
      title: post.data.title,
      tags: post.data.tags,
    }
  }
}

const tagBackgrounds: Record<string, [[number, number, number], [number, number, number]]> = {
  astro: [[243, 232, 255], [250, 245, 255]],
  css: [[252, 231, 243], [253, 242, 248]],
  git: [[255, 237, 213], [255, 247, 237]],
  javascript: [[254, 243, 199], [255, 251, 235]],
  node: [[220, 252, 231], [240, 253, 244]],
  react: [[219, 234, 254], [239, 246, 255]],
  typescript: [[224, 231, 255], [238, 242, 255]],
}
const defaultBackground: [[number, number, number], [number, number, number]] = [
  [223, 242, 254],
  [240, 249, 255],
]
const publicDirectory = resolve(process.cwd(), 'public')

export const prerender = true

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (
    _path: string,
    page: { title: string; tags: string[] | undefined },
  ) => {
    const taggedBackground = page.tags
      ?.map(slugifyTag)
      .map(tag => tagBackgrounds[tag])
      .find(Boolean)

    return {
      description: 'andrewusher.dev',
      title: page.title,
      bgGradient: taggedBackground || defaultBackground,
      logo: {
        path: resolve(publicDirectory, 'android-chrome-512x512.png'),
        size: [140],
      },
      font: {
        description: {
          families: ['Merriweather Sans'],
          color: [0, 132, 209],
          size: 32,
          weight: 'Normal',
          lineHeight: 1.2,
        },
        title: {
          families: ['Merriweather Sans'],
          color: [12, 12, 50],
          size: 44,
          weight: 'Bold',
          lineHeight: 1.2,
        },
      },
      fonts: [resolve(publicDirectory, 'fonts/merriweather-sans.ttf')],
    }
  },
})
