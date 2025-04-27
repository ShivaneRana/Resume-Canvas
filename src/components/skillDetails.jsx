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
import { useState, useEffect , createContext ,useContext} from "react";
import { resumeContext } from "../App.jsx";

const internalContext = createContext();

function SkillDetails() {
  //this section is not expanded by default
  const [expanded, setExpanded] = useState(false);
  const [dialogBoxState,setDialogBoxState] = useState(false);

  // this ensure that if the dialogBox is opened it closes when expanding and shrinking content
  function toggleExpanded() {
    if(dialogBoxState === true){
      toggleDialogBoxState();
    }
    setExpanded(!expanded);

  }

  // exapand content when toggleing dialogBox state
  // without it may open but the content is shrunk,
  // making it look as if the function is not working.
  function toggleDialogBoxState(){
    if(expanded === false){
      toggleExpanded();
    }
    setDialogBoxState(!dialogBoxState);
  }

  return (
    <internalContext.Provider value={{
      expanded,
      dialogBoxState,
      toggleExpanded,
      toggleDialogBoxState
    }}>
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
        <h2 onClick={
          context.toggleExpanded
        }>Skills: </h2>
      </div>
      <DisplayButton></DisplayButton> 
    </div>
  );
}

function Content() {
  const context = useContext(internalContext);

  return(
  <div className={style.content}>
    {context.dialogBoxState && <DialogBox></DialogBox>}  
  </div>
  );
}

function DisplayButton() {
  const context = useContext(internalContext);
  const mainContext = useContext(resumeContext);
  const [icon,setIcon] = useState(mainContext.hiddenComponent.skill ? hideIcon : showIcon);
  const title = mainContext.hiddenComponent.skill ? "Hide section" : "Show section";

  useEffect(() => {
    setIcon(mainContext.hiddenComponent.skill ? hideIcon : showIcon);
  },[mainContext.hiddenComponent])

  return (
    <div className={style.displayButtonDiv}>
    <button
    onClick={() => {
      context.toggleDialogBoxState();
    }}>
      <img 
      alt="add icon"
      src={addIcon}
      title="Add skill group"></img>
    </button>
    <button
      onClick={() => {
        mainContext.changeHiddenComponent("skill")
      }}
      title={title}
    >
      <img alt="show/hide icon" src={icon}></img>
    </button>
    </div>
  );
}

function DialogBox(){
  return(
    <div className={style.addDialog}>
      <div className={style.topLayer}>
        <h4>Skill group :</h4>
        <label htmlFor="skill group"></label>
        <input name="skill group" type="text" placeholder="Group title"></input>
      </div>
      <div className={style.middleLayer}>
        <div>
          <h4>Skills :</h4>
          <button>+ Add</button>
        </div>
        <EditorialArea>

        </EditorialArea>
      </div>
      <div className={style.bottomLayer}>
        <button>
          <img src={closeIcon} alt="close icon"></img>
        </button>
      </div>
    </div>
  )
}

function EditorialArea(){
  
  return(
    <div className={style.editorialArea}>
    </div>
  )
}

function Field(){
  return(
    <div>
      <input></input> 
    </div>
  )
}

export default SkillDetails;
