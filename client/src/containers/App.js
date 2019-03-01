import React from "react"
import Login from "../pages/Login"
import Main from "../pages/Main"

import * as userApi from "../api/user.js"
import * as entryApi from "../api/entry.js"

export default class App extends React.Component {
  state = {
    loggedIn: false,
    loadingUser: false,
    creatingAccount: false,
    loginError: false,
    postError: false,
    notes: [],
  }

  toggleCreate = () => {
    this.setState({
      creatingAccount: !this.state.creatingAccount,
    })
  }

  submitCreate = async (req) => {
    this.setState({
      loadingUser: true,
    })

    let post = await userApi.createUser(req)

    if (post && !post.errorMessage) {
      let data = await entryApi.getAllNotesByUser(post.username)

      this.setState({
        notes: data,
        loggedIn: true,
        loadingUser: false,
        creatingAccount: false,
        loginError: false,
        postError: false,
      })
    } 
    else {
      this.setState({
        loggedIn: false,
        loadingUser: false,
        creatingAccount: false,
        postError: true,
      })
    }
  }

  submitLogin = async (req) => {
    if (!this.state.loggedIn) {
      if (req.username === "GUEST") {
        let data = await entryApi.getAllNotesByUser("Guest")

        this.setState({
          notes: data,
          loggedIn: true,
          loadingUser: false,
        })
      } 
      else {
        this.setState({
          loadingUser: true,
        })
        let get = await userApi.getUser(req)

        if (get) {
          let data = await entryApi.getAllNotesByUser(get.username)

          this.setState({
            notes: data,
            loadingUser: false,
            loggedIn: true,
          })
        } 
        else {
          this.setState({
            loginError: true,
          })
        }
      }
    }
  }

  onLogout = () => {
    this.setState({
      loggedIn: false,
    })
  }

  addNoteToState = (note) => {
    let newData = this.state.notes
    newData.push(note)

    this.setState({
      notes: newData,
    })
  }

  removeNoteFromState = (note) => {
    let newData = this.state.notes
    newData = this.state.notes.filter((element) => element._id !== note._id)

    this.setState({
      notes: newData,
    })
  }

  render() {
    if (this.state.loginError) {
      window.alert("error logging in.")
      this.setState({
        loadingUser: false,
        loginError: false,
      })
    }

    if (this.state.postError) {
      window.alert("error creating user.")
      this.setState({
        creatingAccount: false,
        postError: false,
      })
    }

    if (this.state.loggedIn) {
      return <Main
        user={this.state.notes ? this.state.notes[0].user : "none"}
        data={this.state.notes}
        addNoteToState={this.addNoteToState}
        removeNoteFromState={this.removeNoteFromState}
        logout={this.onLogout}
      />      
    }

    return <Login
      onSubmit={this.submitLogin}
      onPost={this.submitCreate}
      createAccount={this.toggleCreate}
      creating={this.state.creatingAccount}
      loading={this.state.loadingUser}
    />
    
  }
}