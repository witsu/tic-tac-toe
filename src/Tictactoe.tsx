import { useEffect, useState } from 'react';
import {
    PLAYER_AI,
    PLAYER_USER,
    PLAYER_EMPTY,
    GAME_STATE_IN_PROGRESS,
    getGameState,
    Cell,
    findBestMove
} from './Game';
import pb from './pocketbaseClient';
import './Tictactoe.css';

function Tictactoe({game}) {
    const [cells, setCells] = useState(game.cells);
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
        const move = findBestMove(cells, game.difficulty);
        setCell(move, PLAYER_AI);
    }

    useEffect(() => {
        if (game.cells.toString() === cells.toString() && game.state === gameState) {
            return
        }
        pb.collection('games').update(game.id, {
            cells: cells,
            state: gameState
        });
    }, [game, cells, gameState]);

    makeAIMove();

    return (
        <div>
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
                <div className="result">{gameState}</div>
            )}
        </div>
    )
}
export default Tictactoe;