import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

//name filter
const Filter = ({ filterEntry, handleFiltering }) => {
  return (
    <div>
      <form>
        <div>filter shown with <input
          value={filterEntry}
          onChange={handleFiltering}
        /></div>

      </form>
    </div>
  )

}

const PersonForm = ({ addPerson, newName, handlePersonEntry, newNumber, handleNumberEntry }) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>name: <input
          value={newName}
          onChange={handlePersonEntry}
        /></div>
        <div>number: <input value={newNumber} onChange={handleNumberEntry} /></div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

const Person = ({ person }) => {

  return (
    <li>
      <p>{person.name} {person.number}</p>
    </li>
  )
}

const Persons = ({ peopleList }) => {
  return (
    <div>
      <ul>
        {
          peopleList.map(person =>
            <Person key={person.id} person={person} />
          )}
      </ul>
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  //const [newPerson, setNewPerson] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredNames, setFilteredNames] = useState([]) //filtered person details
  const [filterEntry, setFilterEntry] = useState('')  // the text in the filter text box

 
   useEffect(() => {
    personService
    .getAll()
      .then(originalPersons => {
        console.log(originalPersons)
        setPersons(originalPersons)
      })
  }, [])

  // add a new person object
  const addPerson = (event) => {
    //console.log((filterEntry));
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    if (persons.some(e => e.name === newName)) {
      alert(`${newName} is already added to phonebook`)}
    else{
      //console.log(personObject)
      //setPersons(persons.concat(personObject))
      personService

    .create(personObject)
    .then(createdPerson => {
      setPersons(persons.concat(createdPerson))
      .catch(error => {
        alert(
          `there was an error craeting the phonebook entry`
        )
        })
      setNewName('')
      setNewNumber('')

    })
    }


    //setNewPerson('')
  }

  const peopleList = filterEntry
    ? filteredNames
    : persons
 console.log(peopleList)
  // name text box handler
  const handlePersonEntry = (event) => {


    if (persons.some(e => e.name === event.target.value)) {
      alert(`${event.target.value} is already added to phonebook`)

    }
    setNewName(event.target.value)
  }

  // number text box handler
  const handleNumberEntry = (event) => {

    if (persons.some(e => e.name === event.target.value)) {
      alert(`${event.target.value} is already added to phonebook`)
    }
    setNewNumber(event.target.value)
  }

  const handleFiltering = (event) => {


    if (typeof event.target.value === 'string') {
      //console.log("you entered something in the text box")
      const filtered = peopleList.filter(person => person.name.toLowerCase().includes(event.target.value))
      
      setFilteredNames(filtered);
      //console.log(filtered);
    }
    else {
      setFilteredNames(persons)
      //console.log(filteredNames)
    }
    setFilterEntry(event.target.value)

  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterEntry={filterEntry} handleFiltering={handleFiltering} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonEntry={handlePersonEntry} newNumber={newNumber} handleNumberEntry={handleNumberEntry} />
      <h2>Numbers</h2>
      <Persons peopleList={peopleList} />

    </div>
  )
}

export default App