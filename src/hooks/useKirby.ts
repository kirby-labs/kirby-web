import { AnchorProvider, Idl, Program } from '@coral-xyz/anchor'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'

import { PROGRAM_ID } from '@/constants/kirby'
import { User } from '@/constants/models'
import { getUsers } from '@/hooks/kirby/getUsers'

import idl from '../assets/idl/kirby.json'

export function useKirby() {
  const [users, setUsers] = useState<User[]>()
  const wallet = useAnchorWallet()
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const provider = useMemo(
    () => (wallet ? new AnchorProvider(connection, wallet, {}) : undefined),
    [connection, wallet]
  )
  const program = useMemo(() => (provider ? new Program(idl as Idl, PROGRAM_ID, provider) : undefined), [provider])

  useEffect(() => {
    if (!wallet || !publicKey || !program) {
      return
    }
    ;(async () => {
      const users = await getUsers(program)
      setUsers(users)
    })()
  }, [connection, wallet, publicKey, program])
  return {
    users,
    program,
  }
}
