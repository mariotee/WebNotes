import React from "react"
//import jscookie from "js-cookie"

import Login from "../pages/Login"
import Main from "../pages/Main"

import * as userApi from "../api/user.js"
import * as entryApi from "../api/entry.js"

//import {generateToken} from "../api/utils.js"

//const tokencookey = "token_current_user"

const sortByTimestamp = (data) => {
  data.sort((a,b) => a.timestamp > b.timestamp ? -1 : 1)
}

export default class App extends React.Component {
  state = {
    loggedIn: false,    
    loadingUser: false,
    creatingAccount: false,
    loginError: false,
    postError: false,
    notes: [],
    user: "anonymous",
  }

  // componentDidMount() {
  //   if (jscookie.get(tokencookey)) {
  //     jscookie.remove(tokencookey)
  //   }
  // }

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
      let data = await entryApi.getAllNotes()
      sortByTimestamp(data)
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
        let data = await entryApi.getAllNotes()
        sortByTimestamp(data)
        this.setState({
          notes: data,
          loggedIn: true,
          loadingUser: false,
          user: "anonymous",
        })
      }
      else {
        this.setState({
          loadingUser: true,
        })
        let get = await userApi.getUser(req)

        if (get) {
          // const token = generateToken()
          // jscookie.set(tokencookey, token)
          //let put = await userApi.updateToken          

          let data = await entryApi.getAllNotes()
          sortByTimestamp(data)
          this.setState({
            notes: data,
            loadingUser: false,
            loggedIn: true,
            user: get.username,
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
    this.setState((prevState) => {
      let newData = prevState.notes
      newData.push(note)

      return {
        notes: newData,
      }
    })
  }

  removeNoteFromState = (note) => {    
    this.setState((prevState) => {
      let newData = prevState.notes
      if (Date.now() - new Date(note.timestamp).getTime() < 30000) {        
        newData = prevState.notes.filter((element) => element._id !== note._id)

        return {
          notes: newData,
        }
      }

      newData = newData.map((element) => {
        if (element._id === note._id) {
          element.user = "deleted"
          return element
        }
        else return element
      })

      return {
        notes: newData,
      }
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
        user={this.state.user}
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