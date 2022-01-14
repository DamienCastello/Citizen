import axios from "axios"

const instance = axios.create({
  baseURL: "https://CrenoBaseURL.glanum.net/",
  timeout: 12000,
  headers: {
    Accept: "application/json",
  },
})

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    if (error.response) {
      console.warn("error from server", error.response)
    }

    return Promise.reject(error)
  }
)

export default instance
