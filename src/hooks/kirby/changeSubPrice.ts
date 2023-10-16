import { AnchorProvider, BN, Program } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'

import { PROGRAM_ID } from '@/constants/kirby'

export async function changeSubPrice(program: Program, provider: AnchorProvider, price: number) {
  const payer = provider.wallet
  let [accountRssSetting] = PublicKey.findProgramAddressSync(
    [Buffer.from('account-setting'), payer.publicKey.toBuffer()],
    PROGRAM_ID
  )
  console.log('accountRssSetting:', accountRssSetting.toBase58())

  const transactionSignature = await program.methods
    .changeSubPrice(new BN(price))
    .accounts({
      accountRssSetting: accountRssSetting,
      user: payer.publicKey,
    })
    .rpc()

  console.log(`Transaction https://explorer.solana.com/tx/${transactionSignature}?cluster=custom`)
}
