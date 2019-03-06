import React from "react"
import styles from "./style.module.css"

export default function CreatePost(props) {
  return <div className={styles.root}>
    <div className={styles.head}>
      <label className={styles.inputlabel}>
        <b>Note</b>
      </label>
      <button
        color="third"
        className={styles.postbutton}
        onClick={() => props.onKey({key: "Enter",})}
      >
        Post Note
      </button>
    </div>
    <textarea
      className={styles.input}
      name="post"
      placeholder={"hit ENTER to submit"}
      value={props.newNote.post}
      rows={2}
      maxLength={140}
      onKeyPress={(event) => {
        props.onKey(event)
      }}
      onChange={(event) => {
        props.onChange(event)
      }}
    />
    <div className={styles.charcount}>{`${props.newNote.post.length}/140`}</div>
  </div>  
}