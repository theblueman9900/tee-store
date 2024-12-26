'use client'

import React, { Fragment, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Settings } from '@/payload-types'
import { Button } from '@/components/Button'
import { LoadingShimmer } from '@/components/LoadingShimmer'
import { useAuth } from '@/providers/Auth'
import { useCart } from '@/providers/Cart'
import { useTheme } from '@/providers/Theme'
import { cssVariables } from '../../../../cssVariables'
import Checkout from '../Checkout'
import { CheckoutForm } from '../CheckoutForm'
import { CheckoutItem } from '../CheckoutItem'

import classes from './index.module.scss'

const apiKey = `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`

export const CheckoutPage: React.FC<{
  settings: Settings
}> = (props) => {
  const {
    settings: { productsPage },
  } = props

  const { user } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const hasMadePaymentIntent = React.useRef(false)
  const { theme } = useTheme()

  const { cart, cartIsEmpty, cartTotal } = useCart()

  useEffect(() => {
    if (user !== null && cartIsEmpty) {
      router.push('/cart')
    }
  }, [router, user, cartIsEmpty])

  useEffect(() => {
    if (user && cart && hasMadePaymentIntent.current === false) {
      hasMadePaymentIntent.current = true
    }
  }, [cart, user])

  if (!user) return null

  return (
    <Fragment>
      {cartIsEmpty && (
        <div>
          {'Your '}
          <Link href="/cart">cart</Link>
          {' is empty.'}
          {typeof productsPage === 'object' && productsPage?.slug && (
            <Fragment>
              <Link href={`/${productsPage.slug}`}>Continue shopping?</Link>
            </Fragment>
          )}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {!cartIsEmpty && (
          <div
            style={{
              flex: '1 1 45%',
              minWidth: '300px', // Ensures a minimum width on smaller screens
              marginBottom: '20px',
            }}
          >
            <h3 className={classes.payment}>Order Items</h3>
            <div
              className={classes.items}
              style={{
                maxWidth: '900px',
                margin: '0 auto',
                padding: '20px',
                border: '1px solid var(--theme-elevation-300)',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div className={classes.header}>
                <p>Products</p>
                <div className={classes.headerItemDetails}>
                  <p></p>
                  <p className={classes.quantity}>Quantity</p>
                </div>
                <p className={classes.subtotal}>Subtotal</p>
              </div>

              <ul>
                {cart?.items?.map((item, index) => {
                  if (typeof item.product === 'object' && item.product) {
                    const {
                      quantity,
                      product,
                      variant,
                      product: { title, meta },
                    } = item

                    if (!quantity) return null

                    const metaImage = meta?.image

                    return (
                      <Fragment key={index}>
                        <CheckoutItem
                          product={product}
                          title={title}
                          metaImage={metaImage}
                          quantity={quantity}
                          index={index}
                          variant={variant}
                        />
                      </Fragment>
                    )
                  }
                  return null
                })}
                <div className={classes.orderTotal}>
                  <p>Order Total</p>
                  <p>{cartTotal.formatted}</p>
                </div>
              </ul>
            </div>
          </div>
        )}

        {!cartIsEmpty && (
          <div
            style={{
              flex: '1 1 45%',
              minWidth: '300px', // Minimum width on mobile
              marginBottom: '20px',
            }}
          >
            <h3 className={classes.payment}>Payment Details</h3>
            <Checkout _cartTotal={cartTotal} />
          </div>
        )}
      </div>
    </Fragment>
  )
}
