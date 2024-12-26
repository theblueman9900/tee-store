'use client'

import React, { useEffect, useState } from 'react'

import { Product } from '@/payload-types'

import classes from './index.module.scss'

export const priceFromJSON = (
  priceJSON: string,
  varientPrice?: number,
  quantity: number = 1,
  raw?: boolean,
): string => {
  let price = ''

  if (priceJSON) {
    try {
      const parsed = JSON.parse(priceJSON)?.data[0]
      const priceValue = parsed.unit_amount * quantity
      const priceType = parsed.type

      if (raw) return priceValue.toString()

      price = (priceValue / 100).toLocaleString('en-US', {
        style: 'currency',
        currency: 'INR', // TODO: use `parsed.currency`
      })

      if (priceType === 'recurring') {
        price += `/${
          parsed.recurring.interval_count > 1
            ? `${parsed.recurring.interval_count} ${parsed.recurring.interval}`
            : parsed.recurring.interval
        }`
      }
    } catch (e) {
      console.error(`Cannot parse priceJSON`) // eslint-disable-line no-console
    }
  } else if (varientPrice) {
    price = (varientPrice * quantity).toLocaleString('en-US', {
      style: 'currency',
      currency: 'INR', // TODO: use `parsed.currency`
    })
  }

  return price
}

export const Price: React.FC<{
  product: Product
  quantity?: number
  variant?: any
  button?: 'addToCart' | 'removeFromCart' | false
}> = (props) => {
  const { product, button = 'addToCart', quantity, variant } = props

  const [price, setPrice] = useState<{
    actualPrice: string
    withQuantity: string
  }>(() => ({
    actualPrice: variant?.price ? variant?.price : product.price.toString(),
    withQuantity: ((variant?.price ? variant?.price : product.price) * (quantity ?? 1)).toString(),
  }))

  useEffect(() => {
    setPrice({
      actualPrice: variant?.price ? variant?.price : product.price.toString(),
      withQuantity: (
        (variant?.price ? variant?.price : product.price) * (quantity ?? 1)
      ).toString(),
    })
  }, [product.price, quantity, variant])

  return (
    <div className={classes.actions}>
      {variant?.price != undefined
        ? typeof price?.actualPrice !== 'undefined' &&
          price?.withQuantity !== '' && (
            <div className={classes.price}>
              {quantity && quantity > 0 && <p>{price?.withQuantity}</p>}
              {!quantity &&
                quantity != 0 &&
                variant?.compareAtPrice &&
                variant?.compareAtPrice !== variant?.price && (
                  <p className={classes.compareAtPrice}>₹{variant?.compareAtPrice?.toString()}</p>
                )}
              {!quantity && quantity != 0 && <p>₹{variant?.price?.toString()}</p>}
            </div>
          )
        : typeof price?.actualPrice !== 'undefined' &&
          price?.withQuantity !== '' && (
            <div className={classes.price}>
              {quantity && quantity > 0 && <p>{price?.withQuantity}</p>}
              {!quantity &&
                quantity != 0 &&
                product?.compareAtPrice &&
                product?.compareAtPrice !== product?.price && (
                  <p className={classes.compareAtPrice}>₹{product?.compareAtPrice?.toString()}</p>
                )}
              {!quantity && quantity != 0 && <p>₹{product?.price?.toString()}</p>}
            </div>
          )}
    </div>
  )
}
