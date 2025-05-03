//styles
import style from "../styles/project.module.css";

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

const internalContext = createContext();

function Project() {
  //this section is not expanded by default
  const [expanded, setExpanded] = useState(true); // false is default value true is temp
  const [dialogBoxState, setDialogBoxState] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(null);
  const context = useContext(resumeContext);

  useEffect(() => {
    // set these values to default
    setDialogBoxState(false);
    setCurrentTarget(null);

    // ensure that section is not hidden when new resume is displayed
    if (context.hiddenComponent.project === false) {
      context.changeHiddenComponent("project");
    }
  }, [context.activeResumeId]);

  // this ensure that if the dialogBox is opened it closes when expanding and shrinking content
  function toggleExpanded() {
    setExpanded(!expanded);
  }

  // exapand content when toggleing dialogBox state
  // without it may open but the content is shrunk,
  // making it look as if the function is not working.
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
        toggleExpanded,
        toggleDialogBoxState,
        changeCurrentTarget,
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
        <button onClick={() => interanal_context.toggleExpanded()}>
          <img alt="expand/collapse icon" src={icon} title={title}></img>
        </button>
        <h2 onClick={() => interanal_context.toggleExpanded()}>Project: </h2>
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
      {/* {interanal_context.dialogBoxState && <DialogBox></DialogBox>} */}
      <DialogBox></DialogBox>
    </div>
  );
}

function DisplayButton() {
  const internal_context = useContext(internalContext);
  const context = useContext(resumeContext);
  const [icon, setIcon] = useState(
    context.hiddenComponent.project ? hideIcon : showIcon,
  );
  const title = context.hiddenComponent.project
    ? "Hide section"
    : "Show section";

  useEffect(() => {
    setIcon(context.hiddenComponent.project ? hideIcon : showIcon);
  }, [context.hiddenComponent]);

  return (
    <div className={style.displayButtonDiv}>
      <button
        onClick={() => {
          if (internal_context.expanded === false) {
            internal_context.toggleExpanded();
          }

          if (internal_context.dialogBoxState === false) {
            internal_context.toggleDialogBoxState();
          }
        }}
      >
        <img alt="add icon" src={addIcon} title="Add project"></img>
      </button>
      <button
        onClick={() => {
          context.changeHiddenComponent("project");
        }}
        title={title}
      >
        <img alt="show/hide icon" src={icon}></img>
      </button>
    </div>
  );
}

function ShowArea() {
  const context = useContext(resumeContext);
  const internal_context = useContext(internalContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return(
  <div className={style.showArea}>
    {
      resume.project.map(item => {
          return <div className={style.tray} key={item.id}>
            <div onClick={() => {
              console.log(item.id) 
            }}>
              <h4>{item.projectTitle}</h4>
            </div>
            <button>
              <img src={deleteIcon}></img>
            </button> 
          </div>
       })
    }
  </div>
  );
}

function DialogBox() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return <div className={style.dialogBox}></div>;
}

export default Project;
