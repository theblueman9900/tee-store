import { AfterDeleteHook } from 'node_modules/payload/dist/collections/config/types'
import type { Product } from '@/payload-types'

export const deleteProductFromCarts: AfterDeleteHook<Product> = async ({ req, id }) => {
  const usersWithProductInCart = await req.payload.find({
    collection: 'users',
    overrideAccess: true,
    where: {
      'cart.items.product': {
        equals: id,
      },
    },
  })

  if (usersWithProductInCart.totalDocs > 0) {
    await Promise.all(
      usersWithProductInCart.docs.map(async user => {
        const cart = user.cart as any
        const itemsWithoutProduct = (cart?.items as any[]).filter(item => item.product !== id)
        const cartWithoutProduct = {
          ...cart,
          items: itemsWithoutProduct,
        }

        return req.payload.update({
          collection: 'users',
          id: user.id,
          data: {
            cart: cartWithoutProduct,
          },
        })
      }),
    )
  }
}
