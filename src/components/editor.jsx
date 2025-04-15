// styles
import style from "../styles/editor.module.css";

//assets
import addIcon from "../assets/images/add.svg";
import copyIcon from "../assets/images/copy.svg";
import exampleIcon from "../assets/images/example.svg";
import clearIcon from "../assets/images/clear.svg";
import deleteIcon from "../assets/images/delete.svg";
import printIcon from "../assets/images/print.svg";

//components
import PersonalDetail from "./personalDetail.jsx";
import AboutMe from "./aboutMe.jsx";
import { useState } from "react";

// represents the entire editor side
function Editor() {
  return (
    <div className={style.mainContainer}>
      <TopLayer></TopLayer>
      <PersonalDetail></PersonalDetail>
      <AboutMe></AboutMe>
    </div>
  );
}

// holds the top layer ( resume slots and buttonSlot ( add, copy , example etc) )
function TopLayer() {
  return (
    <div className={style.topLayer}>
      <div className={style.resumeSlot}></div>
      <div className={style.buttonSlot}>
        <button>
          <img alt="add icon" src={addIcon}></img>
        </button>
        <button>
          <img alt="copy icon" src={copyIcon}></img>
        </button>
        <button>
          <img alt="example icon" src={exampleIcon}></img>
        </button>
        <button>
          <img alt="clear icon" src={clearIcon}></img>
        </button>
        <button>
          <img alt="delete icon" src={deleteIcon}></img>
        </button>
        <button>
          <img alt="print icon" src={printIcon}></img>
        </button>
      </div>
    </div>
  );
}

export default Editor;
