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
        const move = findBestMove(cells);
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