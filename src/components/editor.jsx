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
                    <img title = "Create a new resume" className="defaultButton" src = {addIcon}></img>
                    <img title = "Copy existing resume" className="defaultButton" src = {copyIcon}></img>
                    <img title = "Create an example resume" className="defaultButton" src = {exampleIcon}></img>
                    <img title = "Clear all fields"  className="defaultButton" src = {clearIcon}></img>
                    <img title = "Delete resume" className="defaultButton" src = {deleteIcon}></img>
                    <img title = "Print resume" className="defaultButton" src = {printIcon}></img>
                </div>
            </div>
       </div>
    )
}

export default Editor;