import Square from "../square";
import Piece from "./piece";
import King from "./king";

export default class RayPiece extends Piece {
  constructor(player) {
    super(player);
    this.directions = [];
  }

  getAvailableMoves(board) {
    const location = board.findPiece(this);
    const row = location.row;
    const col = location.col;
    const moves = [];

    for(let direction of this.directions) {
      for(let i=1; i<8; i++) {
        const potentialSquare = Square.at(row + direction.row * i, col + direction.col * i);

        // Check the square is on the board
        if(potentialSquare.row > 7 || potentialSquare.row < 0 || potentialSquare.col > 7 || potentialSquare.col < 0) {
          break;
        }
        const piece = board.getPiece(potentialSquare);
        // If the potential square is empty add it to moves and continue loop
        if(piece === undefined) {
          moves.push(potentialSquare);
          continue
        }

        if(piece.player !== this.player && !(piece instanceof King)) {
          moves.push(potentialSquare);
        }
        break;
      }
    }
    return moves;
  }
}