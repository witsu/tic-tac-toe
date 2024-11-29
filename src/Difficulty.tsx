import { getDifficultyName } from './difficultyName';
import './Difficulty.css';

function Difficulty({level}) {
    return (
        <span className={`difficulty-${level}`}>{getDifficultyName(level)}</span>
    );
};
export default Difficulty;