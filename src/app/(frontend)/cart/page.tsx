import React, { Fragment } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generateMeta } from '@/utilities/generateMeta'
import { CartPage } from './CartPage'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import classes from './index.module.scss'
import { Gutter } from '@/components/Gutter'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Page } from '@/payload-types'

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Cart() {
  return (
    <div className={classes.container}>
      <Gutter>
        <h3>Cart</h3>
        <CartPage />
      </Gutter>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `The Blue Man Search`,
  }
}
