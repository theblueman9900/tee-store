import { META } from './meta'

export const CART = `cart {
  items {
    product {
      id
      slug
      priceJSON
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
