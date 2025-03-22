const Game = ({
    wordsList,
    setRemainingWords,
    correctWords,
    setCorrectWords,
    failedWords,
    setFailedWords,
    score,
    setScore,
    totalPoints,
    gameMode,
    onEnd,
    selectedVoice,
    className,
}) => {
    const [selectedWord, setSelectedWord] = React.useState('');
    const [hiddenWord, setHiddenWord] = React.useState('');
    const [guessesLeft, setGuessesLeft] = React.useState(6);
    const [guessedLetters, setGuessedLetters] = React.useState(new Set());
    const [guessAttempts, setGuessAttempts] = React.useState([]);
    const [guessInput, setGuessInput] = React.useState('');
    const [message, setMessage] = React.useState('');
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        startNextWord();
    }, []);

    React.useEffect(() => {
        drawHangman(canvasRef, guessesLeft);
    }, [guessesLeft]);

    const startNextWord = () => {
        if (wordsList.length === 0) {
            onEnd();
            return;
        }
        const word = wordsList[Math.floor(Math.random() * wordsList.length)];
        console.log('Selected word:', word);
        setSelectedWord(word);
        setRemainingWords(wordsList.filter(w => w !== word));
        setHiddenWord('_'.repeat(word.length));
        setGuessesLeft(6);
        setGuessedLetters(new Set());
        setGuessAttempts([]);
        setMessage(`Guesses left: 6`);
        setGuessInput('');
        speakWordWithVoice(word, selectedVoice);
    };

    const makeGuess = () => {
        handleGuess({
            guessInput,
            gameMode,
            selectedWord,
            hiddenWord,
            guessesLeft,
            guessedLetters,
            guessAttempts,
            correctWords,
            failedWords,
            score,
            setGuessInput,
            setGuessedLetters,
            setGuessAttempts,
            setHiddenWord,
            setGuessesLeft,
            setMessage,
            setCorrectWords,
            setFailedWords,
            setScore,
            startNextWord,
            speakWord
        });
    };

    const speakWord = () => {
        if (!selectedWord) {
            alert('Start a game first!');
            return;
        }
        speakWordWithVoice(selectedWord, selectedVoice);
    };

    return (
        <div className={`m-[2vh_0] w-[90vw] max-w-full p-[2vh] bg-white rounded-lg shadow-lg flex flex-col items-center ${className}`}>
            <div id="word-display" className="text-[clamp(1.5rem,4vw,2.5rem)] my-[2vh] tracking-[0.5vw] text-[#2c3e50] break-all">{hiddenWord}</div>
            <div>Total characters: {selectedWord.length}</div>
            <div className="flex flex-col justify-center gap-[2vh] w-full md:flex-row md:items-center">
                <canvas 
                    ref={canvasRef} 
                    id="hangman-canvas" 
                    className="m-[2vh_auto] w-[300px] h-[300px] max-w-[min(300px,75vw)] max-h-[min(300px,75vw)]"
                ></canvas>
                <div className="flex-1 min-w-[25vw] m-[0.5vh]">
                    <h3 className="text-[#2c3e50] text-[clamp(1rem,2.5vw,1.4rem)] mb-[1vh]">Guess Attempts</h3>
                    <ul className="list-none p-0 max-h-[20vh] overflow-y-auto md:max-h-[15vh]">
                        {guessAttempts.map(({ guess, clue }, index) => (
                            <li key={index} className="bg-[#ecf0f1] m-[0.5vh_0] p-[0.5vh] rounded flex justify-between items-center text-[clamp(0.8rem,2vw,1.1rem)]">
                                {guess}
                                {clue && (
                                    <span className="inline-flex gap-[0.2vw]">
                                        {clue.map((c, i) => (
                                            <span key={i} className={`w-[clamp(10px,1.5vw,15px)] h-[clamp(10px,1.5vw,15px)] border border-[#bdc3c7] ${c === 'black' ? 'bg-[#2c3e50]' : c === 'white' ? 'bg-white' : ''}`}></span>
                                        ))}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex flex-col gap-[0.5vh] w-full md:flex-row md:gap-[1vh] md:justify-center">
                <input
                    id="guess-input"
                    type="text"
                    value={guessInput}
                    onChange={(e) => setGuessInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && makeGuess()}
                    className={`p-[1vh] border border-[#bdc3c7] rounded-md text-[clamp(0.9rem,2vw,1.2rem)] w-full ${gameMode !== 'char' ? 'md:w-[clamp(15vw,20vw,25vw)]' : 'md:w-[clamp(5vw,10vw,15vw)]'}`}
                    placeholder={gameMode === 'char' ? 'Guess a letter, - or space' : gameMode === 'mastermind' ? 'Guess the phrase' : 'Guess whole phrase'}
                    maxLength={gameMode === 'char' ? 1 : undefined}
                />
                <button onClick={makeGuess} className="p-[1vh_2vw] bg-[#3498db] text-white rounded-md hover:bg-[#2980b9] w-full md:w-auto text-[clamp(0.9rem,2vw,1.2rem)]">Guess</button>
                <button onClick={speakWord} className="p-[1vh_2vw] bg-[#3498db] text-white rounded-md hover:bg-[#2980b9] w-full md:w-auto text-[clamp(0.9rem,2vw,1.2rem)]">Read Word</button>
            </div>
            <div id="message" className="text-[clamp(0.9rem,3vw,1.3rem)] text-[#e74c3c] mt-[1vh]">{message}</div>
        </div>
    );
};