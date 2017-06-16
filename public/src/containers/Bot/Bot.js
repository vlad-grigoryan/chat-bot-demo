import React, {Component} from "react";
import $ from "jquery";
import styles from "./styles.css";

import {Button, Category, Details, Message, Navbar} from "../../components";
import activitiyData from "../../Data/activitiy.json";
import brandData from "../../Data/brand.json";
import circleData from "../../Data/circle.json";

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
            catId: null,
            DataObject: (props.location.query.botId == 'brand' ? brandData :
                            (props.location.query.botId == 'bike' ? circleData : activitiyData))
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

        setTimeout(() => {

            let messages = [...this.state.messages];

            messages.push({
                text: text,
                text_type: text_type || this.MSG_RECEIVE_TYPE,
                type: type,
            });

            this.setState({
                messages
            });
            this.scrollBottom();
        }, 200);
    };

    addButton = (buttonObject) => {
        let self = this;

        setTimeout(() => {

            let messages = [...this.state.messages];

            messages.push({
                type: buttonObject.type,
                buttonList: buttonObject.buttons
            });

            this.setState({
                messages
            });
            this.scrollBottom();
        }, 200);


    };

    addContent = (catList, type) => {
        setTimeout(() => {
            let messages = [...this.state.messages];

            messages.push({
                list: catList,
                type: type
            });

            this.setState({
                messages
            });
            this.scrollBottom();
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

            if (message.type === 'text') {
                return (
                    <Message key={"text" + id} type={message.text_type} text={message.text}/>
                );
            } else if (message.type === 'button') {
                return (
                    <Button key={id} list={message.buttonList} onclick={this.openCategory} />
                )
            }
            else if (message.type === 'category') {
                return (
                    <Category key={id} list={message.list} onClick={this.openDetails} />
                )
            }
            else if (message.type == 'details') {
                return (
                    <Details key={id} list={message.list} />
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
                scrollTop: $('.msg_block').last().offset().top + 50
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
        let greetingList = this.state.DataObject.greeting;

        for (let i = 0; i < greetingList.length; i++) {
            if(greetingList[i].type === 'button') {
                this.addButton(greetingList[i]);

            } else if(greetingList[i].type === 'category' && greetingList[i].initial) {
                this.addContent(greetingList[i].items, greetingList[i].type)

            } else {
                this.addMessage(greetingList[i].text, this.MSG_RECEIVE_TYPE, greetingList[i].type);

            }
        }
    };

    openCategory = (itemType) => {
        let catergoryList = this.state.DataObject.category;

        for (let i = 0; i < catergoryList.length; i++) {
            if(catergoryList[i].type === 'category') {
                if(catergoryList[i].initial)
                    this.addContent(catergoryList[i].items, catergoryList[i].type)
                else
                    this.addContent(catergoryList[i][itemType], catergoryList[i].type)
            } else {
                this.addMessage(catergoryList[i].text, this.MSG_RECEIVE_TYPE, catergoryList[i].type);

            }
        }
    };

    openDetails = (catId, title) => {
        this.addMessage(title, this.MSG_SENT_TYPE, 'text');

        let catDetailsList = this.state.DataObject.categoryDetails[catId];

        for (let i = 0; i < catDetailsList.length; i++) {
            if (catDetailsList[i].type === 'details') {
                this.addContent(catDetailsList[i].items, catDetailsList[i].type)
            } else {
                this.addMessage(catDetailsList[i].text, this.MSG_RECEIVE_TYPE, catDetailsList[i].type);
            }
        }
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
                <Navbar title={this.state.DataObject.navBar.title} />
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
