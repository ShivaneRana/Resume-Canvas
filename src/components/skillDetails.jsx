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
import { v4 as uuidv4 } from "uuid";

const internalContext = createContext();

function SkillDetails() {
  //this section is not expanded by default
  const [expanded, setExpanded] = useState(false); // false is default value, true is temp
  const [dialogBoxState, setDialogBoxState] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(null);
  const context = useContext(resumeContext);

  useEffect(() => {
    //reset state variable
    setDialogBoxState(false);
    setCurrentTarget(null);

    // ensure that section is not hidden when new resume is displayed
    if (context.hiddenComponent.skill === false) {
      context.changeHiddenComponent("skill");
    }
  }, [context.activeResumeId]);

  // this ensure that if the dialogBox is opened it closes when expanding and shrinking content
  function toggleExpanded() {
    setExpanded(!expanded);
  }

  function changeCurrentTarget(id) {
    setCurrentTarget(id);
  }

  // exapand content when toggleing dialogBox state
  // without it may open but the content is shrunk,
  // making it look as if the function is not working.
  function toggleDialogBoxState() {
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
  const internal_context = useContext(internalContext);
  let icon = internal_context.expanded ? shrinkICon : expandIcon;
  let title = internal_context.expanded ? "Show less" : "Show more";

  return (
    <div className={style.header}>
      <div>
        <button onClick={() => internal_context.toggleExpanded()}>
          <img alt="expand/collapse icon" src={icon} title={title}></img>
        </button>
        <h2 onClick={() => internal_context.toggleExpanded()}>Skill: </h2>
      </div>
      <DisplayButton></DisplayButton>
    </div>
  );
}

function Content() {
  const internal_context = useContext(internalContext);
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return (
    <div className={style.content}>
      {/* hide ShowArea if the skill array in empty in the resume */}
      {resume.skill.length !== 0 && <ShowArea></ShowArea>}
      {internal_context.dialogBoxState && <DialogBox></DialogBox>}
    </div>
  );
}

function DisplayButton() {
  const internal_context = useContext(internalContext);
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
          const UUID = uuidv4();
          context.addSkillSet(context.activeResumeId, UUID);
          internal_context.changeCurrentTarget(UUID);
          // if the dialog box is not display display it.
          if (internal_context.expanded === false) {
            internal_context.toggleExpanded();
          }

          if (internal_context.dialogBoxState === false) {
            internal_context.toggleDialogBoxState();
          }
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
  const internal_context = useContext(internalContext);
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return (
    <div className={style.showArea}>
      {resume.skill.map((element) => {
        return (
          <div key={element.id} className={style.tray}>
            <div
              className={
                internal_context.currentTarget === element.id
                  ? style.selected
                  : ""
              }
              onClick={() => {
                internal_context.changeCurrentTarget(element.id);
                if (internal_context.expanded === false) {
                  internal_context.toggleExpanded();
                }
                if (internal_context.dialogBoxState === false) {
                  internal_context.toggleDialogBoxState();
                }
              }}
            >
              <h4>{element.skillGroup + ":  "}</h4>
              {element.skillList.map((item, index) => {
                return <p key={item.id}>{` •` + item.content}</p>;
              })}
            </div>
            <button
              onClick={() => {
                context.removeSkillSet(context.activeResumeId, element.id);
              }}
              title="Delete skill set"
            >
              <img src={deleteIcon} alt="delete skill set icon"></img>
            </button>
          </div>
        );
      })}
    </div>
  );
}

function DialogBox() {
  const context = useContext(resumeContext);
  const internal_context = useContext(internalContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  // return the current Skill Set being worked on
  const currentSkill = resume.skill.filter(
    (item) => item.id === internal_context.currentTarget,
  )[0];
  // return early if the current skill is undefined
  if (!currentSkill) return null;

  return (
    <div className={style.dialogBox}>
      <div className={style.topDiv}>
        <h4>Skill group: </h4>
        <label htmlFor="skill group"></label>
        <input
          value={currentSkill.skillGroup}
          onChange={(e) => {
            context.changeSkillGroup(
              context.activeResumeId,
              currentSkill.id,
              e.target.value,
            );
          }}
          type="text"
          placeholder="Enter group title"
        ></input>
      </div>
      <div className={style.middleDiv}>
        <h4>Skills: </h4>
        {currentSkill.skillList.map((item) => {
          return (
            <InputDiv
              key={item.id}
              value={item.content}
              id={context.activeResumeId}
              valueUuid={item.id}
              uuid={currentSkill.id}
            ></InputDiv>
          );
        })}
        <button
          onClick={() => {
            const newSkill = {
              id: uuidv4(),
              content: "",
            };
            context.addNewSkillListItem(
              context.activeResumeId,
              currentSkill.id,
              newSkill,
            );
          }}
          title="Add new skill"
        >
          +Add skill
        </button>
      </div>
      <div className={style.bottomDiv}>
        <button
          onClick={() => {
            internal_context.toggleDialogBoxState();
            internal_context.changeCurrentTarget(null);
          }}
          title="Close"
        >
          <img alt="close icon" src={closeIcon}></img>
        </button>
      </div>
    </div>
  );
}

function InputDiv({ id, uuid, valueUuid, value }) {
  const context = useContext(resumeContext);
  const internal_context = useContext(internalContext);

  return (
    <div className={style.inputDiv}>
      <label htmlFor="skills"></label>
      <input
        value={value}
        onChange={(e) =>
          context.changeSkillListItem(id, uuid, valueUuid, e.target.value)
        }
        name="skills"
        type="text"
        placeholder="Enter skill"
      ></input>
      <button
        onClick={() => {
          context.deleteSkillListItem(id, uuid, valueUuid);
        }}
        title="Delete skill"
      >
        <img alt="delete icon" src={deleteIcon}></img>
      </button>
    </div>
  );
}

export default SkillDetails;
