//styles
import style from "../styles/education.module.css";

// assets
import expandIcon from "../assets/images/expand.svg";
import shrinkICon from "../assets/images/shrink.svg";
import showIcon from "../assets/images/show.svg";
import hideIcon from "../assets/images/hide.svg";
import addIcon from "../assets/images/add.svg";
import closeIcon from "../assets/images/close.svg";

//components
import { useState, useEffect, createContext, useContext } from "react";
import { resumeContext } from "../App.jsx";

const internalContext = createContext();

function Education() {
  //this section is not expanded by default
  const [expanded, setExpanded] = useState(true); // false is default value true is temp
  const [dialogBoxState, setDialogBoxState] = useState(false);
  const [currentTarget,setCurrentTarget] = useState(null);
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

  function changeCurrentTarget(id){
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
      {/* {interanal_context.dialogBoxState && <DialogBox></DialogBox>} */}
      <DialogBox></DialogBox>
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
          if(internal_context.expanded === false){
            internal_context.toggleExpanded();
          }

          if(internal_context.dialogBoxState === false){
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
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return <div className={style.showArea}>

  </div>;
}

function DialogBox() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return <div className={style.dialogBox}>

  </div>;
}

export default Education;
