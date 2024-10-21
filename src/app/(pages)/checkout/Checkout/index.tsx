import { useState } from 'react'

const CheckoutPage = ({ cartTotal }) => {
  console.log('🚀 ~ CheckoutPage ~ cartTotal:', cartTotal)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [address, setAddress] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    // Call your custom API to process the payment here
    const response = await fetch('/api/process-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        address,
        cardNumber,
        expiry,
        cvc,
        amount: 13400, // Amount in smallest currency unit (e.g., cents)
      }),
    })

    const result = await response.json()
    if (result.success) {
      console.log('Payment successful')
    } else {
      console.error('Payment failed')
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

      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: '20px' }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
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
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Name"
                required
                style={{
                  width: '49%',
                  padding: '10px',
                  marginBottom: '10px',
                  border: '1px solid var(--theme-elevation-900)',
                  borderRadius: '5px',
                }}
              />
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Phone"
                required
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
              type="text"
              value={street}
              onChange={e => setStreet(e.target.value)}
              placeholder="Address"
              required
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
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="City"
                required
                style={{
                  width: '49%',
                  padding: '10px',
                  marginBottom: '10px',
                  border: '1px solid var(--theme-elevation-900)',
                  borderRadius: '5px',
                }}
              />
              <input
                type="text"
                value={state}
                onChange={e => setState(e.target.value)}
                placeholder="State"
                required
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
                type="text"
                value={postalCode}
                onChange={e => setPostalCode(e.target.value)}
                placeholder="ZIP Code"
                required
                style={{
                  width: '49%',
                  padding: '10px',
                  marginBottom: '10px',
                  border: '1px solid var(--theme-elevation-900)',
                  borderRadius: '5px',
                }}
              />
              <input
                type="text"
                value={country}
                onChange={e => setCountry(e.target.value)}
                placeholder="Country"
                required
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
        {/* Not needed For Now */}
        {/* <div style={{ marginTop: '20px' }}>
          <label>Card Information</label>
          <input
            type="text"
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value)}
            placeholder="Card Number"
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
            }}
          />
          <input
            type="text"
            value={expiry}
            onChange={e => setExpiry(e.target.value)}
            placeholder="MM / YY"
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
            }}
          />
          <input
            type="text"
            value={cvc}
            onChange={e => setCvc(e.target.value)}
            placeholder="CVC"
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
            }}
          />
        </div> */}

        <button
          type="submit"
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
      </form>
    </div>
  )
}

export default CheckoutPage
