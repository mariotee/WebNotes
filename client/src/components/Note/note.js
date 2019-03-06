import React from "react"
import styles from "./style.module.css"

export default function Note(props) {
  const numToPaddedString = (num) => {
    return String(num).length < 2 ? "0" + num : num
  }

  const parseDate = (date) => {
    date = new Date(date)
    const month = numToPaddedString(date.getMonth() + 1)
    const day = numToPaddedString(date.getDate())
    const year = date.getFullYear()
    let hour = date.getHours()
    let minute = numToPaddedString(date.getMinutes())
    let tod = "AM"
    if (hour >= 12) tod = "PM"
    if (hour > 12) hour -= 12
    if (hour === 0) hour = 12

    if (hour < 10) {
      hour = `0${hour}`
    }
    return `${month}/${day}/${year} ${hour}:${minute} ${tod}`
  }

  return <div className={styles.root}>
    <div className={styles.body}>
      <div className={styles.timestamp}>{parseDate(props.data.timestamp)}</div>
      <div className={styles.post}>{props.data.post}</div>
      <div className={styles.footer}>
        <span className={styles.username}>{props.data.user}</span>
        <button
          color="fourth"
          onClick={() => props.onDelete(props.data._id)}
        >
          Delete
        </button>
      </div>
    </div>
  </div>  
}