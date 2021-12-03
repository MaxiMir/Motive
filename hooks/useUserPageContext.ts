import { useContext } from 'react'
import { UserPage } from 'dto'
import { UserPageContext } from 'pages/better/[id]'
import usePartialMutate, { PartialMutate } from 'hooks/usePartialMutate'

export default function useUserPageContext(): [UserPage, PartialMutate] {
  const data = useContext(UserPageContext) as UserPage
  const mutate = usePartialMutate(data.href)

  return [data, mutate]
}
