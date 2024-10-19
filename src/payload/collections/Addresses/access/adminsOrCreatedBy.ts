import type { Access } from 'payload/config'

import { checkRole } from '../../Users/checkRole'

export const adminsOrCreatedBy: Access = ({ req: { user } }) => {
  if (checkRole(['admin'], user)) {
    return true
  }

  return {
    user: {
      equals: user.id, // Only show addresses that belong to the logged-in user
    },
  }
}
