import { shorten } from '@did-network/dapp-sdk'
import dayjs from 'dayjs'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { USERS } from '@/constants/users'

export default function () {
  return (
    <div className="max-w-6xl mx-auto flex flex-row flex-wrap justify-center items-stretch relative">
      {USERS.map((i) => (
        <NavLink to={`/users/${i.wallet}`} key={i.wallet} className="w-1/3 p-4">
          <div className="rounded bg-white shadow hover:shadow-lg overflow-hidden text-center py-2">
            <div className="text-lg text-center font-bold py-2 text-text1">{shorten(i.wallet, 8, 8)}</div>
            <div className="mb-4 flex flex-row items-center justify-center gap-2">
              {i.tags.map((tag: any, index: number) => (
                <div key={i.wallet + index} className="px-2 py-1 bg-primary4 text-text1 rounded-sm text-xs">
                  {tag}
                </div>
              ))}
            </div>
            <div className="text-sm text-text1 w-full border-t text-left px-6 pt-2 pb-1">
              <div className="flex flex-row justify-between">
                <span>RSS Feeds: </span>
                <span>{i.feedsCount}</span>
              </div>
              <div className="flex flex-row justify-between mt-1">
                <span>Joined From: </span>
                <span>{dayjs(i.createdAt).format('YYYY-MM-DD HH:mm')}</span>
              </div>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  )
}
