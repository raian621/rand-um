import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import 'styles/GitHubEarmark.css'

export default function GitHubEarmark() {
    return (
        <a href="https://github.com/raian621/rand-um"> 
            <div className="github-earmark">
                <FontAwesomeIcon icon={faGithub} color="white"/>
            </div>
        </a>
    )
}