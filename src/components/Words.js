import React from 'react'

const Words = ({ text, format }) => {
  if (format === 'h1') {
    return <h1>{text}</h1>
  }
  if (format === 'h2') {
    return <h2>{text}</h2>
  }
  if (format === 'p') {
    return <p>{text}</p>
  }
}
export default Words
