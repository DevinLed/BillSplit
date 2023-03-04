import React from "react";

export default function AddGroup({
  personName1,
  personPhone1,
  personEmail1,
  personOwing1,
  personName2,
  personPhone2,
  personEmail2,
  personOwing2,
  personName3,
  personPhone3,
  personEmail3,
  personOwing3,
  personName4,
  personPhone4,
  personEmail4,
  personOwing4,
  personName5,
  personPhone5,
  personEmail5,
  personOwing5,
  addPerson1,
  setAddPerson1,
  addPerson2,
  setAddPerson2,
  addPerson3,
  setAddPerson3,
  addPerson4,
  setAddPerson4,
  addPerson5,
  setAddPerson5,
  setPersonName1,
  setPersonPhone1,
  setPersonEmail1,
  setPersonOwing1,
  setPersonName2,
  setPersonPhone2,
  setPersonEmail2,
  setPersonOwing2,
  setPersonName3,
  setPersonPhone3,
  setPersonEmail3,
  setPersonOwing3,
  setPersonName4,
  setPersonPhone4,
  setPersonEmail4,
  setPersonOwing4,
  setPersonName5,
  setPersonPhone5,
  setPersonEmail5,
  setPersonOwing5,
  setAddGroup,
  addGroup,
  list,
  setList,
  setGroupName,
  handleSubmit,
}) {
  return (
    <>
      <div className="p-8 justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-49 focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          {/*content*/}
          <div className="border-8 border-black-500 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-evenly p-3 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">Add a Group</h3>
            </div>
            {/*body*/}

            <div className="justify-center col-11 m-3">
              <input
                className="bg-white"
                type="name"
                class="list-group-item list-group-item-action"
                placeholder="Group Name"
                onChange={(e) => setGroupName(e.target.value)}
              ></input>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="justify-center col-11 m-3">
                <input
                  className="bg-white"
                  type="name"
                  class="list-group-item list-group-item-action"
                  placeholder={personName1}
                  onClick={() => {
                    setAddPerson1(true);
                  }}
                ></input>
                <input
                  className="bg-white"
                  type="name"
                  class="list-group-item list-group-item-action"
                  placeholder={personName2}
                  onClick={() => {
                    setAddPerson2(true);
                  }}
                ></input>
                <input
                  className="bg-white"
                  type="name"
                  class="list-group-item list-group-item-action"
                  placeholder={personName3}
                  onClick={() => {
                    setAddPerson3(true);
                  }}
                ></input>
                <input
                  className="bg-white"
                  type="name"
                  class="list-group-item list-group-item-action"
                  placeholder={personName4}
                  onClick={() => {
                    setAddPerson4(true);
                  }}
                ></input>
                <input
                  className="bg-white"
                  type="name"
                  class="list-group-item list-group-item-action"
                  placeholder={personName5}
                  onClick={() => {
                    setAddPerson5(true);
                  }}
                ></input>
              </div>
            </form>
            {/*footer*/}
            <div className="flex items-center justify-end pb-6 px-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="justify-center mt-3 bg-blue-500 font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                onClick={() => setAddGroup(false)}
              >
                Close
              </button>
              <button
                className="justify-center mt-3 ml-2 bg-blue-500 font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-white transition-all duration-300"
                onClick={() => setAddGroup(false)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
