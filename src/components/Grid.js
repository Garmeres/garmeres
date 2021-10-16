import React from "react"
import DynamicComponent from "./DynamicComponent"
import SbEditable from "storyblok-react"
import "../style/grid.css"

const Grid = ({ blok }) => {
  const itemWidth = 100 / blok.max_columns
  var k = 0
  return (
    <SbEditable content={blok} key={blok._uid}>
      <ul className="grid-container">
        {blok.items.map(blok => (
          <li
            key={k++}
            className={"grid-item " + blok.component}
            style={{
              minWidth: itemWidth + "%",
            }}
          >
            <DynamicComponent blok={blok} />
          </li>
        ))}
      </ul>
    </SbEditable>
  )
}

export default Grid
