import React from 'react'

const Total = ({ course }) => {

  const totalEx = course.parts.reduce((sum, part) => {sum + part.exercises}, 0)
  return <p><b>Number of exercises {totalEx}</b></p>
}

export default Total