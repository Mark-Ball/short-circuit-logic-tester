const falsyValues = [0, null, undefined, '', false, NaN];
const truthyValues = [1, 5, "\"hello\"", 7, 12, 23, "\"cat\"", "\"end\"", "\"left\"", "\"right\"", "\"k\"", true];
const trickValues = ["\"0\"", "\"null\"", "\"undefined\"", "\"empty string\"", "\"false\"", "\"true\"", "\"zero\"", "[]", "{}"];
// 
// 50% &&, 50% ||
// 20% falsy vs falsy
// 20% falsy vs truthy
// 20% truthy vs falsy
// 20% truthy vs truthy
// 4% trick vs falsy
// 4% trick vs truthy
// 4% falsy vs trick
// 4% truthy vs trick
// 4% trick vs trick

class Question {
    constructor() {
        this.point = 0;
        this.logicalOperator = Math.random() > 0.5 ? '&&' : '||';

        let randomType = Math.random();

        if (randomType <= 0.20) {
            this.left = falsyValues[Math.floor(Math.random() * falsyValues.length + 1)];
            this.right = falsyValues[Math.floor(Math.random() * falsyValues.length + 1)];
        } else if (randomType <= 0.40) {
            this.left = falsyValues[Math.floor(Math.random() * falsyValues.length + 1)];
            this.right = truthyValues[Math.floor(Math.random() * truthyValues.length + 1)];
        } else if (randomType <= 0.60) {
            this.left = truthyValues[Math.floor(Math.random() * truthyValues.length + 1)];
            this.right = falsyValues[Math.floor(Math.random() * falsyValues.length + 1)];
        } else if (randomType <= 0.80) {
            this.left = truthyValues[Math.floor(Math.random() * truthyValues.length + 1)];
            this.right = truthyValues[Math.floor(Math.random() * truthyValues.length + 1)];
        } else if (randomType <= 0.84) {
            this.left = trickValues[Math.floor(Math.random() * trickValues.length + 1)];
            this.right = falsyValues[Math.floor(Math.random() * falsyValues.length + 1)];
        } else if (randomType <= 0.88) {
            this.left = trickValues[Math.floor(Math.random() * trickValues.length + 1)];
            this.right = truthyValues[Math.floor(Math.random() * truthyValues.length + 1)];
        } else if (randomType <= 0.92) {
            this.left = falsyValues[Math.floor(Math.random() * falsyValues.length + 1)];
            this.right = trickValues[Math.floor(Math.random() * trickValues.length + 1)];
        } else if (randomType <= 0.96) {
            this.left = truthyValues[Math.floor(Math.random() * truthyValues.length + 1)];
            this.right = trickValues[Math.floor(Math.random() * trickValues.length + 1)];
        } else {
            this.left = trickValues[Math.floor(Math.random() * trickValues.length + 1)];
            this.right = trickValues[Math.floor(Math.random() * trickValues.length + 1)];
        }
    }

    ask() {
        console.log(this.logicalOperator === '&&' ?
             `${this.left} && ${this.right}` :
             `${this.left} || ${this.right}`);
    }

    getCorrectAnswer() {
        const correctAnswer = this.logicalOperator === '&&' ?
            this.left && this.right :
            this.left || this.right;

        // everything passed on from readline sync is a string
        // therefore answer must be a string
        return `${correctAnswer}`;
    }
    
    evaluateResponse(response) {
        if (response === this.getCorrectAnswer()) {
            this.point = 1;
            console.log('Correct!');
        }
    }
}

module.exports = Question;