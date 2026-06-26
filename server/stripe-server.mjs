import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Stripe from 'stripe'

const app = express()
const port = Number(process.env.PORT || process.env.STRIPE_API_PORT || 4242)
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePriceId = process.env.STRIPE_PRICE_ID
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/stripe/create-payment-intent', async (_req, res) => {
  if (!stripe || !stripePriceId) {
    return res.status(500).json({
      error: 'Stripe is not configured. Set STRIPE_SECRET_KEY and STRIPE_PRICE_ID.',
    })
  }

  try {
    const price = await stripe.prices.retrieve(stripePriceId)

    if (!price.unit_amount || !price.currency) {
      return res.status(500).json({ error: 'Stripe price is missing amount or currency.' })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price.unit_amount,
      currency: price.currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        stripePriceId,
        productId: typeof price.product === 'string' ? price.product : '',
        source: 'cakecord-premium-checkout',
      },
    })

    if (!paymentIntent.client_secret) {
      return res.status(500).json({ error: 'Stripe did not return a payment intent client secret.' })
    }

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: price.unit_amount,
      currency: price.currency,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create Stripe payment intent.' })
  }
})

app.listen(port, () => {
  console.log(`Stripe checkout server listening on http://localhost:${port}`)
})
