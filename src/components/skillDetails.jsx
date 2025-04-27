//styles
import style from "../styles/skillDetails.module.css";

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
import { v4 as uuidv4 } from "uuid";

const internalContext = createContext();

function SkillDetails() {
  //this section is not expanded by default
  const [expanded, setExpanded] = useState(false);
  const [dialogBoxState, setDialogBoxState] = useState(false);

  // this ensure that if the dialogBox is opened it closes when expanding and shrinking content
  function toggleExpanded() {
    if (dialogBoxState === true) {
      toggleDialogBoxState();
    }
    setExpanded(!expanded);
  }

  // exapand content when toggleing dialogBox state
  // without it may open but the content is shrunk,
  // making it look as if the function is not working.
  function toggleDialogBoxState() {
    if (expanded === false) {
      toggleExpanded();
    }
    setDialogBoxState(!dialogBoxState);
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
  const context = useContext(internalContext);
  let icon = context.expanded ? shrinkICon : expandIcon;
  let title = context.expanded ? "Show less" : "Show more";

  return (
    <div className={style.header}>
      <div>
        <button onClick={context.toggleExpanded}>
          <img alt="expand/collapse icon" src={icon} title={title}></img>
        </button>
        <h2 onClick={context.toggleExpanded}>Skills: </h2>
      </div>
      <DisplayButton></DisplayButton>
    </div>
  );
}

function Content() {
  const context = useContext(internalContext);
  const mainContext = useContext(resumeContext);
  const index = mainContext.findIndex(mainContext.activeResumeId);
  const resume = mainContext.resumeList[index];

  return (
    <div className={style.content}>
      <div className={style.showArea}>
        {resume.skill.map((item) => {
          return (
            <div key={uuidv4()} className={style.tray}>
              <h4>{item[0] + " => "}</h4>
              <div>
                {item.slice(1).map((item, index) => {
                  return <p key={uuidv4()}>{index + 1 + "." + item}</p>;
                })}
              </div>
            </div>
          );
        })}
      </div>
      {context.dialogBoxState && <DialogBox></DialogBox>}
    </div>
  );
}

function DisplayButton() {
  const dialogBoxContext = useContext(internalContext);
  const context = useContext(resumeContext);
  const [icon, setIcon] = useState(
    context.hiddenComponent.skill ? hideIcon : showIcon,
  );
  const title = context.hiddenComponent.skill ? "Hide section" : "Show section";

  useEffect(() => {
    setIcon(context.hiddenComponent.skill ? hideIcon : showIcon);
  }, [context.hiddenComponent]);

  return (
    <div className={style.displayButtonDiv}>
      <button
        onClick={() => {
          dialogBoxContext.toggleDialogBoxState();
        }}
      >
        <img alt="add icon" src={addIcon} title="Add skill group"></img>
      </button>
      <button
        onClick={() => {
          context.changeHiddenComponent("skill");
        }}
        title={title}
      >
        <img alt="show/hide icon" src={icon}></img>
      </button>
    </div>
  );
}

function DialogBox() {
  return <div className={style.dialogBox}></div>;
}

export default SkillDetails;
