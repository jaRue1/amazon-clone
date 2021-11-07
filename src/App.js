import "./App.css"
import React, { useEffect } from "react"
import Header from "./Header"
import Home from "./Home"
import Login from "./Login"
import Checkout from "./Checkout"
import Payment from "./Payment"
import Orders from "./Orders"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { auth } from "./firebase"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useStateValue } from "./StateProvider"

const promise = loadStripe('pk_test_51Jsxp1H18DnKo1T79riY9zg5FVYcKR1fBRjQjUf7TI6gNKW5MdzGJ4fdw4P8G9X7p0TtIu63gidZbFp02B1aI93o00yX2gLtO0') // public key

function App() {
  const [{}, dispatch] = useStateValue()
  useEffect(() => {
    // will only run once when the app component loads...
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>>>", authUser)
      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        })
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        })
      }
    })
  }, [])

  return (
    //BEM naming convention for styling
    <Router>
      <div className="app">
        <Switch>
        <Route exact path="/orders">
            <Header />
            <Orders />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route exact path="/payment">
            <Header />
            <Elements stripe={promise}>
               <Payment/>
            </Elements>
          </Route>

          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
