import { NextApiRequest, NextApiResponse } from 'next'
import { Readable } from 'stream'
import Stripe from 'stripe'
import { stripe } from '../../services/stripe'
import { saveSubscription } from './_lib/manageSubscription'

async function buffer(readable: Readable) {
	const chunks = []

	for await (const chunk of readable){
		chunks.push(
			typeof chunk === 'string' ? Buffer.from(chunk) : chunk
		)
	}

	return Buffer.concat(chunks)
}

export const config = {
	api: {
		bodyParser: false
	}
}

const relevantEvents = new Set([
	'checkout.session.completed'
])

export default async function (req: NextApiRequest, res: NextApiResponse) {
	if(req.method === 'POST'){
		const buf = await buffer(req)
		const secret = req.headers['stripe-signature']
		const localSecret = process.env.STRIPE_WEBHOOK_SECRET

		if(!secret || !localSecret) return res.status(403)

		let event: Stripe.Event

		try {
			event = stripe.webhooks.constructEvent(buf, secret, localSecret)
		} catch (error) {
			return res.status(400).send('Webhook error.')
		}

		const type = event.type

		if(relevantEvents.has(type)) {
			try {
				switch (type) {
				case 'checkout.session.completed': {
					const checkoutSession = event.data.object as Stripe.Checkout.Session

					if(checkoutSession.subscription && checkoutSession.customer){
						await saveSubscription(
							checkoutSession.subscription.toString(),
							checkoutSession.customer.toString()
						)
					}
					break
				}
				default:
					throw new Error('Unhandled event')
				}
			} catch (error) {
				return res.json({message: 'Webhook handler failed', error})
			}
		}

		return res.status(200).json({received: true})
	}
}
