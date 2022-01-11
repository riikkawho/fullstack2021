import React from 'react'

export const Togglable = (props) => {

  const showWhenVisible = { display: props.isVisible? '' : 'none' }
  const hideWhenVisible = { display: props.isVisible? 'none' : '' }

  return (
    <div id='togglable'>
      <button id='postNew' className='details' onClick={props.toggle} style={hideWhenVisible}>{props.textShow}</button>
      <div style={showWhenVisible}>
        {props.children}
        <button className='undo' onClick={props.toggle}>{props.textHide}</button>
      </div>
    </div>
  )
}
