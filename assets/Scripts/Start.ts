const {ccclass, property} = cc._decorator;

@ccclass
export default class StartController extends cc.Component {

    onLoad(){
        this.node.on('touchstart',()=>{
            cc.director.loadScene('GameScene');
        },this);
    }
}
