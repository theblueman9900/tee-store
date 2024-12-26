
export const loginAfterCreate: any = async ({
  doc,
  req,
  req: { payload, body = { email: undefined, password: undefined }, res },
  operation,
}) => {
  if (operation === 'create' && !req) {
    const { email, password } = body

    if (email && password) {
      const { user, token } = await payload.login({
        collection: 'users',
        data: { email, password },
        req,
        res,
      })

      return {
        ...doc,
        token,
        user,
      }
    }
  }

  return doc
}
