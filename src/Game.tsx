export const PLAYER_AI = 'X';
export const PLAYER_USER = 'O';
export const PLAYER_EMPTY = null;

export type Cell = typeof PLAYER_AI | typeof PLAYER_USER | typeof PLAYER_EMPTY;
export type Cells = Array<Cell>;

export const GAME_STATE_IN_PROGRESS = 'progress';
export const GAME_STATE_WINNER_AI = 'lose';
export const GAME_STATE_WINNER_USER = 'win';
export const GAME_STATE_DRAW = 'draw';

export type GameState = typeof GAME_STATE_IN_PROGRESS | typeof GAME_STATE_WINNER_AI | typeof GAME_STATE_WINNER_USER | typeof GAME_STATE_DRAW;

export function getEmptyCells(): Cells {
    return Array(9).fill(PLAYER_EMPTY);
}

export function getGameState(cells: Cells): [GameState, number] {
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
    for (let l = 0; l < lines.length; l++) {
        const [a, b, c] = lines[l];
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            if (cells[a] === PLAYER_AI) {
                return [GAME_STATE_WINNER_AI, l + 1];
            } else {
                return [GAME_STATE_WINNER_USER, l + 1];
            }
        }
    }
    // Check for draw
    if (!cells.includes(PLAYER_EMPTY)) {
        return [GAME_STATE_DRAW, 0];
    }
    return [GAME_STATE_IN_PROGRESS, 0];
}

export function findBestMove(cells: Cells, difficulty: number): index {
    let bestScore = -Infinity;
    let move: number;
    for (let i = 0; i < cells.length; i++) {
        if (cells[i] == PLAYER_EMPTY) {
            cells[i] = PLAYER_AI;
            const score = minimax(cells, difficulty, false);
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
        case GAME_STATE_WINNER_AI:
            return 1;
        case GAME_STATE_WINNER_USER:
            return -1;
        case GAME_STATE_DRAW:
            return 0;
    };
}

function minimax(cells: Cells, depth: number, isMaximizing: boolean): number {
    if (depth === 0) {
        return 0;
    }
    const [gameState] = getGameState(cells);
    if (gameState !== GAME_STATE_IN_PROGRESS) {
        return getScores(gameState);
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i] == PLAYER_EMPTY) {
                cells[i] = PLAYER_AI;
                const score = minimax(cells, depth - 1, false);
                cells[i] = PLAYER_EMPTY;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i] == PLAYER_EMPTY) {
                cells[i] = PLAYER_USER;
                const score = minimax(cells, depth - 1, true);
                cells[i] = PLAYER_EMPTY;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}