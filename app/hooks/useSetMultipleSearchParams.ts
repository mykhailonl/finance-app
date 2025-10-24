import { useSearchParams } from 'react-router'

import type { ParamValueMap } from '~/hooks/useSearchParamValue'

export const useSetMultipleSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  return (params: Partial<ParamValueMap>) => {
    const newSearchParams = new URLSearchParams(searchParams)

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        newSearchParams.set(key, String(value))
      }
    })

    setSearchParams(newSearchParams)
  }
}
