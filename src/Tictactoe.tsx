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
    const [strike, setStrike] = useState(0);

    const onCellClick = (index: number) => {
        if (!canClick(index)) {
            return;
        }
        const newCells = setCell(cells, index, PLAYER_USER);
        const [gameState, strike] = getGameState(newCells);
        setGameState(gameState);
        setStrike(strike);
        makeAIMove(gameState, newCells);
    }
    const makeAIMove = (gameState: GameState, cells: Cells) => {
        if (gameState !== GAME_STATE_IN_PROGRESS) {
            return;
        }
        const move = findBestMove(cells, difficulty);
        const newCells = setCell(cells, move, PLAYER_AI);
        const [newGameState, strike] = getGameState(newCells)
        setGameState(newGameState);
        setStrike(strike);
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
        setStrike(0);
    }

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