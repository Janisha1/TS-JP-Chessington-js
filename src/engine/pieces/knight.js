import Square from '../square';
import Piece from './piece';

export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const location = board.findPiece(this);
        const row = location.row;
        const col = location.col;
        let moves = [];
        const directions = [
            {row: 2, col: 1},
            {row: 2, col: -1},
            {row: 1, col: 2},
            {row: -1, col: 2},
            {row: -2, col: 1},
            {row: -2, col: -1},
            {row: 1, col: -2},
            {row: -1, col: -2}
        ]

        for(let direction of directions) {
            const potential = Square.at(row + direction.row, col + direction.col);
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
