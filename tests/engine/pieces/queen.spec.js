import Queen from '../../../src/engine/pieces/queen';
import Board from '../../../src/engine/board';
import Square from '../../../src/engine/square';
import Player from '../../../src/engine/player';
import Pawn from '../../../src/engine/pieces/pawn';
import King from '../../../src/engine/pieces/king';

describe('Queen', () => {
  let board;
  beforeEach(() => board = new Board());

  it('can move laterally', () => {
    const queen = new Queen(Player.WHITE);
    board.setPiece(Square.at(1,2), queen);
    const moves = queen.getAvailableMoves(board);

    const expectedMoves = [
      // Horizontal
      Square.at(1, 0), Square.at(1, 1), Square.at(1, 3), Square.at(1, 4), Square.at(1, 5), Square.at(1, 6), Square.at(1, 7),
      // Vertical
      Square.at(0, 2), Square.at(2, 2), Square.at(3, 2), Square.at(4, 2), Square.at(5, 2), Square.at(6, 2), Square.at(7, 2)      
    ];

    moves.should.deep.include.members(expectedMoves);
  });

  it('can move diagonally', () => {
    const queen = new Queen(Player.WHITE);
    board.setPiece(Square.at(2,3), queen);
    const moves = queen.getAvailableMoves(board);

    const expectedMoves = [
      // Forwards diagonal
      Square.at(0, 1), Square.at(1, 2), Square.at(3, 4), Square.at(4, 5), Square.at(5, 6), Square.at(6, 7),
      // Backwards diagonal
      Square.at(0, 5), Square.at(1, 4), Square.at(3, 2), Square.at(4, 1), Square.at(5, 0)
    ];

    moves.should.deep.include.members(expectedMoves);
  });

  it('cannot move through friendly pieces', () => {
    const queen = new Queen(Player.WHITE);
    const friendlyPiece = new Pawn(Player.WHITE);
    board.setPiece(Square.at(4,4), queen);
    board.setPiece(Square.at(4,6), friendlyPiece);

    const moves = queen.getAvailableMoves(board);
    moves.should.not.deep.include(Square.at(4, 7));
  });

  it('cannot move through opposing pieces', () => {
    const queen = new Queen(Player.WHITE);
    const opposingPiece = new Pawn(Player.BLACK);
    board.setPiece(Square.at(4, 4), queen);
    board.setPiece(Square.at(4, 6), opposingPiece);

    const moves = queen.getAvailableMoves(board);

    moves.should.not.deep.include(Square.at(4, 7));
  });

  it('can take opposing pieces', () => {
    const queen = new Queen(Player.WHITE);
    const opposingPiece = new Pawn(Player.BLACK);
    board.setPiece(Square.at(4, 4), queen);
    board.setPiece(Square.at(4, 6), opposingPiece);

    const moves = queen.getAvailableMoves(board);

    moves.should.deep.include(Square.at(4, 6));
  });

  it('cannot take the opposing king', () => {
    const queen = new Queen(Player.WHITE);
    const opposingKing = new King(Player.BLACK);
    board.setPiece(Square.at(4, 4), queen);
    board.setPiece(Square.at(4, 6), opposingKing);

    const moves = queen.getAvailableMoves(board);

    moves.should.not.deep.include(Square.at(4, 6));
});

it('cannot take friendly pieces', () => {
    const queen = new Queen(Player.WHITE);
    const friendlyPiece = new Pawn(Player.WHITE);
    board.setPiece(Square.at(4, 4), queen);
    board.setPiece(Square.at(4, 6), friendlyPiece);

    const moves = queen.getAvailableMoves(board);

    moves.should.not.deep.include(Square.at(4, 6));
});

});
