import Giscus from '@giscus/react'

export default function GiscusWrapper() {
  return (
    <Giscus
      repo="AndrewUsher/blog-comments"
      repoId="R_kgDOHS90kA"
      category="Announcements"
      categoryId="DIC_kwDOHS90kM4CO-p9"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="preferred_color_scheme"
      lang="en"
      loading="lazy"
    />
  )
}
