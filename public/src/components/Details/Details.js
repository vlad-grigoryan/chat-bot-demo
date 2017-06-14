import React, {Component} from "react";
import styles from "./styles.css";


export default class Details extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a className={'msg_block ' + styles.link} href={this.props.link}>
                <div className={styles.cover} style={{backgroundImage: `url(${this.props.image})`}}/>
                <span className={styles.title}>{this.props.title}</span>
            </a>
        );
    }
}