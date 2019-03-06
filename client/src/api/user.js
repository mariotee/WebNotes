import axios from "axios"
import {LAMBDA_URL} from "./constants.js"

export const getUser = async (newUser) => {
  let res = await axios.post(LAMBDA_URL, {
    controller: "USER",
    sub: {
      method: "GET",
      get: newUser,
    }
  })

  return res.data
}

export const createUser = async (postObj) => {
  let res = await axios.post(LAMBDA_URL, {
    controller: "USER",
    sub: {
      method: "POST",
      post: postObj,
    }
  })

  return res.data
}  

export const updateEmail = async (updateObj) => {
  let res = await axios.post(LAMBDA_URL, {
    controller: "USER",
    sub: {
      method: "PUT",
      put: updateObj,
    }
  })

  return res.data
}  

export const deleteUser = async (user) => {
  let res = await axios.post(LAMBDA_URL, {
    controller: "USER",
    sub: {
      method: "DELETE",
      delete: user,
    }
  })

  return res.data
}