import React from "react"
import "./style.module.css"

export default function CreatePost(props) {
  return <div className="root">
    <label className="input-label">
      <b>Note</b>
    </label>
    <textarea
      className="input"
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
    <div className="charcount">{`${props.newNote.post.length}/140`}</div>
  </div>  
}
