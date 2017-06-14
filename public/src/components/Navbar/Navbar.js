import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './styles.css';

export class NavbarContainer extends Component {
    render() {
        return (
                <nav className={styles.navbar + " navbar navbar-default"}>
                    <div className={"navbar-header " + styles.header}>
                        <div className={"navbar-brand " + styles.brand}>
                            <a href="/" className={styles.link}>
                              <b>
                                <span className={styles.logo}>Old Port's Activitiy Finder</span>
                                <span className={`hidden-xs ${styles.name}`} />
                              </b>
                            </a>
                        </div>
                    </div>
                </nav>
        );
    }
}
