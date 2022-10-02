import { useState, useEffect } from 'react'
import personService from './services/persons'

//component for message
const Notification = ({ usermessage }) => {
  const messageStyle = {
    background: '#dcedc8',
    color: '33691e',
    fontStyle: 'bold',
    fontSize: 20,
    padding: 10,
    borderRadius:25,
    borderColor: '#dcedc8',
    borderStyle: 'solid',
    borderWidth: 5,
    marginBottom: 10
  }



  if (usermessage === null) {
    //return null
    return(
      <div></div>
    )
  }

  return (
    <div style={messageStyle}>
      {usermessage}
    </div>
  )
}

// an error notification
const ErrorMessage = ({ errormessage }) => {

  const errorStyle = {
    background: '#ffc9bb',
    color: '33691e',
    fontStyle: 'bold',
    fontSize: 20,
    padding: 10,
    borderRadius:25,
    borderColor: '#ffc9bb',
    borderStyle: 'solid',
    borderWidth: 5,
    marginBottom: 10
  }
  
  if (errormessage === null) {
    return null
      }


  return (
    <div style={errorStyle}>
      {errormessage}
    </div>
  )
}

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



const Person = ({ person, deletePerson}) => {

  return (
    <li>
      <p>{person.name} {person.number} <button onClick={deletePerson}>delete</button></p>
    </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  //const [newPerson, setNewPerson] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredNames, setFilteredNames] = useState([]) //filtered person details
  const [filterEntry, setFilterEntry] = useState('')  // the text in the filter text box
  const [userMessage, setUserMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(originalPersons => {
        //console.log(originalPersons)
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

    if (persons.some(pr => pr.name === newName)) {
      const replacementMessage = `${newName} is already added to phonebook. Would you like to update their number?`;
      if (window.confirm(replacementMessage)) {
        console.log("Confirmed replacement");
        const changePerson = persons.find(p => p.name===newName)
        personService
        .update(changePerson.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== changePerson.id ? person : returnedPerson))
          
        })
        .then(()=>{setUserMessage(`Updated entry for ${personObject.name}`)
          setTimeout(() => {
            setUserMessage(null)
          }, 5000)})
          .catch(error => {
            setErrorMessage(
              `An error occured`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)})
          
      }
      else{
        console.log("ok. wont replace")
      }
    }
    else {
      //console.log(personObject)
      //setPersons(persons.concat(personObject))
      personService
        .create(personObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
        })
        .then(()=>{setUserMessage(`Created a new entry for ${personObject.name}`)
        setTimeout(() => {
          setUserMessage(null)
        }, 5000)})
        .catch(error => {
          setErrorMessage(
            `An error occured`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)})
    }
  }

  const peopleList = filterEntry
    ? filteredNames
    : persons
  //console.log(peopleList)
  // name text box handler
  const handlePersonEntry = (event) => {


    /* if (persons.some(e => e.name === event.target.value)) {
      alert(`${event.target.value} is already added to phonebook`)

    } */
    setNewName(event.target.value)
  }

  // number text box handler
  const handleNumberEntry = (event) => {

/*     if (persons.some(e => e.name === event.target.value)) {
      alert(`${event.target.value} is already added to phonebook`)
    } */
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

  const removePerson = (person) => 
   {
    //console.log("we are here")
    const message = `Delete entry for ${person.name}?`
    if (window.confirm(message)) {
      console.log("Confirm");
      personService
      .remove(person.id)
      .then(setPersons(persons.filter(p => p.id !==person.id)))
      .then(()=>{setUserMessage(`Deleted entry for ${person.name}`)
          setTimeout(() => {
            setUserMessage(null)
          }, 5000)})
      .catch(error => {
        setErrorMessage(
          `Information on ${person.name} has already been removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)})
       }
       else{
        console.log("canceled")
  }
}
    

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification usermessage={userMessage} />
      <ErrorMessage errormessage={errorMessage} />
      <Filter filterEntry={filterEntry} handleFiltering={handleFiltering} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonEntry={handlePersonEntry} newNumber={newNumber} handleNumberEntry={handleNumberEntry} />
      <h2>Numbers</h2>
      <ul>
        {
          peopleList.map(person =>
            <Person key={person.id} person={person} deletePerson={()=>removePerson(person)}/>
          )}
      </ul>
    </div>
  )
}

export default App