import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import Logo from '@/assets/images/tona_logo.png'

export const Header = ({ action }: { action?: ReactNode }) => {
  return (
    <div className="px-4 py-3 mb-6 text-fg1 border-b">
      <div className="max-w-7xl m-auto h-full flex justify-between items-center">
        <div className="flex items-center cursor-pointer">
          <img src={Logo} className="mr-4 h-8" />
          <NavItems />
        </div>
        <WalletMultiButton />
      </div>
    </div>
  )
}

function NavItems() {
  const location = useLocation()
  const path = location.pathname

  const items = [
    ['/markets', 'Markets'],
    ['/leverage', 'Leverage'],
    ['/dashboard', 'Dashboard'],
  ]
  return (
    <div className="bg-bg2 rounded flex flex-row items-center">
      {items.map((i) => (
        <NavLink
          to={i[0]}
          key={i[1]}
          className={`block text-sm rounded px-4 py-2 hover:text-fg1 ${path.startsWith(i[0]) ? 'bg-bg4' : ''}`}
        >
          {i[1]}
        </NavLink>
      ))}
    </div>
  )
}
