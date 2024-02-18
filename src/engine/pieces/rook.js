import Square from '../square';
import Piece from './piece';

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let location = board.findPiece(this); 
        const moves = [];

        for( let i = 0; i <= 7; i++ ) {
            if (i !== location.row) {
                moves.push(Square.at(i, location.col));
            }
            if ( i !== location.col) {
                moves.push(Square.at(location.row, i));
            }           
        }
        return moves;
    }
}
