import React from 'react'
import { NavLink } from 'react-router-dom'

import { FEEDS } from '@/constants/feeds'

export default function () {
  return (
    <div className="max-w-6xl mx-auto flex flex-row flex-wrap justify-center items-stretch relative">
      {FEEDS.map((i) => (
        <NavLink to={`/feed/?url=${i.xml}`} key={i.html} className="w-1/4 p-4">
          <div className="rounded bg-white shadow hover:shadow-lg overflow-hidden text-center">
            <div className="flex-col-center px-4 pt-2 pb-4">
              <div className="text-lg text-center font-bold py-2 text-text1">{i.title}</div>
              <div className="text-sm text-text1">{i.description}</div>
            </div>
            <div className="border-t py-2 text-xs text-text2">{i.html}</div>
          </div>
        </NavLink>
      ))}
    </div>
  )
}
