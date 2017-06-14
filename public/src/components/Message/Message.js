import React, { Component } from 'react';
import styles from './styles.css';

export class Message extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const msgClassName = this.props.type === "base_sent" ? styles["msg_right"] : styles["msg_left"];
        return (


            <div className={`row ${styles.msg_block}`}>
                <span className={`${styles.msg} ${msgClassName}`}>
                    {this.props.text}
                </span>
            </div>
        );
    }
}
