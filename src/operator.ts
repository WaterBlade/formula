import { ExpressionCalc, ExpBoard, ReprBoard, ExpressionRepr, toExp, Operand, NumRepr } from "./core";
// ================================================
// bi operator
abstract class BiOper extends ExpressionCalc {
    constructor(public left: ExpressionCalc, public right: ExpressionCalc) {
        super();
    }
}

abstract class BiOperRepr extends ExpressionRepr {
    constructor(public left: ExpressionRepr, public right: ExpressionRepr) {
        super();
    }
}
// add
class Add extends BiOper {
    calc(board: ExpBoard) {
        return this.left.calc(board) + this.right.calc(board);
    }
    toRepr(board: ReprBoard) {
        return new AddRepr(this.left.toRepr(board), this.right.toRepr(board));
    }

}

class AddRepr extends BiOperRepr {
    accept(visitor: { visitAdd(acceptor: AddRepr): void }) {
        visitor.visitAdd(this);
    }
}
// sub
class Sub extends BiOper {
    calc(board: ExpBoard) {
        return this.left.calc(board) - this.right.calc(board);
    }
    toRepr(board: ReprBoard) {
        return new SubRepr(this.left.toRepr(board), this.right.toRepr(board));
    }
}

class SubRepr extends BiOperRepr {
    accept(visitor: { visitSub(acceptor: SubRepr): void }) {
        visitor.visitSub(this);
    }
}
// mul
class Mul extends BiOper {
    constructor(left: ExpressionCalc, right: ExpressionCalc) {
        if (left instanceof Add || left instanceof Sub) {
            left = new Parenthesis(left);
        }
        if (right instanceof Add || right instanceof Sub) {
            right = new Parenthesis(right);
        }
        super(left, right);
    }
    calc(board: ExpBoard) {
        return this.left.calc(board) * this.right.calc(board);
    }
    toRepr(board: ReprBoard) {
        const left = this.left.toRepr(board);
        const right = this.right.toRepr(board);
        if (left instanceof NumRepr && right instanceof NumRepr) {
            return new CrossMulRepr(left, right);
        } else {
            return new MulRepr(left, right);
        }
    }
}

class MulRepr extends BiOperRepr {
    accept(visitor: { visitMul(acceptor: MulRepr): void }) {
        visitor.visitMul(this);
    }
}

class CrossMulRepr extends BiOperRepr {
    accept(visitor: { visitCrossMul(acceptor: CrossMulRepr): void }) {
        visitor.visitCrossMul(this);
    }
}
// div
class Div extends BiOper {
    calc(board: ExpBoard) {
        return this.left.calc(board) / this.right.calc(board);
    }
    toRepr(board: ReprBoard) {
        return new DivRepr(this.left.toRepr(board), this.right.toRepr(board));
    }
}

class DivRepr extends BiOperRepr {
    accept(visitor: { visitDiv(acceptor: DivRepr): void }) {
        visitor.visitDiv(this);
    }
}
// flatDiv
class FlatDiv extends BiOper {
    constructor(left: ExpressionCalc, right: ExpressionCalc) {
        if (left instanceof Add || left instanceof Sub) {
            left = new Parenthesis(left);
        }
        if (right instanceof Add || right instanceof Sub) {
            right = new Parenthesis(right);
        }
        super(left, right);
    }
    calc(board: ExpBoard) {
        return this.left.calc(board) / this.right.calc(board);
    }
    toRepr(board: ReprBoard) {
        return new FlatDivRepr(this.left.toRepr(board), this.right.toRepr(board));
    }
}

class FlatDivRepr extends BiOperRepr {
    accept(visitor: { visitFlatDiv(acceptor: FlatDivRepr): void }) {
        visitor.visitFlatDiv(this);
    }
}

export function add(...exps: Array<Operand>) {
    let left = toExp(exps[0]);
    for(let i = 1; i < exps.length; i++){
        const right = toExp(exps[i]);
        if(right instanceof Neg){
            left = new Sub(left, right.expression);
        }else{
            left = new Add(left, right);
        }
    }
    return left;
}
export function sub(...exps: Array<Operand>) {
    let left = toExp(exps[0]);
    for(let i = 1; i < exps.length; i++){
        const right = toExp(exps[i]);
        if(right instanceof Neg){
            left = new Add(left, right.expression);
        }else{
            left = new Sub(left, right);
        }
    }
    return left;
}
export function mul(...exps: Array<Operand>) {
    let left = toExp(exps[0]);
    for(let i = 1; i < exps.length; i++){
        const right = toExp(exps[i]);
        if(right instanceof Inverse){
            left = new Div(left, right.expression);
        }else{
            left = new Mul(left, right);
        }
    }
    return left;
}
export function div(left: Operand, right: Operand) {
    return new Mul(toExp(left), toExp(right));
}

// unary operator
abstract class UniOper extends ExpressionCalc {
    constructor(public expression: ExpressionCalc) {
        super();
    }
}

abstract class UniOperRepr extends ExpressionRepr {
    constructor(public expression: ExpressionRepr) {
        super();
    }
}

// neg
class Neg extends UniOper {
    calc(board: ExpBoard) {
        return -this.expression.calc(board);
    }
    toRepr(board: ReprBoard) {
        return new NegRepr(this.expression.toRepr(board));
    }
}
class NegRepr extends UniOperRepr {
    accept(visitor: { visitNeg(acceptor: NegRepr): void }) {
        visitor.visitNeg(this);
    }
}
// inverse
class Inverse extends UniOper{
    calc(board: ExpBoard){
        return 1 / this.expression.calc(board);
    }
    toRepr(board: ReprBoard){
        return div(1, this.expression).toRepr(board);
    }
}

// abs
class Abs extends UniOper {
    calc(board: ExpBoard) {
        return -this.expression.calc(board);
    }
    toRepr(board: ReprBoard) {
        return new AbsRepr(this.expression.toRepr(board));
    }
}
class AbsRepr extends UniOperRepr {
    accept(visitor: { visitAbs(acceptor: AbsRepr): void }) {
        visitor.visitAbs(this);
    }
}
// parenthesis
class Parenthesis extends UniOper {
    calc(board: ExpBoard) {
        return -this.expression.calc(board);
    }
    toRepr(board: ReprBoard) {
        return new ParenthesisRepr(this.expression.toRepr(board));
    }
}
class ParenthesisRepr extends UniOperRepr {
    accept(visitor: { visitParenthesis(acceptor: ParenthesisRepr): void }) {
        visitor.visitParenthesis(this);
    }
}
export function neg(exp: Operand){
    return new Neg(toExp(exp));
}
export function abs(exp: Operand){
    return new Abs(toExp(exp));
}
export function inv(exp: Operand){
    return new Inverse(toExp(exp));
}