import { Spin } from 'antd' // @ts-ignore
import dayjs from 'dayjs'
import React from 'react'
import { useParams } from 'react-router' // @ts-ignore
import { useNavigate } from 'react-router-dom' // @ts-ignore

import { FeedItem } from '@/components/user/FeedItem'
import { FeedSource } from '@/components/user/FeedSource'
import { ProfileCard } from '@/components/user/ProfileCard'
import { useUser } from '@/hooks/useUser'

export default function () {
  const { id: wallet } = useParams<{ id: string }>()
  const nav = useNavigate()
  const { user, feeds } = useUser(wallet)

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto flex flex-row items-center justify-center h-60">
        <Spin spinning={true} />
      </div>
    )
  }

  return (
    <div className="pb-8">
      <div className="max-w-6xl mx-auto flex flex-row items-start">
        <ProfileCard user={user} />
        <div className="flex-1 ml-10">
          <div className="px-10 mb-4 pt-5 pb-6 bg-white rounded shadow [&_a]:hover:underline">
            <div className="flex flex-row justify-between items-center mb-2">
              <div className="text-lg font-bold">Activities on Solana</div>
              <div className="text-text2 text-sm">Last Update: {dayjs().format('YYYY-MM-DD HH:mm')}</div>
            </div>
            <div className="text-text1 text-sm">
              All on-chain activities of wallet address <span className="text-primary">{user.wallet}</span>
            </div>
            <div className="text-text2 text-sm mt-2">
              <a
                className="underline"
                href={`https://solscan.io/account/${user.wallet}?cluster=devnet`}
                target={'_blank'}
              >{`https://solscan.io/account/${user.wallet}`}</a>
            </div>
          </div>
          {feeds?.map((i) => (
            <FeedSource key={i.xml} feed={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
