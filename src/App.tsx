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
import { useEffect } from 'react'
import { useNavigate, useRoutes } from 'react-router-dom'

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import routes from '~react-pages'

import { Header } from './components/layout/Header'

import '@solana/wallet-adapter-react-ui/styles.css'

function Redirect({ to }: { to: string }) {
  let navigate = useNavigate()
  useEffect(() => {
    navigate(to)
  }, [navigate, to])
  return null
}

function App() {
  const { toasts } = useToast()
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
            <div className="px-4">{useRoutes([...routes, { path: '*', element: <Redirect to="/" /> }])}</div>
            <footer className="py-5"></footer>
            <ToastProvider duration={2000}>
              {toasts.map(function ({ id, title, description, action, ...props }) {
                return (
                  <Toast key={id} {...props}>
                    <div className="grid gap-1">
                      {title && <ToastTitle>{title}</ToastTitle>}
                      {description && <ToastDescription>{description}</ToastDescription>}
                    </div>
                    {action}
                    <ToastClose />
                  </Toast>
                )
              })}
              <ToastViewport />
            </ToastProvider>
            <div id="app-modal-container" />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  )
}

export default App
