export interface ExtendedCookieListItem {
  name: string
  value: string
  domain?: string
  path?: string
  expires?: number
  sameSite?: 'Strict' | 'Lax' | 'None'
  secure?: boolean
  partitioned?: boolean
}

export interface CookieChangeEvent {
  type: 'changed' | 'deleted'
  changed: ExtendedCookieListItem[]
  deleted: ExtendedCookieListItem[]
}

export interface CookieSetOptions {
  name?: string
  value?: string
  expires?: number | Date | undefined
  domain?: string
  path?: string
  sameSite?: 'Strict' | 'Lax' | 'None'
  secure?: boolean
  partitioned?: boolean
}
