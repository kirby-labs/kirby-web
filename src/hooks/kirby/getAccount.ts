import { Connection, PublicKey } from '@solana/web3.js'

export async function getAccount(connection: Connection, accountPubKey: PublicKey) {
  const accounts = await connection.getAccountInfo(accountPubKey)

  console.log(`Accounts for program ${accountPubKey}: `)
  console.log(accounts)
}
