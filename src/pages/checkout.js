import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PacketaDelivery from '../components/PacketaDelivery';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Image from 'next/image';

// Initialize Stripe (in a real app, use your Stripe publishable key from env variables)
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// Payment Form Component
function CheckoutForm({ onSubmit, cartTotal, deliveryMethod, setDeliveryMethod, selectedPacketaPoint, setPacketaPoint, isLoading }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Slovakia',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement('card').focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    // Create payment method
    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: billingInfo,
    });

    setProcessing(false);

    if (payload.error) {
      setError(payload.error);
    } else {
      setPaymentMethod(payload.paymentMethod);
      
      // In a real app, you would call your backend here to process the payment
      // For this demo, we'll just simulate a successful payment
      setTimeout(() => {
        onSubmit(billingInfo);
      }, 1000);
    }
  };

  // Only show billing address fields if home delivery is selected
  const showBillingAddress = deliveryMethod === 'home';

  // Display the proper Packeta logo for the delivery options
  const PacketaLogo = () => (
    <div className="flex-shrink-0 mr-3">
      <img 
        src="/images/logos/packeta-logo.png" 
        alt="Packeta Logo" 
        className="w-7 h-7 object-contain"
      />
    </div>
  );

  return paymentMethod ? (
    <div className="text-center py-6">
      <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
      </svg>
      <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
      <p className="text-gray-600 mb-4">Your order is being processed.</p>
      <div className="animate-pulse">Please wait, redirecting to your order confirmation...</div>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Delivery Method Selection */}
      <div className="mb-6 border p-4 rounded-md bg-gray-50">
        <h3 className="font-medium mb-4">Delivery Method</h3>
        
        <div className="space-y-3">
          <label className="flex items-start cursor-pointer">
            <input
              type="radio"
              name="deliveryMethod"
              value="home"
              checked={deliveryMethod === 'home'}
              onChange={() => setDeliveryMethod('home')}
              className="mt-1 mr-3"
            />
            <div className="flex items-start">
              <PacketaLogo />
              <div>
                <div className="font-medium">Packeta Home Delivery</div>
                <div className="text-sm text-gray-600">
                  Direct delivery to your address by Packeta courier (€3.99)
                </div>
              </div>
            </div>
          </label>
          
          <label className="flex items-start cursor-pointer">
            <input
              type="radio"
              name="deliveryMethod"
              value="packeta"
              checked={deliveryMethod === 'packeta'}
              onChange={() => setDeliveryMethod('packeta')}
              className="mt-1 mr-3"
            />
            <div className="flex items-start">
              <PacketaLogo />
              <div>
                <div className="font-medium">Packeta Pickup Point</div>
                <div className="text-sm text-gray-600">
                  Pick up from a Packeta location near you (€2.49)
                </div>
              </div>
            </div>
          </label>
        </div>
        
        {deliveryMethod === 'packeta' && (
          <div className="mt-4">
            <PacketaDelivery 
              onSelect={setPacketaPoint}
              selectedPoint={selectedPacketaPoint}
            />
            {!selectedPacketaPoint && (
              <p className="text-sm text-red-500 mt-2">
                Please select a Packeta pickup point to continue
              </p>
            )}
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Jane Doe"
          required
          autoComplete="name"
          value={billingInfo.name}
          onChange={(e) => {
            setBillingInfo({ ...billingInfo, name: e.target.value });
          }}
          className="input"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="jane.doe@example.com"
          required
          autoComplete="email"
          value={billingInfo.email}
          onChange={(e) => {
            setBillingInfo({ ...billingInfo, email: e.target.value });
          }}
          className="input"
        />
      </div>

      {showBillingAddress && (
        <>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="123 Main St"
              required
              autoComplete="street-address"
              value={billingInfo.address}
              onChange={(e) => {
                setBillingInfo({
                  ...billingInfo,
                  address: e.target.value,
                });
              }}
              className="input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                id="city"
                type="text"
                placeholder="Bratislava"
                required
                autoComplete="address-level2"
                value={billingInfo.city}
                onChange={(e) => {
                  setBillingInfo({
                    ...billingInfo,
                    city: e.target.value,
                  });
                }}
                className="input"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code
              </label>
              <input
                id="postalCode"
                type="text"
                placeholder="12345"
                required
                autoComplete="postal-code"
                value={billingInfo.postalCode}
                onChange={(e) => {
                  setBillingInfo({
                    ...billingInfo,
                    postalCode: e.target.value,
                  });
                }}
                className="input"
              />
            </div>
          </div>
        </>
      )}

      <div className="mb-4">
        <label htmlFor="card" className="block text-sm font-medium text-gray-700 mb-1">
          Card
        </label>
        <div className="border border-gray-300 rounded-md p-3 bg-white">
          <CardElement
            id="card"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
            onChange={(e) => {
              setError(e.error);
              setCardComplete(e.complete);
            }}
          />
        </div>
        {error && <div className="text-red-500 text-sm mt-2">{error.message}</div>}
      </div>

      <div className="border-t pt-6">
        <button
          type="submit"
          disabled={!stripe || processing || !cardComplete || (deliveryMethod === 'packeta' && !selectedPacketaPoint)}
          className="btn-primary w-full"
        >
          {processing ? 'Processing...' : `Pay €${cartTotal.toFixed(2)}`}
        </button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          By completing this purchase, you agree to our terms and conditions.
        </p>
      </div>
    </form>
  );
}

