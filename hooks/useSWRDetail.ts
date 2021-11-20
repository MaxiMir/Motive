import { useRouter } from 'next/router'
import useSWR from 'swr'
import { UserPage } from 'dto'
import PageService from 'services/PageService'
import usePartialMutate, { PartialMutate } from './usePartialMutate'

export default function useSWRDetail(): [UserPage, PartialMutate] {
  const { asPath } = useRouter()
  const { data } = useSWR<UserPage>(asPath, () => PageService.getDynamic(asPath)) // swr user detail page
  const mutate = usePartialMutate(asPath)

  return [data as UserPage, mutate]
}
