import { AnchorProvider, web3 } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'

export async function createAndSendV0Tx(
  txInstructions: web3.TransactionInstruction[],
  provider: AnchorProvider,
  payer: PublicKey
) {
  // Step 1 - Fetch the latest blockhash
  let latestBlockhash = await provider.connection.getLatestBlockhash('confirmed')
  console.log('Fetched latest blockhash. Last Valid Height:', latestBlockhash.lastValidBlockHeight)

  // Step 2 - Generate Transaction Message
  const messageV0 = new web3.TransactionMessage({
    payerKey: payer,
    recentBlockhash: latestBlockhash.blockhash,
    instructions: txInstructions,
  }).compileToV0Message()
  console.log('Compiled Transaction Message')
  const transaction = new web3.VersionedTransaction(messageV0)

  // Step 3 - Sign your transaction with the required `Signers`
  provider.wallet.signTransaction(transaction).catch(console.error)
  console.log('Transaction Signed')

  // Step 4 - Send our v0 transaction to the cluster
  const txid = await provider.connection.sendTransaction(transaction, {
    maxRetries: 5,
  })
  console.log('Transaction sent to network')

  // Step 5 - Confirm Transaction
  const confirmation = await provider.connection.confirmTransaction({
    signature: txid,
    blockhash: latestBlockhash.blockhash,
    lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
  })
  if (confirmation.value.err) {
    throw new Error(`Transaction not confirmed.\nReason: ${confirmation.value.err}`)
  }
  console.log('🎉 Transaction Succesfully Confirmed!')
}
