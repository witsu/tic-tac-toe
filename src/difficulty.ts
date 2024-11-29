function getDifficultyName(level: number): string {
    switch (level) {
        case 0:
        case 1:
            return 'novice';
        case 3:
            return 'advanced';
        case 5:
            return 'expert';
        case 8:
            return 'legend';
    }
}
export default getDifficultyName;