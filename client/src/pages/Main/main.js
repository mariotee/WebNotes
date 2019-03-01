import React from "react"
import { Card, CardHeader, CardContent } from "@material-ui/core"
import { Button } from "@material-ui/core"
import { withStyles } from "@material-ui/core"
import styles from "./style.js"

import * as entryApi from "../../api/entry.js"

import CreatePost from "../../components/CreatePost"
import Note from "../../components/Note"

export default class Main extends React.Component {
  state = {
    characterCount: 0,
    newNote: {
      post: "",
      priority: 10,
    },
  }

  sortData = (data) => {
    data.sort((a, b) => (a.post.toLowerCase() < b.post.toLowerCase() ? 1 : -1))
    data.sort((a, b) => (a.priority < b.priority ? -1 : 1))
  }

  onFieldChange = (event) => {
    const original = this.state.newNote
    this.setState({
      newNote: {
        ...original,
        [event.target.name]: event.target.value,
      },
    })
  }

  onEditTableRow = (element) => {}

  onConfirmEdit = (element) => {}

  onDeleteNote = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      let deleted = await entryApi.deleteNoteById(id)

      if (deleted && !deleted.errorMessage) {
        this.props.removeNoteFromState(deleted)
      }
    }
  }

  postKeyPress = async (event) => {
    if (event.key === "Enter") {
      let res = await entryApi.createNote({
        user: this.props.user,
        timestamp: new Date(),
        post: this.state.newNote.post,
        priority: this.state.newNote.priority,
      })

      if (res && !res.errorMessage) {
        this.props.addNoteToState(res)
      }

      this.setState({
        newNote: {
          post: "",
          priority: 10,
        },
      })
    }
  }

  render() {    
    return <div className={styles.root}>
      <Card className={styles.main}>
        <CardHeader className={styles.header} title="Your Notes" />
        <CardContent className={styles.body}>
          {this.props.data
            ? this.props.data.map((element, index) => {
              return <Note key={index} data={element} onDelete={this.onDeleteNote} />
            })
            : null}
        </CardContent>
        <CardContent className={styles.bottom}>
          <CreatePost
            newNote={this.state.newNote}
            onChange={this.onFieldChange}
            onKey={this.postKeyPress}
          />
          <Button
            className={styles.fourthButton}
            variant="contained"
            onClick={() =>
              this.postKeyPress({
                key: "Enter",
              })
            }
          >
            Post Note
          </Button>
        </CardContent>
      </Card>
      <div className={styles.footer}>
        <Button className={styles.secondButton} variant="contained" onClick={this.props.logout}>
          Logout
        </Button>
      </div>
    </div>    
  }
}
