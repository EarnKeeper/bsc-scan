import query, { QueryParams, RequestConfig } from './query'

export type AccountQueryParams = Omit<QueryParams, 'address' | 'contractAddress' | 'txhash' | 'module' | 'action'>

export interface BlockRange {
  startBlock?: number
  endBlock: number
}

export interface AddressBalance {
  account: string
  balance: string
}

export interface Transaction {
  blockNumber: string
  timeStamp: string
  hash: string
  nonce: string
  blockHash: string
  transactionIndex: string
  from: string
  to: string
  value: string
  gas: string
  gasPrice: string
  isError: string
  txreceipt_status: string
  input: string
  contractAddress: string
  cumulativeGasUsed: string
  gasUsed: string
  confirmations: string
}

export interface InternalTransaction {
  blockNumber: string
  timeStamp: string
  hash: string
  from: string
  to: string
  value: string
  contractAddress: string
  input: string
  type: string
  gas: string
  gasUsed: string
  traceId: string
  isError: string
  errCode: string
}

export interface TokenTransferEvent {
  blockNumber: string
  timeStamp: string
  hash: string
  nonce: string
  blockHash: string
  from: string
  contractAddress: string
  to: string
  value: string
  tokenName: string
  tokenSymbol: string
  tokenDecimal: string
  transactionIndex: string
  gas: string
  gasPrice: string
  gasUsed: string
  cumulativeGasUsed: string
  input: string
  confirmations: string
}

export function getBnbBalance(address: string, queryOptions?: AccountQueryParams, requestConfig?: RequestConfig) {
  return query<string>(
    {
      ...queryOptions,
      address,
      module: 'account',
      action: 'balance',
      tag: 'latest',
    },
    requestConfig
  )
}

export function getBnbBalanceForMultipleAddresses(
  addresses: string[],
  queryOptions?: AccountQueryParams,
  requestConfig?: RequestConfig
) {
  return query<AddressBalance[]>(
    {
      ...queryOptions,
      address: addresses.join(','),
      module: 'account',
      action: 'balancemulti',
      tag: 'latest',
    },
    requestConfig
  )
}

export function getInternalTransactionsByAddress(
  address: string,
  queryOptions?: AccountQueryParams,
  requestConfig?: RequestConfig
) {
  return query<InternalTransaction[]>(
    {
      ...queryOptions,
      address,
      module: 'account',
      action: 'txlistinternal',
    },
    requestConfig
  )
}

export function getInternalTransactionsByHash(
  txhash: string,
  queryOptions?: AccountQueryParams,
  requestConfig?: RequestConfig
) {
  return query<InternalTransaction[]>(
    {
      ...queryOptions,
      txhash,
      module: 'account',
      action: 'txlistinternal',
    },
    requestConfig
  )
}

export function getInternalTransactionsByBlockRange(
  blockRange: BlockRange,
  queryOptions?: Omit<AccountQueryParams, 'startBlock' | 'endBlock'>,
  requestConfig?: RequestConfig
) {
  return query<InternalTransaction[]>(
    {
      ...queryOptions,
      ...blockRange,
      module: 'account',
      action: 'txlistinternal',
    },
    requestConfig
  )
}

export function getTokenTransferEventsByAddress(
  address: string,
  queryOptions?: AccountQueryParams,
  requestConfig?: RequestConfig
) {
  return query<TokenTransferEvent[]>(
    {
      ...queryOptions,
      address,
      module: 'account',
      action: 'tokentx',
    },
    requestConfig
  )
}

export function getTokenTransferEventsByContractAddress(
  contractAddress: string,
  queryOptions?: AccountQueryParams,
  requestConfig?: RequestConfig
) {
  return query<TokenTransferEvent[]>(
    {
      ...queryOptions,
      contractAddress,
      module: 'account',
      action: 'tokentx',
    },
    requestConfig
  )
}

export function getTokenTransferEventsByAddressAndContractAddress(
  address: string,
  contractAddress: string,
  queryOptions?: AccountQueryParams,
  requestConfig?: RequestConfig
) {
  return query<TokenTransferEvent[]>(
    {
      ...queryOptions,
      address,
      contractAddress,
      module: 'account',
      action: 'tokentx',
    },
    requestConfig
  )
}

export function getTransactions(address: string, queryOptions?: AccountQueryParams, requestConfig?: RequestConfig) {
  return query<Transaction[]>(
    {
      ...queryOptions,
      address,
      module: 'account',
      action: 'txlist',
    },
    requestConfig
  )
}
