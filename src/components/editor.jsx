// styles
import style from "../styles/editor.module.css";

//assets
import addIcon from "../assets/images/add.svg";
import copyIcon from "../assets/images/copy.svg";
import exampleIcon from "../assets/images/example.svg";
import clearIcon from "../assets/images/clear.svg";
import deleteIcon from "../assets/images/delete.svg";
import printIcon from "../assets/images/print.svg";
import resumeIcon from "../assets/images/resume.svg";
import resumeActiveIcon from "../assets/images/resume_active.svg";

//components
import PersonalDetail from "./personalDetail.jsx";
import AboutMe from "./aboutMe.jsx";
import Work from "./work.jsx";
import Project from "./project.jsx";
import Education from "./education.jsx";
import SkillDetails from "./skillDetails.jsx";
import Additional from "./additional.jsx";
import { useState, useContext } from "react";
import { resumeContext } from "../App.jsx";

// represents the entire editor side
function Editor() {
  return (
    <div className={style.mainContainer}>
      <TopLayer></TopLayer>
      <PersonalDetail></PersonalDetail>
      <AboutMe></AboutMe>
      <SkillDetails></SkillDetails>
      <Work></Work>
      <Project></Project>
      <Education></Education>
      <Additional></Additional>
    </div>
  );
}

// holds the top layer ( resume slots and buttonSlot ( add, copy , example etc) )
function TopLayer() {
  return (
    <div className={style.topLayer}>
      {/* This div contains all the resumes  */}
      <ResumeSlot></ResumeSlot>
      {/* This resume contains all the buttons */}
      <ButtonSlot></ButtonSlot>
    </div>
  );
}

function ResumeSlot() {
  const context = useContext(resumeContext);

  return (
    <div className={style.resumeSlot}>
      {context.resumeList.map((resume) => {
        return (
          <button
            onClick={() => {
              context.changeActiveResumeId(resume.id);
            }}
            key={resume.id}
          >
            <img
              title="Resume slot"
              alt="resume icon"
              src={
                resume.id === context.activeResumeId
                  ? resumeActiveIcon
                  : resumeIcon
              }
              className={
                resume.id === context.activeResumeId ? style.activeRes : ""
              }
            ></img>
          </button>
        );
      })}
    </div>
  );
}

function ButtonSlot() {
  const context = useContext(resumeContext);

  return (
    <div className={style.buttonSlot}>
      {/* add button */}
      <button
        onClick={() => {
          context.addBaseResume();
        }}
      >
        <img alt="add icon" src={addIcon} title="Add new resume"></img>
      </button>

      {/* copy button */}
      <button
        onClick={() => {
          context.copyResume();
        }}
      >
        <img alt="copy icon" src={copyIcon} title="Copy existing resume"></img>
      </button>

      {/* example button */}
      <button
        onClick={() => {
          context.addExampleResume();
        }}
      >
        <img
          alt="example icon"
          src={exampleIcon}
          title="Generate an example resume"
        ></img>
      </button>

      {/* clear button */}
      <button
        onClick={() => {
          context.clearActiveResume();
        }}
      >
        <img
          alt="clear icon"
          src={clearIcon}
          title="Clear existing resume"
        ></img>
      </button>

      {/* delete button*/}
      <button
        onClick={() => {
          context.removeResume();
        }}
      >
        <img
          alt="delete icon"
          src={deleteIcon}
          title="Delete current resume"
        ></img>
      </button>

      {/* print button */}
      <button
        onClick={() => {
          window.print();
        }}
      >
        <img
          alt="print icon"
          src={printIcon}
          title="Print existing resume"
        ></img>
      </button>
    </div>
  );
}

export default Editor;
