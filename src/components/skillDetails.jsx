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

const internalContext = createContext();

function SkillDetails() {
  //this section is not expanded by default
  const [expanded, setExpanded] = useState(true); // false is default value true is temp
  const [dialogBoxState, setDialogBoxState] = useState(false);
  const context = useContext(resumeContext);

  useEffect(() => {
    // ensure that the skill section is not expanded while switching resume
    //temp
    // if (expanded === true) {
    //   toggleExpanded();
    // }

    // ensure that section is not hidden when new resume is displayed
    if (context.hiddenComponent.skill === false) {
      context.changeHiddenComponent("skill");
    }
  }, [context.activeResumeId]);

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
  const interanal_context = useContext(internalContext);
  let icon = interanal_context.expanded ? shrinkICon : expandIcon;
  let title = interanal_context ? "Show less" : "Show more";

  return (
    <div className={style.header}>
      <div>
        <button onClick={interanal_context.toggleExpanded}>
          <img alt="expand/collapse icon" src={icon} title={title}></img>
        </button>
        <h2 onClick={interanal_context.toggleExpanded}>Skills: </h2>
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
      {/* temp */}
      {/* {interanal_context.dialogBoxState && <DialogBox></DialogBox>} */}
      <DialogBox></DialogBox>
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

function ShowArea() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return (
    <div className={style.showArea}>
      {resume.skill.map((item) => {
        return (
          <div key={item.id} className={style.tray}>
            <h3>{item.skillGroup + ": "}</h3>
            {item.skillList.map((element, index) => {
              return (
                <p key={element + index + element}>
                  {index + 1 + "." + element}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function DialogBox() {
  const interanal_context = useContext(internalContext);
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return (
    <div className={style.dialogBox}>
      <div className={style.topDiv}>
        <h3>Skill group: </h3>
        <label htmlFor="skillgroup"></label>
        <input
          type="text"
          name="skillgroup"
          placeholder="Enter group title"
        ></input>
      </div>
      <div className={style.middleDiv}>
        <h3>Skill: </h3>
        <label htmlFor="skillList"></label>
        <div className={style.inputDiv}>
          <input type="text" name="skillList" placeholder="Enter skill"></input>
          <button>
            <img src={closeIcon}></img>
          </button>
        </div>
      </div>
      <div className={style.bottomDiv}>
        <button
          onClick={() => {
            console.log("close button was pressed");
          }}
        >
          <img src={closeIcon}></img>
        </button>
      </div>
    </div>
  );
}

export default SkillDetails;
