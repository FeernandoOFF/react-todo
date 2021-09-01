import React from "react";
export function Modal(props) {

  // console.log(props.options)
  let response = props.options.inputs.map((input,i) => {
    let temp="";
    !!props.options.defaultValue? temp=props.options.defaultValue[i]: temp =""
    let [res, setRes] = React.useState(temp);
    return [res, setRes];
  });
  return (
    <div className="x text-gray-800 dark:text-white">
      <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
        <div className="modal-overlay absolute w-full h-full bg-primary-light dark:bg-primary-dark"></div>

        <div className="modal-container bg-secondary-light dark:bg-secondary-dark w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-sm z-50" 
          onClick={
            props.closeModal
              ? props.closeModal
              : () => console.log("Pls Send a 'closeModal' Event ")
          }>
            <svg
              className="fill-current text-gray-800 dark:text-white"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </div>

          <div className="modal-content py-4 text-left px-6">
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-bold">
                {props.options.title ? props.options.title : "Modal Title(LINE 24)"}{" "}
              </p>
              <div
                className="modal-close cursor-pointer z-50"
                onClick={
                  props.closeModal
                    ? props.closeModal
                    : () => console.log("Pls Send a 'closeModal' Event ")
                }
              >
                <svg
                  className="fill-current text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
              </div>
            </div>

            {props.options.inputs.map((input, i) => {
              return (
                <div
                  className="w-10/12 my-4 mx-auto flex flex-col "
                  key={input}
                >
                  <span>{input} </span>
                  <textarea
                    type="text"
                    onChange={(e) => response[i][1](e.target.value)}
                    name={input}
                    defaultValue={response[i][0]}
                    className="w-full rounded p-2 text-gray-800"
                    placeholder={input}
                  />
                </div>
              );
            })}

            <div className="flex justify-end pt-2">
              <button
                onClick={
                  props.closeModal
                    ? props.closeModal
                    : () => console.log("Pls Send a 'closeModal' Event ")
                }
                className="cursor-pointer modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
              >
                Close
              </button>
              <button
                onClick={
                  props.acceptModal
                    ? () => props.acceptModal(response,props.options.mode,props.options.id)
                    : () => console.log("Pls Send a 'acceptModal' Event ")
                }
                className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
