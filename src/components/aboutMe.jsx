//styles
import style from "../styles/aboutMe.module.css";

//assets
import expandIcon from "../assets/images/expand.svg";
import shrinkICon from "../assets/images/shrink.svg";
import showIcon from "../assets/images/show.svg";
import hideIcon from "../assets/images/hide.svg";

//components
import { useState } from "react";

function AboutMe() {
  const [expanded, setExpanded] = useState(true);

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
        <h2 onClick={func}>About me: </h2>
      </div>
      <div>
        <DisplayButton></DisplayButton>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className={style.content}>
      <label htmlFor="objective"></label>
      <textarea
        name="objective"
        placeholder="Enter description about yourself"
      ></textarea>
    </div>
  );
}

function DisplayButton() {
  return (
    <button>
      <img alt="show/hide icon" src={showIcon}></img>
    </button>
  );
}

export default AboutMe;
