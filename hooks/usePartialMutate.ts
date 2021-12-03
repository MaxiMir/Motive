import { useSWRConfig } from 'swr'

export type PartialMutate = (data?: unknown, shouldRevalidate?: boolean) => unknown

export default function usePartialMutate(swrKey: string): PartialMutate {
  const { mutate } = useSWRConfig()

  return (data?: unknown, shouldRevalidate?: boolean) => mutate(swrKey, data, shouldRevalidate)
}
