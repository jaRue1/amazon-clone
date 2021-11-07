import { Link ,useHistory } from "react-router-dom"
import { getBasketTotal } from "./reducer"
import { useStateValue } from "./StateProvider"
import { useState , useEffect} from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import "./Payment.css"
import React from "react"
import CurrencyFormat from "react-currency-format"
import CheckoutProduct from "./CheckoutProduct"
import axios from "./axios"
import { db } from './firebase.js'
function Payment() {
  const [{ basket, user }, dispatch] = useStateValue()
  const history = useHistory()
  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [processing, setProcessing] = useState("")
  const [succeeded , setSucceeded ] = useState(false)

  const [clientSecret , setClientSecret] = useState(true)

  useEffect(() => {
    // generate stripe secret which allow us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // stripe expects the total in a currencies subunits meaning if you pass it $'s its expecting the value in cents
        // Ex : $10.00 === 1000 cents
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      })
      setClientSecret(response.data.clientSecret)
    }
    getClientSecret();
  },[basket])
  console.log('THE SECRET IS >>>', clientSecret)

  const handleSubmit = async (e) => {
    // stripe code stuff
    e.preventDefault()
    setProcessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret,{
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({paymentIntent}) => {
      // paymentIntent = payment confirmation
      db
      .collection('users')
      .doc(user?.uid)
      .collection('orders')
      .doc(paymentIntent.id)
      .set({
         basket: basket,
         amount: paymentIntent.amount,
         created: paymentIntent.created
        })

      setSucceeded(true)
      setError(null)
      setProcessing(false)

      dispatch({
        type: "EMPTY_BASKET"
      })

      history.replace('/orders')
    })
  }
  const handleChange = (e) => {
    // Listen for change in the CardElement
    // Display any errors as the customer types in the card details
    setDisabled(e.empty)
    setError(e.error ? e.error.message : "")
  }

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout(<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* Payment Section - address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{!user ? "Guest" : user.email}</p>
            <p>123 Abc Lane </p>
            <p>Code Valley, FL</p>
          </div>
        </div>
        {/* Payment Section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* Payment Section - payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* stripe code */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                    <h3> Order Total: {value} </h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded }>
                  <span>{processing ? <p>Processing</p> : "Buy Now"} </span>
                   </button>
              </div>
              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
