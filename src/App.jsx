//styles
import style from "./App.module.css";

//components
import Navbar from "./components/navbar.jsx";
import Resume from "./components/resume.jsx";
import Editor from "./components/editor.jsx";
import {v4 as uuidv4} from 'uuid';
import { useState,useContext,createContext } from "react";

function App() {
  return (
    <div className={style.mainContainer}>
      <Navbar></Navbar>
      <Content></Content>
    </div>
  );
}



export let resumeContext = createContext();

function Content() {
  let [resumeList,setResumeList] = useState([]);
  let [activeResume,setActiveResume] = useState([]);

  //add new resume to the resume list
  function addNewResume(newResume){
    const newId = uuidv4();
    const tempList = [{id:newId,...resumeList}];
    tempList.push(newResume);
    setResumeList(tempList);
  }

  //responsible for changing current resume
  function changeActiveResume(newResume){
    const tempResume = newResume;
    setActiveResume(tempResume);
  }

  return (
    <resumeContext.Provider value={{addNewResume,changeActiveResume,activeResume,resumeList}}>
    <div className={style.content}>
      <Editor></Editor>
      <Resume></Resume>
    </div>
    </resumeContext.Provider>
  );
}

const exampleTemplate = {
  personalDetail: {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1 (123) 456-7890",
    github: "https://github.com/johndoe",
    linkedIn: "https://www.linkedin.com/in/johndoe",
    address: "123 Main Street, San Francisco, CA 94101, USA",
    personalWebsite: "https://johndoe.dev"
  },
  aboutMe: "Passionate full-stack developer with 5+ years of experience building responsive web applications and scalable backend systems. Skilled in JavaScript, React, Node.js, and cloud services. Committed to writing clean, efficient code and continuously learning new technologies."
};

const baseTemplate = {
    personalDetail:{
     fullName:"",
     email:"",
     phoneNumber:"",
     github:"",
     linkedIn:"",
     address:"",
     personalWebsite:"",
  },
    aboutMe:"",
}

export default App;