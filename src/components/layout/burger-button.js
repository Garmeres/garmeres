import React from "react"

const BurgerButton = ({ onClick }) => {
  return (
    <div
      className="burger-button-container"
      onClick={onClick}
      onKeyDown={onClick}
      tabIndex={0}
      role="button"
    >
      <div className="burger-button-bar" />
      <div className="burger-button-bar" />
      <div className="burger-button-bar" />
      <div className="burger-button-bar" />
    </div>
  )
}

export default BurgerButton
