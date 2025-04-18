// styles
import style from "../styles/personalDetail.module.css";

// assets
import expandIcon from "../assets/images/expand.svg";
import shrinkICon from "../assets/images/shrink.svg";
import showIcon from "../assets/images/show.svg";
import hideIcon from "../assets/images/hide.svg";

//components
import { useState} from "react";

function PersonalDetail() {
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
  //this section is expanded by default
  let icon = isExpanded ? expandIcon : shrinkICon;

  return (
    <div className={style.header}>
      <div>
        <button onClick={func}>
          <img alt="expand/collapse icon" src={icon}></img>
        </button>
        <h2 onClick={func}>Personal Details: </h2>
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
      <FullName></FullName>
      <Email></Email>
      <PhoneNumber></PhoneNumber>
      <Address></Address>
      <Github></Github>
      <Linkedin></Linkedin>
      <PersonalWebsite></PersonalWebsite>
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

function FullName() {
  return (
    <div className={style.defaultDiv}>
      <h3>Full Name: </h3>
      <label htmlFor="fullname"></label>
      <input
       name="fullname"
       type="text"
       placeholder="Enter fullname"></input>
    </div>
  );
}

function Address() {
  return (
    <div className={style.defaultDiv}>
      <h3>Address : </h3>
      <label htmlFor="address"></label>
      <input name="address" type="text" placeholder="Enter address"></input>
    </div>
  );
}

function PhoneNumber() {
  return (
    <div className={style.defaultDiv}>
      <h3>Phone Number : </h3>
      <label htmlFor="phonenumber"></label>
      <input
        name="phonenumber"
        type="tel"
        placeholder="Enter your personal number"
      ></input>
    </div>
  );
}

function Email() {
  return (
    <div className={style.defaultDiv}>
      <h3>Email: </h3>
      <label htmlFor="email"></label>
      <input name="email" type="email" placeholder="Enter your email"></input>
    </div>
  );
}

function Github() {
  return (
    <div className={style.defaultDiv}>
      <h3>Github: </h3>
      <label htmlFor="github"></label>
      <input
        name="github"
        type="url"
        placeholder="Enter your github profile url"
      ></input>
    </div>
  );
}

function Linkedin() {
  return (
    <div className={style.defaultDiv}>
      <h3>Linkedin: </h3>
      <label htmlFor="linkedin"></label>
      <input
        name="linkedin"
        type="url"
        placeholder="Enter your linkedin profile url"
      ></input>
    </div>
  );
}

function PersonalWebsite() {
  return (
    <div className={style.defaultDiv}>
      <h3>Personal website: </h3>
      <label htmlFor="personalwebsite"></label>
      <input
        name="personalwebsite"
        type="url"
        placeholder="Enter your personal website url"
      ></input>
    </div>
  );
}

export default PersonalDetail;
