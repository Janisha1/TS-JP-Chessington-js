import Square from '../square';
import King from './king';
import Piece from './piece';

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const location = board.findPiece(this);
        const row = location.row;
        const col = location.col;
        const moves = [];
        const directions = [
            {row: 1, col: 0},
            {row: -1, col: 0},
            {row: 0, col: 1},
            {row: 0, col:-1}
        ];

        for(let direction of directions) {
            for(let i=1; i<8; i++) {
                const potentialSquare = Square.at(row + direction.row * i, col + direction.col * i);
                // Check square is on the board
                if(potentialSquare.row > 7 || potentialSquare.row < 0 || potentialSquare.col > 7 || potentialSquare.col < 0) {
                    break;
                }
                const piece = board.getPiece(potentialSquare);
                // Check for empty square
                if(piece === undefined) {
                    moves.push(potentialSquare);
                    continue;
                }
                // Check if opposing player
                if(piece.player !== this.player) {
                    if(!(piece instanceof King)){
                        moves.push(potentialSquare);
                    }
                }
                // Have either come across opposing or own piece
                break;
            }
        }
        return moves;
    }
}
