import { AnchorProvider, BN, Program, web3 } from '@coral-xyz/anchor'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Transaction } from '@solana/web3.js'

import { PROGRAM_ID } from '@/constants/kirby'
import { Feed } from '@/constants/models'
import { getAccountRss } from '@/hooks/kirby/getAccountRss'
import { useKirby } from '@/hooks/useKirby'

export function useAddFeed() {
  const { connection } = useConnection()
  const { program } = useKirby()
  const { publicKey, sendTransaction } = useWallet()

  return useCallback(
    (feed: Feed) => {
      if (!publicKey || !program) {
        return
      }
      ;(async () => {
        let [accountSettingAccount] = web3.PublicKey.findProgramAddressSync(
          [Buffer.from('account-setting'), publicKey.toBuffer()],
          PROGRAM_ID
        )
        const instructions: web3.TransactionInstruction[] = []
        try {
          const accountSettingData = await program.account.accountRssSetting.fetch(accountSettingAccount)
          console.log('accountSettingData: ', accountSettingData)
        } catch (error) {
          console.log('accountSettingData not exist, init it')
          const loginInstructions = await buildLoginInstructions(program)
          loginInstructions.forEach((i) => instructions.push(i))
        }

        const feeds = [...(await getAccountRss(program, publicKey)), feed].filter(
          (obj, index, self) => obj.title.length > 0 && index === self.findIndex((el) => el.xml === obj.xml)
        )
        console.log(feeds)
        instructions.push(
          await updateItem(
            program,
            `
<opml version="2.0">
  <head>
    <title>Your Subscription List</title>
  </head>
  <body>
    ${feeds.map((i) => `<outline text="${i.title}" htmlUrl="${i.html}" xmlUrl="${i.xml}" />`).join('\r\n')}
    </outline>
  </body>
</opml>
`
          )
        )

        const {
          context: { slot: minContextSlot },
          value: { blockhash, lastValidBlockHeight },
        } = await connection.getLatestBlockhashAndContext()

        const transaction = new Transaction({
          feePayer: publicKey,
          recentBlockhash: blockhash,
        }).add(...instructions)
        const signature = await sendTransaction(transaction, connection, { minContextSlot })
        await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature })
        // await createAndSendV0Tx(instructions, program.provider as any, publicKey)
      })()
    },
    [connection, program, publicKey, sendTransaction]
  )
}

export async function buildLoginInstructions(program: Program) {
  const provider = program.provider as AnchorProvider
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

  return [initializeAccountInstruction, addLoggInUserInstruction]
}

async function updateItem(program: Program, newDocument: string) {
  const provider = program.provider as AnchorProvider
  const payer = provider.wallet.publicKey
  let [rssSourceAccount] = web3.PublicKey.findProgramAddressSync([Buffer.from('rss'), payer.toBuffer()], PROGRAM_ID)
  console.log('rssSourceAccount:', rssSourceAccount.toBase58())

  return await program.methods
    .updateItem(Buffer.from(newDocument))
    .accounts({
      rssSourceAccount: rssSourceAccount,
      user: payer,
    })
    .instruction()
}
