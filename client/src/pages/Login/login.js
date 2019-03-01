import React from "react"
import { Card, CardHeader, CardContent } from "@material-ui/core"
import { InputLabel, Input, Button } from "@material-ui/core"
import Eye from "../../assets/eye.svg"
import EyeSlash from "../../assets/eyeslash.svg"
import styles from "./style.js"

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
    return <Card className={styles.root}>
      <CardHeader
        title="Web Notes"
        subheader={
          <span style={{ display: this.props.loading ? "block" : "none" }}>
            hang on a moment. signing you in...
          </span>
        }
      />
      <CardContent>
        <InputLabel className={styles.label}>User</InputLabel>
        <Input
          className={styles.input}
          name="name"
          value={this.state.name}
          onChange={(event) => this.onChange(event)}
        />
        <br />
        <InputLabel className={styles.label}>Password</InputLabel>
        <Input
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
          endAdornment={
            !this.state.passwordVisible ? (
              <img
                width={24}
                height={24}
                alt="show/hide password"
                src={Eye}
                onClick={this.togglePasswordVisibility}
              />
            ) : (
              <img
                width={24}
                height={24}
                alt="show/hide password"
                src={EyeSlash}
                onClick={this.togglePasswordVisibility}
              />
            )
          }
        />
        <br />
        <br />
        <Button
          className={styles.secondButton}
          variant="contained"
          onClick={() =>
            this.props.onSubmit({
              username: this.state.name,
              password: this.state.passwordEntered,
            })
          }
        >
          Sign In
        </Button>
        <br />
        <Button
          className={styles.thirdButton}
          variant="contained"
          onClick={() =>
            this.props.onSubmit({
              username: "GUEST",
            })
          }
        >
          Enter As Universal Guest
        </Button>
        <br />
        <Button
          className={styles.fourthButton}
          variant="contained"
          onClick={this.props.createAccount}
        >
          Create Account
        </Button>
        <div
          style={{
            backgroundColor: "#f9c9",
            display: this.props.creating ? "block" : "none",
            padding: "8px",
          }}
        >
          <InputLabel className={styles.label}>Username</InputLabel>
          <Input name="newUsername" onChange={(event) => this.onChange(event)} />
          <br />
          <InputLabel className={styles.label}>Email</InputLabel>
          <Input
            placeholder="(optional)"
            name="newEmail"
            onChange={(event) => this.onChange(event)}
          />
          <br />
          <InputLabel className={styles.label}>Password</InputLabel>
          <Input
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
          <br />
          <br />
          <Button
            variant="contained"
            className={styles.secondButton}
            onClick={() =>
              this.props.onPost({
                username: this.state.newUsername,
                email: this.state.newEmail,
                password: this.state.newPassword,
              })
            }
          >
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>  
  }
}