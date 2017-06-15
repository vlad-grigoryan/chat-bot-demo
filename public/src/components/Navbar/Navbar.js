import React, {Component} from "react";
import styles from "./styles.css";

export class NavbarContainer extends Component {
    constructor(props, context) {;
        super(props, context);
    }
    render() {
        return (
            <nav className={styles.navbar + " navbar navbar-default"}>
                <div className={"navbar-header " + styles.header}>
                    <div className={"navbar-brand " + styles.brand}>
                        <a href="/" className={styles.link}>
                            <b>
                                <span className={styles.logo}>{this.props.title}</span>
                                <span className={`hidden-xs ${styles.name}`}/>
                            </b>
                        </a>
                    </div>
                </div>
            </nav>
        );
    }
}
