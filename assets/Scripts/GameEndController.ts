
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    finalLabel: cc.Label;

    getScore(){
        let cookies = document.cookie.split("; ");
        let highScore;
        let currentScore;
        for (let i = 0; i < cookies.length; i++) {
             cookies[i].includes('CurrentScore') ? currentScore = cookies[i].substr(13) : true;
             cookies[i].includes('HighScore') ? highScore = cookies[i].substr(10) : true;
        }
        return [+currentScore, +highScore];
    }

    onLoad() {
        let res = [];
        res = this.getScore();
        let text =  "Time UP!\n Your score: " + res[0] + '\n High score: ' + res[1];
        this.finalLabel.string = text;
    }
}
