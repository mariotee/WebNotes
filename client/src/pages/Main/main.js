import React from "react"
import styles from "./style.module.css"

import * as entryApi from "../../api/entry.js"

import CreatePost from "../../components/CreatePost"
import Note from "../../components/Note"

export default class Main extends React.Component {
  state = {
    characterCount: 0,
    newNote: {
      post: "",      
    },
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
      })

      if (res && !res.errorMessage) {
        this.props.addNoteToState(res)
      }

      this.setState({
        newNote: {
          post: "",          
        },
      })
    }
  }

  render() {
    const {data} = this.props || []

    return <div className={styles.root}>
      <div className={styles.main}>
        <div className={styles.header}>
          Web Notes
        </div>
        <div className={styles.body}>
          {
            data.length > 0 && data.map((element, index) => {
              return <Note 
                key={"note_"+index} 
                data={element} 
                onDelete={this.onDeleteNote}
              />
            })
          }
          <CreatePost
            newNote={this.state.newNote}
            onChange={this.onFieldChange}
            onKey={this.postKeyPress}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <button          
          color="first"
          onClick={this.props.logout}
        >
          Logout
        </button>
      </div>
    </div>
  }
}