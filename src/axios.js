import axios from "axios";
const instance = axios.create({
  baseURL: "https://us-central1-clone-jj.cloudfunctions.net/api"
  // local "http://localhost:5001/clone-jj/us-central1/api" // the api (cloud function) URL
})
export default instance