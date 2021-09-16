import "./App.css"
import Header from "./Header"
import Home from "./Home"
import Login from "./Login"
import Checkout from "./Checkout"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
function App() {
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
