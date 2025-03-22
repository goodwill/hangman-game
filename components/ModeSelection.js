const ModeSelection = ({ onStart, voices, selectedVoice, setSelectedVoice }) => {
    const { preferredVoices, allEnglishVoices } = getVoiceOptions(voices);

    const handleVoiceChange = (e) => {
        const voice = allEnglishVoices.find(v => v.name === e.target.value);
        setSelectedVoice(voice || null);
        if (voice) {
            localStorage.setItem('selectedVoice', JSON.stringify({ name: voice.name, lang: voice.lang }));
        }
    };

    return (
        <div className="m-[2vh_0] w-[90vw] max-w-full p-[2vh] bg-white rounded-lg shadow-lg flex flex-col items-center">
            <h3 className="text-[#2c3e50] text-[clamp(1rem,2.5vw,1.4rem)] mb-[1vh]">Choose Game Mode</h3>
            <div className="flex flex-wrap gap-[1vh] justify-center mt-[1vh] w-full">
                <button onClick={() => onStart('char')} className="p-[1vh_2vw] bg-[#3498db] text-white rounded-md hover:bg-[#2980b9] text-[clamp(0.9rem,2vw,1.2rem)] md:max-w-[15vw] w-full max-w-[20vw]">One Character Mode</button>
                <button onClick={() => onStart('word')} className="p-[1vh_2vw] bg-[#3498db] text-white rounded-md hover:bg-[#2980b9] text-[clamp(0.9rem,2vw,1.2rem)] md:max-w-[15vw] w-full max-w-[20vw]">Whole Word Mode</button>
                <button onClick={() => onStart('mastermind')} className="p-[1vh_2vw] bg-[#3498db] text-white rounded-md hover:bg-[#2980b9] text-[clamp(0.9rem,2vw,1.2rem)] md:max-w-[15vw] w-full max-w-[20vw]">MasterMind Mode</button>
            </div>
            <div className="flex flex-col md:flex-row flex-wrap gap-[1vh] justify-center mt-[1vh] w-full">
                <select
                    value={selectedVoice?.name || ''}
                    onChange={handleVoiceChange}
                    className="w-full md:w-auto p-[1vh] border border-[#bdc3c7] rounded-md text-[clamp(0.9rem,2vw,1.2rem)]"
                >
                    <option value="">Select a voice</option>
                    {allEnglishVoices.map((voice) => (
                        <option key={voice.name} value={voice.name}>
                            {`${voice.name} (${voice.lang})`}
                        </option>
                    ))}
                </select>
                <button 
                    onClick={() => previewVoice(selectedVoice)} 
                    className="p-[1vh_2vw] bg-[#3498db] text-white rounded-md hover:bg-[#2980b9] w-full md:w-auto text-[clamp(0.9rem,2vw,1.2rem)]"
                >
                    Hello my friend!
                </button>
            </div>
        </div>
    );
};