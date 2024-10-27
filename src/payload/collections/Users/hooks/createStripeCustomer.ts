import type { BeforeChangeHook } from 'payload/dist/collections/config/types'

export const createStripeCustomer: BeforeChangeHook = async ({ req, data, operation }) => {
  console.log('🚀 ~ constcreateStripeCustomer:BeforeChangeHook= ~ operation:', operation)
  console.log('🚀 ~ constcreateStripeCustomer:BeforeChangeHook= ~ req:', req)
  return data
}
