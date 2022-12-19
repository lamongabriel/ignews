import { useSession, signIn } from 'next-auth/react'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'
import styles from './styles.module.scss'

interface SubscribeButtonProps {
	priceId: string
}

export function SubscribeButton ({priceId}: SubscribeButtonProps) {

	const { status } = useSession()


	async function handleSubscribe () {
		if(status !== 'authenticated'){
			return signIn('github')
		}

		try {
			const response = await api.post('/subscribe')

			const { sessionId } = response.data

			const stripe = await getStripeJs()

			if(!stripe) return

			await stripe.redirectToCheckout({sessionId})
		}
		catch (err){
			console.log(err)
		}
	}

	return (
		<button className={styles.button__subscribe} onClick={handleSubscribe}>Subscribe now</button>
	)
}
