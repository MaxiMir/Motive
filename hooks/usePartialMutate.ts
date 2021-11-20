import { useSWRConfig } from 'swr'
import { ScopedMutator } from 'swr/dist/types'

export type PartialMutate = (data?: unknown, shouldRevalidate?: boolean) => ScopedMutator

export default function usePartialMutate(swrKey: string): PartialMutate {
  const { mutate } = useSWRConfig()

  return (data?: unknown, shouldRevalidate?: boolean) => mutate(swrKey, data, shouldRevalidate)
}
