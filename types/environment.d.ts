declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      API_BASE_URL: string
    }
  }
}

export {}
