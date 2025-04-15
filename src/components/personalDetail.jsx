// styles
import style from "../styles/personalDetail.module.css";

// assets
import arrow from "../assets/images/arrow.svg";
import showIcon from "../assets/images/show.svg";
import hideIcon from "../assets/images/hide.svg";
import { useState } from "react";

function PersonalDetail() {
  return (
    <div className={style.mainContainer}>
      <Header></Header>
    </div>
  );
}

function Header() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={style.header}>
      <div>
        <button>
          <img alt="expand/collapse icon" src={arrow}></img>
        </button>
        <h2>Personal Details: </h2>
      </div>
      <div>
        <button>
          <img alt="show/hide icon" src={showIcon}></img>
        </button>
      </div>
    </div>
  );
}

export default PersonalDetail;
