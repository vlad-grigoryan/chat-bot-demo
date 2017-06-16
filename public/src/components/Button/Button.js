import React, {Component} from "react";
import styles from "./styles.css";


export default class Button extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`row msg_block ${styles.msg_block} ${styles.msg_center}`}>
                {
                    this.props.list.map((buttonObject, index) => {
                        return (
                            <span>
                                <button key={index} className={"btn " + styles.button} onClick={() => this.props.onclick(buttonObject.itemType)}>{buttonObject.text}</button>
                                 &nbsp;
                            </span>
                        )
                    })
                }
            </div>
        );

    }
}