const App = () => {
    const [gameState, setGameState] = React.useState('controls');
    const [wordsList, setWordsList] = React.useState([]);
    const [remainingWords, setRemainingWords] = React.useState([]);
    const [correctWords, setCorrectWords] = React.useState([]);
    const [failedWords, setFailedWords] = React.useState([]);
    const [score, setScore] = React.useState(0);
    const [totalPoints, setTotalPoints] = React.useState(0);
    const [lastUsedWords, setLastUsedWords] = React.useState('');
    const [gameMode, setGameMode] = React.useState('char');
    const [voices, setVoices] = React.useState([]);
    const [selectedVoice, setSelectedVoice] = React.useState(null);

    React.useEffect(() => {
        loadVoices(setVoices, setSelectedVoice);
    }, []);

    const submitWords = (input) => {
        const words = input.split('\n').map(word => word.trimEnd()).filter(word => word.length > 0);
        if (words.length === 0) {
            alert('Please enter valid words!');
            return;
        }
        setWordsList(words);
        setRemainingWords(words);
        setCorrectWords([]);
        setFailedWords([]);
        setScore(0);
        setTotalPoints(words.length);
        setLastUsedWords(input);
        setGameState('mode');
    };

    const startGame = (mode) => {
        setGameMode(mode);
        setGameState('playing');
    };

    const endGame = () => {
        setGameState('finished');
    };

    const restartGame = () => {
        setGameState('controls');
        setWordsList([]);
        setRemainingWords([]);
        setCorrectWords([]);
        setFailedWords([]);
        setScore(0);
        setTotalPoints(0);
    };

    return (
        <div>
            <h1 className="text-[#2c3e50] text-[clamp(1.8rem,5vw,3rem)] mb-[0.5vh]">Hangman Game</h1>
            <p id="version" className="text-[#7f8c8d] text-[clamp(0.8rem,3vw,1.2rem)] mb-[2vh]">Version 1.38</p>
            <div id="main-container" className={`w-[95vw] max-w-full flex flex-col gap-[2vh] flex-grow ${gameState === 'playing' || gameState === 'finished' ? 'md:flex-row md:items-stretch' : ''}`}>
                {gameState === 'controls' && <Controls onSubmit={submitWords} lastUsedWords={lastUsedWords} />}
                {gameState === 'mode' && (
                    <ModeSelection
                        onStart={startGame}
                        voices={voices}
                        selectedVoice={selectedVoice}
                        setSelectedVoice={setSelectedVoice}
                    />
                )}
                {gameState === 'playing' && (
                    <>
                        <Scoreboard
                            correctWords={correctWords}
                            failedWords={failedWords}
                            score={score}
                            totalPoints={totalPoints}
                            remainingWords={remainingWords}
                            className="md:order-1 md:flex-1 md:max-w-[35vw]"
                        />
                        <Game
                            wordsList={remainingWords}
                            setRemainingWords={setRemainingWords}
                            correctWords={correctWords}
                            setCorrectWords={setCorrectWords}
                            failedWords={failedWords}
                            setFailedWords={setFailedWords}
                            score={score}
                            setScore={setScore}
                            totalPoints={totalPoints}
                            gameMode={gameMode}
                            onEnd={endGame}
                            selectedVoice={selectedVoice}
                            className="md:order-2 md:flex-2"
                        />
                    </>
                )}
                {gameState === 'finished' && (
                    <>
                        <Scoreboard
                            correctWords={correctWords}
                            failedWords={failedWords}
                            score={score}
                            totalPoints={totalPoints}
                            remainingWords={remainingWords}
                            className="md:order-1 md:flex-1 md:max-w-[35vw]"
                        />
                        <FinalScore score={score} totalPoints={totalPoints} onRestart={restartGame} className="md:order-2 md:flex-2" />
                    </>
                )}
            </div>
        </div>
    );
};