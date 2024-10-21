'use client'

import React, { useEffect, useState } from 'react'

import { Product, Variant } from '../../../payload/payload-types'

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
  variant?: Variant
  button?: 'addToCart' | 'removeFromCart' | false
}> = props => {
  const { product, product: { priceJSON } = {}, button = 'addToCart', quantity, variant } = props

  const [price, setPrice] = useState<{
    actualPrice: string
    withQuantity: string
  }>(() => ({
    actualPrice: priceFromJSON(priceJSON, variant?.price),
    withQuantity: priceFromJSON(priceJSON, variant?.price, quantity),
  }))

  useEffect(() => {
    setPrice({
      actualPrice: priceFromJSON(priceJSON, variant?.price),
      withQuantity: priceFromJSON(priceJSON, variant?.price, quantity),
    })
  }, [priceJSON, quantity, variant])

  return (
    <div className={classes.actions}>
      {variant?.price != undefined
        ? typeof price?.actualPrice !== 'undefined' &&
          price?.withQuantity !== '' && (
            <div className={classes.price}>
              {quantity && quantity > 1 && <p>{price?.withQuantity}</p>}
              {!quantity &&
                variant?.compareAtPrice &&
                variant?.compareAtPrice !== variant?.price && (
                  <p className={classes.compareAtPrice}>₹{variant?.compareAtPrice?.toString()}</p>
                )}
              {!quantity && <p>₹{variant?.price?.toString()}</p>}
            </div>
          )
        : typeof price?.actualPrice !== 'undefined' &&
          price?.withQuantity !== '' && (
            <div className={classes.price}>
              {quantity && quantity > 1 && <p>{price?.withQuantity}</p>}
              {!quantity &&
                product?.compareAtPrice &&
                product?.compareAtPrice !== product?.price && (
                  <p className={classes.compareAtPrice}>₹{product?.compareAtPrice?.toString()}</p>
                )}
              {!quantity && <p>₹{product?.price?.toString()}</p>}
            </div>
          )}
    </div>
  )
}
