import React, { Component } from 'react';
import styles from './styles.css';


export default class Button extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const msgClassName = this.props.type === "base_sent" ? styles["msg_receive"] : styles["msg_sent"];
        const rowClassName = this.props.type === "base_sent" ? styles[this.props.type] : "";
        return (
            <div className={`row msg ${styles.msg_container} ${rowClassName}`}>
                <div className={"col-xs-10 col-md-10 " + styles.message}>
                    <button className={"btn " + styles.button} onClick={this.props.onclick}>{this.props.text}</button>
                </div>
            </div>
        );
    }
}