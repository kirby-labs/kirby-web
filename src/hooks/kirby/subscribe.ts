import { BN, Program, web3 } from '@coral-xyz/anchor'
import { Keypair, PublicKey } from '@solana/web3.js'

import { PROGRAM_ID } from '@/constants/kirby'

export async function subscribe(
  program: Program,
  payer: Keypair,
  feeAccount: PublicKey,
  subscriptionAccount: PublicKey,
  price: number
) {
  let [subscriptionsAccount] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('subscriptions'), payer.publicKey.toBuffer()],
    PROGRAM_ID
  )
  console.log('subscriptionsAccount:', subscriptionsAccount.toBase58())

  const transactionSignature = await program.methods
    .subscribe(new BN(price))
    .accounts({
      feeAccount: feeAccount,
      subscriptionAccount: subscriptionAccount,
      subscriptionsAccount: subscriptionsAccount,
      user: payer.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .rpc()

  console.log(`Transaction https://explorer.solana.com/tx/${transactionSignature}?cluster=custom`)
}
