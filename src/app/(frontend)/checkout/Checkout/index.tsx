'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Order } from '@/payload-types'
import { Button } from '@/components/Button'
import { Message } from '@/components/Message'
import { priceFromJSON } from '@/components/Price'
import { useAuth } from '@/providers/Auth'
import { useCart } from '@/providers/Cart'

const CheckoutPage = ({ _cartTotal }) => {
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState<string>('')
  const emailRef = useRef(null)

  const [name, setName] = useState<string>('')
  const nameRef = useRef(null)

  const [phone, setPhone] = useState<string>('')
  const phoneRef = useRef(null)

  const [street, setStreet] = useState<string>('')
  const streetRef = useRef(null)

  const [city, setCity] = useState<string>('')
  const cityRef = useRef(null)

  const [state, setState] = useState<string>('')
  const stateRef = useRef(null)

  const [postalCode, setPostalCode] = useState<string>('')
  const postalCodeRef = useRef(null)

  const [country, setCountry] = useState<string>('')
  const countryRef = useRef(null)

  const router = useRouter()
  const { cart, cartTotal } = useCart()
  const { user } = useAuth()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (
      !user ||
      !cart ||
      name === null ||
      email === null ||
      phone === null ||
      street === null ||
      city === null ||
      state === null ||
      postalCode === null ||
      country === null
    )
      return
    setIsLoading(true)
    const request = JSON.stringify({
      orderedBy: user?.id,
      total: cartTotal.raw,
      items: (cart?.items || [])?.map(({ product, quantity, variant }) => ({
        product: typeof product === 'string' ? product : product?.id,
        quantity,
        variant,
        price: variant?.price
          ? typeof variant === 'object'
            ? variant.price
            : undefined
          : typeof product === 'object'
            ? typeof product === 'object' && product?.price
            : undefined,
      })),
      address: {
        user: user?.id,
        name: name,
        phone: phone,
        email: email,
        street: street,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
        isDefault: false,
      },
    })

    // Before redirecting to the order confirmation page, we need to create the order in Payload
    // Cannot clear the cart yet because if you clear the cart while in the checkout
    // you will be redirected to the `/cart` page before this redirect happens
    // Instead, we clear the cart in an `afterChange` hook on the `orders` collection in Payload
    try {
      const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderedBy: user?.id,
          total: cartTotal.raw,
          items: (cart?.items || [])?.map(({ product, quantity, variant }) => ({
            product: typeof product === 'string' ? product : product?.id,
            quantity,
            variant,
            price: variant?.price
              ? typeof variant === 'object'
                ? variant.price
                : undefined
              : typeof product === 'object' && product?.price
                ? product.price
                : undefined,
          })),
          address: {
            user: user?.id,
            name: name,
            phone: phone,
            email: email,
            street: street,
            city: city,
            state: state,
            postalCode: postalCode,
            country: country,
            isDefault: false,
          },
        }),
      })

      if (!orderReq.ok) throw new Error(orderReq.statusText || 'Something went wrong.')

      const {
        error: errorFromRes,
        doc,
      }: {
        message?: string
        error?: string
        doc: Order
      } = await orderReq.json()

      if (errorFromRes) throw new Error(errorFromRes)

      router.push(`/order-confirmation?order_id=${doc.id}`)
    } catch (err) {
      // don't throw an error if the order was not created successfully
      // this is because payment _did_ in fact go through, and we don't want the user to pay twice
      console.error(err.message) // eslint-disable-line no-console
      router.push(`/order-confirmation?error=${encodeURIComponent(err.message)}`)
    }
  }

  return (
    <div
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
      <div
        style={{
          borderBottom: '1px solid var(--theme-elevation-200)',
          paddingBottom: '20px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
          }}
        >
          <span>Order Total</span>
          <span>{cartTotal?.formatted}</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '10px 0',
          }}
        >
          <span>Shipping</span>
          <span>₹0.00</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
          }}
        >
          <span>Total due</span>
          <span>{cartTotal?.formatted}</span>
        </div>
      </div>

      <>
        <div style={{ marginTop: '20px' }}>
          <label>Email</label>
          <input
            ref={emailRef}
            type="email"
            value={email ?? ''}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid var(--theme-elevation-900)',
              borderRadius: '5px',
            }}
          />
          <>
            <label>Shipping Address</label>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <input
                ref={nameRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                autoComplete="name"
                style={{
                  width: '49%',
                  padding: '10px',
                  marginBottom: '10px',
                  border: '1px solid var(--theme-elevation-900)',
                  borderRadius: '5px',
                }}
              />
              <input
                ref={phoneRef}
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                required
                autoComplete="tel"
                style={{
                  width: '49%',
                  padding: '10px',
                  marginBottom: '10px',
                  border: '1px solid var(--theme-elevation-900)',
                  borderRadius: '5px',
                }}
              />
            </div>
            <input
              ref={streetRef}
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Address"
              required
              autoComplete="address-line1"
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid var(--theme-elevation-900)',
                borderRadius: '5px',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <input
                ref={cityRef}
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                required
                autoComplete="address-level2"
                style={{
                  width: '49%',
                  padding: '10px',
                  marginBottom: '10px',
                  border: '1px solid var(--theme-elevation-900)',
                  borderRadius: '5px',
                }}
              />
              <input
                ref={stateRef}
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
                required
                autoComplete="address-level1"
                style={{
                  width: '49%',
                  padding: '10px',
                  marginBottom: '10px',
                  border: '1px solid var(--theme-elevation-900)',
                  borderRadius: '5px',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <input
                ref={postalCodeRef}
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="ZIP Code"
                required
                autoComplete="postal-code"
                style={{
                  width: '49%',
                  padding: '10px',
                  marginBottom: '10px',
                  border: '1px solid var(--theme-elevation-900)',
                  borderRadius: '5px',
                }}
              />
              <input
                ref={countryRef}
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                required
                autoComplete="country"
                style={{
                  width: '49%',
                  padding: '10px',
                  marginBottom: '10px',
                  border: '1px solid var(--theme-elevation-900)',
                  borderRadius: '5px',
                }}
              />
            </div>
          </>
        </div>

        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: `var(--theme-elevation-900)`,
            color: `var(--theme-elevation-50)`,
            border: 'none',
            padding: '15px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '20px',
            width: '100%',
          }}
        >
          Cash On Delivery (COD)
        </button>
      </>
    </div>
  )
}

export default CheckoutPage
