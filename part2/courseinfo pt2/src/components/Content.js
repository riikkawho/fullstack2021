import React from 'react'
import Part from './Part'

const Content = (props) => {
  return props.course.parts.map((part) => 
    <Part 
      key={part.id} 
      name={part.name} 
      exercises={part.exercises} />);
}

export default Content