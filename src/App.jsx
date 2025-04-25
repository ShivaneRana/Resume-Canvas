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
  const tempResume = { ...exampleTemplate, id: tempId };
  const [resumeList, updateResumeList] = useImmer([{ ...tempResume }]);
  const [activeResumeId, updateActiveResumeId] = useImmer(resumeList[0].id);
  const [length, setLength] = useState(resumeList.length);

  useEffect(() => {
    if (length !== 0) {
      const length = resumeList.length;
      const newId = resumeList[length - 1].id;
      changeActiveResumeId(newId);
    } else {
      addExampleResume();
      const newId = resumeList[length - 1].id;
      changeActiveResumeId(newId);
    }
  }, [length]);

  useEffect(() => {
    console.log("Current active Resume~");
    console.log(activeResumeId);
  }, [activeResumeId]);

  //return the index of the  active resume;
  function findIndex(id) {
    return resumeList.findIndex((resume) => resume.id === id);
  }

  // adding base resume to resumeList
  function addBaseResume() {
    const tempId = uuidv4();
    const tempResume = { ...baseTemplate, id: tempId };
    updateResumeList(draft => {
      draft.push(tempResume);
    });
    setLength(length + 1);
    console.log("base resume added");
  }

  // adding example resume to resumeList
  function addExampleResume() {
    const tempId = uuidv4();
    const tempResume = { ...exampleTemplate, id: tempId };
    updateResumeList(draft => {
      draft.push(tempResume);
    });
    setLength(length + 1);
    console.log("example resume added");
  }

  // printing entire resumeList
  function print() {
    console.log("printing.......");
    resumeList.map((resume) => {
      console.log(resume);
    });
  }

  // copying active resume
  function copyResume() {
    const currentIndex = findIndex(activeResumeId);
    const currentResume = resumeList[currentIndex];
    const tempId = uuidv4();
    const tempResume = { ...currentResume, id: tempId };
    updateResumeList([...resumeList, tempResume]);
    setLength(length + 1);
    console.log("create a copy of current activeResume");
  }

  function changeActiveResumeId(id) {
    const newIndex = findIndex(id);
    updateActiveResumeId(resumeList[newIndex].id);
    console.log("activeResumeId changed");
  }

  function changePersonalDetail(id, value ,field) {
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === id);
      if (resume) {
        resume.personalDetail[field] = value;
      }
    });
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
        changePersonalDetail,
        resumeList,
        activeResumeId,
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
    fullName: "Elena Martinez",
    email: "elena.martinez.dev@gmail.com",
    phoneNumber: "+1 (415) 987-2345",
    github: "https://github.com/elenamartinez",
    linkedIn: "https://www.linkedin.com/in/elenamartinez-dev",
    address: "2457 Oakridge Avenue, Oakland, CA 94601, USA",
    personalWebsite: "https://elenam.dev",
  },
  aboutMe:
    "Detail-oriented full-stack developer with over 6 years of experience designing and implementing modern web applications. Adept at building responsive front-ends using React and managing scalable APIs with Node.js and Express. Strong advocate for accessible design and test-driven development. Experienced in Agile workflows and collaborating with cross-functional teams to deliver user-focused solutions.",
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