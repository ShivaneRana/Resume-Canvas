//styles
import style from "../styles/aboutMe.module.css";

//assets
import expandIcon from "../assets/images/expand.svg";
import shrinkICon from "../assets/images/shrink.svg";
import showIcon from "../assets/images/show.svg";
import hideIcon from "../assets/images/hide.svg";

//components
import { useState, useContext, useEffect } from "react";
import { resumeContext } from "../App.jsx";

function AboutMe() {
  // this section is expanded by default
  const [expanded, setExpanded] = useState(true);
  const context = useContext(resumeContext);

  useEffect(() => {
    if(context.hiddenComponent.aboutMe === false){
      context.changeHiddenComponent("aboutMe");
    }
  },[context.activeResumeId])

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
  let icon = isExpanded ? shrinkICon : expandIcon;
  let title = isExpanded ? "Show less" : "Show more";

  return (
    <div className={style.header}>
      <div>
        <button onClick={func}>
          <img alt="expand/collapse icon" src={icon} title={title}></img>
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
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return (
    <div className={style.content}>
      <label htmlFor="objective"></label>
      <textarea
        value={resume.aboutMe}
        onChange={(e) => {
          context.changeAboutMe(context.activeResumeId, e.target.value);
        }}
        name="objective"
        placeholder="Enter description about yourself"
      ></textarea>
    </div>
  );
}

function DisplayButton() {
  const context = useContext(resumeContext);
  const [icon, setIcon] = useState(
    context.hiddenComponent.aboueMe ? hideIcon : showIcon,
  );
  const title = context.hiddenComponent.aboueMe
    ? "Hide section"
    : "Show section";

  useEffect(() => {
    setIcon(context.hiddenComponent.aboutMe ? hideIcon : showIcon);
  }, [context.hiddenComponent]);

  return (
    <button
      onClick={() => {
        context.changeHiddenComponent("aboutMe");
      }}
      title={title}
    >
      <img alt="show/hide icon" src={icon}></img>
    </button>
  );
}

export default AboutMe;
