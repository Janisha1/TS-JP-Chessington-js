import Square from '../square';
import Piece from './piece';

export default class King extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const location = board.findPiece(this);
        let moves = [];
        const directions = [
            {row: 1, col: 0},
            {row: -1, col: 0},
            {row: 0, col: 1},
            {row: 0, col: -1},
            {row: 1, col: 1},
            {row: 1, col: -1},
            {row: -1, col: 1},
            {row: -1, col: -1}
        ]

        for(let direction of directions) {
            const potential = Square.at(
                location.row + direction.row, location.col + direction.col
            );
            if(
                potential.row >=0 &&
                potential.row <=7 &&
                potential.col >=0 &&
                potential.col <=7
            ) {
                const piece = board.getPiece(potential);
                if(!piece) {
                    moves.push(potential);
                } else if (piece.player !== this.player) {
                    moves.push(potential);
                }
            }
        }        
        return moves;
    }
}
