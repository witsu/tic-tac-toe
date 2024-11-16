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

export function findBestMove(cells: Cells): index {
    let bestScore = -Infinity;
    let move: number;
    for (let i = 0; i < cells.length; i++) {
        if (cells[i] == PLAYER_EMPTY) {
            cells[i] = PLAYER_X;
            const score = minimax(cells, 0, false);
            cells[i] = PLAYER_EMPTY;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function getScores(gameState: GameState): number {
    switch (gameState) {
        case GAME_STATE_WINNER_X:
            return 1;
        case GAME_STATE_WINNER_O:
            return -1;
        case GAME_STATE_DRAW:
            return 0;
    };
}

function minimax(cells: Cells, depth: number, isMaximizing: boolean): number {
    const gameState = getGameState(cells);
    if (gameState !== GAME_STATE_IN_PROGRESS) {
        return getScores(gameState);
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i] == PLAYER_EMPTY) {
                cells[i] = PLAYER_X;
                const score = minimax(cells, depth + 1, false);
                cells[i] = PLAYER_EMPTY;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i] == PLAYER_EMPTY) {
                cells[i] = PLAYER_O;
                const score = minimax(cells, depth + 1, true);
                cells[i] = PLAYER_EMPTY;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}