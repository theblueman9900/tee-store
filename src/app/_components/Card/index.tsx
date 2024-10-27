'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import { Product } from '../../../payload/payload-types'
import { Media } from '../Media'
import { Price } from '../Price'

import classes from './index.module.scss'

const priceFromJSON = (
  priceJSON,
): { originalPrice: number; currentPrice: number; currency: string } => {
  let price = { originalPrice: 0, currentPrice: 0, currency: '' }

  if (priceJSON) {
    try {
      const parsed = JSON.parse(priceJSON)?.data[0]
      const priceValue = parsed.unit_amount
      const priceType = parsed.type
      price.currency = parsed.currency === 'inr' ? '₹' : 'Rs.'
      price.currentPrice = priceValue / 100
      price.originalPrice = parsed.original_price / 100 // Assuming original_price is available in your API
    } catch (e) {
      console.error(`Cannot parse priceJSON`) // eslint-disable-line no-console
    }
  }

  return price
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  showCategories?: boolean
  hideImagesOnMobile?: boolean
  title?: string
  relationTo?: 'products'
  doc?: Product
}> = props => {
  const {
    showCategories,
    title: titleFromProps,
    doc,
    doc: { slug, title, categories, meta, priceJSON } = {},
    className,
  } = props

  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/products/${slug}`

  var displayImage = null

  if (metaImage) {
    displayImage = metaImage
  } else if (doc?.images?.length > 0 && doc?.images[0]?.image != undefined) {
    displayImage = doc?.images[0]?.image
  } else {
    displayImage = undefined
  }

  const [price, setPrice] = useState<any>({})

  useEffect(() => {
    // setPrice(priceFromJSON(priceJSON))
    setPrice({ currency: 'Rs.' })
  }, [priceJSON])

  return (
    <Link href={href} className={[classes.card, className].filter(Boolean).join(' ')}>
      <div className={classes.mediaWrapper}>
        {/* Sale Tag */}
        {doc.compareAtPrice && doc.compareAtPrice != doc.price && (
          <div className={classes.saleTag}>Sale</div>
        )}
        {/* Image */}
        {!displayImage && <div className={classes.placeholder}>No image</div>}
        {displayImage && typeof displayImage !== 'string' && (
          <Media imgClassName={classes.image} resource={displayImage} fill />
        )}
      </div>

      {/* Title and Prices */}
      <div className={classes.content}>
        {titleToUse && <h4 className={classes.title}>{titleToUse}</h4>}

        <div className={classes.prices}>
          {/* Original Price with Strikethrough */}
          {doc.compareAtPrice && doc.compareAtPrice != doc.price && doc.compareAtPrice > 0 && (
            <span className={classes.originalPrice}>
              {price?.currency}
              {doc?.compareAtPrice?.toFixed(2)}
            </span>
          )}

          {/* Current Price */}
          <span className={classes.currentPrice}>
            {price?.currency}
            {doc?.price?.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  )
}
