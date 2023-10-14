import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  BitKeepWalletAdapter,
  BitpieWalletAdapter,
  CoinbaseWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolongWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import React, { useEffect } from 'react'
import { useNavigate, useRoutes } from 'react-router-dom'

import Header from '@/components/Header'
import routes from '~react-pages'

import '@solana/wallet-adapter-react-ui/styles.css'

function Redirect({ to }: { to: string }) {
  let navigate = useNavigate()
  useEffect(() => {
    navigate(to)
  }, [navigate, to])
  return null
}

function App() {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolongWalletAdapter(),
      new BitKeepWalletAdapter(),
      new BitpieWalletAdapter(),
      new CoinbaseWalletAdapter(),
    ],
    []
  )
  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <Header />
            {useRoutes([...routes, { path: '*', element: <Redirect to="/" /> }])}
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  )
}

export default App
