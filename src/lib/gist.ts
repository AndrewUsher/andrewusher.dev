export interface GistFile {
  filename: string
  type: string
  language: string
  raw_url: string
  size: number
  content?: string
}

export interface GistData {
  id: string
  description: string
  files: Record<string, GistFile>
  created_at: string
  updated_at: string
  owner: {
    login: string
    avatar_url: string
  }
}

export interface GistFetchError {
  error: string
  status?: number
}

/**
 * Fetches gist data from GitHub API
 * @param gistId - The GitHub gist ID
 * @returns Gist data or error object
 */
export async function fetchGist(
  gistId: string
): Promise<GistData | GistFetchError> {
  try {
    const response = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        // Add GitHub token if available for higher rate limits
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        }),
      },
    })

    if (!response.ok) {
      return {
        error: `Failed to fetch gist: ${response.statusText}`,
        status: response.status,
      }
    }

    const data = await response.json()

    // Fetch content for each file
    const filesWithContent: Record<string, GistFile> = {}
    for (const [filename, file] of Object.entries(data.files)) {
      const fileData = file as GistFile
      if (fileData.raw_url) {
        try {
          const contentResponse = await fetch(fileData.raw_url)
          const content = await contentResponse.text()
          filesWithContent[filename] = { ...fileData, content }
        } catch (err) {
          console.error(`Failed to fetch content for ${filename}:`, err)
          filesWithContent[filename] = fileData
        }
      } else {
        filesWithContent[filename] = fileData
      }
    }

    return {
      id: data.id,
      description: data.description,
      files: filesWithContent,
      created_at: data.created_at,
      updated_at: data.updated_at,
      owner: {
        login: data.owner?.login || 'anonymous',
        avatar_url: data.owner?.avatar_url || '',
      },
    }
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'Unknown error fetching gist',
    }
  }
}

/**
 * Parse line range specification (e.g., "1-5,10,15-20")
 * @param linesSpec - Line specification string
 * @returns Set of line numbers to highlight
 */
export function parseLineNumbers(linesSpec: string): Set<number> {
  const lineNumbers = new Set<number>()

  const parts = linesSpec.split(',').map((s) => s.trim())

  for (const part of parts) {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number)
      if (start !== undefined && end !== undefined && !isNaN(start) && !isNaN(end)) {
        for (let i = start; i <= end; i++) {
          lineNumbers.add(i)
        }
      }
    } else {
      const num = Number(part)
      if (!isNaN(num)) {
        lineNumbers.add(num)
      }
    }
  }

  return lineNumbers
}

/**
 * Get the language for syntax highlighting from file extension
 * @param filename - The gist filename
 * @returns Language identifier for Shiki
 */
export function getLanguageFromFilename(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()

  const languageMap: Record<string, string> = {
    ts: 'typescript',
    tsx: 'tsx',
    js: 'javascript',
    jsx: 'jsx',
    py: 'python',
    rb: 'ruby',
    go: 'go',
    rs: 'rust',
    java: 'java',
    c: 'c',
    cpp: 'cpp',
    cs: 'csharp',
    php: 'php',
    swift: 'swift',
    kt: 'kotlin',
    scala: 'scala',
    sh: 'bash',
    bash: 'bash',
    zsh: 'bash',
    yml: 'yaml',
    yaml: 'yaml',
    json: 'json',
    xml: 'xml',
    html: 'html',
    css: 'css',
    scss: 'scss',
    sass: 'sass',
    md: 'markdown',
    sql: 'sql',
    graphql: 'graphql',
    dockerfile: 'dockerfile',
  }

  return languageMap[ext || ''] || 'plaintext'
}
