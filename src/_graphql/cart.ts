import { META } from './meta'

export const CART = `cart {
  items {
    product {
      id
      slug
      ${META}
    }
    variant {
      id
      price
      compareAtPrice
      sku
    }
    quantity
  }
}`
