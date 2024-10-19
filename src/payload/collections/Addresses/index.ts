import type { CollectionConfig } from 'payload/types'
import { admins } from '../../access/admins'
import { adminsOrLoggedIn } from '../../access/adminsOrLoggedIn'
import { adminsOrCreatedBy } from './access/adminsOrCreatedBy'

export const Addresses: CollectionConfig = {
  slug: 'addresses',
  labels: {
    singular: 'Address',
    plural: 'Addresses',
  },
  admin: {
    useAsTitle: 'street', // Display the street address in the admin panel
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'street',
      type: 'text',
      label: 'Street Address',
      required: true,
    },
    {
      name: 'city',
      type: 'text',
      label: 'City',
      required: true,
    },
    {
      name: 'state',
      type: 'text',
      label: 'State/Province',
      required: true,
    },
    {
      name: 'postalCode',
      type: 'text',
      label: 'Postal Code',
      required: true,
    },
    {
      name: 'country',
      type: 'text',
      label: 'Country',
      required: true,
    },
    {
      name: 'isDefault',
      type: 'checkbox',
      label: 'Default Address',
      defaultValue: false,
      admin: {
        description: 'Check if this is the default address for the user.',
      },
    },
  ],

  hooks: {
    beforeChange: [
      ({ req: { user }, data }) => {
        // Automatically assign the logged-in user as the owner of the address
        if (user) {
          data.user = user.id
        }
        return data
      },
    ],
  },

  access: {
    read: adminsOrCreatedBy,
    update: admins,
    create: adminsOrLoggedIn,
    delete: admins,
  },

  timestamps: true, // Automatically add createdAt and updatedAt timestamps
}
