import { AppstoreAddOutlined } from '@ant-design/icons' // @ts-ignore
import { shorten } from '@did-network/dapp-sdk' // @ts-ignore
import { useWallet } from '@solana/wallet-adapter-react'
import { Button, Spin } from 'antd' // @ts-ignore
import dayjs from 'dayjs'
import React from 'react'
import { useNavigate } from 'react-router-dom' // @ts-ignore

import { ProfileCard } from '@/components/user/ProfileCard'
import { FEEDS } from '@/constants/feeds'
import { USERS } from '@/constants/users'

export default function () {
  const { publicKey } = useWallet()
  const loading = false
  const user = USERS.find((i) => i.wallet === publicKey?.toString())
  const nav = useNavigate()

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto flex flex-row items-center justify-center h-60">
        <Spin spinning={true} />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="pb-8">
      <div className="max-w-6xl mx-auto flex flex-row items-start">
        <ProfileCard user={user} />
        <div className="flex-1 ml-10">
          <div className="flex flex-row justify-end mb-3">
            <Button type="primary" onClick={() => console.log(11)}>
              <div className="flex-center">
                <AppstoreAddOutlined className="mr-1" /> Add New Feed
              </div>
            </Button>
          </div>
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
          {FEEDS.map((i) => (
            <div key={i.html} className="px-10 mb-4 pt-5 pb-6 bg-white rounded shadow [&_a]:hover:underline">
              <div className="flex flex-row justify-between items-center mb-2">
                <div className="text-lg font-bold">{i.title}</div>
                <div className="text-text2 text-sm">Last Update: {dayjs().format('YYYY-MM-DD HH:mm')}</div>
              </div>
              <div className="text-text1 text-sm">{i.description}</div>
              <div className="text-text2 text-sm mt-2 flex flex-row justify-between items-center">
                <a className="underline" href={i.html} target={'_blank'}>
                  {i.html}
                </a>
                <Button className="flex-center" onClick={() => nav(`/feed?url=${i.xml}`)}>
                  <AppstoreAddOutlined /> RSS
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
