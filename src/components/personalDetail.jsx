// styles
import style from "../styles/personalDetail.module.css";

// assets
import expandIcon from "../assets/images/expand.svg";
import shrinkICon from "../assets/images/shrink.svg";
import showIcon from "../assets/images/show.svg";
import hideIcon from "../assets/images/hide.svg";

//components
import { useState, useContext } from "react";
import { resumeContext } from "../App.jsx";

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
  let icon = isExpanded ? shrinkICon : expandIcon;
  let title = isExpanded ? "Show less" : "Show more";

  return (
    <div className={style.header}>
      <div>
        <button onClick={func}>
          <img alt="expand/collapse icon" src={icon} title={title}></img>
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
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return (
    <div className={style.defaultDiv}>
      <h3>Full Name: </h3>
      <label htmlFor="fullname"></label>
      <input
        value={resume.personalDetail.fullName}
        onChange={(e) => {
          context.changePersonalDetail(
            context.activeResumeId,
            e.target.value,
            "fullName",
          );
        }}
        name="fullname"
        type="text"
        placeholder="Enter fullname"
      ></input>
    </div>
  );
}

function Address() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];
  return (
    <div className={style.defaultDiv}>
      <h3>Address : </h3>
      <label htmlFor="address"></label>
      <input
        value={resume.personalDetail.address}
        onChange={(e) => {
          context.changePersonalDetail(
            context.activeResumeId,
            e.target.value,
            "address",
          );
        }}
        name="address"
        type="text"
        placeholder="Enter address"
      ></input>
    </div>
  );
}

function PhoneNumber() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return (
    <div className={style.defaultDiv}>
      <h3>Phone Number : </h3>
      <label htmlFor="phonenumber"></label>
      <input
        value={resume.personalDetail.phoneNumber}
        onChange={(e) => {
          context.changePersonalDetail(
            context.activeResumeId,
            e.target.value,
            "phoneNumber",
          );
        }}
        name="phonenumber"
        type="tel"
        placeholder="Enter your personal number"
      ></input>
    </div>
  );
}

function Email() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return (
    <div className={style.defaultDiv}>
      <h3>Email: </h3>
      <label htmlFor="email"></label>
      <input
        value={resume.personalDetail.email}
        onChange={(e) => {
          context.changePersonalDetail(
            context.activeResumeId,
            e.target.value,
            "email",
          );
        }}
        name="email"
        type="email"
        placeholder="Enter your email"
      ></input>
    </div>
  );
}

function Github() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return (
    <div className={style.defaultDiv}>
      <h3>Github: </h3>
      <label htmlFor="github"></label>
      <input
        value={resume.personalDetail.github}
        onChange={(e) => {
          context.changePersonalDetail(
            context.activeResumeId,
            e.target.value,
            "github",
          );
        }}
        name="github"
        type="url"
        placeholder="Enter your github profile url"
      ></input>
    </div>
  );
}

function Linkedin() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return (
    <div className={style.defaultDiv}>
      <h3>Linkedin: </h3>
      <label htmlFor="linkedin"></label>
      <input
        value={resume.personalDetail.linkedIn}
        onChange={(e) => {
          context.changePersonalDetail(
            context.activeResumeId,
            e.target.value,
            "linkedIn",
          );
        }}
        name="linkedin"
        type="url"
        placeholder="Enter your linkedin profile url"
      ></input>
    </div>
  );
}

function PersonalWebsite() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];
  return (
    <div className={style.defaultDiv}>
      <h3>Personal website: </h3>
      <label htmlFor="personalwebsite"></label>
      <input
        value={resume.personalDetail.personalWebsite}
        onChange={(e) => {
          context.changePersonalDetail(
            context.activeResumeId,
            e.target.value,
            "personalWebsite",
          );
        }}
        name="personalwebsite"
        type="url"
        placeholder="Enter your personal website url"
      ></input>
    </div>
  );
}

export default PersonalDetail;
