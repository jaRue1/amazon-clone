import "./App.css"
import React, { useEffect } from "react"
import Header from "./Header"
import Home from "./Home"
import Login from "./Login"
import Checkout from "./Checkout"
import { auth } from "./firebase"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useStateValue } from "./StateProvider"
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
          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/checkout">
            <Header />
            <Checkout />
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
