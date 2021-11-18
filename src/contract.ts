import query, { RequestConfig } from './query'

export interface SourceCode {
  SourceCode: string
  ABI: string
  ContractName: string
  CompilerVersion: string
  OptimizationUsed: string
  Runs: string
  ConstructorArguments: string
  EVMVersion: string
  Library: string
  LicenseType: string
  Proxy: string
  Implementation: string
  SwarmSource: string
}

export function getContractAbi(address: string, requestConfig?: RequestConfig) {
  return query<string>(
    {
      address,
      module: 'contract',
      action: 'getabi',
    },
    requestConfig
  )
}

export function getContractSourceCode(address: string, requestConfig?: RequestConfig) {
  return query<SourceCode[]>(
    {
      address,
      module: 'contract',
      action: 'getsourcecode',
    },
    requestConfig
  )
}
