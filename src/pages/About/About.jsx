//CSS
import styles from "./About.module.css"

import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        About John <span>Blog</span>
      </h2>
      <p>
        This project is a blog built with React for the front end and Firebase
        for the back end.
      </p>
      <Link to="/posts/create" className="btn">
        Create
      </Link>
    </div>
  );
}

export default About;