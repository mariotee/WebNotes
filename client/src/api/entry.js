import axios from "axios"

import {LAMBDA_URL} from "./constants.js"


export const getAllNotesByUser = async (userStr) => {
  let res = await axios.post(LAMBDA_URL, {
    method: "GET",
    user: userStr,
  })

  return res.data
}

export const getNoteById = async (idStr) => {
  let res = await axios.post(LAMBDA_URL, {
    method: "GET",
    byId: true,
    id: idStr,
  })

  return res.data
}

export const createNote = async (postObj) => {
  let res = await axios.post(LAMBDA_URL, {
    method: "POST",
    post: postObj,
  })

  return res.data
}

export const updateNoteById = async (idStr, fieldsToUpdate) => {
  let res = await axios.post(LAMBDA_URL, {
    method: "PUT",
    id: idStr,
    put: fieldsToUpdate,
  })

  return res.data
}  

export const deleteNoteById = async (idStr) => {
  let res = await axios.post(LAMBDA_URL, {
    method: "DELETE",
    id: idStr,
  })

  return res.data
}