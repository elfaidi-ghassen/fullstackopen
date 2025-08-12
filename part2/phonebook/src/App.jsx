import { useState } from 'react'

const Filter = ({searchString, onChange}) => {
  return (
    <div>
          filter shown with
          <input 
            value={searchString}
            onChange={onChange}
          />
    </div>)
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: 
        <input 
          type="text"
          value={props.newName}
          onChange={props.onNameChange}
        />
      </div>
      <div>
        number: 
        <input 
          type="text"
          value={props.newPhoneNumber}
          onChange={props.onPhoneChange}
        />
      </div>
      <div>
        <button 
          type="submit">
          {props.submitBtnText}
        </button>
      </div>
    </form>
  )
}

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map(personToHTML)}
    </div>
  )
  // personToHTML(person: {name: ...}) => HTML
  // produce JSX for a person entry
  function personToHTML(person) {
    return (
      <p key={person.id}>
        {person.name} {person.phone} [{person.id}]
      </p>)
  }
}

const App = () => {
  ///> State: Persons
  // Represent a list of people: [{name: ...}, ...]
  // [{ name: a string representing the name of the person }]
  const [persons, setPersons] = useState([
    {name: "ghassen", phone: "+216 56072228", id: 1},
    {name: "ramzi", phone: "+222 10-0019-413", id: 2}
  ])

  ///> State: newName
  // used to create a "controlled component"  
  // for the name <input> field
  const [newName, setNewName] = useState("")

  ///> State: newPhoneNumber
  // used to create a "controlled component"  
  // for the phone number <input> field
  // the phone number is represented as a string
  const [newPhoneNumber, setNewPhoneNumber] = useState("")

  ///> State: searchString
  // used to create a "controlled component"  
  // for the search by name <input> field
  const [searchString, setSearchString] = useState("")

  const shownPersons = persons.filter(filterByName(searchString))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        searchString={searchString} 
        onChange={handleSearchChange}/>
      <h2>Add a new</h2>
      <PersonForm 
        onSubmit={handleAddEntry}
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        onNameChange={handleNameChange}
        onPhoneChange={handlePhoneChange}
        submitBtnText="add"
        />
      <h2>Numbers</h2>
      <Persons persons={shownPersons}/>
    </div>
  )
  
  /// ****************************************
  /// Helper Functions

  // filterByName(string) => <function object>
  // return a predicate function to test of the name contains a search string
  // if searchString is empty, then the returned predicate always produce true
  function filterByName(searchString) {
    searchString = searchString.trim().toLowerCase()
    if (searchString === "") {
      return _ => true
    } else {
      return person => person.name
                      .toLowerCase()
                      .includes(searchString)
    }
  }



  // used as a callback for the onChange event
  // in the search by name <input> field
  function handleSearchChange(event) {
    let newSearchString = event.target.value;
    setSearchString(newSearchString)
  }

  // used as a callback for the onChange event
  // in the phone number <input> field
  function handlePhoneChange(event) {
    let newPhoneNumber = event.target.value;
    setNewPhoneNumber(newPhoneNumber)
  }

  // used as a callback for the form submission event 
  function handleAddEntry(event) {
    event.preventDefault();
    let newPerson = {
        name: newName,
        phone: newPhoneNumber,
        id: newId(persons)
    }
    if (personAlreadyExist(newPerson)) {
      alert(`${newPerson.name} is already added to the phonebook`)
      return;
    }
    addNewPerson(newPerson);
  }

  // newId([{name: ..., etc}]) => number [> 0]
  function newId(persons) {
    if (persons.length === 0) {
      return 1
    }
    return Math.max(
        ...persons.map(person => person.id)) + 1
  }

  
  // personAlreadyExist({name: ..., ...}) => true | false
  // evaluate to true if the person NAME is already exists
  // in the list of people's names in the phone book
  function personAlreadyExist(newPerson) {
    return persons.map(person => person.name)
                  .includes(newPerson.name)
  }

  // adds a new person to the Persons state
  // leading to re-rendering the component 
  function addNewPerson(newPerson) {
    const newPersonsList = persons.concat(newPerson)
    setPersons(newPersonsList)
    const EMPTY = ""
    setNewName(EMPTY)
    setNewPhoneNumber(EMPTY)
  }

  // used as a callback for the onChange event
  // in the name <input> field
  function handleNameChange(event) {
    setNewName(event.target.value)
  }
}
export default App