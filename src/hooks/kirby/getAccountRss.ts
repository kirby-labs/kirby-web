import { Program, web3 } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'

import { PROGRAM_ID } from '@/constants/kirby'
import { parseOutlines } from '@/utils/getOpmlOutlines'

export async function getAccountRss(program: Program, publicKey: PublicKey) {
  let [rssAccount] = web3.PublicKey.findProgramAddressSync([Buffer.from('rss'), publicKey.toBuffer()], PROGRAM_ID)
  const rssData = await program.account.rssSource.fetch(rssAccount)
  const document = rssData?.document as Uint8Array[]
  const items = parseOutlines(document.toString())
  console.log('RSS items', items)
  return items
}
