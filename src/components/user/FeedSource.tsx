import { AppstoreAddOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Feed } from '@/constants/models'

export function FeedSource({ feed }: { feed: Feed }) {
  const nav = useNavigate()
  return (
    <div key={feed.html} className="px-10 mb-4 pt-5 pb-6 bg-white rounded shadow [&_a]:hover:underline">
      <div className="flex flex-row justify-between items-center mb-2">
        <div className="text-lg font-bold">{feed.title}</div>
        <div className="text-text2 text-sm">Last Update: {dayjs().format('YYYY-MM-DD HH:mm')}</div>
      </div>
      <div className="text-text1 text-sm">{feed.description}</div>
      <div className="text-text2 text-sm mt-2 flex flex-row justify-between items-center">
        <a className="underline" href={feed.html} target={'_blank'}>
          {feed.html}
        </a>
        <Button className="flex-center" onClick={() => nav(`/feed?url=${feed.xml}`)}>
          <AppstoreAddOutlined /> RSS
        </Button>
      </div>
    </div>
  )
}
