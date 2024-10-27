import type { PayloadHandler } from 'payload/config'
import type { PayloadRequest } from 'payload/types'
const logs = process.env.LOGS_STRIPE_PROXY === '1'

// use this handler to interact with a Stripe customer associated with any given user
// does so in secure way that does not leak or expose any cross-customer data
// pass the proper method and body to this endpoint to interact with the Stripe API
// available methods:
// GET /api/users/:id/customer
// POST /api/users/:id/customer
// body: { customer: Stripe.CustomerUpdateParams }
export const customerProxy: PayloadHandler = async (req: PayloadRequest, res) => {
  const { userID } = req.params

  if (!req.user) {
    if (logs) req.payload.logger.error({ err: `You are not authorized to access this customer` })
    res.status(401).json({ error: 'You are not authorized to access this customer' })
    return
  }
  try {
    let response: any
    let customer: any | null = null
    res.status(200).json(response)
  } catch (error: unknown) {
    if (logs) req.payload.logger.error({ err: `Error using Stripe API: ${error}` })
    res.status(500).json({ error: `Error using Stripe API: ${error}` })
  }
}
