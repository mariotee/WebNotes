import palette from "./palette.js"

const buttonRoot = {
  width: "70%",
  margin: "4px",
  borderRadius: "16px",
}

export default {
  _keys: {
    palette: palette,
    borderRadius: "24px",
    maxWidth: "720px",
  },
  secondButton: {
    ...buttonRoot,
    backgroundColor: `${palette.second.main}`,
    "&:hover": {
      backgroundColor: `${palette.second.hover}`,
    },
  },
  thirdButton: {
    ...buttonRoot,
    backgroundColor: `${palette.third.main}`,
    "&:hover": {
      backgroundColor: `${palette.third.hover}`,
    },
  },
  fourthButton: {
    ...buttonRoot,
    backgroundColor: `${palette.fourth.main}`,
    "&:hover": {
      backgroundColor: `${palette.fourth.hover}`,
    },
  },
  checkbox: {
    color: "inherit",
  },
}
