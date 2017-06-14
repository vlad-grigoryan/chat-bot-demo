import React, {Component} from "react";
import $ from "jquery";
import styles from "./styles.css";

import {Button, Category, Details, Message, Navbar} from "../../components";
import Data from "../../data.json";

export class Bot extends Component {

    constructor(props, context) {
        super(props, context);

        // send message on Enter key press
        $(document).keypress((e) => {
            if (e.which == 13 && e.target == document.getElementById('btn-input')) {
                this.sendMessage();
            }
        });

        this.state = {
            userText: "",
            messages: [],
            isInputFocused: false,
            typing: false,
            catId: null
        };

    }

    componentWillMount() {
        this.greetingMessage();
    }

    MSG_RECEIVE_TYPE = "base_receive";
    MSG_SENT_TYPE = "base_sent";

    styles = {
        dateDiv: {
            marginTop: "12px",
            marginBottom: "15px"
        }
    };


    startTyping = () => {
        let typing = '/imgs/typing.gif';

        this.setState({
            typing
        });
    };

    endTyping = () => {
        let typing = false;

        this.setState({
            typing
        });
    };

    addMessage = (text, text_type, type) => {
        let self = this;

        setTimeout(function () {

            let messages = [...self.state.messages];

            messages.push({
                text: text,
                text_type: text_type || self.MSG_RECEIVE_TYPE,
                type: type

            });

            self.setState({
                messages
            });

            self.scrollBottom();
        }, 200);
    };

    addContent = (catList, type) => {
        let self = this;
        setTimeout(function () {
            let messages = [...self.state.messages];

            messages.push({
                list: catList,
                type: type
            });

            self.setState({
                messages
            });
            self.scrollBottom();
        }, 200);
    };


    clearStateMessage = () => {
        this.setState({
            userText: ""
        });
    };

    getMessageList = () => {
        if (this.state.messages.length === 0) {
            return (<div></div>);
        }

        return this.state.messages.map((message, id) => {

            if (message.type == 'text') {
                return (
                    <Message key={"text" + id} type={message.text_type} text={message.text}/>
                );
            } else if (message.type == 'button') {
                return (
                    <Button key={id} type={message.text_type} text={message.text} onclick={this.getStarted}/>
                )
            }
            else if (message.type == 'category') {
                let self = this;
                return (
                    <div key={id} className={"row " + styles.catContainer}>
                        {message.list.map((category) => {
                            return (
                                <Category
                                    key={category.id}
                                    image={category.image}
                                    backgroundColor={category.backgroundColor}
                                    title={category.title}
                                    onClick={() => this.openDetails(category.id, category.title)}/>
                            )
                        })}
                    </div>
                )
            }
            else if (message.type == 'details') {
                console.log(message.list)
                let self = this;
                return (
                    <div key={id} className={"row " + styles.catContainer}>
                        {
                            message.list.map((detail, index) => {
                                return (
                                    <Details
                                        key={index}
                                        image={detail.image}
                                        title={detail.title}
                                        link={detail.link}/>
                                )
                            })
                        }
                    </div>
                )
            }
        })
    };


    handleTextChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    scrollBottom = () => {
        if ($('.msg_block').length > 0) {
            $('html, body').animate({
                scrollTop: $('.msg_block').last().offset().top + 0
            }, 1);
        }

    };


    sendMessage = () => {
        if (this.state.userText.length === 0) {
            return;
        }

        const {userText} = this.state;

        this.userInput.value = "";
        this.clearStateMessage();
        this.addMessage(userText, this.MSG_SENT_TYPE, 'text');
        this.startTyping();

        let self = this;
        setTimeout(function () {
            self.addMessage("TODO SHOULD BE DONE.", this.MSG_RECEIVE_TYPE, "text")
        }, 200)

    };

    greetingMessage = () => {

        let self = this;

        return Data.greeting.map(response => {
            self.addMessage(response.text, self.MSG_RECEIVE_TYPE, response.type);

        })
    };

    getStarted = () => {
        let self = this;

        return Data.category.map(response => {

            if (response.type === 'category') {
                self.addContent(response.items, response.type)

            } else {
                self.addMessage(response.text, self.MSG_RECEIVE_TYPE, response.type);
            }
        });
    };

    openDetails = (catId, title) => {
        this.addMessage(title, this.MSG_SENT_TYPE, 'text');
        let catDetails = Data.categoryDetails[catId];
        let self = this;
        return catDetails.map(response => {
            if (response.type === 'details') {
                self.addContent(response.items, response.type)
            } else {
                self.addMessage(response.text, self.MSG_RECEIVE_TYPE, response.type);
            }
        })
    };


    render() {
        const {innerWidth} = window;
        const onTouchStart = innerWidth < 786 ? this.sendMessage : () => {
        };
        const onClick = innerWidth < 786 ? () => {
        } : this.sendMessage;
        const typing = this.state.typing ? <img src={this.state.typing} className={styles.typing}/> : "";
        return (
            <div className={styles.botParent}>
                <Navbar />
                <div id="chat_window_1" className={"row " + styles.chatWindow}>
                    <div className={"col-xs-12 col-md-3-12 " + styles.mainCol}>
                        <div id="background" className="panel-default"></div>
                        <div className={`panel panel-default ${styles.panel}`}>
                            <div id="scrollDiv"
                                 className={`panel-heading ${styles["top-bar"]} ${styles["panel-heading"]}`}>
                                {this.getMessageList()}
                            </div>
                            <div id="send" className={`panel-footer ${styles.send}`}>
                                <div className="input-group">
                                    <input
                                        id="btn-input"
                                        name="userText"
                                        ref={(input) => {
                                            this.userInput = input
                                        }}
                                        type="text"
                                        onChange={this.handleTextChange}
                                        placeholder="Write your message here..."
                                        className={"form-control chat_input " + styles.btn_input}/>
                                    <span className="input-group-btn">
                                        <button
                                            id="btn-chat"
                                            onClick={onClick}
                                            onTouchStart={onTouchStart}
                                            className={`btn btn-primary btn-lg ${styles.sendButton}`}> Send </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
