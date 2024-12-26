'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Category, Post, Product } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>
export type CardProductData = Pick<
  Product,
  'slug' | 'categories' | 'meta' | 'title' | 'price' | 'description' | 'compareAtPrice'
>
export type CardCategoryData = Pick<Category, 'title' | 'media'>

export const CategoryCard: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardCategoryData
  relationTo?: 'posts' | 'products' | 'categories'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, title: titleFromProps } = props

  const { media, title } = doc || {}
  const metaImage = media

  const titleToUse = titleFromProps || title
  const href = `/${relationTo}/${title}`

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full ">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
      </div>
      <div className="p-4">
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
      </div>
    </article>
  )
}
