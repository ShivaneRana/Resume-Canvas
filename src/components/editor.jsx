import "../styles/editor.css";
import "../styles/utility.css";
import addIcon from "../assets/images/add.svg";
import clearIcon from "../assets/images/clear.svg";
import copyIcon from "../assets/images/copy.svg";
import deleteIcon from "../assets/images/bin.svg";
import exampleIcon from "../assets/images/example.svg";
import printIcon from "../assets/images/print.svg";


function Editor(){
    return(
        <div className="editor">
            <div className="buttonHolder">
                <div className="resumeSlots">
                </div>
                <div className="resumeButtons">
                    <img className="defaultButton" src = {addIcon}></img>
                    <img className="defaultButton" src = {copyIcon}></img>
                    <img className="defaultButton" src = {exampleIcon}></img>
                    <img className="defaultButton" src = {clearIcon}></img>
                    <img className="defaultButton" src = {deleteIcon}></img>
                    <img className="defaultButton" src = {printIcon}></img>
                </div>
            </div>
       </div>
    )
}

export default Editor;