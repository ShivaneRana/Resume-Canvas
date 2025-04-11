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
                    <button><img src={addIcon} title="Add new resume" alt="add icon for button" className="defaultButton" ></img></button>
                    <button><img src={copyIcon} title="Copy resume" alt="add icon for button" className="defaultButton" ></img></button> 
                    <button><img src={exampleIcon} title="Add example resume" alt="add icon for button" className="defaultButton" ></img></button>
                    <button><img src={clearIcon} title="Clear resume" alt="add icon for button" className="defaultButton" ></img></button> 
                    <button><img src={deleteIcon} title="Delete resume" alt="add icon for button" className="defaultButton" ></img></button>
                    <button><img src={printIcon} title="Print resume" alt="add icon for button" className="defaultButton" ></img></button> 
                </div>
            </div>
       </div>
    )
}

export default Editor;