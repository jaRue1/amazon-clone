import "./App.css"
import Header from "./Header"
import Home from "./Home"
import Checkout from "./Checkout"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
function App() {
  return (
    //BEM naming convention for styling
    <Router>
      <div className="app">
      <Header />

        <Switch>
        <Route exact path="/login">
            <h2>Login Page</h2>
          </Route>
          
          <Route exact path="/checkout">
            <Checkout />
          </Route>

          <Route path="/">
            <Home />
          </Route>

        </Switch>
        
      </div>
    </Router>
  )
}

export default App
