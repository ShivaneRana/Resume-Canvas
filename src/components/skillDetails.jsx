//styles
import style from "../styles/skillDetails.module.css";

// assets
import expandIcon from "../assets/images/expand.svg";
import shrinkICon from "../assets/images/shrink.svg";
import showIcon from "../assets/images/show.svg";
import hideIcon from "../assets/images/hide.svg";

//components
import { useState } from "react";

function SkillDetails() {
  //this section is not expanded by default
  const [expanded, setExpanded] = useState(false);

  function toggleExpanded() {
    setExpanded(!expanded);
  }
  return (
    <div className={style.mainContainer}>
      <Header func={toggleExpanded} isExpanded={expanded}></Header>
      {expanded && <Content></Content>}
    </div>
  );
}

function Header({ func, isExpanded }) {
  let icon = isExpanded ? expandIcon : shrinkICon;

  return (
    <div className={style.header}>
      <div>
        <button onClick={func}>
          <img alt="expand/collapse icon" src={icon}></img>
        </button>
        <h2 onClick={func}>Skills: </h2>
      </div>
      <div>
        <DisplayButton></DisplayButton>
      </div>
    </div>
  );
}

function Content() {
  return <div className={style.content}>shivane</div>;
}

function DisplayButton() {
  return (
    <button>
      <img alt="show/hide icon" src={showIcon}></img>
    </button>
  );
}

export default SkillDetails;
