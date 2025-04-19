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
    </div>
  </div>
  );
}

function Name(){
  return(
    <div className={style.nameDiv}>
      <h1>Shivane Rana</h1>
    </div>
  )
}

function SocialLinks(){
  return(
    <div className={style.socialLinksDiv}>
      <a href="www.google.com" target="blank">Google</a>
      <a href="www.google.com" target="blank">Google</a>
      <a href="www.google.com" target="blank">Google</a>
      <a href="www.google.com" target="blank">Google</a>
      <a href="www.google.com" target="blank">Google</a>
      <a href="www.google.com" target="blank">Google</a>
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

export default Resume;
