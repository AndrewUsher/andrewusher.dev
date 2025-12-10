import { getCollection } from 'astro:content'
import dayjs from 'dayjs'

export interface MonthInfo {
  name: string
  slug: string
  count: number
  monthNumber: number
}

export interface YearInfo {
  year: number
  count: number
  months: MonthInfo[]
}

export const slugifyMonth = (monthName: string): string => {
  return monthName.toLowerCase().trim()
}

export const getMonthName = (date: Date): string => {
  return dayjs(date).format('MMMM')
}

export const getMonthNumber = (date: Date): number => {
  return dayjs(date).month() + 1 // dayjs months are 0-indexed
}

export const getYear = (date: Date): number => {
  return dayjs(date).year()
}

export const getArchiveData = async (): Promise<YearInfo[]> => {
  const allPosts = await getCollection('blogPosts')
  const publishedPosts = allPosts.filter(
    (post) => import.meta.env.DEV || post.data.isPublished
  )

  // Group posts by year and month
  const yearMap = new Map<number, Map<string, number>>()

  publishedPosts.forEach((post) => {
    const year = getYear(post.data.date)
    const monthName = getMonthName(post.data.date)
    const monthNumber = getMonthNumber(post.data.date)

    if (!yearMap.has(year)) {
      yearMap.set(year, new Map())
    }

    const monthMap = yearMap.get(year)!
    const key = `${monthNumber}:${monthName}`
    monthMap.set(key, (monthMap.get(key) || 0) + 1)
  })

  // Convert to sorted array of YearInfo
  return Array.from(yearMap.entries())
    .map(([year, monthMap]) => {
      const months: MonthInfo[] = Array.from(monthMap.entries())
        .map(([key, count]) => {
          const parts = key.split(':')
          const monthNumber = parts[0] || '0'
          const monthName = parts[1] || 'Unknown'
          return {
            name: monthName,
            slug: slugifyMonth(monthName),
            count,
            monthNumber: parseInt(monthNumber, 10),
          }
        })
        .sort((a, b) => b.monthNumber - a.monthNumber) // Sort months newest first

      const totalCount = Array.from(monthMap.values()).reduce(
        (sum, count) => sum + count,
        0
      )

      return {
        year,
        count: totalCount,
        months,
      }
    })
    .sort((a, b) => b.year - a.year) // Sort years newest first
}

export const getPostsByYear = async (year: number) => {
  const allPosts = await getCollection('blogPosts')
  const publishedPosts = allPosts.filter(
    (post) => import.meta.env.DEV || post.data.isPublished
  )

  return publishedPosts
    .filter((post) => getYear(post.data.date) === year)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

export const getPostsByMonth = async (year: number, monthSlug: string) => {
  const allPosts = await getCollection('blogPosts')
  const publishedPosts = allPosts.filter(
    (post) => import.meta.env.DEV || post.data.isPublished
  )

  const normalizedMonthSlug = slugifyMonth(monthSlug)

  return publishedPosts
    .filter((post) => {
      const postYear = getYear(post.data.date)
      const postMonthSlug = slugifyMonth(getMonthName(post.data.date))
      return postYear === year && postMonthSlug === normalizedMonthSlug
    })
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}
