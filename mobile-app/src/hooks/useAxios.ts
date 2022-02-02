import { AxiosInstance } from "axios"
import { useEffect, useState } from "react"

type Parameters = {
  onSuccess?: Function
  onFinally?: Function
  httpCodes?: Object
  setFormError?: Function
}

type Returns = {
  rec: Function
  setupError: string | null
  networkError: string | null
  formErrors: Object | null
}

export default function useAxios({
  onSuccess,
  onFinally,
  httpCodes,
  setFormError,
}: Parameters): Returns {
  const [networkError, setNetworkError] = useState(null)
  const [setupError, setSetupError] = useState(null)
  const [formErrors, setFormErrors] = useState(null)

  const rec = (promise: Promise<AxiosInstance>) => {
    promise
      .then((response: AxiosInstance | null) => {
        if (response) {
          console.log("CHECK DATA RESPONSE AXIOS : ", response)
          if (response.status === 200) {
            if (onSuccess) {
              onSuccess(response)
            }
          }
        }
      })
      .catch((error) => {
        console.log("error AXIOS #catch", error)
        if (httpCodes.hasOwnProperty("*")) {
          httpCodes["*"](error)
        }

        if (error.response) {
          const data = error.response.data

          for (const [code, callback] of Object.entries(httpCodes)) {
            if (code !== "*") {
              if (error.response.status == code) {
                callback(data)
              }
            }
          }

          if (error.response.status === 422) {
            if (data) {
              if (setFormError) {
                for (const [key, values] of Object.entries(data.errors)) {
                  values.map((value) => setFormError(key, { message: value }))
                }
                setFormErrors(data.errors)
              }
            }
          }
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          setNetworkError(error.message)
        } else {
          // Something happened in setting up the request that triggered an Error
          setSetupError(error.message)
        }
      })
      .finally(() => {
        if (onFinally) {
          onFinally()
        }
      })
  }

  return { rec, setupError, networkError, formErrors }
}
