import style from "../styles/resume.module.css";
import { resumeContext } from "../App.jsx";
import { useContext } from "react";

function Resume() {
  return (
    <div className={style.mainContainer}>
      <div>
        <div>
          <Name></Name>
          <SocialLinks></SocialLinks>
        </div>
        <AboutMe></AboutMe>
        <Skill></Skill>
        <Education></Education>
        <Project></Project>
        <WorkExperience></WorkExperience>
        <Additional></Additional>
      </div>
    </div>
  );
}

function Name() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return (
    <div className={style.nameDiv}>
      <h1>{resume.personalDetail.fullName}</h1>
    </div>
  );
}

function SocialLinks() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return (
    <div className={style.socialLinksDiv}>
      <p>
        <a href={resume.personalDetail.email} target="_blank">
          {resume.personalDetail.email}
        </a>
      </p>
      <p>
        <a href={resume.personalDetail.phoneNumber} target="_blank">
          {resume.personalDetail.phoneNumber}
        </a>
      </p>
      <p>
        <a href={resume.personalDetail.address} target="_blank">
          {resume.personalDetail.address}
        </a>
      </p>
      <p>
        <a href={resume.personalDetail.linkedIn} target="_blank">
          {resume.personalDetail.linkedIn}
        </a>
      </p>
      <p>
        <a href={resume.personalDetail.github} target="_blank">
          {resume.personalDetail.github}
        </a>
      </p>
      <p>
        <a href={resume.personalDetail.personalWebsite} target="_blank">
          {resume.personalDetail.personalDetail}
        </a>
      </p>
    </div>
  );
}

function AboutMe() {
  return (
    <div className={style.aboutMeDiv}>
      <h2>About me</h2>
      <hr className={style.line}></hr>
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
export default Resume;
