//styles
import style from "../styles/additional.module.css";

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

function Additional() {
  //this section is not expanded by default
  const [expanded, setExpanded] = useState(false); // false is default value true is temp
  const [dialogBoxState, setDialogBoxState] = useState(false);
  const [currentTarget,setCurrentTarget] = useState(null);
  const context = useContext(resumeContext);

  useEffect(() => {
    changeCurrentTarget(null)
    setDialogBoxState(false);

    // ensure that section is not hidden when new resume is displayed
    if (context.hiddenComponent.additional === false) {
      context.changeHiddenComponent("additional");
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
        <h2 onClick={interanal_context.toggleExpanded}>Additional: </h2>
      </div>
      <DisplayButton></DisplayButton>
    </div>
  );
}

function Content() {
  const internal_context = useContext(internalContext);

  return (
    <div className={style.content}>
      <ShowArea></ShowArea>
      {internal_context.dialogBoxState && <DialogBox></DialogBox>}
    </div>
  );
}

function DisplayButton() {
  const internal_context = useContext(internalContext);
  const context = useContext(resumeContext);
  const [icon, setIcon] = useState(
    context.hiddenComponent.additional ? hideIcon : showIcon,
  );
  const title = context.hiddenComponent.additional
    ? "Hide section"
    : "Show section";

  useEffect(() => {
    setIcon(context.hiddenComponent.additional ? hideIcon : showIcon);
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
        title="Add additional information"
      >
        <img alt="add icon" src={addIcon}></img>
      </button>
      <button
        onClick={() => {
          context.changeHiddenComponent("additional");
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

  </div>;
}

function DialogBox() {
  const internal_context = useContext(internalContext);
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];


  return <div className={style.dialogBox}></div>;
}

function InputDiv(){
  return <div className={style.inputDiv}>

  </div>
}

export default Additional;
