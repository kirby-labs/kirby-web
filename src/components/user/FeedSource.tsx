import { AppstoreAddOutlined, LoadingOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'

import { Feed } from '@/constants/models'
import { useAddFeed } from '@/hooks/useAddFeed'

export function FeedSource({ feed }: { feed: Feed }) {
  const { pathname } = useLocation()
  const isProfile = pathname.includes('/profile')
  const { submit: addFeed, loading: addFeedLoading } = useAddFeed()

  return (
    <div key={feed.html} className="px-10 mb-4 pt-5 pb-6 bg-white rounded shadow [&_a]:hover:underline">
      <div className="flex flex-row justify-between items-center mb-2">
        <NavLink to={`/feed?url=${feed.xml}`} className="text-lg font-bold">
          {feed.title}
        </NavLink>
        <div className="text-text2 text-sm">Last Update: {dayjs('2023-10-17 09:01').format('YYYY-MM-DD HH:mm')}</div>
      </div>
      <div className="text-text1 text-sm">{feed.description}</div>
      <div className="text-text2 text-sm mt-2 flex flex-row justify-between items-center">
        <div>Source: {feed.html}</div>
        {isProfile ? (
          <Button className="flex-center" onClick={() => addFeed(feed, true)} disabled={addFeedLoading}>
            {addFeedLoading ? <LoadingOutlined /> : <MinusCircleOutlined />}Remove
          </Button>
        ) : (
          <Button className="flex-center" onClick={() => addFeed(feed, false)} disabled={addFeedLoading}>
            {addFeedLoading ? <LoadingOutlined /> : <AppstoreAddOutlined />}Add
          </Button>
        )}
      </div>
    </div>
  )
}
