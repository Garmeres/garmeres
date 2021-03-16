import React from 'react'
import SbEditable from 'storyblok-react'
 
const Teaser = ({blok}) => {
  return (
    <SbEditable content={blok}>
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-serif font-bold">{blok.headline}</h1>
      </div>
    </SbEditable>
  )
}
 
export default Teaser