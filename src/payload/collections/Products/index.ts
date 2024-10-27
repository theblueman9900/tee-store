import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { Archive } from '../../blocks/ArchiveBlock'
import { CallToAction } from '../../blocks/CallToAction'
import { Content } from '../../blocks/Content'
import { MediaBlock } from '../../blocks/MediaBlock'
import { slugField } from '../../fields/slug'
import { populateArchiveBlock } from '../../hooks/populateArchiveBlock'
import { checkUserPurchases } from './access/checkUserPurchases'
import { deleteProductFromCarts } from './hooks/deleteProductFromCarts'
import { revalidateProduct } from './hooks/revalidateProduct'
import { ProductSelect } from './ui/ProductSelect'

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', '_status'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/products/${doc.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  hooks: {
    beforeChange: [],
    afterChange: [revalidateProduct],
    afterRead: [populateArchiveBlock],
    afterDelete: [deleteProductFromCarts],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      label: 'Price',
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      label: 'Compare at Price',
      name: 'compareAtPrice',
      type: 'number',
    },
    {
      name: 'variants',
      label: 'Variants',
      type: 'array',
      fields: [
        {
          name: 'size',
          label: 'Size',
          type: 'relationship',
          relationTo: 'sizes', // Reference to the sizes collection
          required: true,
        },
        {
          name: 'color',
          label: 'Color',
          type: 'relationship',
          relationTo: 'colors', // Reference to the colors collection
          required: true,
        },
        {
          name: 'price',
          label: 'Price',
          type: 'number',
          required: true,
        },
        {
          label: 'Compare at Price',
          name: 'compareAtPrice',
          type: 'number',
        },
        {
          name: 'sku',
          label: 'SKU',
          type: 'text',
          required: true,
        },
        {
          name: 'stock',
          label: 'Stock',
          type: 'number',
        },
      ],
    },
    {
      name: 'publishedOn',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive],
            },
          ],
        },
        {
          label: 'Product Details',
          fields: [
            {
              name: 'priceJSON',
              label: 'Price JSON',
              type: 'textarea',
              admin: {
                // readOnly: true,
                // hidden: true,
                // rows: 10,
              },
            },
            {
              name: 'enablePaywall',
              label: 'Enable Paywall',
              type: 'checkbox',
            },
            {
              name: 'paywall',
              label: 'Paywall',
              type: 'blocks',
              access: {
                read: checkUserPurchases,
              },
              blocks: [CallToAction, Content, MediaBlock, Archive],
            },
          ],
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
    },
    slugField(),
    {
      name: 'skipSync',
      label: 'Skip Sync',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        readOnly: true,
        hidden: true,
      },
    },
  ],
}

export default Products
