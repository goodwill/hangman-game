function getMasterMindClue(guess, selectedWord) {
    const target = selectedWord.split('');
    const guessed = guess.split('');
    const clue = [];
    const usedTargetPositions = new Set();
    const checkForCharMatch = [];

    for (let i = 0; i < Math.min(target.length, guessed.length); i++) {
        if (guessed[i] === target[i]) {
            clue.push('black');
            usedTargetPositions.add(i);
        } else {
            checkForCharMatch.push(target[i]);
        }
    }

    for (let i = 0; i < guessed.length; i++) {
        if (!usedTargetPositions.has(i)) {
            const charIndex = checkForCharMatch.indexOf(guessed[i]);
            if (charIndex !== -1) {
                clue.push('white');
                checkForCharMatch.splice(charIndex, 1);
            }
        }
    }
    return clue;
}

function handleGuess({
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
}) {
    let guess = guessInput;
    if (gameMode === 'char') {
        guess = guessInput.length === 1 && guessInput === ' ' ? ' ' : guessInput.toLowerCase().trim();
        if (guess.length !== 1 || !/[a-z- ]/.test(guess)) {
            alert('Please enter a single letter, hyphen, or space!');
            return;
        }
        if (guessedLetters.has(guess)) {
            alert('You already guessed that!');
            return;
        }
        const newGuessedLetters = new Set(guessedLetters);
        newGuessedLetters.add(guess);
        setGuessedLetters(newGuessedLetters);
        setGuessAttempts([{ guess: guess === ' ' ? '[space]' : guess, clue: null }, ...guessAttempts]);
        setGuessInput('');

        if (selectedWord.includes(guess)) {
            const newHiddenWord = selectedWord.split('').map((char, i) =>
                char === guess ? char : hiddenWord[i]
            ).join('');
            setHiddenWord(newHiddenWord);

            if (newHiddenWord === selectedWord) {
                setCorrectWords([...correctWords, selectedWord]);
                setScore(score + 1);
                setMessage('You win! Next word...');
                setTimeout(startNextWord, 1000);
            }
        } else {
            setGuessesLeft(guessesLeft - 1);
            setMessage(`Guesses left: ${guessesLeft - 1}`);
            if (guessesLeft - 1 === 0) {
                setFailedWords([...failedWords, selectedWord]);
                setMessage(`Game Over! The word was: ${selectedWord}. Next word...`);
                setTimeout(startNextWord, 1000);
            }
        }
    } else {
        guess = guessInput.trim();
        if (!guess) {
            speakWord();
            return;
        }
        console.log('Guessing:', guess, 'against:', selectedWord);
        if (guessedLetters.has(guess)) {
            alert('You already guessed that phrase!');
            return;
        }
        const newGuessedLetters = new Set(guessedLetters);
        newGuessedLetters.add(guess);
        setGuessedLetters(newGuessedLetters);
        const clue = gameMode === 'mastermind' ? getMasterMindClue(guess, selectedWord) : null;
        setGuessAttempts([{ guess, clue }, ...guessAttempts]);
        setGuessInput('');

        if (guess === selectedWord) {
            setHiddenWord(selectedWord);
            setCorrectWords([...correctWords, selectedWord]);
            setScore(score + 1);
            setMessage('You win! Next word...');
            setTimeout(startNextWord, 1000);
        } else {
            setGuessesLeft(guessesLeft - 1);
            setMessage(`Guesses left: ${guessesLeft - 1}`);
            if (guessesLeft - 1 === 0) {
                setFailedWords([...failedWords, selectedWord]);
                setMessage(`Game Over! The word was: ${selectedWord}. Next word...`);
                setTimeout(startNextWord, 1000);
            }
        }
    }
}
