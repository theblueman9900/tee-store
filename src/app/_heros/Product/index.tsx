import React, { Fragment, Suspense } from 'react'

import { Category, Media as TypeMedia, Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import { Price } from '../../_components/Price'

import classes from './index.module.scss'
import ProductImages from '../../_components/ProductImages'
import CustomizeProducts from '../../_components/CustomizeProducts'
import Add from '../../_components/Add'
import Reviews from '../../_components/Recviews'
import { Blocks } from '../../_components/Blocks'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const {
    id,
    title,
    categories,
    images,
    price,
    description,
    compareAtPrice,
    layout,
    meta: { image: metaImage } = {},
  } = product

  return (
    <Gutter className={classes.productHero}>
      <div className={classes.heroContainer}>
        {/* IMG */}
        <div className={classes.heroImageContainer}>
          <ProductImages items={images} />
        </div>
        {/* TEXTS */}
        <div className={classes.heroTextContainer}>
          <h1 className={classes.heroTitle}>{title}</h1>
          <p className={classes.heroDescription}>{description}</p>

          <div className={classes.heroDivider}></div>

          {!compareAtPrice || price === compareAtPrice ? (
            <h2 className={classes.heroPrice}>Rs. {price}</h2>
          ) : (
            <div className={classes.heroPriceContainer}>
              <h3 className={classes.heroComparePrice}>Rs. {compareAtPrice}</h3>
              <h2 className={classes.heroPrice}>Rs. {price}</h2>
            </div>
          )}

          <div className={classes.heroDivider}></div>

          <Add
            productId={id!}
            variantId="00000000-0000-0000-0000-000000000000"
            stockNumber={9999}
            product={product}
          />

          <div className={classes.heroDivider}></div>

          <Suspense fallback="Loading...">
            <Reviews productId={id!} />
          </Suspense>
        </div>
      </div>
    </Gutter>
  )
}
