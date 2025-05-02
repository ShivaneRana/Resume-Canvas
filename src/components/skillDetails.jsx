//styles
import style from "../styles/skillDetails.module.css";

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

function SkillDetails() {
  //this section is not expanded by default
  const [expanded, setExpanded] = useState(true); // false is default value true is temp
  const [dialogBoxState, setDialogBoxState] = useState(false);
  const [currentTarget,setCurrentTarget] = useState(null);
  const context = useContext(resumeContext);

  useEffect(() => {
    // ensure that the work section is not expanded while switching resume
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

  function changeCurrentTarget(id){
    setCurrentTarget(id);
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
        <button onClick={interanal_context.toggleExpanded}>
          <img alt="expand/collapse icon" src={icon} title={title}></img>
        </button>
        <h2 onClick={interanal_context.toggleExpanded}>Skill: </h2>
      </div>
      <DisplayButton></DisplayButton>
    </div>
  );
}

function Content() {
  const interanal_context = useContext(internalContext);
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return (
    <div className={style.content}>
      {resume.skill.length !== 0 && <ShowArea></ShowArea>}
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
        <img alt="add icon" src={addIcon} title="Add work group"></img>
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

  return <div className={style.showArea}>
    {
      resume.skill.map(element => {
        return(
        <div
        onClick={() => {
          console.log(element.skillGroup)
        }}
        key={element.id}
        className={style.tray}>
          <div>
          <h4>{element.skillGroup+":  "}</h4>
          {
            element.skillList.map((item,index) => {
              return <p key={element.id+"$$$"+index+item}>{(index+1)+"."+item}</p>
            })
          }
          </div>
          <button title="Delete skill set">
            <img src={deleteIcon} alt="delete skill set icon"></img>
          </button>
        </div>
        )
      })
    }
  </div>;
}

function DialogBox() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return (
    <div className={style.dialogBox}>
      <div className={style.topDiv}>
        <h3>Skill group: </h3>
        <label htmlFor="skill group"></label>
        <input type="text" placeholder="Enter group title"></input>
      </div>
      <div className={style.middleDiv}>
        <h3>Skills: </h3>
        <InputDiv></InputDiv>
        <InputDiv></InputDiv>
        <InputDiv></InputDiv>
        <button>+Add skill</button>
      </div>
      <div className={style.bottomDiv}>
        <button>
          <img alt="close icon" src={closeIcon}></img>
        </button>
      </div>
    </div>
  );
}

function InputDiv(){
  return(
    <div className={style.inputDiv}>
      <label htmlFor="skills"></label> 
      <input name="skills" type="text" placeholder="Enter skill"></input>
      <button>
        <img alt="delete icon" src={deleteIcon}></img>
      </button>
    </div>
  )
}

export default SkillDetails;
