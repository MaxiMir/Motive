import { SignInOptions } from 'next-auth/react'
import { create } from 'zustand'

interface SignInStore {
  options: SignInOptions | null
  openSignIn: (options: SignInOptions) => void
  closeSignIn: () => void
}

export const useSignIn = create<SignInStore>((set) => ({
  options: null,
  openSignIn: (options) => set({ options }),
  closeSignIn: () => set({ options: null }),
}))
