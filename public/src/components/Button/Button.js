import React, { Component } from 'react';
import styles from './styles.css';


export default class Button extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const rowClassName = this.props.type === "base_sent" ? styles[this.props.type] : "";
        return (
            <div className={`row ${styles.msg_block} ${styles.msg_center}`}>
                <button className={"btn " + styles.button} onClick={this.props.onclick}>{this.props.text}</button>
            </div>
        );
    }
}