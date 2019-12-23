// Blankboard

export class ExpBoard {
    map = new Map<VariableCalc, number>();
    get(variable: VariableCalc): number {
        if (this.map.has(variable)) {
            return this.map.get(variable)!;
        } else {
            throw Error(`${variable} used before assigned!`);
        }
    }
    has(variable: VariableCalc) {
        return this.map.has(variable);
    }
    set(variable: VariableCalc, value: number) {
        this.map.set(variable, value);
    }
    toVar() {
        const board = new ReprBoard();
        this.map.forEach((value, key) => {
            board.set(key, new VariableRepr(key, value));
        })
        return board;
    }
    toNum() {
        const board = new ReprBoard();
        this.map.forEach((value, key) => {
            board.set(key, new NumRepr(value));
        });
        return board;
    }
}

export class ReprBoard {
    map = new Map<VariableCalc, ExpressionRepr>();
    get(variable: VariableCalc): ExpressionRepr {
        if (this.map.has(variable)) {
            return this.map.get(variable)!;
        } else {
            throw Error(`${variable} used before assigned!`);
        }
    }
    has(variable: VariableCalc) {
        return this.map.has(variable);
    }
    set(variable: VariableCalc, repr: ExpressionRepr) {
        this.map.set(variable, repr);
    }
}

// basic expression
export abstract class ExpressionCalc {
    abstract calc(board: ExpBoard): number;
    abstract toRepr(board?: ReprBoard): ExpressionRepr;
}

export abstract class ExpressionRepr {
    abstract accept(visitor: {}): void;
}

// basic variable
export class VariableCalc extends ExpressionCalc{
    private _subs!: string;
    private _info!: string;
    private _unit!: ExpressionRepr;
    constructor(public name: string) {super();}
    calc(board: ExpBoard){
        return board.get(this);
    }
    toRepr(board: ReprBoard){
        return board.get(this);
    }
    subs(val: string) {
        this._subs = val;
        return this;
    }
    info(val: string) {
        this._info = val;
        return this;
    }
    unit(val: ExpressionRepr) {
        this._unit = val;
        return this;
    }
}

export class VariableRepr extends ExpressionRepr {
    constructor(public variable: VariableCalc, public value: number) { super(); }
    accept(visitor: { visitVariable(acceptor: VariableRepr): void }) {
        visitor.visitVariable(this);
    }
}

// basic number
export class Num extends ExpressionCalc {
    constructor(public value: number) { super(); }
    calc(board: ExpBoard) {
        return this.value;
    }
    toRepr(board: ReprBoard) {
        return new NumRepr(this.value);
    }
}

export class NumRepr extends ExpressionRepr {
    constructor(public value: number) { super(); }
    accept(visitor: { visitNum(acceptor: NumRepr): void }) {
        visitor.visitNum(this);
    }
}

// wrapper
export type Operand = ExpressionCalc | number;
export function toExp(item: Operand) {
    return item instanceof ExpressionCalc ? item : new Num(item);
}

// funciton
export function V(name: string){
    return new VariableCalc(name);
}