import React, {Component} from "react";
import styles from "./styles.css";


export default class Category extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"row " + styles.catContainer}>
                {
                    this.props.list.map((category, index) => {
                        return (
                            <div key={index} className={'msg_block ' + styles.item} style={{backgroundColor: category.backgroundColor}}
                                 onClick={() => this.props.onClick(category.id, category.title)}>
                                <img className={styles.itemImage} src={category.image}/>
                                <span className={styles.title}>{category.title}</span>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}