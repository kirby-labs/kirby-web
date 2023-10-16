import { AnchorProvider, Program, web3 } from '@coral-xyz/anchor'

import { PROGRAM_ID } from '@/constants/kirby'

export async function updateItem(program: Program, provider: AnchorProvider, newDocument: Buffer) {
  const payer = await provider.wallet
  let [rssSourceAccount] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('rss'), payer.publicKey.toBuffer()],
    PROGRAM_ID
  )
  console.log('rssSourceAccount:', rssSourceAccount.toBase58())

  const transactionSignature = await program.methods
    .updateItem(newDocument)
    .accounts({
      rssSourceAccount: rssSourceAccount,
      user: payer.publicKey,
    })
    .rpc()

  console.log(`Transaction https://explorer.solana.com/tx/${transactionSignature}?cluster=custom`)
}
