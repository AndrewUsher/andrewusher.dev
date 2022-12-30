type Options = {
  slug: string
  title: string
}

export function generateTwitterShareURL({ slug, title }: Options) {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    `https://andrewusher.dev${slug}`
  )}&text=${encodeURIComponent(
    `I just read "${title}" by @AndrewUsher17, check it out!`
  )}`
}
