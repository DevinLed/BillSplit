import React,{useState} from "react";
import { v4 as uuidv4 } from "uuid";

export default function PersonList({personName, personPhone, personEmail, personOwing, setPersonName, setPersonPhone, setPersonEmail, setPersonOwing}) {

    
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [total, setTotal] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItems = {
      personName,
      personPhone,
      personEmail,
      personOwing,
      id: uuidv4(),
    };
    setPersonName("");
    setPersonPhone("");
    setPersonEmail("");
    setPersonOwing("");
    setList([...list, newItems]);
    setIsEditing(false);
    console.log(personName);
    console.log(personPhone);
    console.log(personEmail);
    console.log(personOwing);
  }


  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center">
        {/*Table generator for people added*/}
        {list.map(({ id, personName, personOwing }) => (
          <React.Fragment key={id}>
            {personName.length ? (
              <ul class="list-group m-0">
                <li class="list-group-item d-flex l-500 justify-content-between align-items-center">
                  {personName}

                  <span class="badge badge-primary badge-pill">
                    {personOwing}
                  </span>
                </li>
              </ul>
            ) : (
              ""
            )}
          </React.Fragment>
        ))}
      </div>
      </form>
    </>
  );
}
