import { AppstoreOutlined, GlobalOutlined } from '@ant-design/icons'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function () {
  const nav = useNavigate()

  return (
    <div className="relative">
      <div
        className="absolute top--20 left-0 w-screen h-screen opacity-10 z-0"
        style={{ background: 'url(/bg.svg) no-repeat', backgroundSize: 'cover' }}
      ></div>
      <div className="max-w-6xl mx-auto">
        <div className="relative flex-col-center" style={{ minHeight: 'calc(100vh - 10rem)' }}>
          <div className="text-center z-10 flex flex-col gap-6">
            <h2 className="text-primary text-sm sm:text-2xl italic m-0" style={{ fontFamily: 'Domine, serif' }}>
              Unleash the Power of Blockchain
            </h2>

            <h1 className="text-text1 text-5xl sm:text-8xl leading-tight m-0">
              <div>Blockchain Powered</div>
              <div>Open RSS Platform</div>
            </h1>

            <h3 className="text-text2 text-base font-light mx-2 sm:text-xl sm:w-220 sm:m-0"></h3>

            <div className="flex flex-row justify-center items-center gap-4 px-4">
              <NavLink
                to="/users"
                className="bg-primary text-white py-4 w-1/2 sm:w-60 rounded-full text-lg flex-center hover:bg-[#FF752E] hover:text-white no-underline"
              >
                <GlobalOutlined />
                <span className="ml-1">Explore</span>
              </NavLink>

              <NavLink
                to="/feeds"
                className="bg-[#1d2730] text-white py-4 w-1/2 sm:w-60 rounded-full text-lg flex-center hover:bg-[#2d3740] hover:text-white no-underline"
              >
                <AppstoreOutlined />
                <span className="ml-1">Feeds</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
