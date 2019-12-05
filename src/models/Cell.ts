export default class Cell {
    x : number;
    y : number;
    isAlive : boolean;

    constructor(x : number, y : number) {
        this.x = x;
        this.y = y;
        this.isAlive = false;
    }
}