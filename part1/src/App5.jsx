import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [searchName, setNewSearch] = useState("");

  const addPers = (event) => {
    event.preventDefault();
    const personExists = persons.some((person) => person.name === newName);
    if (personExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newObj = {
        name: newName,
        number: newNum,
      };
      setPersons(persons.concat(newObj));
      setNewName("");
      setNewNum("");
    }
  };

  const personSearch = searchName
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchName.toLowerCase())
      )
    : persons;

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    console.log(event.target.value);
    setNewNum(event.target.value);
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
    setNewSearch(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={searchName} onChange={handleSearch} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPers}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          number: <input value={newNum} onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personSearch.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
