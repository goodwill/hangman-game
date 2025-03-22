const Scoreboard = ({ correctWords, failedWords, score, totalPoints, remainingWords, className }) => {
    return (
        <div className={`m-[2vh_0] w-[90vw] max-w-full p-[2vh] bg-white rounded-lg shadow-lg flex flex-col gap-[1vh] ${className}`}>
            <div className="flex-1 min-w-[25vw] m-[0.5vh]">
                <h3 className="text-[#2c3e50] text-[clamp(1rem,2.5vw,1.4rem)] mb-[1vh]">Correctly Guessed</h3>
                <ul className="list-none p-0 max-h-[20vh] overflow-y-auto md:max-h-[30vh]">
                    {correctWords.map((word, index) => <li key={index} className="bg-[#ecf0f1] m-[0.5vh_0] p-[0.5vh] rounded text-[clamp(0.8rem,2vw,1.1rem)]">{word}</li>)}
                </ul>
            </div>
            <div className="flex-1 min-w-[25vw] m-[0.5vh]">
                <h3 className="text-[#2c3e50] text-[clamp(1rem,2.5vw,1.4rem)] mb-[1vh]">Failed to Guess</h3>
                <ul className="list-none p-0 max-h-[20vh] overflow-y-auto md:max-h-[30vh]">
                    {failedWords.map((word, index) => <li key={index} className="bg-[#ecf0f1] m-[0.5vh_0] p-[0.5vh] rounded text-[clamp(0.8rem,2vw,1.1rem)]">{word}</li>)}
                </ul>
            </div>
            <div className="flex-1 min-w-[25vw] m-[0.5vh]">
                <h3 className="text-[#2c3e50] text-[clamp(1rem,2.5vw,1.4rem)] mb-[1vh]">Score</h3>
                <p className="text-[clamp(0.8rem,2vw,1.1rem)]">{`${score} / ${totalPoints}`}</p>
                <p className="text-[clamp(0.8rem,2vw,1.1rem)]">Remaining Words: {remainingWords.length}</p>
            </div>
        </div>
    );
};