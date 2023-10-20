declare global {
  interface Window {
    workbox: {
      messageSkipWaiting(): void
      register(): void
      addEventListener(name: string, callback: () => unknown): void
    }
  }
}

export {}
