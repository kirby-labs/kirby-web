import { AppstoreAddOutlined, UserAddOutlined } from '@ant-design/icons'
import { shorten } from '@did-network/dapp-sdk'
import { useWallet } from '@solana/wallet-adapter-react'
import { Button, Input } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

import { User } from '@/constants/models'
import { useAddFeed } from '@/hooks/useAddFeed'
import { useFollowUser } from '@/hooks/useFollowUser'

export function ProfileCard({ user }: { user: User }) {
  const { publicKey } = useWallet()
  const isSelf = publicKey?.toString() === user.wallet

  const [title, setTitle] = useState('')
  const [xml, setXml] = useState('')
  const addFeed = useAddFeed()
  const followUser = useFollowUser()

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
        <div className="border-t pt-2">
          <div className="py-2 text-text1">Add New RSS Feed</div>
          <Input
            placeholder="RSS Title"
            className="mb-2"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
          />
          <Input placeholder="RSS URL" className="mb-2" value={xml} onChange={(e: any) => setXml(e.target.value)} />
          <Button
            type="primary"
            onClick={() => addFeed({ title, xml, html: 'https://' + new URL(xml).hostname })}
            className="w-full"
          >
            <div className="flex-center">
              <AppstoreAddOutlined className="mr-1" /> Add New Feed
            </div>
          </Button>
        </div>
      ) : (
        <Button type="primary" onClick={() => followUser(user.wallet)} className="w-full">
          <div className="flex-center">
            <UserAddOutlined className="mr-1" /> Subscribe
          </div>
        </Button>
      )}
    </div>
  )
}
