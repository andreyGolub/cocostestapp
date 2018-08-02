const {ccclass, property} = cc._decorator;

@ccclass
export default class GameController extends cc.Component {

    @property
    score: number = 0;

    @property
    time: number = 60;

    @property
    currentTime: number = this.time;

    @property
    difficultyLevel: number = 0;

    @property
    equalityCorrectness: boolean = false;  

    @property(cc.Label)
    equalityLabel: cc.Label;

    @property(cc.Label)
    scoreLabel: cc.Label;

    @property(cc.Label)
    timeLabel: cc.Label;

    onLoad () {
        this.gameStart();
    }

    gameStart(){
        let timer = ()=>{
            if(this.currentTime == 0){
                this.unschedule(timer);
                this.gameEnd();
                return;
            }
            this.timeUpdate();
        }
        this.schedule(timer, 1, this.time, 1);
        this.generateEquality();
    }

    gameEnd(){
        this.saveScore();
        cc.director.loadScene("GameEnd");
    }

    saveScore(){
        document.cookie = 'CurrentScore=' + this.score.toString();
        let cookies = document.cookie.split("; ");
        let hasScore = false;
        for (let i = 0; i < cookies.length; i++) {
            if(cookies[i].includes('HighScore')){
                this.score > +cookies[i].substr(10) ? document.cookie = 'HighScore=' + this.score.toString() : true;
                hasScore = true;
            }
        }
        hasScore ? true : document.cookie = 'HighScore=' + this.score.toString();
    }

    timeUpdate(){
        this.timeLabel.string = "Time left: " + --this.currentTime;
    }

    difficultyLevelCheck(){
        if(this.score > 10){
            this.difficultyLevel = 2;
        }
        else{
            if(this.score > 3){
                this.difficultyLevel = 1;
            }
            else{
                this.difficultyLevel = 0;
            }
        }
    }

    generateEquality(){
        this.difficultyLevelCheck();
        let numberSize = this.numberSizeGenerator();
        let arr = [];
        for(let i = 0; i < 2; i++){
            arr.push(this.numberGenerator(numberSize));
        }
        let operator = this.operatorGenerator();
        let operatorsSymbol;
        let rightAnswer;
        switch(operator){
            case 0:
                rightAnswer = arr[0] + arr[1];
                operatorsSymbol = ' + ';
                break;
            case 1:
                rightAnswer = arr[0] * arr[1];
                operatorsSymbol = ' * ';
                break;
            case 2:
                rightAnswer = arr[0] / arr[1];
                operatorsSymbol = ' / '
                break;
        }
        let answer = rightAnswer + Math.round(Math.random() * 2 - 1);
        answer == rightAnswer ? this.equalityCorrectness = true : this.equalityCorrectness = false;
        this.equalityUpdate(arr[0] + operatorsSymbol + arr[1] + ' = ' + answer);
    }

    numberSizeGenerator(){
        let res = 10;
        for(let i = 0; i < this.difficultyLevel; i++){
            res *= 10;
        }
        return res;
    }

    numberGenerator(size){
        return Math.round(Math.random() * 2 * size - size);
    }

    operatorGenerator(){
        return  Math.round(Math.random() * this.difficultyLevel);
    }

    equalityUpdate(text){
        this.equalityLabel.string = text;
        let animation = this.equalityLabel.getComponent('cc.Animation');
        animation.play();
    }

    checkAnswer(answer){
        let isCorrect = (answer == this.equalityCorrectness);
        isCorrect ? this.scoreUpdate(true) : this.scoreUpdate(false);
        this.generateEquality();
        return isCorrect;
    }

    scoreUpdate(flag){
        flag ? this.scoreLabel.string = "Score: " + ++this.score : this.score > 0 ? this.scoreLabel.string = "Score: " + --this.score : true;
    }
}
