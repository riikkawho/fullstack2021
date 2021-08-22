import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

const InfoForm = (props) => {
  return (
  <form onSubmit={props.addPerson}>
    <div>
      Name: <input 
      required={true}
      value={props.newName}
      onChange={props.onChangeName}
      />
    </div>
    <div>
      Number: <input 
      value={props.newNumber}
      onChange={props.onChangeNumber}
      />
      <br/>
      <button type="submit">Add</button>  
    </div>
  </form>
  )
}

const Search = (props) => {
  return (
  <div>
    Who you gonna call? <input 
    type="search"
    value={props.searchName}
    onChange={props.onChange}
    />  
  </div>
  )
}

const PersonInfo = (props) => {
return (
    <li>{props.name} {props.number}
    <Button deleteContact={props.deleteContact}/></li>  
  )
}

const Button = (props) => {
  return(
    <button type="click" 
    onClick={props.deleteContact}
    disabled=''
    >Delete</button>
  )
}

const NotificationOk = ({ messageOk }) => {

  const successStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

 if (messageOk === null)
  return null
      
  return (
    <div style={successStyle}> {messageOk} </div>
  )  
}

const NotificationError = ({ messageErr }) => {
  const errorStyle = {    
    color: 'red',
    background: 'light grey',
    fontStyle: 'bold',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
    }

  if (messageErr === null)
    return null
  
  return (
    <div style={errorStyle}> {messageErr} </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [messageOk, setMessageOk] = useState(null)
  const [messageErr, setMessageErr] = useState(null)


  const successMessage = `'${newName}' updated to Phonebook!`
  const errorMessage = `Can´t find contact from Phonebook` 
  
  useEffect(() => {
    personsService
      .getAll()
      .then(personsList => setPersons(personsList))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }
  
    const alreadyExists = persons
      .find(person => person.name === newName)
    
    if (alreadyExists) {

      if (window.confirm(`${newName} already exists, do you want to replace the old number with the new one?`))
      { 
        personsService
        .update(alreadyExists.id, personObject)
        .then(returnedPerson => {
          setPersons(persons
            .map(person => person.id !== alreadyExists.id ? person : returnedPerson),
          setMessageOk(successMessage))
        })
        .catch(error => {
          setMessageErr(errorMessage)
        })
      }
    } else {
        personsService.create(personObject)
          .then(setPersons(persons.concat(personObject)))
            .then(setMessageOk(successMessage)
          )
          .catch(error => {
            setMessageErr(errorMessage)
          })     
      }

    setNewName('')
    setNewNumber('')
    setTimeout(() => {
      setMessageOk(null)
    }, 3000)
    setTimeout(() => {
      setMessageErr(null)
    }, 3000)
  } 

  const deleteContact = (personName, personId) => {
    if (window.confirm(`Are you sure you want to delete ${personName}?`)) {
      personsService
        .deletePerson(personId)
        .then(setPersons(persons.filter(person => person.id !== personId)))
    }
  }
  console.log(messageOk)
  console.log(messageErr)

  const filteredNames = searchName
    ? persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
    : persons

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearch = (event) => {
    setSearchName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Search 
      onChange={handleSearch}
      searchName={searchName}/>

      <h3>Add new</h3>
      <InfoForm 
      addPerson={addPerson}
      onChangeName={handleNameChange}
      onChangeNumber={handleNumberChange}
      newName={newName}
      newNumber={newNumber}/>
      

      <h3>Numbers</h3>
      <ul>
        {filteredNames.map(person =>
          <PersonInfo 
          key={person.name} 
          name={person.name} 
          number={person.number}
          deleteContact={() => deleteContact(person.name, person.id)}
          />
        )}
      </ul>
        <NotificationError
        messageErr={messageErr}/>
        <NotificationOk
        messageOk={messageOk}/>
    </div>
  )
}

export default App
