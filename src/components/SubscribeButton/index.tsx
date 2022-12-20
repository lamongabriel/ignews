import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'
import styles from './styles.module.scss'


export function SubscribeButton () {

	const { status, data } = useSession()
	const router = useRouter()

	async function handleSubscribe () {

		if(status !== 'authenticated'){
			return signIn('github')
		}

		if(data?.activeSubscription) {
			router.push('/posts')
			return
		}

		try {
			const response = await api.post('/subscribe')

			const { sessionId } = response.data

			const stripe = await getStripeJs()

			if(!stripe) return

			await stripe.redirectToCheckout({sessionId})
		}
		catch (err){
			return
		}
	}

	return (
		<button className={styles.button__subscribe} onClick={handleSubscribe}>Subscribe now</button>
	)
}
