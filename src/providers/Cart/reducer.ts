import type { CartItems, Product, User } from '@/payload-types'

export type CartItem = {
  product?: (string | null) | Product
  quantity?: number | null
  variant?: {
    id?: string | null
    sku?: string | null
    price?: number | null
    compareAtPrice?: number | null
    stock?: number | null
    size?: {
      title?: string | null
      value?: string | null
    }
    color?: {
      title?: string | null
      value?: string | null
    }
  }
  id?: string | null
}

type CartType = User['cart']

type CartAction =
  | {
      type: 'SET_CART'
      payload: CartType
    }
  | {
      type: 'MERGE_CART'
      payload: CartType
    }
  | {
      type: 'ADD_ITEM'
      payload: CartItem
    }
  | {
      type: 'DELETE_ITEM'
      payload: CartItem
    }
  | {
      type: 'CLEAR_CART'
    }

export const cartReducer = (cart: CartType, action: CartAction): CartType => {
  switch (action.type) {
    case 'SET_CART': {
      return action.payload
    }

    case 'MERGE_CART': {
      const { payload: incomingCart } = action

      const syncedItems: CartItem[] = [
        ...(cart?.items || []),
        ...(incomingCart?.items || []),
      ].reduce((acc: CartItem[], item) => {
        // remove duplicates
        const productId = typeof item.product === 'string' ? item.product : item?.product?.id
        const productSku = typeof item.variant === 'string' ? item.variant : item?.variant?.sku
        const indexInAcc = acc.findIndex(({ product, variant }) =>
          typeof product === 'string'
            ? product === productId && (variant as any)?.sku === productSku
            : product?.id === productId && (variant as any)?.sku === productSku,
        ) // eslint-disable-line function-paren-newline

        if (indexInAcc > -1) {
          acc[indexInAcc] = {
            ...acc[indexInAcc],
            // customize the merge logic here, e.g.:
            // quantity: acc[indexInAcc].quantity + item.quantity
          }
        } else {
          acc.push(item)
        }
        return acc
      }, [])

      return {
        ...cart,
        items: syncedItems,
      }
    }

    case 'ADD_ITEM': {
      // if the item is already in the cart, increase the quantity
      const { payload: incomingItem } = action
      const productId =
        typeof incomingItem.product === 'string' ? incomingItem.product : incomingItem?.product?.id
      const productSku =
        typeof incomingItem.variant === 'string' ? incomingItem.variant : incomingItem?.variant?.sku

      const indexInCart = cart?.items?.findIndex(({ product, variant }) =>
        typeof product === 'string'
          ? product === productId && (variant as any)?.sku === productSku
          : product?.id === productId && (variant as any)?.sku === productSku,
      ) // eslint-disable-line function-paren-newline

      let withAddedItem = [...(cart?.items || [])]

      if (indexInCart === -1) {
        withAddedItem.push(incomingItem)
      }

      if (typeof indexInCart === 'number' && indexInCart > -1) {
        withAddedItem[indexInCart] = {
          ...withAddedItem[indexInCart],
          quantity: (incomingItem.quantity || 0) > 0 ? incomingItem.quantity : undefined,
          variant: incomingItem.variant || undefined,
        }
      }

      return {
        ...cart,
        items: withAddedItem,
      }
    }

    case 'DELETE_ITEM': {
      const { payload: incomingItem } = action
      const withDeletedItem = { ...cart }
      const productId =
        typeof incomingItem.product === 'string' ? incomingItem.product : incomingItem?.product?.id
      const productSku =
        typeof incomingItem.variant === 'string' ? incomingItem.variant : incomingItem?.variant?.sku

      const indexInCart = cart?.items?.findIndex(({ product, variant }) =>
        typeof product === 'string'
          ? product === productId && (variant as any)?.sku === productSku
          : product?.id === productId && (variant as any)?.sku === productSku,
      ) // eslint-disable-line function-paren-newline

      if (typeof indexInCart === 'number' && withDeletedItem.items && indexInCart > -1)
        withDeletedItem.items.splice(indexInCart, 1)

      return withDeletedItem
    }

    case 'CLEAR_CART': {
      return {
        ...cart,
        items: [],
      }
    }

    default: {
      return cart
    }
  }
}
