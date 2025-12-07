export function generateTwitterShareURL({
  slug,
  title,
}: {
  slug: string
  title: string
}) {
  const url = `https://andrewusher.dev${slug}`
  const text = `Check out "${title}" by @AndrewUsher17`
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(text)}`
}
