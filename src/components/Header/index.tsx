import { AppstoreOutlined, GlobalOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'

import LogoImg from '../../assets/images/logo.png'

export function NavItem({ path, name, icon }: any) {
  const location = useLocation()
  const isActive = useMemo(() => {
    if (path === '/') {
      return location.pathname === path
    }
    if (path === '/feeds') {
      return location.pathname.startsWith('/feed')
    }
    return location.pathname.startsWith(path)
  }, [location.pathname, path])

  return (
    <NavLink
      target={path.startsWith('http') ? '_blank' : undefined}
      to={path}
      className={`w-24 mr-6 py-3 text-center text-sm font-semibold hover:text-primary no-underline`}
    >
      <div className={`flex-center rounded py-2 ${isActive ? 'text-primary' : 'text-text2 hover:text-text1 '}`}>
        {icon}
        <div className="ml-1">{name}</div>
      </div>
    </NavLink>
  )
}

export default function () {
  const { wallet } = useWallet()
  return (
    <div className="border-b border-divide border-solid mb-6 bg-white z-100 relative">
      <div className="px-2 max-w-6xl mx-auto w-full">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center">
            <img src="/logo.png" alt="" className="h-9 mr-8 self-center border-r border-solid border-divide pr-8" />
            <NavItem path="/" name="Home" icon={<HomeOutlined style={{ fontSize: '18px' }} />} />
            <NavItem path="/users" name="Explore" icon={<GlobalOutlined style={{ fontSize: '18px' }} />} />
            <NavItem path="/feeds" name="Feeds" icon={<AppstoreOutlined style={{ fontSize: '18px' }} />} />
            <div>&nbsp;</div>
          </div>
          <div className="flex-center">
            {wallet && <NavItem path="/profile" name="My Feeds" icon={<UserOutlined style={{ fontSize: '18px' }} />} />}
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </div>
  )
}
