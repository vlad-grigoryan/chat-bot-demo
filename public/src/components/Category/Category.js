import React, {Component} from "react";
import styles from "./styles.css";


export default class Category extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'msg_block ' + styles.item} style={{backgroundColor: this.props.backgroundColor}}
                 onClick={this.props.onClick}>
                <img className={styles.itemImage} src={this.props.image}/>
                <span className={styles.title}>{this.props.title}</span>
            </div>
        );
    }
}