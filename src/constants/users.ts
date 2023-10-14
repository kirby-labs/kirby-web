import { User } from '@/constants/models'

function getRandomSolanaAddress() {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
}

function getRandomTag() {
  const tags = ['Tech', 'Programming', 'Web Development', 'Fashion', 'Beauty', 'Lifestyle']

  return tags[Math.floor(Math.random() * tags.length)]
}

function getRandomFeedsCount() {
  return Math.floor(Math.random() * 10)
}

function getRandomDatetime(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString()
}

export const USERS: User[] = Array.from({ length: 12 }, () => {
  return {
    wallet: getRandomSolanaAddress(),
    feedsCount: getRandomFeedsCount(),
    createdAt: getRandomDatetime(new Date(2020, 0, 1), new Date()),
    tags: Array.from({ length: 3 }, () => getRandomTag()),
  }
})
