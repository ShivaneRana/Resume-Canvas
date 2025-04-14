//styles
import style from './App.module.css';

//components
import Navbar from './components/navbar.jsx';

function App() {
  return (
    <div className={style.mainContainer}>
        <Navbar></Navbar>
        <Content></Content>        
    </div>
  )
}

function Content(){
  return(
    <div className={style.content}>
     
    </div>
  )
}

export default App
