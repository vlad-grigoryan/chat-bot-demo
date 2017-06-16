import React, {Component} from "react";
import styles from "./styles.css";


export default class Details extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"row " + styles.catContainer}>
                {
                    this.props.list.map((detail, index) => {
                        return (
                            <a className={'msg_block ' + styles.link} href={detail.link} target="_blank">
                                <div className={styles.cover} style={{backgroundImage: `url(${detail.image})`}}/>
                                <span className={styles.title}>{detail.title}</span>
                            </a>
                        )
                    })
                }

            </div>
        );
    }
}