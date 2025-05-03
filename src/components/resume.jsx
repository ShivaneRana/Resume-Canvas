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
        {context.hiddenComponent["work"] && <Work></Work>}
        {context.hiddenComponent["project"] && <Project></Project>}
        {context.hiddenComponent["education"] && <Education></Education>}
        {context.hiddenComponent["additional"] && <Additional></Additional>}
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
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return (
    <div className={style.skillDiv}>
      <h2>Skill</h2>
      <hr className={style.line}></hr>
      <div className={style.tray}>
        {resume.skill.map((item,index) => {
          if (item.skillGroup !== "") {
            return (
              <div key={item.id}>
                <h4>{(index+1)+"."+item.skillGroup + ": "}</h4>
                {item.skillList.map((skill) => {
                  if (skill.content !== "") {
                    return <p key={skill.id}>{` •` + skill.content}</p>;
                  }
                })}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

function Education() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return (
    <div className={style.educationDiv}>
      <h2>Education</h2>
      <hr className={style.line}></hr>
    </div>
  );
}

function Project() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return (
    <div className={style.projectDiv}>
      <h2>Project</h2>
      <hr className={style.line}></hr>
      <div className={style.projectTray}>
        {resume.project.map((item,itemIndex) => {
          if (item.projectTitle !== "") {
            return (
              <div key={item.id}>
                <div className={style.topDiv}>
                  <h4>{(itemIndex+1)+"."+item.projectTitle}</h4>
                  <div>
                    <a title="Open in new tab" href={item.link} target="_blank">
                      <p>{item.link}</p>
                    </a>
                    <p>{item.doc}</p>
                  </div>
                </div>
                <div className={style.bottomDiv}>
                  <ul>
                    {item.featureList.map((element) => {
                      if (element.content !== "") {
                        return <li key={element.id}>{element.content}</li>;
                      }
                    })}
                  </ul>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

function Work() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

  return (
    <div className={style.workExperienceDiv}>
      <h2>Work Experience</h2>
      <hr className={style.line}></hr>
    </div>
  );
}

function Additional() {
  const context = useContext(resumeContext);
  const index = context.findIndex(context.activeResumeId);
  const resume = context.resumeList[index];

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
      <a
        title="Open in new tab"
        href={resume.personalDetail.email}
        target="_blank"
      >
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
      <a
        title="Open in new tab"
        href={resume.personalDetail.address}
        target="_blank"
      >
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
      <a
        title="Open in new tab"
        href={resume.personalDetail.phoneNumber}
        target="_blank"
      >
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
      <a
        title="Open in new tab"
        href={resume.personalDetail.linkedIn}
        target="_blank"
      >
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
      <a
        title="Open in new tab"
        href={resume.personalDetail.personalWebsite}
        target="_blank"
      >
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
      <a
        title="Open in new tab"
        href={resume.personalDetail.github}
        target="_blank"
      >
        {resume.personalDetail.github}
      </a>
    </p>
  );
}

export default Resume;
