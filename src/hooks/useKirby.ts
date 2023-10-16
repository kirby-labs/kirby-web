import { AnchorProvider, Idl, Program } from '@coral-xyz/anchor'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'

import { PROGRAM_ID } from '@/constants/kirby'
import { getAllLoggedInUser } from '@/hooks/kirby/getAllLoggedInUser'

import idl from '../assets/idl/kirby.json'

export function useKirby() {
  const [users, setUsers] = useState<any[]>([])
  const wallet = useAnchorWallet()
  const { publicKey } = useWallet()
  const { connection } = useConnection()

  useEffect(() => {
    if (!wallet || !publicKey) {
      return
    }
    const provider = new AnchorProvider(connection, wallet, {})
    const program = new Program(idl as Idl, PROGRAM_ID, provider)
    ;(async () => {
      await getAllLoggedInUser(program)
    })()
  }, [connection, wallet, publicKey])
  return {
    users,
  }
}