// Main Checkout Page Component
export default function Checkout() {
  const router = useRouter();
  const { cart, cartTotal, clearCart, selectedDeliveryMethod, selectedPacketaPoint, setDeliveryMethod, setPacketaPoint } = useCart();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Calculate delivery fee based on selected method
  const getDeliveryFee = () => {
    return selectedDeliveryMethod === 'home' ? 3.99 : 2.49;
  };
  
  const subTotal = cartTotal;
  const deliveryFee = getDeliveryFee();
  const total = subTotal + deliveryFee;
  
  useEffect(() => {
    // Redirect to home if cart is empty
    if (cart.length === 0) {
      router.push('/');
    }
    
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login?redirect=checkout');
    }
  }, [cart, isAuthenticated, router]);
  
  const handlePayment = async (billingInfo) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API endpoint to process payment
      // For demo purposes, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Log payment details (would be sent to server in a real app)
      console.log('Payment processed:', {
        amount: total,
        currency: 'EUR',
        deliveryMethod: selectedDeliveryMethod,
        packetaPoint: selectedPacketaPoint,
        items: cart,
        billing: billingInfo
      });
      
      // Clear cart after successful payment
      clearCart();
      
      // Redirect to success page
      router.push('/order-confirmation');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (cart.length === 0 || !isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Checkout | Plant Marketplace</title>
        <meta name="description" content="Complete your purchase of plants" />
      </Head>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Elements stripe={stripePromise}>
              <CheckoutForm 
                onSubmit={handlePayment} 
                cartTotal={total} 
                deliveryMethod={selectedDeliveryMethod}
                setDeliveryMethod={setDeliveryMethod}
                selectedPacketaPoint={selectedPacketaPoint}
                setPacketaPoint={setPacketaPoint}
                isLoading={isLoading} 
              />
            </Elements>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="divide-y divide-gray-200">
                {cart.map(item => (
                  <div key={item.id} className="py-4 flex">
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-sm text-gray-500">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">€{item.price.toFixed(2)}</p>
                      {item.supportsPacketa && selectedDeliveryMethod === 'packeta' && (
                        <p className="text-xs text-green-600 mt-1">Supports Packeta delivery</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">€{subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">
                    {selectedDeliveryMethod === 'home' ? 'Packeta Home Delivery' : 'Packeta Pickup'}
                  </span>
                  <span className="text-gray-900 font-medium">€{deliveryFee.toFixed(2)}</span>
                </div>
                {selectedDeliveryMethod === 'packeta' && selectedPacketaPoint && (
                  <div className="py-2 text-sm text-gray-600">
                    <p className="font-medium">Pickup at:</p>
                    <p>{selectedPacketaPoint.name}</p>
                    <p>{selectedPacketaPoint.address}</p>
                    <p>{selectedPacketaPoint.zipCode} {selectedPacketaPoint.city}</p>
                  </div>
                )}
                <div className="flex justify-between py-2 text-lg font-bold">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 