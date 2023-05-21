import React from "react";

export default function PersonList({ list, setList }) {

    
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {/*Table generator for people added*/}
        {list.map(({ id, personName, personOwing }) => (
          <React.Fragment key={id}>
            {personName.length ? (
              <ul className="list-group m-0">
                <li className="list-group-item d-flex l-500 justify-content-between align-items-center">
                  {personName}

                  <span className="badge badge-primary badge-pill">
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
    </>
  );
}
