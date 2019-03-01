import custom from "../../theme/theme.js"

export default {
  ...custom,
  root: {
    textAlign: "center",
  },
  main: {
    margin: "16px auto",
    width: "90%",
    maxWidth: custom._keys.maxWidth,
    borderRadius: custom._keys.borderRadius,
    overflow: "hidden",
  },
  header: {
    backgroundColor: custom._keys.palette.primary.main,
    padding: "16px 0",
    textAlign: "center",
  },
  body: {
    backgroundColor: custom._keys.palette.second.main,
  },
  bottom: {
    padding: "8px 0",
    backgroundColor: custom._keys.palette.third.main,
  },
  footer: {
    maxWidth: custom._keys.maxWidth,
    margin: "0 auto",
  },
}
