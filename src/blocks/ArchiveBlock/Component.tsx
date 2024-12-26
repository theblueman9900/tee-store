import type { Post, ArchiveBlock as ArchiveBlockProps, Product, Category } from '@/payload-types'

import configPromise from '@payload-config'
import React from 'react'
import RichText from '@/components/RichText'
import { CollectionArchive } from '@/components/CollectionArchive'
import { getPayload } from 'payload'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    limit: limitFromProps,
    selectedDocs,
    introContent,
    id,
    relationTo,
    populateBy,
    populatedDocs,
    populatedDocsTotal,
    categories,
  } = props
  const limit = limitFromProps || 3

  let posts: Post[] = []
  let products: Product[] = []
  let allCategories: Category[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    if (relationTo === 'posts') {
      const fetchedPosts = await payload.find({
        collection: 'posts',
        depth: 1,
        limit,
        ...(flattenedCategories && flattenedCategories.length > 0
          ? {
              where: {
                categories: {
                  in: flattenedCategories,
                },
              },
            }
          : {}),
      })
      posts = fetchedPosts.docs
    } else if (relationTo === 'categories') {
      const fetchedCategories = await payload.find({
        collection: 'categories',
        depth: 1,
        limit,
      })
      allCategories = fetchedCategories.docs
    } else {
      const fetchedProducts = await payload.find({
        collection: 'products',
        depth: 1,
        limit,
        ...(flattenedCategories && flattenedCategories.length > 0
          ? {
              where: {
                categories: {
                  in: flattenedCategories,
                },
              },
            }
          : {}),
      })
      products = fetchedProducts.docs
    }
  } else {
    if (selectedDocs?.length) {
      if (relationTo === 'posts') {
        const filteredSelectedPosts = selectedDocs.map((post) => {
          if (typeof post.value === 'object') return post.value
        }) as Post[]

        posts = filteredSelectedPosts
      } else {
        const filteredSelectedProducts = selectedDocs.map((product) => {
          if (typeof product.value === 'object') return product.value
        }) as Product[]

        products = filteredSelectedProducts
      }
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ml-0 max-w-[48rem]" content={introContent} enableGutter={false} />
        </div>
      )}
      {populateBy && relationTo && (
        <CollectionArchive
          populateBy={populateBy}
          relationTo={relationTo}
          populatedDocs={populatedDocs}
          populatedDocsTotal={populatedDocsTotal}
          categories={categories}
          limit={limit}
        />
      )}
    </div>
  )
}
