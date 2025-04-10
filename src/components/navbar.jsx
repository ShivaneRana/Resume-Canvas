import "../styles/navbar.css"
import webpageIcon from "../assets/images/cv.svg";

function Navbar(){
    return(
        <div className="navbar">
            <img src={webpageIcon}></img>
            <h3>Resume Canvas</h3>
        </div>
    )
}

export default Navbar;