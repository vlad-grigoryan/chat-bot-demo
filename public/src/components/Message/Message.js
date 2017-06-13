import React, { Component } from 'react';
import styles from './styles.css';

export class Message extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const msgClassName = this.props.type === "base_sent" ? styles["msg_receive"] : styles["msg_sent"];
        const rowClassName = this.props.type === "base_sent" ? styles[this.props.type] : "";
        return (
            <div className={`row msg ${styles.msg_container} ${rowClassName}`}>
                <div className={"col-xs-10 col-md-10 " + styles.message}>
                    <div className={`${styles.messages} ${msgClassName}`}>
                        <p className={styles.msgTxt}>{this.props.text}</p>
                    </div>
                </div>
            </div>
        );
    }
}
