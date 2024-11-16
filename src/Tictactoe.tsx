import { useState } from 'react';
import { PLAYER_X, PLAYER_O, PLAYER_EMPTY, GAME_STATE_IN_PROGRESS, getGameState, getEmptyCells, Cell } from './Game';
import './Tictactoe.css';

function Tictactoe() {
    const [cells, setCells] = useState(getEmptyCells());
    const [player, setPlayer] = useState(PLAYER_X);
    const [gameState, setGameState] = useState(GAME_STATE_IN_PROGRESS);

    const onCellClick = (index: number) => {
        if (!canClick(index)) {
            return;
        }
        const newCells = cells.slice();
        newCells[index] = player;
        setCells(newCells);
        setGameState(getGameState(newCells));
        changePlayer();
    }
    const canClick = (index: number): boolean => {
        return cells[index] === PLAYER_EMPTY && gameState === GAME_STATE_IN_PROGRESS;
    }
    const changePlayer = () => {
        setPlayer(player === PLAYER_X ? PLAYER_O : PLAYER_X);
    }
    const restart = () => {
        setPlayer(PLAYER_X);
        setCells(getEmptyCells());
        setGameState(GAME_STATE_IN_PROGRESS);
    }

    return (
        <>
            <div className="cells">
                {cells.map((value: Cell, index) => {
                    const nextPlayerClass = canClick(index) ? `next-${player}` : '';
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