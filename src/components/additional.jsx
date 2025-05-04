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
  const [expanded, setExpanded] = useState(true); // false is default value true is temp
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
          const UUID = uuidv4();
          context.addCategory(context.activeResumeId,UUID);
          internal_context.changeCurrentTarget(UUID);

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
    {
      resume.additional.map((element,elementIndex) => {
        return <div key={element.id} className={style.tray}>
          <div
              className={
                internal_context.currentTarget === element.id ? style.selected : ""
              }

              onClick={() => {
                internal_context.changeCurrentTarget(element.id);
                if(internal_context.expanded === false){
                  internal_context.toggleExpanded();
                }

                if(internal_context.dialogBoxState === false){
                  internal_context.toggleDialogBoxState();
                }
              }}
          >
            <h4>{(elementIndex + 1)+"."+element.category}</h4>
          </div>
          <button
            onClick={() => {
              context.deleteCategory(context.activeResumeId,element.id)
            }}
            title="Delete category"
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

  const currentAdditional = resume.additional.filter(
    (item) => item.id === internal_context.currentTarget,
  )[0];
  if (!currentAdditional) return null;

  return <div className={style.dialogBox}>
    <div className={style.topDiv}>
   <div>
          <h4>Cateogory: </h4>
          <label htmlFor="category"></label>
          <input
            value={currentAdditional.category}
            onChange={(e) => {
              context.changeCategoryName(context.activeResumeId,currentAdditional.id,e.target.value);
            }}
            name="category"
            placeholder="Enter category"
          ></input>
        </div>   
    </div>
  <div className={style.middleDiv}>
    <h4>Items: </h4>
     {
        currentAdditional.itemList.map((item) => {
          return <InputDiv
          key={item.id}
          value={item.content}
          id={context.activeResumeId}
          valueUUID={item.id}
          uuid={currentAdditional.id}
          ></InputDiv>
        })
     }
    <button>
      +Add item
    </button>
  </div>
  <div className={style.bottomDiv}>
    <button
    onClick={() => {
      internal_context.changeCurrentTarget(null)
      internal_context.toggleDialogBoxState();
    }}
    title="Close">
        <img src={closeIcon} alt="close icon"></img>
    </button>
  </div>
  </div>;
}

function InputDiv({id,uuid,valueUUID,value}){
  const context = useContext(resumeContext);

  return <div className={style.inputDiv}>
     <label htmlFor="item"></label>
      <input
        value={value}
        onChange={(e) => {
          context.changeItem(id, uuid, valueUUID, e.target.value);
        }}
        placeholder="Enter item"
        name="item"
      ></input>
      <button
        title="Delete item"
        onClick={() => {
          context.deleteItem(id, uuid, valueUUID);
        }}
      >
        <img alt="delete feature" src={deleteIcon}></img>
      </button>   
  </div>
}

export default Additional;
