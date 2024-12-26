import React, { cache } from 'react'
import { draftMode } from 'next/headers'
import type { Page as PageType } from '@/payload-types'
import { Category, Page } from '@/payload-types'
import { fetchDoc } from '@/api/fetchDoc'
import { fetchDocs } from '@/api/fetchDocs'
import { Blocks } from '@/components/Blocks'
import { Gutter } from '@/components/Gutter'
import { HR } from '@/components/HR'
import Filters from './Filters'
import configPromise from '@payload-config'
import classes from './index.module.scss'
import PageClient from './page.client'
import { getPayload } from 'payload'

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

const queryAllCategoriesg = cache(async () => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'categories',
    draft,
    limit: 1000,
    pagination: false,
    overrideAccess: draft,
  })

  return result.docs || null
})
const Products = async () => {
  const { isEnabled: isDraftMode } = await draftMode()

  let page: PageType | null = null
  let categories: Category[] | null = null

  page = await queryPageBySlug({
    slug: 'products',
  })
  categories = await queryAllCategoriesg()
  return (
    <div className={classes.container}>
      <PageClient />
      <Gutter className={classes.products}>
        {categories && <Filters categories={categories} />}
        {page?.layout && <Blocks blocks={page?.layout} disableTopPadding={true} />}
      </Gutter>
      <HR />
    </div>
  )
}

export default Products
