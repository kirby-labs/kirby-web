import { BN, Program, Provider, web3 } from '@coral-xyz/anchor'
import { Keypair } from '@solana/web3.js'

import { PROGRAM_ID } from '@/constants/kirby'

export async function getActiveSubscriptions(
  provider: Provider,
  program: Program,
  payer: Keypair,
  currentTime: number
) {
  let [subscriptionsAccount] = web3.PublicKey.findProgramAddressSync([Buffer.from('subscriptions')], PROGRAM_ID)
  console.log('subscriptionsAccount:', subscriptionsAccount.toBase58())

  const transactionSignature = await program.methods
    .getActiveSubscriptions(new BN(currentTime))
    .accounts({
      subscriptionsAccount: subscriptionsAccount,
      user: payer.publicKey,
    })
    .rpc()

  console.log(`Transaction https://explorer.solana.com/tx/${transactionSignature}?cluster=custom`)

  let t = await provider.connection.getTransaction(transactionSignature, {
    commitment: 'confirmed',
  })
}
