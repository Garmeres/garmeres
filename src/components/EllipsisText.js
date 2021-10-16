import React from "react"

const EllipsisText = ({ text, maxCharCount = 180 }) => {
  const max = text.length >= maxCharCount ? maxCharCount : text.length
  return (
    <p className="ellipsis-text">
      {text.substring(0, max)}
      {text.length >= maxCharCount ? "..." : ""}
    </p>
  )
}

export default EllipsisText
