import style from "../styles/resume.module.css";

function Resume() {
  return(
  <div className={style.mainContainer}>
    <div>
      <div>
        <Name></Name>
        <SocialLinks></SocialLinks>
      </div>
      <AboutMe></AboutMe>
      <Skill></Skill>
      <Education></Education>
      <Project></Project>
      <WorkExperience></WorkExperience>
      <Additional></Additional>
    </div>
  </div>
  );
}

function Name(){
  return(
    <div className={style.nameDiv}>
    </div>
  )
}

function SocialLinks(){
  return(
    <div className={style.socialLinksDiv}>
      
    </div>
  )
}

function AboutMe(){
  return(
    <div className={style.aboutMeDiv}>
      <h2>About me</h2>
      <hr className={style.line}></hr>
    </div>
  )
}

function Skill(){
  return(
    <div className={style.skillDiv}>
      <h2>Skill</h2> 
      <hr className={style.line}></hr>

    </div>
  )
}

function Education(){
  return(
    <div className={style.educationDiv}>
      <h2>Education</h2>
      <hr className={style.line}></hr>
    </div>
  )
}

function Project(){
  return(
    <div className={style.projectDiv}>
      <h2>Project</h2>
      <hr className={style.line}></hr>
    </div>
  )
}

function WorkExperience(){
  return(
    <div className={style.workExperienceDiv}>
      <h2>Work Experience</h2>
      <hr className={style.line}></hr>
    </div>
  )
}

function Additional(){
  return(
    <div className={style.additionalDiv}>
      <h2>Additional</h2>
      <hr className={style.line}></hr> 
    </div>
  )
}
export default Resume;
