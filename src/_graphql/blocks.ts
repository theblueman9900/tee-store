import { PRODUCT_CATEGORIES } from './categories'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'

export const CALL_TO_ACTION = `
...on CallToActionBlock {
  id
  blockType
  blockName
  richText
  links {
    link ${LINK_FIELDS()}
  }
}
`

export const CONTENT = `
...on ContentBlock {
  id
  blockType
  blockName
  columns {
    size
    richText
    enableLink
    link ${LINK_FIELDS()}
  }
}
`

export const MEDIA_BLOCK = `
...on MediaBlock {
  id
  blockType
  blockName
  ${MEDIA}
}
`

export const ARCHIVE_BLOCK = `
...on ArchiveBlock {
  id
  blockType
  blockName
  populateBy
  relationTo
  ${PRODUCT_CATEGORIES}
  limit
  selectedDocs {
    relationTo
    value {
      ...on Product {
        id
        slug
        title
      }
    }
  }
}
`
