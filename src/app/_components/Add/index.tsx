'use client'

import { useState } from 'react'
import classes from './index.module.scss'
import { AddToCartButton } from '../AddToCartButton'
import { Category, Media as TypeMedia, Product } from '../../../payload/payload-types'

const Add = ({
  productId,
  variantId,
  stockNumber,
  product,
}: {
  productId: string
  variantId: string
  stockNumber: number
  product: Product
}) => {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleQuantity = (type: 'i' | 'd') => {
    if (type === 'd' && quantity > 1) {
      setQuantity(prev => prev - 1)
    }
    if (type === 'i' && quantity < stockNumber) {
      setQuantity(prev => prev + 1)
    }
  }

  return (
    <div className={classes.container}>
      <h5 className={classes.title}>Choose a Quantity</h5>
      <div className={classes.quantityWrapper}>
        <div className={classes.quantityControls}>
          <button
            className={classes.decrementButton}
            onClick={() => handleQuantity('d')}
            disabled={quantity === 1}
          >
            <span>-</span>
          </button>
          {quantity}
          <button
            className={classes.incrementButton}
            onClick={() => handleQuantity('i')}
            disabled={quantity === stockNumber}
          >
            <span>+</span>
          </button>
        </div>

        {/* {stockNumber < 1 ? (
          <div className={classes.outOfStock}>Product is out of stock</div>
        ) : (
          <div className={classes.stockInfo}>
            Only <span className={classes.stockNumber}>{stockNumber} items</span> left!
            <br /> {"Don't"} miss it
          </div>
        )} */}

        <AddToCartButton product={product} quantity={quantity} className={classes.addToCartButton} />

      </div>
    </div>
  )
}

export default Add
