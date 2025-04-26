//styles
import style from "../styles/skillDetails.module.css";

// assets
import expandIcon from "../assets/images/expand.svg";
import shrinkICon from "../assets/images/shrink.svg";
import showIcon from "../assets/images/show.svg";
import hideIcon from "../assets/images/hide.svg";
import addIcon from "../assets/images/add.svg";
//components
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

const internalContext = createContext();

function SkillDetails() {
  //this section is not expanded by default
  const [expanded, setExpanded] = useState(false);
  const [dialogBoxState,setDialogBoxState] = useState(false);

  function toggleExpanded() {
    if(dialogBoxState === true){
      toggleDialogBoxState();
    }
    setExpanded(!expanded);

  }

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
    <button>
      <img alt="show/hide icon" src={hideIcon}></img>
    </button>
    </div>
  );
}

function DialogBox(){
  console.log("Dialog box added")
  return(
    <div className={style.addDialog}>
      dialog box 
    </div>
  )
}

export default SkillDetails;
