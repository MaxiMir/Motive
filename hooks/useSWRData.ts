import { useContext } from 'react'
import { useRouter } from 'next/router'
import { UserPage } from 'dto'
import { SWRDataContext } from 'context/swrDataContext'
import usePartialMutate, { PartialMutate } from './usePartialMutate'

export default function useSWRData(): [UserPage, PartialMutate] {
  const { asPath } = useRouter()
  const data = useContext(SWRDataContext)
  const mutate = usePartialMutate(asPath)

  return [data as UserPage, mutate]
}
