//style
import style from "../styles/resume.module.css";

//icon
import githubIcon from "../assets/images/github.svg";
import emailIcon from "../assets/images/email.svg";
import phoneIcon from "../assets/images/phone.svg";
import linkIcon from "../assets/images/link.svg";
import addressIcon from "../assets/images/address.svg";
import linkedinIcon from "../assets/images/linkedin.svg";

import { resumeContext } from "../App.jsx";
import { useContext } from "react";

function Resume() {
  const context = useContext(resumeContext);

  return (
    <div className={style.mainContainer}>
      <div>
        {context.hiddenComponent["personalDetail"] && (
          <PersonalDetailDiv></PersonalDetailDiv>
        )}
        {context.hiddenComponent["aboutMe"] && <AboutMe></AboutMe>}
        {context.hiddenComponent["skill"] && <Skill></Skill>}
        <Education></Education>
        <Project></Project>
        <WorkExperience></WorkExperience>
        <Additional></Additional>
      </div>
    </div>
  );
}

function PersonalDetailDiv() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return (
    <div className={style.personalDetailDiv}>
      <div className={style.nameDiv}>
        <h1>{resume.personalDetail.fullName}</h1>
      </div>
      <div className={style.socialLinksDiv}>
        {resume.personalDetail.email && Email()}
        {resume.personalDetail.phoneNumber && PhoneNumber()}
        {resume.personalDetail.address && Address()}
        {resume.personalDetail.github && Github()}
        {resume.personalDetail.linkedIn && LinkedIn()}
        {resume.personalDetail.personalWebsite && Link()}
      </div>
    </div>
  );
}

function AboutMe() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return (
    <div className={style.aboutMeDiv}>
      <h2>About me</h2>
      <hr className={style.line}></hr>
      <p>{resume.aboutMe}</p>
    </div>
  );
}

function Skill() {
  return (
    <div className={style.skillDiv}>
      <h2>Skill</h2>
      <hr className={style.line}></hr>
    </div>
  );
}

function Education() {
  return (
    <div className={style.educationDiv}>
      <h2>Education</h2>
      <hr className={style.line}></hr>
    </div>
  );
}

function Project() {
  return (
    <div className={style.projectDiv}>
      <h2>Project</h2>
      <hr className={style.line}></hr>
    </div>
  );
}

function WorkExperience() {
  return (
    <div className={style.workExperienceDiv}>
      <h2>Work Experience</h2>
      <hr className={style.line}></hr>
    </div>
  );
}

function Additional() {
  return (
    <div className={style.additionalDiv}>
      <h2>Additional</h2>
      <hr className={style.line}></hr>
    </div>
  );
}

function Email() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];
  return (
    <p>
      <img src={emailIcon} alt="email icon"></img>
      <a href={resume.personalDetail.email} target="_blank">
        {resume.personalDetail.email}
      </a>
    </p>
  );
}

function Address() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];
  return (
    <p>
      <img src={addressIcon} alt="address icon"></img>
      <a href={resume.personalDetail.address} target="_blank">
        {resume.personalDetail.address}
      </a>
    </p>
  );
}

function PhoneNumber() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];
  return (
    <p>
      <img src={phoneIcon} alt="phone icon"></img>
      <a href={resume.personalDetail.phoneNumber} target="_blank">
        {resume.personalDetail.phoneNumber}
      </a>
    </p>
  );
}

function LinkedIn() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];
  return (
    <p>
      <img src={linkedinIcon} alt="linkedin icon"></img>
      <a href={resume.personalDetail.linkedIn} target="_blank">
        {resume.personalDetail.linkedIn}
      </a>
    </p>
  );
}

function Link() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];
  return (
    <p>
      <img src={linkIcon} alt="link icon"></img>
      <a href={resume.personalDetail.personalWebsite} target="_blank">
        {resume.personalDetail.personalWebsite}
      </a>
    </p>
  );
}

function Github() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];
  return (
    <p>
      <img src={githubIcon} alt="github icon"></img>
      <a href={resume.personalDetail.github} target="_blank">
        {resume.personalDetail.github}
      </a>
    </p>
  );
}

export default Resume;
