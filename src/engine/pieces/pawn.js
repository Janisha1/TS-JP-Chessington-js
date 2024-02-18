import Player from '../player';
import Square from '../square';
import Piece from './piece';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let location = board.findPiece(this);
        const moves = [];
        let direction = this.player === Player.WHITE ? 1 : -1;
        let startPosition = this.player === Player.WHITE ? 1 : 6;
        let squareAhead = Square.at(location.row + direction, location.col);
        let squareTwoAhead = Square.at(location.row + direction * 2, location.col);

        if(!board.getPiece(squareAhead)) {
            moves.push(squareAhead);
            if(location.row === startPosition) {
                if(!board.getPiece(squareTwoAhead)) {
                    moves.push(squareTwoAhead);
                }
            }
        }
        return moves;
    }
}
