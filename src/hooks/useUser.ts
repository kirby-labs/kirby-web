import { PublicKey } from '@solana/web3.js'
import dayjs from 'dayjs'
import { useState } from 'react'

import { Feed, User } from '@/constants/models'
import { getAccountRss } from '@/hooks/kirby/getAccountRss'
import { useKirby } from '@/hooks/useKirby'

export function useUser(wallet: string | undefined) {
  const { program } = useKirby()
  const [user, setUser] = useState<User>()
  const [feeds, setFeeds] = useState<Feed[]>()

  useEffect(() => {
    if (!wallet || !program) {
      return
    }
    ;(async () => {
      try {
        const items = await getAccountRss(program, new PublicKey(wallet))
        setUser({
          wallet,
          feedsCount: items.length,
          createdAt: dayjs().format('YYYY-MM-DD'),
        })
        setFeeds(items)
      } catch (error: any) {
        setUser({
          wallet,
        })
      }
    })()
  }, [program, wallet])

  return {
    user,
    feeds,
  }
}
