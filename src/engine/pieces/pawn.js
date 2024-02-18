import Player from '../player';
import Square from '../square';
import Piece from './piece';
import King from './king';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const location = board.findPiece(this);
        const row = location.row;
        const col = location.col;
        const moves = [];
        let direction = this.player === Player.WHITE ? 1 : -1;
        let startPosition = this.player === Player.WHITE ? 1 : 6;
        let squareAhead = Square.at(row + direction, col);
        let squareTwoAhead = Square.at(row + direction * 2, col);
        // Check for potential moves ahead
        if(!board.getPiece(squareAhead)) {
            moves.push(squareAhead);
            if(row === startPosition) {
                if(!board.getPiece(squareTwoAhead)) {
                    moves.push(squareTwoAhead);
                }
            }
        }
        // Check for potential moves diagonally - if opposing player piece is on that square
        if(col !== 0) {
            const diagonalMove = Square.at(location.row + direction, location.col - 1);
            const potentialPiece = board.getPiece(diagonalMove);
            if(potentialPiece && (potentialPiece.player !== this.player) && !(potentialPiece instanceof King)) {
                moves.push(diagonalMove);
            }
        }
        if(col != 7) {
            const diagonalMove = Square.at(location.row + direction, location.col + 1);
            const potentialPiece = board.getPiece(diagonalMove);
            if(potentialPiece && (potentialPiece.player !== this.player) && !(potentialPiece instanceof King)) {
                moves.push(diagonalMove);
            }
        }
        return moves;
    }
}
