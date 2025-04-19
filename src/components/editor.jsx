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

//components
import PersonalDetail from "./personalDetail.jsx";
import AboutMe from "./aboutMe.jsx";
import SkillDetails from "./skillDetails.jsx";
import { useState,useContext} from "react";
import { resumeContext } from "../App.jsx";

// represents the entire editor side
function Editor() {
  return (
    <div className={style.mainContainer}>
      <TopLayer></TopLayer>
      <PersonalDetail></PersonalDetail>
      <AboutMe></AboutMe>
      <SkillDetails></SkillDetails>
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
  let context = useContext(resumeContext);
  return (
    <div className={style.resumeSlot}>
      {context.resumeList.map(resume => {
        return(
          <button
          onClick={(e) => {
            context.changeActiveResume(resume);
            console.log(context.activeResume);
          }}
          key={resume.id}>
            <img title="Resume slot" alt="resume icon" src={resumeIcon}></img>
          </button>
        )
      })}
    </div>
  );
}

function ButtonSlot() {
  let context = useContext(resumeContext);

  return (
    <div className={style.buttonSlot}>
      {/* add button */}
      <button>
        <img
        alt="add icon"
        src={addIcon}
        title="Add new resume"
        onClick={() => {
          context.addNewResume();
        }}
        ></img>
      </button>
      {/* copy button */}
      <button>
        <img
        alt="copy icon"
        src={copyIcon}
        title="Copy existing resume"></img>
      </button>
      {/* example button */}
      <button>
        <img
        alt="example icon"
        src={exampleIcon}
        title="Generate an example resume"
        onClick={() => {
          context.addExampleResume()
        }}
        ></img>
      </button>
      {/* clear button */}
      <button>
        <img
        alt="clear icon"
        src={clearIcon}
        title="Clear existing resume"></img>
      </button>
      {/* delete button*/}
      <button>
        <img
        alt="delete icon"
        src={deleteIcon}
        title="Delete current resume"></img>
      </button>
      {/* print button */}
      <button>
        <img
        alt="print icon"
        src={printIcon}
        title="Print existing resume"
        onClick={() => {
          console.log(context.resumeList);
        }}
        ></img>
      </button>
    </div>
  );
}

export default Editor;
