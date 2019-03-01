import custom from "../../theme/theme.js"

export default {
  ...custom,
  root: {
    width: "90%",
    maxWidth: custom._keys.maxWidth,
    margin: "24px auto",
    backgroundColor: custom._keys.palette.primary.main,
    borderRadius: custom._keys.borderRadius,
    textAlign: "center",
  },
  label: {
    margin: "0 16px",
    color: "#000",
  },
  input: {
    width: "50%",
    maxWidth: "200px",
  },
}