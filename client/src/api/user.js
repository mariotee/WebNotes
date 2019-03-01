import axios from "axios"

const lambdaUrl = "https://a2dd6r2ld0.execute-api.us-east-2.amazonaws.com/user"

export const getUser = async (newUser) => {
  let res = await axios.post(lambdaUrl, {
    method: "GET",
    get: newUser,
  })

  return res.data
}  

export const createUser = async (postObj) => {
  let res = await axios.post(lambdaUrl, {
    method: "POST",
    post: postObj,
  })

  return res.data
}  

export const updateEmail = async (updateObj) => {
  let res = await axios.post(lambdaUrl, {
    method: "PUT",
    put: updateObj,
  })

  return res.data
}  

export const deleteUser = async (user) => {
  let res = await axios.post(lambdaUrl, {
    method: "DELETE",
    delete: user,
  })

  return res.data
}