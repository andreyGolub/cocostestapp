const {ccclass, property} = cc._decorator;
import GameController = require("./GameController");

@ccclass
export default class ButtonController extends cc.Component {
    @property
    flag: boolean = true;

    @property(cc.Node)
    gameController: cc.Node;

    onLoad() {
        this.node.on('touchstart', (event) => {
            let gameController = this.gameController.getComponent("GameController");
            let isCorrect = gameController.checkAnswer(this.flag);
            if(isCorrect){
                this.node.color = cc.color(0, 255, 0);
                this.scheduleOnce(()=>{
                    this.node.color = cc.color(255, 255, 255);
                }, 0.5);
            }
            else{
                this.node.color = cc.color(255, 0, 0);
                this.scheduleOnce(()=>{
                    this.node.color = cc.color(255, 255, 255);
                }, 0.5);
            }
        }, this)
    }
}