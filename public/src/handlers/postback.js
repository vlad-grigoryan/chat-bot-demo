// Called from Bot.JS used Bot.js this

export default function HandlePostBack(payload, items) {
    switch (payload) {
        case 'openActivitiy':
            return getStarted.call(this, items);
            break;
        case 'openMen':
            return getStarted.call(this, items);
            break;
        case 'openWomen':
            break;
        default:
            console.log("Error postback.js")
    }
};

const getStarted = function(items) {
    let catergoryList = this.state.DataObject.category;

    for (let i = 0; i < catergoryList.length; i++) {
        if(catergoryList[i].type === 'category') {
            this.addContent(catergoryList[i][items], catergoryList[i].type)
        } else {
            this.addMessage(catergoryList[i].text, this.MSG_RECEIVE_TYPE, catergoryList[i].type);

        }
    }
};

const openMenDetials = function(items) {
    let catergoryList = this.state.DataObject.category;

    for (let i = 0; i < catergoryList.length; i++) {
        if(catergoryList[i].type === 'category') {
            this.addContent(catergoryList[i][items], catergoryList[i].type)
        } else {
            this.addMessage(catergoryList[i].text, this.MSG_RECEIVE_TYPE, catergoryList[i].type);

        }
    }
};