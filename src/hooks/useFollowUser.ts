import { PublicKey } from '@solana/web3.js'
import dayjs from 'dayjs'
import { useState } from 'react'

import { Feed, User } from '@/constants/models'
import { getAccountRss } from '@/hooks/kirby/getAccountRss'
import { useKirby } from '@/hooks/useKirby'

export function useFollowUser() {
  const { program } = useKirby()

  return useCallback((address: string) => {}, [])
}
