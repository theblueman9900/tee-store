'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'

import classes from './index.module.scss'

const CartItem = ({ product, title, metaImage, qty, addItemToCart, variant }) => {
  const [quantity, setQuantity] = useState(qty)

  const decrementQty = () => {
    const updatedQty = quantity > 1 ? quantity - 1 : 1

    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  const incrementQty = () => {
    const updatedQty = quantity ?? 0 + 1

    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQty = Number(e.target.value)

    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  return (
    <li className={classes.item} key={title}>
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <span>No image</span>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media className={classes.media} imgClassName={classes.image} resource={metaImage} fill />
        )}
      </Link>

      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6>{title}</h6>
          <Price product={product} variant={variant} button={false} />
          <div
            style={{
              marginLeft: '0.5rem',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: '8px',
              marginTop: '0.5rem',
            }}
          >
            <div
              style={{
                width: '1.5rem', // w-8 -> 8 divided by 4 = 2rem
                height: '1.5rem', // h-8 -> 8 divided by 4 = 2rem
                borderRadius: '9999px', // rounded-full -> full border radius
                border: '1px solid #D1D5DB', // ring-1 ring-gray-300 -> 1px solid with gray color
                position: 'relative',
                backgroundColor: variant?.color?.value,
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '2rem', // w-10 -> 10 divided by 4 = 2.5rem
                  height: '2rem', // h-10 -> 10 divided by 4 = 2.5rem
                  borderRadius: '9999px', // rounded-full -> full border radius
                  border: '2px solid', // ring-2 -> 2px solid border
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)', // centers the element
                }}
              />
            </div>
            <div
              style={{
                border: '1px solid var(--theme-elevation-900)', // ring-1 ring-lama (assuming `lama` is #B1AFA7)
                borderRadius: '1rem', // rounded-md -> 0.375rem (6px)
                paddingTop: '0.1rem', // py-1 -> 0.25rem
                paddingBottom: '0.1rem', // py-1 -> 0.25rem
                paddingLeft: '1rem', // px-4 -> 1rem
                paddingRight: '1rem', // px-4 -> 1rem
                fontSize: '0.7rem', // text-sm -> 0.875rem (14px)
                cursor: 'pointer',
                backgroundColor: `var(--theme-elevation-900)`,
                color: `var(--theme-elevation-100)`,
                boxShadow: '',
              }}
            >
              {variant?.size?.title}
            </div>
          </div>
        </div>

        <div className={classes.quantity}>
          <div className={classes.quantityBtn} onClick={decrementQty}>
            <Image
              src="/assets/icons/minus.svg"
              alt="minus"
              width={24}
              height={24}
              // className={classes.qtnBt}
              style={{
                filter: 'invert(50%) sepia(100%) saturate(200%) hue-rotate(180deg)', // Example for coloring
              }}
            />
          </div>

          <input
            type="text"
            className={classes.quantityInput}
            value={quantity}
            onChange={enterQty}
          />

          <div className={classes.quantityBtn} onClick={incrementQty}>
            <Image
              src="/assets/icons/plus.svg"
              alt="plus"
              width={24}
              height={24}
              style={{
                filter: 'invert(50%) sepia(100%) saturate(200%) hue-rotate(180deg)', // Example for coloring
              }}
            />
          </div>
        </div>
      </div>

      <div className={classes.subtotalWrapper}>
        <Price product={product} button={false} quantity={quantity} variant={variant} />
        <RemoveFromCartButton product={product} />
      </div>
    </li>
  )
}

export default CartItem
