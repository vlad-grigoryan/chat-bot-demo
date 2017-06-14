import React, { Component } from 'react';
import styles from './styles.css';


export default class Category extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const rowClassName = this.props.type === "base_sent" ? styles[this.props.type] : "";
        return (
                <div className={styles.item} style={{backgroundColor : this.props.backgroundColor}}>
                    <img className={styles.itemImage} src={this.props.image} />
                    <span className={styles.title}>{this.props.title}</span>
                </div>
        );
    }
}