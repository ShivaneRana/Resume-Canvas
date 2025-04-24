//styles
import style from "./App.module.css";

//components
import Navbar from "./components/navbar.jsx";
import Resume from "./components/resume.jsx";
import Editor from "./components/editor.jsx";
import { v4 as uuidv4 } from "uuid";
import { useState, createContext, useEffect } from "react";
import { useImmer } from "use-immer";

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
  const tempId = uuidv4();
  const tempResume = {...exampleTemplate,id:tempId};
  const [resumeList,updateResumeList] = useImmer([{...tempResume}]);
  const [activeResumeId,updateActiveResumeId] = useImmer(resumeList[0].id);

  useEffect(() => {
    const length = resumeList.length;
    const newId = resumeList[length - 1].id;
    changeActiveResumeId(newId);
  },[resumeList])

  useEffect(() => {
    console.log("Current active Resume~")
    console.log(activeResumeId);
  },[activeResumeId])

  //return the index of the  active resume;
  function findIndex(id){
    return resumeList.findIndex(resume => resume.id === id);
  }

  // adding base resume to resumeList
  function addBaseResume(){
   const tempId = uuidv4();
   const tempResume = {...baseTemplate,id:tempId};
   updateResumeList([...resumeList,tempResume]);
    console.log("base resume added");
  }

  // adding example resume to resumeList
  function addExampleResume(){
   const tempId = uuidv4();
   const tempResume = {...exampleTemplate,id:tempId};
   updateResumeList([...resumeList, tempResume]);
   console.log("example resume added");
  }
    
  // printing entire resumeList
  function print(){
    console.log("printing.......")
    resumeList.map(resume => {
      console.log(resume);
    })
  }

  // copying active resume
  function copyResume(){
    const currentIndex = findIndex(activeResumeId);
    const currentResume = resumeList[currentIndex];
    const tempId = uuidv4();
    const tempResume = {...currentResume,id:tempId};
    updateResumeList([...resumeList, tempResume]);
    console.log("create a copy of current activeResume")
  }

  function changeActiveResumeId(id){
    const newIndex = findIndex(id);
    updateActiveResumeId(resumeList[newIndex].id);
    console.log("activeResumeId changed")
  }

  function changeName(id,value){
    updateResumeList((draft) => {
      const resume = draft.find(item => item.id === id);
      if(resume){
        resume.personalDetail.fullName = value;
      }
    })
  }

  console.log("Content component rendered");
  return (
    <resumeContext.Provider
      value={{
      findIndex,
      addExampleResume,
      addBaseResume,
      copyResume,
      print,
      changeActiveResumeId,
      changeName,
      resumeList,
      activeResumeId
      }}
    >
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
    personalWebsite: "https://johndoe.dev",
  },
  aboutMe:
    "Passionate full-stack developer with 5+ years of experience building responsive web applications and scalable backend systems. Skilled in JavaScript, React, Node.js, and cloud services. Committed to writing clean, efficient code and continuously learning new technologies.",
};

const baseTemplate = {
  personalDetail: {
    fullName: "",
    email: "",
    phoneNumber: "",
    github: "",
    linkedIn: "",
    address: "",
    personalWebsite: "",
  },
  aboutMe: "",
};

export default App;
