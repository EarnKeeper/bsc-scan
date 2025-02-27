import axios, { AxiosRequestConfig } from 'axios'
import identity from 'lodash.identity'
import pickBy from 'lodash.pickby'
import qs from 'querystring'
import Bottleneck from 'bottleneck'

import config from './config'
import retry from 'async-retry'

const maxRequestsPerSecond = config.maxRequestsPerSecond

const limiter = new Bottleneck({
  minTime: Math.floor(1000 / maxRequestsPerSecond),
  maxConcurrent: maxRequestsPerSecond,
  reservoir: maxRequestsPerSecond,
  reservoirRefreshAmount: maxRequestsPerSecond,
  reservoirRefreshInterval: 1000,
})

type Module = 'account' | 'contract' | 'stats'

type AccountAction = 'balance' | 'balancemulti' | 'txlist' | 'txlistinternal' | 'tokentx' | 'getminedblocks'

type ContractAction = 'getabi' | 'getsourcecode'

type StatsAction = 'tokensupply' | 'tokenCsupply' | 'tokenbalance' | 'tokenbalancehistory' | 'bnbsupply' | 'validators'

export type QueryParams = {
  module: Module
  action: AccountAction | ContractAction | StatsAction
  address?: string
  contractAddress?: string
  txhash?: string
  startBlock?: number
  endBlock?: number
  blockno?: number
  page?: number
  offset?: number
  sort?: 'asc' | 'desc'
  tag?: string
  apiKey?: string
}

export type RequestConfig = {
  axiosConfig?: AxiosRequestConfig
  rawAxiosResponse?: boolean
}

type Response<T> = {
  status: '0' | '1'
  message: string
  result: T
}

async function query<T>(queryOptions: QueryParams, requestConfig?: RequestConfig) {
  const {
    address,
    contractAddress,
    txhash,
    module,
    action,
    startBlock = 0,
    endBlock = 99999999,
    page = undefined,
    offset = 10000,
    sort = 'asc',
    apiKey = config.apiKey,
  } = queryOptions

  const queryParams = pickBy(
    {
      address,
      contractAddress,
      txhash,
      module,
      action,
      startBlock,
      endBlock,
      page,
      offset,
      sort,
      apiKey,
    },
    identity
  )

  const { axiosConfig, rawAxiosResponse } = requestConfig || {}

  const query = qs.stringify(queryParams)

  return limiter.schedule(() =>
    retry(
      async () => {
        const response = await axios.get<Response<T>>(`${config.url}/api?${query}`, axiosConfig)

        if (rawAxiosResponse) {
          return response
        }

        const { status, result, message } = response.data as Response<T>

        if (status === '0' && message !== 'No transactions found') {
          throw new Error(message)
        }

        return result
      },
      {
        onRetry: (error) => console.error(error),
      }
    )
  )
}

export default query
