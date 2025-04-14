// styles
import style from "../styles/editor.module.css";

//assets

// represents the entire editor side
function Editor(){
    return(
        <div className={style.mainContainer}>
        </div>
    )
}

// holds the top layer ( resume slots and action button)
function TopLayer(){
    return(
        <div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Editor;