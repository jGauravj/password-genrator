import { useState, useCallback, useEffect, useRef } from "react";
import { IoCopy } from "react-icons/io5";
import { IoMdDoneAll } from "react-icons/io";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copyBtn, setCopyBtn] = useState(<IoCopy />)

  //ref hook

  const passwordRef = useRef(null);

  const passwordGenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_-+={}[]~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenrator();
  }, [length, numberAllowed, charAllowed, passwordGenrator]);


  const copyPasswordTOClipboard = useCallback(() => {
    setCopyBtn(<IoMdDoneAll />)
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  } , [password])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-ms rounded-lg  px-4 py-5 my-8 text-orange-500 bg-gray-700 ">
        <h1 className="text-2xl text-center text-white">Password Genrator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 mt-3">
          <input
            type="text"
            value={password}
            className="outline-non  w-full px-3 py-2"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordTOClipboard}
            className="Outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            {copyBtn}
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="characterInput"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
