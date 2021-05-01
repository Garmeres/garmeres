import React from "react"
import { formatDateNow } from "../utils/format-helper"

export default () => {
  return (
    <footer>
      <span>Owned by Garmeres - Norwegian Section</span>
      <span>Last published {formatDateNow()}</span>
      <span>Created by Levi Sørum</span>
    </footer>
  )
}
