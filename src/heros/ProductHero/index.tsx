import { formatDateTime } from 'src/utilities/formatDateTime'
import React, { Suspense, useState } from 'react'

import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'
import { Gutter } from '@payloadcms/ui'
import classes from './index.module.scss'
import ProductImages from '@/components/ProductImages'
import Add from '@/components/Add'
import Reviews from '@/components/Recviews'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const { id, title, categories, images, price, description, compareAtPrice, layout, variants } =
    product

  return (
    <Gutter className={classes.productHero}>
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
        {/* IMG */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
          <ProductImages items={images} />
        </div>
        {/* TEXTS */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl font-medium">{product.title}</h1>
          <p className="text-gray-500">{product.description}</p>
          <div className="h-[2px] bg-gray-100" />
          {product.price === product.compareAtPrice ? (
            <h2 className="font-medium text-2xl">Rs.{product.price}</h2>
          ) : (
            <div className="flex items-center gap-4">
              <h3 className="text-xl text-gray-500 line-through">Rs. {product?.compareAtPrice}</h3>
              <h2 className="font-medium text-2xl">Rs. {product.price}</h2>
            </div>
          )}
          <div className="h-[2px] bg-gray-100" />
          <Add
            productId={id!}
            variantId="00000000-0000-0000-0000-000000000000"
            stockNumber={9999}
            product={product}
          />
          <div className="h-[2px] bg-gray-100" />
          {/* REVIEWS */}
          {/* <h1 className="text-2xl">User Reviews</h1> */}
          <Suspense fallback="Loading...">{/* <Reviews productId={id!} /> */}</Suspense>
          {/* <div className="h-[2px] bg-gray-100" /> */}
        </div>
      </div>
    </Gutter>
  )
}
