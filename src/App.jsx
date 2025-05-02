//styles
import style from "./App.module.css";

//components
import Navbar from "./components/navbar.jsx";
import Resume from "./components/resume.jsx";
import Editor from "./components/editor.jsx";
import { v4 as uuidv4 } from "uuid";
import { createContext } from "react";
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
  const tempId = uuidv4(); // temporary and only for initial creation
  const tempResume = { ...exampleTemplate, id: tempId }; // temporary and only for initail creation
  const [resumeList, updateResumeList] = useImmer([{ ...tempResume }]);
  const [activeResumeId, updateActiveResumeId] = useImmer(resumeList[0].id);
  const [hiddenComponent, updateHiddenComponent] = useImmer({
    personalDetail: true,
    aboutMe: true,
    skill: true,
    work: true,
    additional: true,
    project: true,
    education: true,
  });

  //toggle hidden component on/off based on previous value
  function changeHiddenComponent(field) {
    if (hiddenComponent[field] === undefined) {
      throw Error("field does not exist");
    } else {
      updateHiddenComponent((draft) => {
        draft[field] = !draft[field];
      });
    }
  }

  //return the index of the from id;
  function findIndex(id) {
    return resumeList.findIndex((resume) => resume.id === id);
  }

  // adding base resume to resumeList
  function addBaseResume() {
    const tempId = uuidv4();
    const tempResume = { ...baseTemplate, id: tempId };
    updateResumeList((draft) => {
      draft.push(tempResume);
      changeActiveResumeId(tempId);
    });
  }

  // adding example resume to resumeList
  function addExampleResume() {
    const tempId = uuidv4();
    const tempResume = { ...exampleTemplate, id: tempId };
    updateResumeList((draft) => {
      draft.push(tempResume);
      changeActiveResumeId(tempId);
    });
  }

  // printing entire resumeList
  function print() {
    console.log("printing.......");
    resumeList.map((resume) => {
      console.log(resume);
    });
  }

  // copying active resume and append to list
  function copyResume() {
    const currentIndex = findIndex(activeResumeId);
    const currentResume = resumeList[currentIndex];
    const tempId = uuidv4();
    const tempResume = { ...currentResume, id: tempId };
    updateResumeList((draft) => {
      draft.push(tempResume);
      changeActiveResumeId(tempId);
    });
  }

  // change active resume by calculating index based on id
  function changeActiveResumeId(id) {
    updateActiveResumeId(id);
  }

  function removeResume() {
    updateResumeList((draft) => {
      const index = findIndex(activeResumeId);
      if (index !== -1) {
        draft.splice(index, 1);

        if (draft.length > 0) {
          updateActiveResumeId(draft[draft.length - 1].id);
        } else {
          // Instead of leaving empty, push a new resume immediately
          const tempId = uuidv4();
          const tempResume = { ...baseTemplate, id: tempId };
          draft.push(tempResume);
          updateActiveResumeId(tempId);
        }
      }
    });
  }

  //clear existing resume
  function clearActiveResume() {
    const index = findIndex(activeResumeId);
    const tempId = uuidv4();
    const tempResume = { ...baseTemplate, id: tempId };
    updateResumeList((draft) => {
      draft.splice(index, 1, tempResume);
      changeActiveResumeId(tempId);
    });
  }

  // responsible for change value of all input field in personalDetail section
  function changePersonalDetail(id, value, field) {
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === id);
      if (resume) {
        resume.personalDetail[field] = value;
      }
    });
  }

  function changeAboutMe(id, value) {
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === id);
      if (resume) {
        resume.aboutMe = value;
      }
    });
  }

  function addSkillSet(id, newUUID) {
    const tempUUID = newUUID;
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === id);
      if (resume) {
        resume.skill.push({
          id: tempUUID,
          skillGroup: "",
          skillList: [],
        });
      }
    });
  }

  function removeSkillSet(id,UUID){
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === id);
      const index = resume.skill.findIndex(element => element.id === UUID);
      resume.skill.splice(index,1)
    });
  }

  function changeSkillGroup(id, uuid, value) {
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === id);
      const index = resume.skill.findIndex((element) => element.id === uuid);
      if (index !== -1) {
        resume.skill[index].skillGroup = value;
      }
    });
  }

  function changeSkillGroup(id,uuid,value){
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === id);
      const index = resume.skill.findIndex((element) => element.id === uuid);
      if (index !== -1) {
        resume.skill[index].skillGroup = value;
      }
    });
  }

  function changeSkillListItem(resumeId,skillUuid,valueUuid,value){
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === resumeId);
      const index = resume.skill.findIndex((element) => element.id === skillUuid);
      if (index !== -1) {
        const targetSkill = resume.skill[index].skillList.find(skill => skill.id === valueUuid);
        targetSkill.content = value;
      }
    });
  }

  function deleteSkillListItem(resumeId,skillUuid,valueUuid){
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === resumeId);
      //index of the targeted skillSet
      const index = resume.skill.findIndex(element => element.id === skillUuid);
      const targetSkillItemIndex = resume.skill[index].skillList.findIndex(skill => skill.id === valueUuid);
      console.log(targetSkillItemIndex);
      resume.skill[index].skillList.splice(targetSkillItemIndex,1);
    });
  }

  function addNewSkillListItem(resumeId,skillUuid,value){
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === resumeId);
      const index = resume.skill.findIndex((element) => element.id === skillUuid);
      if (index !== -1) {
        resume.skill[index].skillList.push(value);
      }
    });
  }
  
  return (
    <resumeContext.Provider
      value={{
        findIndex,
        hiddenComponent,
        changeHiddenComponent,
        addExampleResume,
        addBaseResume,
        copyResume,
        print,
        changeActiveResumeId,
        removeResume,
        clearActiveResume,
        changePersonalDetail,
        changeAboutMe,
        addSkillSet,
        changeSkillGroup,
        changeSkillListItem,
        deleteSkillListItem,
        removeSkillSet,
        addNewSkillListItem,
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
  skill: [
    {
      id: uuidv4(),
      skillGroup: "Technical Skill",
      skillList: [
        { id: uuidv4(), content: "Github" },
        { id: uuidv4(), content: "Git" },
        { id: uuidv4(), content: "Vscode" },
        { id: uuidv4(), content: "Kubernetes" },
        { id: uuidv4(), content: "docker" },
      ],
    },
    {
      id: uuidv4(),
      skillGroup: "Frontend Skill",
      skillList: [
        { id: uuidv4(), content: "GSAP" },
        { id: uuidv4(), content: "React" },
        { id: uuidv4(), content: "Nest.js" },
        { id: uuidv4(), content: "angular" },
        { id: uuidv4(), content: "vue" },
      ],
    },
    {
      id: uuidv4(),
      skillGroup: "Backend Skill",
      skillList: [
        { id: uuidv4(), content: "SQL" },
        { id: uuidv4(), content: "Nosql" },
        { id: uuidv4(), content: "mongodb" },
        { id: uuidv4(), content: "express.js" },
        { id: uuidv4(), content: "posgresSQL" },
      ],
    },
  ],
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
  skill: [],
};

export default App;
