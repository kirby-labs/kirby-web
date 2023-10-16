import { Program, web3 } from '@coral-xyz/anchor'

import { PROGRAM_ID } from '@/constants/kirby'

export async function getAllLoggedInUser(program: Program) {
  let [initializeLoggedInUsersAccount] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('logged-in-users')],
    PROGRAM_ID
  )
  console.log('initializeLoggedInUsersAccount:', initializeLoggedInUsersAccount.toBase58())

  // Fetch the state struct from the network.
  const allLoggedInUsersAccount = await program.account.LoggedInUsers.fetch(initializeLoggedInUsersAccount)
  console.log('allLoggedInUsersAccount: ', allLoggedInUsersAccount)
  return allLoggedInUsersAccount
}
