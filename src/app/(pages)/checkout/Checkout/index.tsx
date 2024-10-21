import { useState } from 'react';

const CheckoutPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    });

    const result = await response.json();
    if (result.success) {
      console.log('Payment successful');
    } else {
      console.error('Payment failed');
    }
  };

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <h2>Pay Powdur</h2>
      <h3>$134.00</h3>

      <div style={{
        borderBottom: '1px solid #ddd',
        paddingBottom: '20px',
        marginBottom: '20px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '10px 0',
        }}>
          <span>Pure set</span>
          <span>$65.00</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '10px 0',
        }}>
          <span>Pure glow cream (x2)</span>
          <span>$64.00</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '10px 0',
        }}>
          <span>Shipping</span>
          <span>$5.00</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontWeight: 'bold',
        }}>
          <span>Total due</span>
          <span>$134.00</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: '20px' }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
            }}
          />

          <label>Shipping Address</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
            }}
          />
        </div>

        <div style={{ marginTop: '20px' }}>
          <label>Card Information</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
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
            onChange={(e) => setExpiry(e.target.value)}
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
            onChange={(e) => setCvc(e.target.value)}
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
        </div>

        <button type="submit" style={{
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          padding: '15px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '20px',
        }}>
          Pay $134.00
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
