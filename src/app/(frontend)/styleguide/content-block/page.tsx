import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { Gutter } from '@/components/Gutter'
import { VerticalPadding } from '@/components/VerticalPadding'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { ContentBlock } from '@/blocks/Content/Component'

export default async function ContentBlockPage() {
  return (
    <Fragment>
      <Gutter>
        <p>
          <Link href="/styleguide">Styleguide</Link>
          {' / '}
          <span>Content Block</span>
        </p>
        <h1>Content Block</h1>
      </Gutter>
      <VerticalPadding bottom="large" top="none">
        <ContentBlock
          blockType="content"
          columns={[
            {
              size: 'full',
            },
          ]}
        />
      </VerticalPadding>
    </Fragment>
  )
}

export const metadata: Metadata = {
  title: 'Content Block',
  description: 'Styleguide for the Content Block',
  openGraph: mergeOpenGraph({
    title: 'Content Block',
    url: '/styleguide/content-block',
  }),
}
