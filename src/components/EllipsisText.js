import React from "react"

export default ({ text, maxCharCount = 180 }) => {
  const max = text.length >= maxCharCount ? maxCharCount : text.length
  return (
    <p className="ellipsis-text">
      {text.substring(0, max)}
      {text.length >= maxCharCount ? "..." : ""}
    </p>
  )
}
