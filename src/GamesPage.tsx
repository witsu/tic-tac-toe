import { useEffect, useState } from 'react'
import { Link } from "react-router";
import { formatDistanceToNow } from 'date-fns';
import pb from './pocketbaseClient';
import Difficulty from './Difficulty';
import './GamesPage.css';

function formatTimeFromNow(dateString: string): string {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
}

function GamesPage() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        async function getGames() {
            const result = await pb.collection('games').getList(1, 10, {
                sort: '-created',
                filter: 'user="ec9x0hmo73khv87"'
            });
            setGames(result.items);
        }
        getGames();
    }, []);

    return (
        <div>
            <ul className='games'>
                {games.map((game) => {
                    return <li key={game.id}>
                        <Link to={game.id}>{game.state}</Link> vs <Difficulty level={game.difficulty}></Difficulty> {formatTimeFromNow(game.created)}
                    </li>
                })}
            </ul>
        </div>
    )
}

export default GamesPage;
