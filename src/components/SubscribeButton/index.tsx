import { useSession, signIn } from 'next-auth/react'
import styles from './styles.module.scss'

interface SubscribeButtonProps {
	priceId: string
}

export function SubscribeButton ({priceId}: SubscribeButtonProps) {

	const { status } = useSession()


	function handleSubscribe () {
		if(status !== 'authenticated'){
			return signIn('github')
		}


	}

	return (
		<button className={styles.button__subscribe} onClick={handleSubscribe}>Subscribe now</button>
	)
}
