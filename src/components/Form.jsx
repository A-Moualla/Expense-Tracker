import React, { useRef, useState } from "react";

const Form = () => {
  const [anotherPerson, setAnotherPerson] = useState({ name: "aa", age: "12" });
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const person = {
    name: "",
    age: 0,
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    person.name = nameRef.current.value;
    person.age = ageRef.current.value;
    console.log(person);
    console.log(anotherPerson);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          ref={nameRef}
          onChange={(e) =>
            setAnotherPerson({ ...anotherPerson, name: e.target.value })
          }
          value={anotherPerson.name}
          id="name"
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          ref={ageRef}
          onChange={(e) =>
            setAnotherPerson({ ...anotherPerson, age: e.target.value })
          }
          value={anotherPerson.age}
          id="age"
          type="number"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
