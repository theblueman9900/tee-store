import React from 'react'
import Image from 'next/image'

import { Product } from '@/payload-types'
import { useCart } from '@/providers/Cart'

import classes from './index.module.scss'

export const RemoveFromCartButton: React.FC<{
  className?: string
  product: Product
  variant?: any
}> = props => {
  const { className, product, variant } = props
  const { deleteItemFromCart, isProductInCart } = useCart()
  const productIsInCart = isProductInCart(product, variant)

  if (!productIsInCart) {
    return <div>Item is not in the cart</div>
  }

  return (
    <button
      type="button"
      onClick={() => {
        deleteItemFromCart({ product, variant })
      }}
      className={[className, classes.removeFromCartButton].filter(Boolean).join(' ')}
    >
      <Image
        src="/assets/icons/delete.svg"
        alt="delete"
        width={24}
        height={24}
        className={classes.qtnBt}
      />
    </button>
  )
}
