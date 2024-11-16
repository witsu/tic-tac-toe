import { useState } from 'react';
import {
    PLAYER_AI,
    PLAYER_USER,
    PLAYER_EMPTY,
    GAME_STATE_IN_PROGRESS,
    getGameState,
    getEmptyCells,
    Cell,
    findBestMove,
    GameState
} from './Game';
import './Tictactoe.css';

function Tictactoe() {
    const [cells, setCells] = useState(getEmptyCells());
    const [gameState, setGameState] = useState(GAME_STATE_IN_PROGRESS);
    const [difficulty, setDifficulty] = useState(0);

    const onCellClick = (index: number) => {
        if (!canClick(index)) {
            return;
        }
        const newCells = setCell(cells, index, PLAYER_USER);
        const gameState = getGameState(newCells);
        setGameState(gameState);
        makeAIMove(gameState, newCells);
    }
    const makeAIMove = (gameState: GameState, cells: Cells) => {
        if (gameState !== GAME_STATE_IN_PROGRESS) {
            return;
        }
        const move = findBestMove(cells, difficulty);
        const newCells = setCell(cells, move, PLAYER_AI);
        setGameState(getGameState(newCells));
    }
    const setCell = (cells: Cells, index: number, value: Cell): Cells => {
        const newCells = cells.slice();
        newCells[index] = value;
        setCells(newCells);
        return newCells;
    }
    const canClick = (index: number): boolean => {
        return cells[index] === PLAYER_EMPTY && gameState === GAME_STATE_IN_PROGRESS;
    }
    const restart = () => {
        setCells(getEmptyCells());
        setGameState(GAME_STATE_IN_PROGRESS);
    }

    return (
        <>
            <div className='difficulty'>
                Difficulty level:
                <select
                    value={difficulty}
                    onChange={e => setDifficulty(e.target.value)}
                >
                    <option value="0">Beginner</option>
                    <option value="1">Novice</option>
                    <option value="2">Advanced</option>
                    <option value="3">Expert</option>
                    <option value="4">Legend</option>
                </select>
            </div>

            <div className="cells">
                {cells.map((value: Cell, index) => {
                    const nextPlayerClass = canClick(index) ? `next-${PLAYER_USER}` : '';
                    return <div key={index} className={`cell ${nextPlayerClass}`} onClick={() => onCellClick(index)}>
                        {value}
                    </div>
                })}
            </div>
            {gameState !== GAME_STATE_IN_PROGRESS && (
                <div>
                    <div className="result">{gameState}</div>
                    <button onClick={restart}>Reset</button>
                </div>
            )}
        </>
    )
}
export default Tictactoe;