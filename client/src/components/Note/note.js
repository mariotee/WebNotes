import React from "react"
import { withStyles } from "@material-ui/core"
import style from "./style.js"

function Note(props) {
  const { classes } = props

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

  return <div className={classes.root}>
    <div className={classes.body}>
      <div className={classes.timestamp}>{parseDate(props.data.timestamp)}</div>
      <div className={classes.post}>{props.data.post}</div>
      <div className={classes.footer}>
        <div className={classes.prtyBadge}>Priority: {props.data.priority}</div>
        <Button
          className={classes.button}
          size="small"
          onClick={() => props.onDelete(props.data._id)}
        >
          Delete
        </Button>
      </div>
    </div>
  </div>  
}

export default withStyles(style)(Note)
