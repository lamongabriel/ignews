import 'next-auth'

declare module 'next-auth/client' {
  export interface Session {
    activeSubscription: {
			data: {
				status: string
			}
		}
  }
}

declare module 'next-auth' {
  export interface Session {
    activeSubscription: {
			data: {
				status: string
			}
		}
  }
}
