import Player from '../player';
import Square from '../square';
import Piece from './piece';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let location = board.findPiece(this);
        let moves = [];
        let direction = this.player === Player.WHITE ? 1 : -1;
        let startPosition = this.player === Player.WHITE ? 1 : 6;
        moves.push(Square.at(location.row + direction, location.col));
        if(location.row === startPosition) {
            moves.push(Square.at(location.row + direction * 2, location.col));
        }
        return moves;
    }
}
