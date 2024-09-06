import { useState } from 'react';
import './App.css';
import { LC, UC, NC, SC } from './Data/PassChar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';   

function App() {
  let [passLen, setPassLen] = useState(8);
  let [uppercase, setUppercase] = useState(false);
  let [lowercase, setLowercase] = useState(false);
  let [num, setNum] = useState(false);
  let [symbol, setSymbol] = useState(false);
  let [fPass, setFPass] = useState('');
  let [copySuccess, setCopySuccess] = useState(false);

  let createPass = () => {
    let finalPass = '';
    let charSet = '';
    if (uppercase || lowercase || num || symbol) {
      if (uppercase) charSet += UC;
      if (lowercase) charSet += LC;
      if (num) charSet += NC;
      if (symbol) charSet += SC;

      for (let i = 0; i < passLen; i++) {
        finalPass += charSet.charAt(Math.floor(Math.random() * charSet.length));
      }
      setFPass(finalPass);
    } 
    else {
      toast.error("Please check at least one checkbox!");
    }
  }

  let copyPass = () => {
    navigator.clipboard.writeText(fPass);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000); // Hide message after 2 seconds
  }

  return (
    <>
    <ToastContainer className="custom-toast-container" />

      <div className='passBox'>
        <h2>Password Generator</h2>
        <div className='passBoxInp'>
          <input type='text' value={fPass} readOnly />
          <button onClick={copyPass}>Copy</button>
        </div>
        {copySuccess && <p className='copyFeedback'>Password copied!</p>}
        <div className='passLength'>
          <label>Password Length</label>
          <input type='number' value={passLen} onChange={(event) => setPassLen(event.target.value)} min={8} max={20} />
        </div>
        <div className='passLength'>
          <label>Include Uppercase Letters</label>
          <input type='checkbox' checked={uppercase} onChange={() => setUppercase(!uppercase)} />
        </div>
        <div className='passLength'>
          <label>Include Lowercase Letters</label>
          <input type='checkbox' checked={lowercase} onChange={() => setLowercase(!lowercase)} />
        </div>
        <div className='passLength'>
          <label>Include Numbers</label>
          <input type='checkbox' checked={num} onChange={() => setNum(!num)} />
        </div>
        <div className='passLength'>
          <label>Include Symbols</label>
          <input type='checkbox' checked={symbol} onChange={() => setSymbol(!symbol)} />
        </div>
        <button className='btn' onClick={createPass}>Generate Password</button>
      </div>
    </>
  );
}

export default App;
