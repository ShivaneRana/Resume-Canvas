//styles
import style from "../styles/work.module.css";

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

function Work() {
  //this section is not expanded by default
  const [expanded, setExpanded] = useState(false); // false is default value true is temp
  const [dialogBoxState, setDialogBoxState] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(null);
  const context = useContext(resumeContext);

  useEffect(() => {
    // reset state variable
    setDialogBoxState(false);
    setCurrentTarget(null);

    // ensure that section is not hidden when new resume is displayed
    if (context.hiddenComponent.work === false) {
      context.changeHiddenComponent("work");
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
        <h2 onClick={interanal_context.toggleExpanded}>Work experience: </h2>
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
    context.hiddenComponent.work ? hideIcon : showIcon,
  );
  const title = context.hiddenComponent.work ? "Hide section" : "Show section";

  useEffect(() => {
    setIcon(context.hiddenComponent.work ? hideIcon : showIcon);
  }, [context.hiddenComponent]);

  return (
    <div className={style.displayButtonDiv}>
      <button
        onClick={() => {
          const UUID = uuidv4();
          context.addWork(context.activeResumeId, UUID);
          internal_context.changeCurrentTarget(UUID);
          if (internal_context.expanded === false) {
            internal_context.toggleExpanded();
          }

          if (internal_context.dialogBoxState === false) {
            internal_context.toggleDialogBoxState();
          }
        }}
      >
        <img alt="add icon" src={addIcon} title="Add work"></img>
      </button>
      <button
        onClick={() => {
          context.changeHiddenComponent("work");
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
      {resume.work.map((item, itemIndex) => {
        return (
          <div key={item.id} className={style.tray}>
            <div
              className={
                internal_context.currentTarget === item.id ? style.selected : ""
              }
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
              <h4>{itemIndex + 1 + "." + item.company}</h4>
            </div>
            <button
              onClick={() => {
                context.deleteWork(context.activeResumeId, item.id);
              }}
              title="Delete experience"
            >
              <img alt="delete icon" src={deleteIcon}></img>
            </button>
          </div>
        );
      })}
    </div>
  );
}

function DialogBox() {
  const internal_context = useContext(internalContext);
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  const currentWork = resume.work.filter(
    (item) => item.id === internal_context.currentTarget,
  )[0];
  if (!currentWork) return null;

  return (
    <div className={style.dialogBox}>
      <div className={style.topDiv}>
        {/* company name */}
        <div>
          <h4>Company: </h4>
          <label htmlFor="company name"></label>
          <input
            value={currentWork.company}
            onChange={(e) => {
              context.changeWorkDetail(
                context.activeResumeId,
                currentWork.id,
                "company",
                e.target.value,
              );
            }}
            name="company name"
            placeholder="Enter company name"
          ></input>
        </div>
        {/* position in company */}
        <div>
          <h4>Position: </h4>
          <label htmlFor="company position"></label>
          <input
            value={currentWork.position}
            onChange={(e) => {
              context.changeWorkDetail(
                context.activeResumeId,
                currentWork.id,
                "position",
                e.target.value,
              );
            }}
            name="company postion"
            placeholder="Enter position"
          ></input>
        </div>
        {/* contains start and date for side by side presentation*/}
        <div className={style.dateDiv}>
          {/* Start date */}
          <div>
            <h4>Start date: </h4>
            <label htmlFor="start date"></label>
            <input
              value={currentWork.startDate}
              onChange={(e) => {
                context.changeWorkDetail(
                  context.activeResumeId,
                  currentWork.id,
                  "startDate",
                  e.target.value,
                );
              }}
              name="start date"
              placeholder="Enter start date"
            ></input>
          </div>
          {/* End date */}
          <div>
            <h4>End date: </h4>
            <label htmlFor="end date"></label>
            <input
              value={currentWork.endDate}
              onChange={(e) => {
                context.changeWorkDetail(
                  context.activeResumeId,
                  currentWork.id,
                  "endDate",
                  e.target.value,
                );
              }}
              name="end date"
              placeholder="Enter end date"
            ></input>
          </div>
        </div>
        {/* company address */}
        <div>
          <h4>Address: </h4>
          <label htmlFor="company address"></label>
          <input
            value={currentWork.address}
            onChange={(e) => {
              context.changeWorkDetail(
                context.activeResumeId,
                currentWork.id,
                "address",
                e.target.value,
              );
            }}
            name="company address"
            placeholder="Enter address"
          ></input>
        </div>
      </div>
      <div className={style.middleDiv}>
        <h4>Accomplishments: </h4>
        {currentWork.list.map((element, elementIndex) => {
          return (
            <InputDiv
              key={element.id}
              id={context.activeResumeId}
              uuid={currentWork.id}
              value={element.content}
              valueUUID={element.id}
            ></InputDiv>
          );
        })}
        <button
          title="Add new accomplishment"
          onClick={() => {
            context.addNewAccomplishment(
              context.activeResumeId,
              currentWork.id,
            );
          }}
        >
          +Add accomplishment
        </button>
      </div>
      <div className={style.bottomDiv}>
        <button
          title="Close"
          onClick={() => {
            internal_context.changeCurrentTarget(null);
            internal_context.toggleDialogBoxState();
          }}
        >
          <img alt="close icon" src={closeIcon}></img>
        </button>
      </div>
    </div>
  );
}

function InputDiv({ id, uuid, valueUUID, value }) {
  const context = useContext(resumeContext);

  return (
    <div className={style.inputDiv}>
      <label htmlFor="accomplishment"></label>
      <textarea
        value={value}
        onChange={(e) => {
          context.changeAccomplishment(id, uuid, valueUUID, e.target.value);
        }}
        name="accomplishment"
        placeholder="Enter accomplishment"
      ></textarea>
      <button
        onClick={() => {
          context.deleteAccomplishment(id, uuid, valueUUID);
        }}
        title="Delete accomplishement"
      >
        <img alt="delete icon" src={deleteIcon}></img>
      </button>
    </div>
  );
}

export default Work;
