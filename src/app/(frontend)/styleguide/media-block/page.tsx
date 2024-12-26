import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import staticImage from '../../../../../public/website-template-OG.webp'
import { Gutter } from '@/components/Gutter'
import { VerticalPadding } from '@/components/VerticalPadding'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

export default async function MediaBlockPage() {
  return (
    <Fragment>
      <Gutter>
        <p>
          <Link href="/styleguide">Styleguide</Link>
          {' / '}
          <span>Media Block</span>
        </p>
        <h1>Media Block</h1>
      </Gutter>
      <VerticalPadding bottom="large" top="none">
        <MediaBlock blockType="mediaBlock" media="" staticImage={staticImage} />
        <br />
        <br />
        <MediaBlock
          blockType="mediaBlock"
          media=""
          staticImage={staticImage}
        />
      </VerticalPadding>
    </Fragment>
  )
}

export const metadata: Metadata = {
  title: 'Media Block',
  description: 'Styleguide for media block.',
  openGraph: mergeOpenGraph({
    title: 'Media Block',
    url: '/styleguide/media-block',
  }),
}
