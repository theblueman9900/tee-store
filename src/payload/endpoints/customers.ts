import type { PayloadHandler } from 'payload/config'
import type { PayloadRequest } from 'payload/types'

import { checkRole } from '../collections/Users/checkRole'

const logs = process.env.LOGS_STRIPE_PROXY === '1'

// use this handler to get all Stripe customers
// prevents unauthorized or non-admin users from accessing all Stripe customers
// GET /api/customers
export const customersProxy: PayloadHandler = async (req: PayloadRequest, res) => {
  if (!req.user || !checkRole(['admin'], req.user)) {
    if (logs) req.payload.logger.error({ err: `You are not authorized to access customers` })
    res.status(401).json({ error: 'You are not authorized to access customers' })
    return
  }

  try {
    res.status(200).json([])
  } catch (error: unknown) {
    if (logs) req.payload.logger.error({ err: `Error using Stripe API: ${error}` })
    res.status(500).json({ error: `Error using Stripe API: ${error}` })
  }
}
