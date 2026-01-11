import { getCollection } from 'astro:content'
import { OGImageRoute } from 'astro-og-canvas'

const blogPosts = await getCollection('blogPosts')

const pages: Record<string, { title: string }> = {}
for (const post of blogPosts) {
  if (post.data.isPublished) {
    pages[post.data.slug + '.png'] = { title: post.data.title }
  }
}

export const prerender = true

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (path) => {
    return {
      description: 'andrewusher.dev',
      title: pages[path]?.title || 'Blog Post',
      bgGradient: [
        [223, 242, 254],
        [240, 249, 255],
      ],
      logo: {
        path: './public/android-chrome-512x512.png',
        size: [140],
      },
      font: {
        description: {
          families: ['Merriweather Sans'],
          color: [0, 132, 209],
          size: 32,
          weight: 400,
          lineHeight: 1.2,
        },
        title: {
          families: ['Merriweather Sans'],
          color: [12, 12, 50],
          size: 44,
          weight: 700,
          lineHeight: 1.2,
        },
      },
      fonts: ['./public/fonts/merriweather-sans.ttf'],
    }
  },
})
