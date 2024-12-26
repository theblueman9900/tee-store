import React, { Fragment } from 'react'

import { Page } from '@/payload-types'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { RelatedProducts, RelatedProductsProps } from '@/blocks/RelatedProducts/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { BackgroundColor } from '../BackgroundColor'
import { VerticalPadding } from '../VerticalPadding'
import { toKebabCase } from '@/utilities/toKebabCase'

const blockComponents = {
  cta: CallToActionBlock,
  content: ContentBlock,
  mediaBlock: MediaBlock,
  archive: ArchiveBlock,
  relatedProducts: RelatedProducts,
}

export const Blocks: React.FC<{
  blocks: (Page['layout'][0] | RelatedProductsProps)[]
  disableTopPadding?: boolean
  disableBottomPadding?: boolean
}> = (props) => {
  const { disableTopPadding, disableBottomPadding, blocks } = props
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0
  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { id, blockName, blockType } = block
          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]
            // the cta block is containerized, so we don't consider it to be inverted at the block-level
            const blockIsInverted =
              'invertBackground' in block && blockType !== 'cta' ? block?.invertBackground : false
            const prevBlock = blocks[index - 1]

            const prevBlockInverted =
              prevBlock && 'invertBackground' in prevBlock && prevBlock?.invertBackground

            const isPrevSame = Boolean(blockIsInverted) === Boolean(prevBlockInverted)

            let paddingTop: any = 'large'
            let paddingBottom: any = 'large'

            if (prevBlock && isPrevSame) {
              paddingTop = 'none'
            }

            if (index === blocks.length - 1) {
              paddingBottom = 'large'
            }

            if (disableTopPadding && index === 0) {
              paddingTop = 'none'
            }

            if (disableBottomPadding && index === 0) {
              paddingBottom = 'none'
            }

            if (Block) {
              return (
                <VerticalPadding top={paddingTop} bottom={paddingBottom} key={index}>
                  {((blockName !== null && blockName !== undefined) ||
                    (id !== null && id !== undefined)) && (
                    <Block
                      id={blockName ? toKebabCase(blockName) : toKebabCase(id!)} // Need to handel if there is no blockName
                      {...block}
                    />
                  )}
                </VerticalPadding>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
