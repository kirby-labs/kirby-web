export interface Market {
  tokenMint: string
  tokenSymbol: string
  tokenName: string
  reserve: string
  priceOracle: string
  sotokenMint: string
  supplyAccount: string

  tokenDecimal?: number
  price?: number

  supplyAPY?: number // 存款年利率
  borrowAPY?: number // 借款年利率
  availableLiquidity?: number // 池子里的总可借金额
  totalSupplied?: number // 池子里的总可借金额
  totalBorrowed?: number // 池子里的总可借金额
  tokenToSotokenRate?: number // 1 token 能换多少 sotoken
  sotokenToTokenRate?: number // 1 sotoken 能换多少 token
  borrowRatio?: number // 质押率
  lastSlot?: number // 上次更新时间
  maxDeposit?: number // 池子的最大可充值金额
}
