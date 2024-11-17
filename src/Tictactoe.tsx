import { useState } from 'react';
import {
    PLAYER_AI,
    PLAYER_USER,
    PLAYER_EMPTY,
    GAME_STATE_IN_PROGRESS,
    getGameState,
    getEmptyCells,
    Cell,
    findBestMove
} from './Game';
import './Tictactoe.css';

function Tictactoe() {
    const [cells, setCells] = useState(getEmptyCells());
    const [difficulty, setDifficulty] = useState(0);
    const [gameState, strike] = getGameState(cells);

    const onCellClick = (index: number) => {
        if (!canClick(index)) {
            return;
        }
        setCell(index, PLAYER_USER);
    }
    const canClick = (index: number): boolean => {
        return cells[index] === PLAYER_EMPTY && gameState === GAME_STATE_IN_PROGRESS;
    }
    const setCell = (index: number, value: Cell) => {
        const newCells = cells.slice();
        newCells[index] = value;
        setCells(newCells);
    }
    const makeAIMove = () => {
        if (gameState !== GAME_STATE_IN_PROGRESS || cells.filter(c => c === PLAYER_EMPTY).length % 2 !== 0) {
            return;
        }
        const move = findBestMove(cells, difficulty);
        setCell(move, PLAYER_AI);
    }
    const restart = () => {
        setCells(getEmptyCells());
    }

    makeAIMove();

    return (
        <>
            <div className='difficulty'>
                Difficulty level:
                <select
                    value={difficulty}
                    onChange={e => setDifficulty(Number(e.target.value))}
                >
                    <option value="1">Novice</option>
                    <option value="3">Advanced</option>
                    <option value="5">Expert</option>
                    <option value="8">Legend</option>
                </select>
            </div>

            <div className="cells">
                {cells.map((value: Cell, index) => {
                    const nextPlayerClass = canClick(index) ? `next-${PLAYER_USER}` : '';
                    return <div key={index} className={`cell ${nextPlayerClass}`} onClick={() => onCellClick(index)}>
                        {value}
                    </div>
                })}
                {strike !== 0 && (
                    <div className={`strike strike-line-${strike}`}></div>
                )}
            </div>
            {gameState !== GAME_STATE_IN_PROGRESS && (
                <div>
                    <div className="result">{gameState}</div>
                    <button onClick={restart}>Restart</button>
                </div>
            )}
        </>
    )
}
export default Tictactoe;