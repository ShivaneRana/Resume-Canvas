//styles
import style from "./App.module.css";

//components
import Navbar from "./components/navbar.jsx";
import Resume from "./components/resume.jsx";
import Editor from "./components/editor.jsx";

function App() {
  return (
    <div className={style.mainContainer}>
      <Navbar></Navbar>
      <Content></Content>
    </div>
  );
}

function Content() {
  return (
    <div className={style.content}>
      <Editor></Editor>
      <Resume></Resume>
    </div>
  );
}

export default App;
