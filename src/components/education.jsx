//styles
import style from "../styles/education.module.css";

// assets
import expandIcon from "../assets/images/expand.svg";
import shrinkICon from "../assets/images/shrink.svg";
import showIcon from "../assets/images/show.svg";
import hideIcon from "../assets/images/hide.svg";
import addIcon from "../assets/images/add.svg";
import closeIcon from "../assets/images/close.svg";
import deleteIcon from "../assets/images/delete.svg";

//components
import { useState, useEffect, createContext, useContext } from "react";
import { resumeContext } from "../App.jsx";
import { v4 as uuidv4 } from "uuid";

const internalContext = createContext();

function Education() {
  //this section is not expanded by default
  const [expanded, setExpanded] = useState(true); // false is default value true is temp
  const [dialogBoxState, setDialogBoxState] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(null);
  const context = useContext(resumeContext);

  useEffect(() => {
    setCurrentTarget(null);
    setDialogBoxState(false);

    // ensure that section is not hidden when new resume is displayed
    if (context.hiddenComponent.education === false) {
      context.changeHiddenComponent("education");
    }
  }, [context.activeResumeId]);

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  function toggleDialogBoxState() {
    setDialogBoxState(!dialogBoxState);
  }

  function changeCurrentTarget(id) {
    setCurrentTarget(id);
  }

  return (
    <internalContext.Provider
      value={{
        expanded,
        dialogBoxState,
        currentTarget,
        changeCurrentTarget,
        toggleExpanded,
        toggleDialogBoxState,
      }}
    >
      <div className={style.mainContainer}>
        <Header></Header>
        {expanded && <Content></Content>}
      </div>
    </internalContext.Provider>
  );
}

function Header() {
  const interanal_context = useContext(internalContext);
  let icon = interanal_context.expanded ? shrinkICon : expandIcon;
  let title = interanal_context.expanded ? "Show less" : "Show more";

  return (
    <div className={style.header}>
      <div>
        <button onClick={interanal_context.toggleExpanded}>
          <img alt="expand/collapse icon" src={icon} title={title}></img>
        </button>
        <h2 onClick={interanal_context.toggleExpanded}>Education: </h2>
      </div>
      <DisplayButton></DisplayButton>
    </div>
  );
}

function Content() {
  const interanal_context = useContext(internalContext);

  return (
    <div className={style.content}>
      <ShowArea></ShowArea>
      {interanal_context.dialogBoxState && <DialogBox></DialogBox>}
    </div>
  );
}

function DisplayButton() {
  const internal_context = useContext(internalContext);
  const context = useContext(resumeContext);
  const [icon, setIcon] = useState(
    context.hiddenComponent.education ? hideIcon : showIcon,
  );
  const title = context.hiddenComponent.education
    ? "Hide section"
    : "Show section";

  useEffect(() => {
    setIcon(context.hiddenComponent.education ? hideIcon : showIcon);
  }, [context.hiddenComponent]);

  return (
    <div className={style.displayButtonDiv}>
      <button
        onClick={() => {
          const UUID = uuidv4();
          context.addEducation(context.activeResumeId,UUID);
          internal_context.changeCurrentTarget(UUID);
          if (internal_context.expanded === false) {
            internal_context.toggleExpanded();
          }

          if (internal_context.dialogBoxState === false) {
            internal_context.toggleDialogBoxState();
          }
        }}
      >
        <img alt="add icon" src={addIcon} title="Add Education"></img>
      </button>
      <button
        onClick={() => {
          context.changeHiddenComponent("education");
        }}
        title={title}
      >
        <img alt="show/hide icon" src={icon}></img>
      </button>
    </div>
  );
}

function ShowArea() {
  const internal_context = useContext(internalContext);
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return <div className={style.showArea}>
    {
      resume.education.map((item,itemIndex) => {
        return <div
        key={item.id}
        className={style.tray}
        >
          <div
          className={internal_context.currentTarget === item.id ? style.selected : ""}
          onClick={() => {
                internal_context.changeCurrentTarget(item.id);
                if (internal_context.expanded === false) {
                  internal_context.toggleExpanded();
                }

                if (internal_context.dialogBoxState === false) {
                  internal_context.toggleDialogBoxState();
                }
              }}
          >
            <h4>{(itemIndex+1)+"."+item.name}</h4>
          </div>
          <button title="Delete Record"
          onClick={() => {
            context.deleteEducation(context.activeResumeId,item.id);
          }}
          >
            <img src={deleteIcon} alt="delete icon"></img>
          </button>
        </div>
      })
    }
  </div>;
}

function DialogBox() {
  const internal_context = useContext(internalContext);
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  const currentEducation = resume.education.filter(
    (item) => item.id === internal_context.currentTarget,
  )[0];
  if (!currentEducation) return null;

  return (
    <div className={style.dialogBox}>
      <div className={style.topDiv}>
        <div>
          <h4>Institution: </h4>
          <label htmlFor="institution"></label>
          <input
          value={currentEducation.name}
          onChange={(e) => {
            context.changeEducation(context.activeResumeId,currentEducation.id,"name",e.target.value);
          }}
          name="institution" placeholder="Enter institution"></input>
        </div>
        <div>
          <h4>Course: </h4>
          <label htmlFor="course"></label>
          <input
          value={currentEducation.course}

          onChange={(e) => {
            context.changeEducation(context.activeResumeId,currentEducation.id,"course",e.target.value);
          }}
          name="course" placeholder="Enter course"></input>
        </div>
        <div>
          <h4>Major: </h4>
          <label htmlFor="major"></label>
          <input
          value={currentEducation.major}

          onChange={(e) => {
            context.changeEducation(context.activeResumeId,currentEducation.id,"major",e.target.value);
          }}
          name="major" placeholder="Enter major"></input>
        </div>
        {/* holds entire start and end date */}
        <div className={style.dateDiv}>
          <div>
            <h4>Start date: </h4>
            <label htmlFor="startDate"></label>
            <input
            value={currentEducation.startDate}

          onChange={(e) => {
            context.changeEducation(context.activeResumeId,currentEducation.id,"startDate",e.target.value);
          }}
            name="startDate" placeholder="Enter start date"></input>
          </div>
          <div>
            <h4>End date: </h4>
            <label htmlFor="endDate"></label>
            <input
            value={currentEducation.endDate}

          onChange={(e) => {
            context.changeEducation(context.activeResumeId,currentEducation.id,"endDate",e.target.value);
          }}
            name="endDate" placeholder="Enter end date"></input>
          </div>
        </div>
        <div>
          <h4>GPA: </h4>
          <label htmlFor="gpa"></label>
          <input
          value={currentEducation.gpa}

          onChange={(e) => {
            context.changeEducation(context.activeResumeId,currentEducation.id,"gpa",e.target.value);
          }}
          name="gpa" placeholder="Enter gpa"></input>
        </div>
      </div>
      <div className={style.bottomDiv}>
        <button title="close"
        onClick={() => {
          internal_context.toggleDialogBoxState();
        }}
        >
          <img src={closeIcon} alt="close icon"></img>
        </button>
      </div>
    </div>
  );
}

export default Education;
