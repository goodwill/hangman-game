const Controls = ({ onSubmit, lastUsedWords }) => {
    const [input, setInput] = React.useState(lastUsedWords);
    const [wordLists, setWordLists] = React.useState([]);

    React.useEffect(() => {
        loadWordLists();
    }, []);

    const loadWordLists = () => {
        const lists = JSON.parse(localStorage.getItem('hangmanWordLists') || '[]');
        setWordLists(lists);
    };

    const saveWordList = (value) => {
        let lists = JSON.parse(localStorage.getItem('hangmanWordLists') || '[]');
        if (!lists.includes(value)) {
            lists.unshift(value);
            if (lists.length > 50) lists.pop();
            localStorage.setItem('hangmanWordLists', JSON.stringify(lists));
            setWordLists(lists);
        }
    };

    const handleSubmit = () => {
        if (!input.trim()) {
            alert('Please enter some words first!');
            return;
        }
        saveWordList(input.trim());
        onSubmit(input.trim());
    };

    return (
        <div className="m-[2vh_0] w-[90vw] max-w-full p-[2vh] bg-white rounded-lg shadow-lg flex flex-col items-center">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter words/phrases (one per line)"
                className="w-full h-[15vh] m-[1vh_0] p-[1vh] border border-[#bdc3c7] rounded-md resize-none text-[clamp(0.9rem,2vw,1.2rem)]"
            />
            <select
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-[1vh] m-[1vh_0] border border-[#bdc3c7] rounded-md text-[clamp(0.9rem,2vw,1.2rem)]"
            >
                <option value="">Select a previous word list</option>
                {wordLists.map((list, index) => (
                    <option key={index} value={list}>
                        {list.split('\n')[0].substring(0, 50) + (list.length > 50 ? '...' : '')}
                    </option>
                ))}
            </select>
            <button
                onClick={handleSubmit}
                className="p-[1vh_2vw] m-[0.5vh] bg-[#3498db] text-white rounded-md hover:bg-[#2980b9] w-full max-w-[20vw] text-[clamp(0.9rem,2vw,1.2rem)]"
            >
                Submit Words
            </button>
        </div>
    );
};