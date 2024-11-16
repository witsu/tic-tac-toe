export const PLAYER_X = 'X';
export const PLAYER_O = 'O';
export const PLAYER_EMPTY = null;

export type Cell = typeof PLAYER_X | typeof PLAYER_O | typeof PLAYER_EMPTY;
export type Cells = Array<Cell>;

export const GAME_STATE_IN_PROGRESS = 'in progress';
export const GAME_STATE_WINNER_X = 'winner X';
export const GAME_STATE_WINNER_O = 'winner O';
export const GAME_STATE_DRAW = 'draw';

export type GameState = typeof GAME_STATE_IN_PROGRESS | typeof GAME_STATE_WINNER_X | typeof GAME_STATE_WINNER_O | typeof GAME_STATE_DRAW;

export function getEmptyCells(): Cells {
    return Array(9).fill(PLAYER_EMPTY);
}

export function getGameState(cells: Cells): GameState {
    // Check for winner
    const lines = [
        [0, 1, 2], // horizontal
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // vertical
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // diagonal
        [2, 4, 6],
    ];
    for (const line of lines) {
        const [a, b, c] = line;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            if (cells[a] === PLAYER_X) {
                return GAME_STATE_WINNER_X;
            } else {
                return GAME_STATE_WINNER_O;
            }
        }
    }
    // Check for draw
    if (!cells.includes(PLAYER_EMPTY)) {
        return GAME_STATE_DRAW;
    }
    return GAME_STATE_IN_PROGRESS;
}