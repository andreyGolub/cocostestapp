const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayAgainController extends cc.Component {

    onLoad() {
        this.node.on('touchstart', (event) => {
            cc.director.loadScene("GameScene");
        }, this)
    }
}
