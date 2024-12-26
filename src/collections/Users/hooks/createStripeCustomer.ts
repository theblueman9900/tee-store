import { BeforeChangeHook } from "node_modules/payload/dist/collections/config/types"

export const createStripeCustomer: BeforeChangeHook = async ({ req, data, operation }) => {
  return data
}
