import { UserAddOutlined } from '@ant-design/icons'
import { shorten } from '@did-network/dapp-sdk'
import { useWallet } from '@solana/wallet-adapter-react'
import { Button, Input } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

import { User } from '@/constants/models'

export function ProfileCard({ user }: { user: User }) {
  const { publicKey } = useWallet()
  const isSelf = publicKey?.toString() === user.wallet
  return (
    <div className="flex-col-center px-4 py-4 bg-white rounded shadow w-80 text-center">
      <div className="w-full">
        <div className="text-lg text-primary font-bold mb-3">{shorten(user.wallet, 8, 8)}</div>
      </div>
      <div className="text-sm text-text1 w-full border-t text-left px-4 py-6 flex flex-col gap-y-1">
        <div className="flex flex-row justify-between">
          <span className="text-text2">RSS Feeds: </span>
          <span>{user.feedsCount}</span>
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-text2">Joined From: </span>
          <span>{dayjs(user.createdAt).format('YYYY-MM-DD HH:mm')}</span>
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-text2">Subscription Fee: </span>
          <span className="">0.1 SOL/Month</span>
        </div>
      </div>
      <div className="text-sm text-text1 w-full border-t text-left px-4 pt-2">
        <div className="flex flex-row justify-between mb-4 mt-2">
          <div>
            <span className="font-bold">0</span> <span className="text-text2">Following</span>
          </div>
          <div>
            <span className="font-bold">0</span> <span className="text-text2">Followers</span>
          </div>
        </div>
      </div>
      {isSelf ? (
        <div>
          <Input />
          <Button type="primary" onClick={() => console.log(11)} className="w-full">
            <div className="flex-center">
              <UserAddOutlined className="mr-1" /> Add new Feed
            </div>
          </Button>
        </div>
      ) : (
        <Button type="primary" onClick={() => console.log(11)} className="w-full">
          <div className="flex-center">
            <UserAddOutlined className="mr-1" /> Subscribe
          </div>
        </Button>
      )}
    </div>
  )
}
