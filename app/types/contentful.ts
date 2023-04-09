import * as contentful from 'contentful'

export type BlogPost = {
  content: string
  date: contentful.ContentTypeSys['createdAt']
  slug: string
  title: string
}

export type ContentfulBlogPostEntrySkeleton = {
  contentTypeId: 'blog-post'
  fields: {
    content: contentful.EntryFieldTypes.Text
    date: contentful.EntryFieldTypes.Date
    slug: contentful.EntryFieldTypes.Text
    title: contentful.EntryFieldTypes.Text
  }
}

export type JournalEntry = {
  content: string
  date: contentful.ContentTypeSys['createdAt']
  slug: string
  title: string
}

export type ContentfulJournalEntrySkeleton = {
  contentTypeId: 'journal-entry'
  fields: {
    content: contentful.EntryFieldTypes.Text
    date: contentful.EntryFieldTypes.Date
    slug: contentful.EntryFieldTypes.Text
    title: contentful.EntryFieldTypes.Text
  }
}

export type Project = {
  date: contentful.ContentTypeSys['createdAt']
  liveProjectLink: string
  summary: string
  title: string
}

export type ContentfulProjectEntrySkeleton = {
  contentTypeId: 'projects'
  fields: {
    date: contentful.EntryFieldTypes.Date
    liveProjectLink: contentful.EntryFieldTypes.Text
    summary: contentful.EntryFieldTypes.Text
    title: contentful.EntryFieldTypes.Text
  }
}
