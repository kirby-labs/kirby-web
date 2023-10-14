export interface Feed {
  title: string
  xml: string
  html: string
  description?: string
}

export interface User {
  wallet: string
  feedsCount: number
  createdAt: string
  tags: string[]
}
