import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import phone from "./services/phone";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [searchName, setNewSearch] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
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
      phone.create(newObj).then((returnedPhone) => {
        setPersons(persons.concat(returnedPhone));
        setNewName("");
        setNewNum("");
      });
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
  const handledelete = (id) => {
    if (window.confirm("Are you sure?")) {
      axios.delete(`http://localhost:3001/persons/${id}`).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
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
        {personSearch.map((person) => (
          <li key={person.id}>
            {person.name} - {person.number}{" "}
            <button onClick={() => handledelete(person.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
