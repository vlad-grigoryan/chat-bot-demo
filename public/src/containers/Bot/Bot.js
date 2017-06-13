import React, { Component } from 'react';
import $ from 'jquery';
import styles from './styles.css';

import { Navbar, Message, Button } from '../../components';
import Data from '../../data.json';

export class Bot extends Component {

    constructor(props, context) {
        super(props, context);

        // send message on Enter key press
        $(document).keypress((e) => {
            if (e.which == 13) {
                if (this.state.isInputFocused) {
                    this.sendMessage();
                }
            }
        });

        this.state = {
            userText: "",
            messages: [],
            isInputFocused: false,
            typing: false
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
        let messages = [...this.state.messages];

        console.log("TYPE", type);
        messages.push({
            text: text || "Sorry, I do not fully understand...",
            text_type: text_type || this.MSG_RECEIVE_TYPE,
            type: type

        });

        this.setState({
            messages
        });

        this.scrollBottom();

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

        let id = 0;

        return this.state.messages.map(message => {

            id += 1;

            if(message.type == 'text') {
                return (
                    <Message key={id} type={message.text_type} text={message.text} />
                );
            } else if(message.type == 'button'){
                return (
                    <Button key={id} type={message.text_type} text={message.text} onclick={this.getStarted}></Button>
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
        let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

        if(width > 1000) {
            let objDiv = document.getElementById("scrollDiv");
            objDiv.scrollTop = objDiv.scrollHeight;
        } else {
            if ($('.msg').length > 0) {
              $('html, body').animate({
                  scrollTop: $('.msg').last().offset().top + 50
              }, 1);
            }
        }
    };


    sendMessage = () => {
        if (this.state.userText.length === 0) {
            return;
        }

        const { userText } = this.state;

        this.userInput.value = "";
        this.clearStateMessage();
        this.addMessage(userText, this.MSG_SENT_TYPE);
        this.startTyping();

        let self = this;
        setTimeout(function () {
            self.addMessage("TODO SHOULD BE DONE.", this.MSG_RECEIVE_TYPE, "text")
        }, 200)

    };

    greetingMessage = () => {

        let self = this;

        return Data.greeting.map(response => {


            setTimeout(function () {
                self.addMessage(response.text, self.MSG_RECEIVE_TYPE, response.type);
            }, 200)

        })
    };

    getStarted = () => {
        let self = this;

        return Data.category.map(response => {

            setTimeout(function () {
                self.addMessage(response.text, self.MSG_RECEIVE_TYPE, response.type);
            }, 200)

        });

    };



    render() {
        const { innerWidth } = window;
        const onTouchStart = innerWidth < 786 ? this.sendMessage : () => {};
        const onClick = innerWidth < 786 ? () => {} : this.sendMessage;
        const typing = this.state.typing ? <img src={this.state.typing} className={styles.typing} /> : "";
        return (
            <div className={styles.botParent}>
                <Navbar />
                <div id="chat_window_1" className={"row " + styles.chatWindow}>
                    <div className={"col-xs-12 col-md-3-12 " + styles.mainCol}>
                        <div id="background" className="panel-default"></div>
                        <div className={`panel panel-default ${styles.panel}`}>
                            <div id="scrollDiv" className={`panel-heading ${styles["top-bar"]} ${styles["panel-heading"]}`}>
                                {this.getMessageList()}
                            </div>
                            <div id="send" className={`panel-footer ${styles.send}`}>
                                <div className="input-group">
                                    <input
                                        id="btn-input"
                                        name="userText"
                                        ref={(input) => {this.userInput = input}}
                                        type="text"
                                        onChange={this.handleTextChange}
                                        placeholder="Write your message here..."
                                        className={"form-control chat_input " + styles.btn_input} />
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
