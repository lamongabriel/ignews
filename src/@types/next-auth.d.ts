import 'next-auth'

declare module 'next-auth' {
  interface Session {
    activeSubscription: {
			data: {
				status: string
			}
		}
  }
}
