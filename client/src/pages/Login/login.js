import React from "react"
import styles from "./style.module.css"

export default class LoginPage extends React.Component {
  state = {
    passwordVisible: false,
    name: "",
    passwordEntered: "",
  }

  togglePasswordVisibility = () => {
    this.setState({
      passwordVisible: !this.state.passwordVisible,
    })
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {    
    return <div className={styles.root}>
      <div className={styles.header}>
        <h2>Web Notes</h2>
        <span style={{ display: this.props.loading ? "block" : "none" }}>
          hang on a moment. signing you in...
        </span>
      </div>
      <div>
        <label className={styles.label}>User</label>
        <input
          className={styles.input}
          name="name"
          value={this.state.name}
          onChange={(event) => this.onChange(event)}
        />
        <br />
        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          name="passwordEntered"
          value={this.state.passwordEntered}
          type={this.state.passwordVisible ? "text" : "password"}
          onChange={(event) => this.onChange(event)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              this.props.onSubmit({
                username: this.state.name,
                password: this.state.passwordEntered,
              })
            }
          }}
        />
        <br/>
        <input
          className={styles.checkbox}
          type="checkbox"
          onClick={() => this.togglePasswordVisibility()}
        />
        <span className={styles.showpass}>Show Password</span>
        <br/>
        <button
          className={styles.loginbuttons}
          color="second"          
          onClick={() =>
            this.props.onSubmit({
              username: this.state.name,
              password: this.state.passwordEntered,
            })
          }
        >
          Sign In
        </button>
        <br />
        <button
          className={styles.loginbuttons}
          color="third"          
          onClick={() =>
            this.props.onSubmit({
              username: "GUEST",
            })
          }
        >
          Enter As Universal Guest
        </button>
        <br />
        <button
          className={styles.loginbuttons}
          color="fourth"
          onClick={this.props.createAccount}
        >
          Create Account
        </button>
        <div
          style={{
            backgroundColor: "#f9c9",
            display: this.props.creating ? "block" : "none",
            padding: "8px",
          }}
        >
          <label className={styles.label}>Username</label>
          <input 
            className={styles.input}
            name="newUsername" 
            onChange={(event) => this.onChange(event)} 
          />
          <br />
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            placeholder="(optional)"
            name="newEmail"
            onChange={(event) => this.onChange(event)}
          />
          <br />
          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            name="newPassword"
            onChange={(event) => this.onChange(event)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                this.props.onPost({
                  username: this.state.newUsername,
                  email: this.state.newEmail,
                  password: this.state.newPassword,
                })
              }
            }}
          />
          <button
            color="second"
            className={styles.loginbuttons}
            onClick={() =>
              this.props.onPost({
                username: this.state.newUsername,
                email: this.state.newEmail,
                password: this.state.newPassword,
              })
            }
          >
            Submit
          </button>
        </div>
      </div>
    </div>  
  }
}