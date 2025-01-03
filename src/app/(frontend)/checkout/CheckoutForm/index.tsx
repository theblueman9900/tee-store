'use client'

import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { Order } from '@/payload-types'
import { Button } from '@/components/Button'
import { Message } from '@/components/Message'
import { priceFromJSON } from '@/components/Price'
import { useCart } from '@/providers/Cart'

import classes from './index.module.scss'

export const CheckoutForm: React.FC<{}> = () => {
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const { cart, cartTotal } = useCart()
  return (
    <form className={classes.form}>
      {error && <Message error={error} />}
      <div className={classes.actions}>
        <Button label="Back to cart" href="/cart" appearance="secondary" />
        <Button label={isLoading ? 'Loading...' : 'Checkout'} type="submit" appearance="primary" />
      </div>
    </form>
  )
}

export default CheckoutForm
