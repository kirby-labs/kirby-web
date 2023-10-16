import { AnchorProvider, BN, Program, web3 } from '@coral-xyz/anchor'

import { PROGRAM_ID } from '@/constants/kirby'
import { createAndSendV0Tx } from '@/hooks/kirby/createAndSendV0Tx'

export async function login(program: Program, provider: AnchorProvider) {
  const payer = provider.wallet.publicKey
  let [rssSourceAccount] = web3.PublicKey.findProgramAddressSync([Buffer.from('rss'), payer.toBytes()], PROGRAM_ID)
  console.log('rssSourceAccount:', rssSourceAccount.toBase58())
  let [subscriptionsAccount] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('subscriptions'), payer.toBytes()],
    PROGRAM_ID
  )
  console.log('subscriptionsAccount:', subscriptionsAccount.toBase58())
  let [accountRssSetting] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('account-setting'), payer.toBytes()],
    PROGRAM_ID
  )
  console.log('accountRssSetting:', accountRssSetting.toBase58())
  let [loggedInUsersAccount] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('logged-in-users'), payer.toBytes()],
    PROGRAM_ID
  )
  console.log('loggedInUsersAccount:', loggedInUsersAccount.toBase58())

  const initializeAccountInstruction = await program.methods
    .initialize(new BN(100_000_000))
    .accounts({
      rssSourceAccount: rssSourceAccount,
      subscriptionsAccount: subscriptionsAccount,
      accountRssSetting: accountRssSetting,
      loggedInUsersAccount: loggedInUsersAccount,
      user: payer,
      systemProgram: web3.SystemProgram.programId,
    })
    .instruction()

  let [initializeLoggedInUsersAccount] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('logged-in-users')],
    PROGRAM_ID
  )

  const addLoggInUserInstruction = await program.methods
    .login()
    .accounts({
      loggedInUsersAccount: initializeLoggedInUsersAccount,
      user: payer,
    })
    .instruction()

  // Array of instructions
  const instructions: web3.TransactionInstruction[] = [initializeAccountInstruction, addLoggInUserInstruction]

  await createAndSendV0Tx(instructions, provider, payer)
}
