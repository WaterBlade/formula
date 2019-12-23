import { ExpressionCalc, ExpBoard, ReprBoard, ExpressionRepr, Operand, toExp } from "./core";

// ========================================================
// unary function
abstract class UniFunc extends ExpressionCalc{
    constructor(public expression: ExpressionCalc){super();}
}

abstract class UniFuncRepr extends ExpressionRepr{
    constructor(public expression: ExpressionRepr){super();}
}
// Sin
class Sin extends UniFunc{
    calc(board: ExpBoard){
        return Math.sin(this.expression.calc(board));
    }
    toRepr(board: ReprBoard){
        return new SinRepr(this.expression.toRepr(board));
    }
}
class SinRepr extends UniFuncRepr{
    accept(visitor: {visitSin(acceptor: SinRepr): void}){
        visitor.visitSin(this);
    }
}
// Cos
class Cos extends UniFunc{
    calc(board: ExpBoard){
        return Math.cos(this.expression.calc(board));
    }
    toRepr(board: ReprBoard){
        return new CosRepr(this.expression.toRepr(board));
    }
}
class CosRepr extends UniFuncRepr{
    accept(visitor: {visitCos(acceptor: CosRepr): void}){
        visitor.visitCos(this);
    }
}
// Tan
class Tan extends UniFunc{
    calc(board: ExpBoard){
        return Math.tan(this.expression.calc(board));
    }
    toRepr(board: ReprBoard){
        return new TanRepr(this.expression.toRepr(board));
    }
}
class TanRepr extends UniFuncRepr{
    accept(visitor: {visitTan(acceptor: TanRepr): void}){
        visitor.visitTan(this);
    }
}
// Cot
class Cot extends UniFunc{
    calc(board: ExpBoard){
        return 1 / Math.tan(this.expression.calc(board));
    }
    toRepr(board: ReprBoard){
        return new CotRepr(this.expression.toRepr(board));
    }
}
class CotRepr extends UniFuncRepr{
    accept(visitor: {visitCot(acceptor: CotRepr): void}){
        visitor.visitCot(this);
    }
}
// ASin
class ASin extends UniFunc{
    calc(board: ExpBoard){
        return Math.asin(this.expression.calc(board));
    }
    toRepr(board: ReprBoard){
        return new ASinRepr(this.expression.toRepr(board));
    }
}
class ASinRepr extends UniFuncRepr{
    accept(visitor: {visitASin(acceptor: ASinRepr): void}){
        visitor.visitASin(this);
    }
}
// ACos
class ACos extends UniFunc{
    calc(board: ExpBoard){
        return Math.acos(this.expression.calc(board));
    }
    toRepr(board: ReprBoard){
        return new ACosRepr(this.expression.toRepr(board));
    }
}
class ACosRepr extends UniFuncRepr{
    accept(visitor: {visitACos(acceptor: ACosRepr): void}){
        visitor.visitACos(this);
    }
}
// ATan
class ATan extends UniFunc{
    calc(board: ExpBoard){
        return Math.atan(this.expression.calc(board));
    }
    toRepr(board: ReprBoard){
        return new ATanRepr(this.expression.toRepr(board));
    }
}
class ATanRepr extends UniFuncRepr{
    accept(visitor: {visitATan(acceptor: ATanRepr): void}){
        visitor.visitATan(this);
    }
}
// ACot
class ACot extends UniFunc{
    calc(board: ExpBoard){
        return Math.PI / 2 - Math.atan(this.expression.calc(board));
    }
    toRepr(board: ReprBoard){
        return new ACotRepr(this.expression.toRepr(board));
    }
}
class ACotRepr extends UniFuncRepr{
    accept(visitor: {visitACot(acceptor: ACotRepr): void}){
        visitor.visitACot(this);
    }
}
// Log
class Log extends UniFunc{
    calc(board: ExpBoard){
        return Math.log10(this.expression.calc(board));
    }
    toRepr(board: ReprBoard){
        return new LogRepr(this.expression.toRepr(board));
    }
}
class LogRepr extends UniFuncRepr{
    accept(visitor: {visitLog(acceptor: LogRepr): void}){
        visitor.visitLog(this);
    }
}
// Ln
class Ln extends UniFunc{
    calc(board: ExpBoard){
        return Math.log(this.expression.calc(board));
    }
    toRepr(board: ReprBoard){
        return new LnRepr(this.expression.toRepr(board));
    }
}
class LnRepr extends UniFuncRepr{
    accept(visitor: {visitLn(acceptor: LnRepr): void}){
        visitor.visitLn(this);
    }
}
export function sin(exp: Operand){return new Sin(toExp(exp));}
export function cos(exp: Operand){return new Cos(toExp(exp));}
export function tan(exp: Operand){return new Tan(toExp(exp));}
export function cot(exp: Operand){return new Cot(toExp(exp));}
export function asin(exp: Operand){return new ASin(toExp(exp));}
export function acos(exp: Operand){return new ACos(toExp(exp));}
export function atan(exp: Operand){return new ATan(toExp(exp));}
export function acot(exp: Operand){return new ACot(toExp(exp));}
export function log(exp: Operand){return new Log(toExp(exp));}
export function ln(exp: Operand){return new Ln(toExp(exp));}

// ========================================================
// bi function
abstract class BiFunc extends ExpressionCalc{
    constructor(public base: ExpressionCalc, public index: ExpressionCalc){super();}
}

abstract class BiFuncRepr extends ExpressionRepr{
    constructor(public base: ExpressionRepr, public index: ExpressionRepr){super();}
}
// Pow
class Pow extends BiFunc{
    calc(board: ExpBoard){
        return Math.pow(this.base.calc(board), this.index.calc(board));
    }
    toRepr(board: ReprBoard){
        return new PowRepr(this.base.toRepr(board), this.index.toRepr(board));
    }
}
class PowRepr extends BiFuncRepr{
    accept(visitor: {visitPow(acceptor: PowRepr): void}){
        visitor.visitPow(this);
    }
}
// Radical
class Radical extends BiFunc{
    calc(board: ExpBoard){
        return Math.pow(this.base.calc(board), this.index.calc(board));
    }
    toRepr(board: ReprBoard){
        return new RadicalRepr(this.base.toRepr(board), this.index.toRepr(board));
    }
}
class RadicalRepr extends BiFuncRepr{
    accept(visitor: {visitRadical(acceptor: RadicalRepr): void}){
        visitor.visitRadical(this);
    }
}
export function pow(base: Operand, index: Operand){
    return new Pow(toExp(base), toExp(index));
}
export function root(base: Operand, index: Operand){
    return new Radical(toExp(base), toExp(index));
}