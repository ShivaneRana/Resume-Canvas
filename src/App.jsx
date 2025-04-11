import './App.css';
import Navbar from './components/navbar.jsx';
import Editor from './components/editor.jsx';
import Screen from './components/screen.jsx';
import { useState } from 'react';


function App() {
  const [resumeArray,setResumeArray] = useState();
  return (
    <div className='app'>
        <Navbar></Navbar>
        <div className='container'>
          <Editor></Editor> 
          <Screen></Screen>
        </div>
    </div>
  )
};

export default App;