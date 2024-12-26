import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'
import type { Product } from '@/payload-types'
import { ProductCard } from '@/components/Product'

export type RelatedProductsProps = {
  id?: string
  blockType?: 'relatedProducts'
  blockName?: string
  className?: string
  docs?: Product[]
  introContent?: any
}

export const RelatedProducts: React.FC<RelatedProductsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('container', className)}>
      {introContent && <RichText content={introContent} enableGutter={false} />}


      <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {docs?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-3" key={index}>
                  <ProductCard className="h-full" doc={result} relationTo="products" />
                </div>
              )
            }

            return null
          })}
        </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <ProductCard key={index} doc={doc} relationTo="products" showCategories />
        })}
      </div> */}
    </div>
  )
}
