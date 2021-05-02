import React from "react"

const BurgerButton = ({ onClick }) => {
  return (
    <div
      id="hamburger"
      className="burger-button-container"
      onClick={onClick}
      onKeyDown={onClick}
      tabIndex="0"
      role="button"
      aria-label="Show navigation menu"
      aria-expanded="false"
    >
      <div className="burger-button-bar" aria-hidden="true" />
      <div className="burger-button-bar" aria-hidden="true" />
      <div className="burger-button-bar" aria-hidden="true" />
      <div className="burger-button-bar" aria-hidden="true" />
    </div>
  )
}

export default BurgerButton
