import axiosBase, { AxiosResponse } from "axios"
import MockAdapter from "axios-mock-adapter"

import axios from "./axios"

export const api_prefix = "api/"

var mock = new MockAdapter(axios)

mock.onPost("/api/auth/login").reply(200, {
  users: [{ id: 1, username: "Damien" }],
  headers: { authorization: "myAwesomeToken" },
})

const request = async (method, args): Promise<AxiosResponse> => {
  let promise: Promise<AxiosResponse>

  if (method === "post") {
    const { url, data, options } = args
    promise = axios.post(url, data, { ...options })
  } else {
    const { url, options } = args
    console.log("check url of promise : ", url)
    promise = axios.get(url, { ...options })
  }

  return promise
}

export const get = (url:string, options = {}) => {
  return request("get", { url, options })
}

export const post = (url:string, data = {}, options = {}) => {
  console.log("CHECK MY PARAMS : ", url, data, options)
  return request("post", { url, data, options })
}

export const getActualities = () => {
  return get(api_prefix + "actualities")
}

export const getActuality = (id:string) => {
    return get(api_prefix + "actualities/" + id)
  }

export const login = (data) => {
  return post(api_prefix + "auth/login", data)
}

export const register = (data) => {
  return post(api_prefix + "register", data)
}

export const registerConfirmation = (data) => {
  return post(api_prefix + "register/confirmation", data)
}

export const logout = () => {
  return post(api_prefix + "logout")
}
