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

  function removeSkillSet(id, UUID) {
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === id);
      const index = resume.skill.findIndex((element) => element.id === UUID);
      resume.skill.splice(index, 1);
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

  function changeSkillGroup(id, uuid, value) {
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === id);
      const index = resume.skill.findIndex((element) => element.id === uuid);
      if (index !== -1) {
        resume.skill[index].skillGroup = value;
      }
    });
  }

  function changeSkillListItem(resumeId, skillUuid, valueUuid, value) {
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === resumeId);
      const index = resume.skill.findIndex(
        (element) => element.id === skillUuid,
      );
      if (index !== -1) {
        const targetSkill = resume.skill[index].skillList.find(
          (skill) => skill.id === valueUuid,
        );
        targetSkill.content = value;
      }
    });
  }

  function deleteSkillListItem(resumeId, skillUuid, valueUuid) {
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === resumeId);
      //index of the targeted skillSet
      const index = resume.skill.findIndex(
        (element) => element.id === skillUuid,
      );
      const targetSkillItemIndex = resume.skill[index].skillList.findIndex(
        (skill) => skill.id === valueUuid,
      );
      console.log(targetSkillItemIndex);
      resume.skill[index].skillList.splice(targetSkillItemIndex, 1);
    });
  }

  function addNewSkillListItem(resumeId, skillUuid, value) {
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === resumeId);
      const index = resume.skill.findIndex(
        (element) => element.id === skillUuid,
      );
      if (index !== -1) {
        resume.skill[index].skillList.push(value);
      }
    });
  }

  function deleteProject(resumeId, projectId) {
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === resumeId);
      const index = resume.project.findIndex(
        (element) => element.id === projectId,
      );
      if (index !== -1) {
        resume.project.splice(index, 1);
      }
    });
  }

  function addProject(resumeId, newUUID) {
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === resumeId);
      if (resume) {
        resume.project.push({
          id: newUUID,
          projectTitle: "",
          doc: "",
          summary: "",
          link: "",
          featureList: [],
        });
      }
    });
  }

  function changeProjectFeature(resumeId, uuid, valueUUID, value) {
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === resumeId);
      if (resume) {
        const index = resume.project.findIndex(
          (element) => element.id === uuid,
        );
        const targetFeatureIndex = resume.project[index].featureList.findIndex(
          (feature) => feature.id === valueUUID,
        );
        resume.project[index].featureList[targetFeatureIndex].content = value;
      }
    });
  }

  function deleteProjectFeature(resumeId, uuid, valueUUID) {
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === resumeId);
      if (resume) {
        const index = resume.project.findIndex(
          (element) => element.id === uuid,
        );
        const targetFeatureIndex = resume.project[index].featureList.findIndex(
          (feature) => feature.id === valueUUID,
        );
        resume.project[index].featureList.splice(targetFeatureIndex, 1);
      }
    });
  }

  function addNewFeature(resumeId, uuid) {
    const tempid = uuidv4();
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === resumeId);
      if (resume) {
        const index = resume.project.findIndex(
          (element) => element.id === uuid,
        );
        resume.project[index].featureList.push({
          id: tempid,
          content: "",
        });
      }
    });
  }

  function changeProjectDetail(resumeId, uuid, targetKey, value) {
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === resumeId);
      if (resume) {
        const index = resume.project.findIndex(
          (element) => element.id === uuid,
        );
        const targetProject = resume.project[index];
        targetProject[targetKey] = value;
      }
    });
  }

  function changeWorkDetail(resumeId, uuid, targetKey, value) {
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === resumeId);
      if (resume) {
        const index = resume.work.findIndex((element) => element.id === uuid);
        const targetWork = resume.work[index];
        targetWork[targetKey] = value;
      }
    });
  }

  function addNewAccomplishment(resumeId, uuid) {
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === resumeId);
      if (resume) {
        const index = resume.work.findIndex((element) => element.id === uuid);
        resume.work[index].list.push({
          id: uuidv4(),
          content: "",
        });
      }
    });
  }

  function changeAccomplishment(resumeId, uuid, valueUUID, value) {
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === resumeId);
      if (resume) {
        const index = resume.work.findIndex((element) => element.id === uuid);
        const targetIndex = resume.work[index].list.findIndex(
          (acc) => acc.id === valueUUID,
        );
        resume.work[index].list[targetIndex].content = value;
      }
    });
  }

  function deleteAccomplishment(resumeId, uuid, valueUUID) {
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === resumeId);
      if (resume) {
        const index = resume.work.findIndex((element) => element.id === uuid);
        const targetIndex = resume.work[index].list.findIndex(
          (acc) => acc.id === valueUUID,
        );
        resume.work[index].list.splice(targetIndex, 1);
      }
    });
  }

  function deleteWork(resumeId, uuid) {
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === resumeId);
      if (resume) {
        const index = resume.work.findIndex((element) => element.id === uuid);
        resume.work.splice(index, 1);
      }
    });
  }

  function addWork(resumeId, uuid) {
    updateResumeList((draft) => {
      const resume = draft.find((item) => item.id === resumeId);
      if (resume) {
        resume.work.push({
          id: uuid,
          company: "",
          startDate: "",
          endDate: "",
          position: "",
          list: [],
        });
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
        deleteProject,
        addProject,
        changeProjectFeature,
        deleteProjectFeature,
        addNewFeature,
        changeProjectDetail,
        changeWorkDetail,
        addNewAccomplishment,
        deleteAccomplishment,
        changeAccomplishment,
        deleteWork,
        addWork,
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
  project: [
    {
      id: uuidv4(),
      projectTitle: "DevConnect",
      doc: "12th April 2023",
      link: "https://devconnect.app",
      featureList: [
        {
          id: uuidv4(),
          content: "Built with React, Node.js, Express, and MongoDB.",
        },
        {
          id: uuidv4(),
          content: "Implemented authentication with JWT and OAuth.",
        },
        {
          id: uuidv4(),
          content: "Designed responsive UI with accessibility best practices.",
        },
      ],
    },
    {
      id: uuidv4(),
      projectTitle: "EcoTrack",
      doc: "1st september 2020",
      link: "https://ecotrack.io",
      featureList: [
        {
          id: uuidv4(),
          content: "Created interactive charts using D3.js and Chart.js.",
        },
        {
          id: uuidv4(),
          content: "Developed RESTful APIs with Express and PostgreSQL.",
        },
        {
          id: uuidv4(),
          content:
            "Integrated Google Maps API to visualize user footprint data.",
        },
      ],
    },
  ],
  work: [
    {
      id: uuidv4(),
      company: "TechSphere Inc.",
      position: "Senior Full-Stack Developer",
      startDate: "March 2021",
      endDate: "Present",
      address: "San Francisco, CA, USA",
      list: [
        {
          id: uuidv4(),
          content:
            "Led the development of a scalable internal tool using React, Node.js, and PostgreSQL, reducing operational workload by 30%.",
        },
        {
          id: uuidv4(),
          content:
            "Introduced automated testing (Jest, Cypress), increasing test coverage from 40% to 85% and improving release reliability.",
        },
        {
          id: uuidv4(),
          content:
            "Collaborated cross-functionally with design, product, and DevOps teams to implement CI/CD pipelines and optimize deployment workflows.",
        },
      ],
    },
  ],
  additional: [
    {
      id: uuidv4(),
      category: "Certifications",
      itemList: [
        {
          id: uuidv4(),
          content: "AWS Certified Solutions Architect – Associate (2023)",
        },
        {
          id: uuidv4(),
          content: "Certified Kubernetes Administrator (CKA) – 2022",
        },
        {
          id: uuidv4(),
          content: "Scrum Alliance Certified ScrumMaster® (CSM) – 2021",
        },
      ],
    },
    {
      id: uuidv4(),
      category: "Languages",
      itemList: [
        {
          id: uuidv4(),
          content: "Fluent in English  ",
        },
        {
          id: uuidv4(),
          content: "Fluent in Spanish",
        },
      ],
    },
  ],
  education: [
    {
      id: uuidv4(),
      name: "University of California, Berkeley",
      gpa: "3.85",
      startDate: "August 2014",
      endDate: "May 2018",
      course: "B.Sc. in Computer Science",
    },
    {
      id: uuidv4(),
      name: "Stanford University",
      gpa: "3.92",
      startDate: "September 2019",
      endDate: "June 2021",
      course: "M.Sc. in Software Engineering",
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
  project: [],
  work: [],
  additional: [],
  education: [],
};

export default App;
