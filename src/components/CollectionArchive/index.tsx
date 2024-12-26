'use client'

import { cn } from 'src/utilities/cn'
import React, { useEffect } from 'react'
import qs from 'qs'
import type { Post, Product, ArchiveBlock as ArchiveBlockProps, Category } from '@/payload-types'
import { Card, CardCategoryData, CardPostData, CardProductData } from '@/components/Card'
import { ProductCard } from '@/components/Product'
import { useFilter } from '@/providers/Filter'
import { useState } from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'
import classes from './index.module.scss'
import { Fragment } from 'react'
import { Gutter } from '../Gutter'
import { PageRange } from '../PageRange'
import { Pagination } from '../PaginationInternal'
import { Products } from '@/collections/Products'
import { CategoryCard } from '../CategoryCard'
import Categories from '../Categories'
type Result = {
  totalDocs: number
  docs: Product[]
  page: number
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
  nextPage: number
  prevPage: number
}
export type Props = {
  posts?: CardPostData[]
  products?: CardProductData[]
  categoryList?: CardCategoryData[]
  className?: string
  relationTo?: 'products' | 'posts' | 'categories'
  populateBy?: 'collection' | 'selection'
  showPageRange?: boolean
  onResultChange?: (result: Result) => void // eslint-disable-line no-unused-vars
  limit?: number
  populatedDocs?: ArchiveBlockProps['populatedDocs']
  populatedDocsTotal?: ArchiveBlockProps['populatedDocsTotal']
  categories?: ArchiveBlockProps['categories']
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { categoryFilters, setCategoryFilters, sort, setSort } = useFilter()
  const {
    className,
    relationTo,
    showPageRange,
    onResultChange,
    limit = 10,
    populatedDocs,
    populatedDocsTotal,
  } = props
  const { posts, products, categoryList } = props

  const [results, setResults] = useState<Result>({
    totalDocs: typeof populatedDocsTotal === 'number' ? populatedDocsTotal : 0,
    docs: (populatedDocs?.map((doc) => doc.value) || []) as [],
    page: 1,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: 1,
    nextPage: 1,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasHydrated = useRef(false)
  const [page, setPage] = useState(1)

  const scrollToRef = useCallback(() => {
    const { current } = scrollRef
    if (current) {
      current.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [])

  useEffect(() => {
    if (!isLoading && typeof results.page !== 'undefined') {
      // scrollToRef()
    }
  }, [isLoading, scrollToRef, results])

  useEffect(() => {
    // hydrate the block with fresh content after first render
    // don't show loader unless the request takes longer than x ms
    // and don't show it during initial hydration
    const timer: NodeJS.Timeout = setTimeout(() => {
      if (hasHydrated) {
        setIsLoading(true)
      }
    }, 500)

    const searchQuery = qs.stringify(
      {
        sort,
        where: {
          ...(categoryFilters && categoryFilters?.length > 0
            ? {
                categories: {
                  in:
                    typeof categoryFilters === 'string'
                      ? [categoryFilters]
                      : categoryFilters.map((cat: string) => cat).join(','),
                },
              }
            : {}),
        },
        limit,
        page,
        depth: 1,
      },
      { encode: false },
    )

    const makeRequest = async () => {
      try {
        const req = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${relationTo}?${searchQuery}`,
        )
        const json = await req.json()
        clearTimeout(timer)
        hasHydrated.current = true

        const { docs } = json as { docs: Product[] }

        if (docs && Array.isArray(docs)) {
          setResults(json)
          setIsLoading(false)
          if (typeof onResultChange === 'function') {
            onResultChange(json)
          }
        }
      } catch (err) {
        console.warn(err) // eslint-disable-line no-console
        setIsLoading(false)
        setError(`Unable to load "${relationTo} archive" data at this time.`)
      }
    }

    makeRequest()

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [page, categoryFilters, relationTo, onResultChange, sort, limit])
  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <Card className="h-full" doc={result} relationTo="posts" showCategories />
                </div>
              )
            }

            return null
          })}
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {products?.map((result, index) => {
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
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {categoryList?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-3" key={index}>
                  <CategoryCard className="h-full" doc={result} relationTo="products" />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>

      <div className={[classes.collectionArchive, className].filter(Boolean).join(' ')}>
        <div ref={scrollRef} className={classes.scrollRef} />
        {!isLoading && error && <div>{error}</div>}
        <Fragment>
          {showPageRange !== false && (
            // <Gutter>
            <div className={classes.pageRange}>
              <PageRange
                totalDocs={results.totalDocs}
                currentPage={results.page}
                collection={relationTo}
                limit={limit}
              />
            </div>
            // </Gutter>
          )}
          {/* <Gutter> */}
          {relationTo === 'products' && results.totalDocs > 0 && (
            <div className={classes.grid}>
              {results.docs?.map((result, index) => {
                return <ProductCard key={index} relationTo="products" doc={result} showCategories />
              })}
            </div>
          )}
          {relationTo === 'posts' && results.totalDocs > 0 && (
            <div className={classes.grid}>
              {results.docs?.map((result, index) => {
                return <Card key={index} relationTo="posts" doc={result} showCategories />
              })}
            </div>
          )}
          {relationTo === 'categories' && results.totalDocs > 0 && (
            <Categories categories={results.docs as Category[]} />
            // <div className={classes.grid}>
            //   {results.docs?.map((result, index) => {
            //     return (
            //       <CategoryCard key={index} relationTo="categories" doc={result} showCategories />
            //     )
            //   })}
            // </div>
          )}

          {results.totalPages > 1 && (
            <Pagination
              className={classes.pagination}
              page={results.page}
              totalPages={results.totalPages}
              onClick={setPage}
            />
          )}
          {/* </Gutter> */}
        </Fragment>
      </div>
    </div>
  )
}
