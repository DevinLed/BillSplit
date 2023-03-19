import React from 'react'

export default function SelectPersonReceipt({personName}) {
  return (
    <>
     <div className="flex flex-col items-center justify-center">

              <div className="flex flex-col items-center justify-center">
                <h1>Split a bill with {personName}</h1>
                <ul class="list-group items-center justify-center">
                  <li>
                    <button class="btn btn-primary btn-lg mt-5" type="submit">
                      Manual
                    </button>
                  </li>
                  <li>
                    <button
                      class="btn btn-primary btn-lg mt-5 mb-5"
                      type="submit"
                    >
                      Picture
                    </button>
                  </li>
                </ul>
              </div>
            </div>
    
    
    </>
  )
}
