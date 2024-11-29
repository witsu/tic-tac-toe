import { useState } from 'react'
import pb from './pocketbaseClient';
import { getEmptyCells, GAME_STATE_IN_PROGRESS } from './Game';
import { Link, Outlet, useNavigate } from "react-router";

import './App.css'
import { getDifficultyName } from './difficultyName';

function App() {
    const [difficulty, setDifficulty] = useState(0);
    const navigate = useNavigate();

    // TODO: authenticate user
    const startGame = async () => {
        const game = await pb.collection('games').create({
          user: 'ec9x0hmo73khv87',
          difficulty: difficulty,
          state: GAME_STATE_IN_PROGRESS,
          cells: getEmptyCells()
        });
        navigate(`/games/${game.id}`);
    }

    return (
        <>
            <h1>Tic tac toe</h1>
            <div className='difficulty'>
                <button onClick={startGame}>Start new game</button>
                as
                <select
                    value={difficulty}
                    onChange={e => setDifficulty(Number(e.target.value))}
                >
                    <option value="1">{getDifficultyName(1)}</option>
                    <option value="3">{getDifficultyName(3)}</option>
                    <option value="5">{getDifficultyName(5)}</option>
                    <option value="8">{getDifficultyName(8)}</option>
                </select>
            </div>
            <div className='previousGames'>or check previous <Link to="games">games</Link></div>
            <Outlet />
        </>
    )
}

export default App
