'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { useCart } from '@/providers/Cart'
import { Button, Props } from '../Button'

import classes from './index.module.scss'
import { Product } from '@/payload-types'

export const AddToCartButton: React.FC<{
  product: Product
  quantity?: number
  variant?: any
  className?: string
  appearance?: Props['appearance']
}> = props => {
  const { product, quantity = 1, variant, className, appearance = 'primary' } = props

  const { cart, addItemToCart, isProductInCart, hasInitializedCart } = useCart()

  const [isInCart, setIsInCart] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    setIsInCart(isProductInCart(product, variant))
  }, [isProductInCart, product, cart, variant])

  return (
    <Button
      href={isInCart ? '/cart' : undefined}
      type={!isInCart ? 'button' : undefined}
      label={isInCart ? `✓ View in cart` : `Add to cart`}
      el={isInCart ? 'link' : undefined}
      appearance={appearance}
      className={[
        className,
        classes.addToCartButton,
        appearance === 'default' && isInCart && classes.green,
        !hasInitializedCart && classes.hidden,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={
        !isInCart
          ? () => {
              addItemToCart({
                product,
                quantity,
                variant,
              })

              router.push('/cart')
            }
          : undefined
      }
    />
  )
}
