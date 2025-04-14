// styles
import style from "../styles/editor.module.css";

//assets
import addIcon from "../assets/images/add.svg"
import copyIcon from "../assets/images/copy.svg"
import exampleIcon from "../assets/images/example.svg"
import clearIcon from "../assets/images/clear.svg"
import deleteIcon from "../assets/images/delete.svg"
import printIcon from "../assets/images/print.svg"


// represents the entire editor side
function Editor(){
    return(
        <div className={style.mainContainer}>
            <TopLayer></TopLayer>
        </div>
    )
}

// holds the top layer ( resume slots and buttonSlot ( add, copy , example etc) )
function TopLayer(){
    return(
        <div className={style.topLayer}>
            <div className={style.resumeSlot}></div>
            <div className={style.buttonSlot}>
                <button><img src={addIcon}></img></button>
                <button><img src={copyIcon}></img></button>
                <button><img src={exampleIcon}></img></button>
                <button><img src={clearIcon}></img></button>
                <button><img src={deleteIcon}></img></button>
                <button><img src={printIcon}></img></button>
            </div>
        </div>
    )
}

export default Editor;