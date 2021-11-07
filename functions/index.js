const functions = require("firebase-functions");
const express = require("express")
const cors = require("cors")
const stripe = require("stripe")("sk_test_51Jsxp1H18DnKo1T7lpKbNe3akKvD1VJkxhZeJwf4tbu5nNw4jc2nWL4FZL9XkERqnxj0zsg1YHJqNLujJFsJpYbg00vniGpnlK") // test secret key
//  Setup api

//App config
const app = express();

// Middleware
app.use(cors({origin: true}));
app.use(express.json());

// Api routes
app.get("/",(req, res) => res.status(200).send("Hello World"))

app.post("/payments/create", async (req,res) => {
  const total = req.query.total;
  
  console.log("Payment Request received for this amount >>>>> ", total)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency 
    currency: "usd" ,
  })

  // Ok created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  })

})
// Listen command
exports.api = functions.https.onRequest(app)

// http://localhost:5001/clone-jj/us-central1/api