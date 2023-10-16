import { Program, web3 } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'
import dayjs from 'dayjs'

import { PROGRAM_ID } from '@/constants/kirby'
import { User } from '@/constants/models'
import { getAccountRss } from '@/hooks/kirby/getAccountRss'

export async function getUsers(program: Program): Promise<User[]> {
  const [usersAccount] = web3.PublicKey.findProgramAddressSync([Buffer.from('logged-in-users')], PROGRAM_ID)
  const data: any = await program.account.loggedInUsers.fetch(usersAccount)
  const userAddresses: PublicKey[] = data?.users ?? []

  const users: User[] = []
  for (let user of userAddresses) {
    const outlines = await getAccountRss(program, user)
    users.push({
      wallet: user.toString(),
      feedsCount: outlines.length,
      createdAt: dayjs().format('YYYY-MM-DD'),
      tags: ['Lifestyle', 'Tech', 'News'],
    })
  }
  users.sort((a, b) => b.feedsCount - a.feedsCount)
  return users
}
