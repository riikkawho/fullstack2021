import React from 'react'
import PropTypes from 'prop-types'

export const LoginForm = ({
  onSubmit,
  username,
  password,
  onChangeUser,
  onChangePass,

}) => {

  return (
    <div className='main'>
      <h4>Log in</h4>
      <form onSubmit={onSubmit}>
        <label htmlFor={'Username'}> Username </label>
        <input
          id={'username'}
          type='text'
          value={username}
          name={'Username'}
          onChange={onChangeUser}/>
        <br/>
        <label htmlFor={'Password'}> Password </label>
        <input
          id={'password'}
          type={'password'}
          value={password}
          name={'Password'}
          onChange={onChangePass}/>
        <br/>
        <button style={{ float: 'left' }} className='details' type='Submit'>Submit</button>
      </form>
    </div>
  )

}
LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChangeUser: PropTypes.func.isRequired,
  onChangePass: PropTypes.func.isRequired,
  username: PropTypes.string,
  password: PropTypes.string
}