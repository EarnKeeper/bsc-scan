import { Options } from 'async-retry'

type Config = {
  url: string
  apiKey?: string
  maxRequestsPerSecond: number
  retryConfig: Options
}

const config: Config = {
  url: 'https://api.bscscan.com',
  apiKey: undefined,
  maxRequestsPerSecond: 5,
  retryConfig: { retries: 5 },
}

export default {
  get url() {
    return config.url
  },

  setUrl(url: string) {
    config.url = url
  },

  get apiKey() {
    return config.apiKey
  },

  setApiKey(apiKey: string) {
    config.apiKey = apiKey
  },

  get maxRequestsPerSecond() {
    return config.maxRequestsPerSecond
  },

  setMaxRequestsPerSecond(maxRequestsPerSecond: number) {
    config.maxRequestsPerSecond = maxRequestsPerSecond
  },

  get retryConfig() {
    return config.retryConfig
  },

  setRetryConfig(retryConfig: Options) {
    config.retryConfig = retryConfig
  },
}
