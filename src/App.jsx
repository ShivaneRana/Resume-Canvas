import './App.css';
import Navbar from './components/navbar.jsx';
import Editor from './components/editor.jsx';
import Screen from './components/screen.jsx';


function App() {
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