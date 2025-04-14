import style from "../styles/navbar.module.css";
import logo from "../assets/images/logo.svg";
import "../styles/utility.css";

function Navbar(){
    return(
        <div className={style.mainContainer}>
            <img className={style.logoIcon} alt="logo icon" src={logo}></img>
            <h1 className={style.heading}>Resume Canvas</h1>
        </div>
    )
}

export default Navbar;