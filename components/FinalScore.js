const FinalScore = ({ score, totalPoints, onRestart, className }) => {
    return (
        <div className={`m-[2vh_0] w-[90vw] max-w-full p-[2vh] bg-white rounded-lg shadow-lg flex flex-col items-center ${className}`}>
            <h3 className="text-[#2c3e50] text-[clamp(1.2rem,3vw,1.8rem)]">Game Over - Final Score</h3>
            <p className="text-[clamp(1.2rem,3vw,1.8rem)] text-[#27ae60] my-[2vh]">{`${score} / ${totalPoints}`}</p>
            <button onClick={onRestart} className="p-[1vh_2vw] m-[0.5vh] bg-[#3498db] text-white rounded-md hover:bg-[#2980b9] w-full max-w-[20vw] md:max-w-[15vw] text-[clamp(0.9rem,2vw,1.2rem)]">Start Over</button>
        </div>
    );
};