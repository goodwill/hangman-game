function loadVoices(setVoices, setSelectedVoice) {
    const updateVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices.length > 0) {
            setVoices(availableVoices);
            const savedVoice = JSON.parse(localStorage.getItem('selectedVoice'));
            if (savedVoice) {
                const matchedVoice = availableVoices.find(
                    v => v.name === savedVoice.name && v.lang === savedVoice.lang
                );
                setSelectedVoice(matchedVoice || availableVoices.find(v => v.lang === 'en-US' || v.lang === 'en-GB') || availableVoices[0]);
            } else {
                setSelectedVoice(availableVoices.find(v => v.lang === 'en-US' || v.lang === 'en-GB') || availableVoices[0]);
            }
        }
    };
    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
}

function getVoiceOptions(voices) {
    const preferredVoices = [
        { name: 'Kate', lang: 'en-GB' },
        { name: 'Serena', lang: 'en-GB' },
        { name: 'Daniel', lang: 'en-GB' },
        { name: 'Google UK English Female', lang: 'en-GB' },
        { name: 'Google UK English Male', lang: 'en-GB' },
        { name: 'Microsoft Hazel Desktop', lang: 'en-GB' },
        { name: 'Microsoft George Desktop', lang: 'en-GB' },
        { name: 'Samantha', lang: 'en-US' },
        { name: 'Alex', lang: 'en-US' },
        { name: 'Google US English', lang: 'en-US' },
        { name: 'Google US English Male', lang: 'en-US' },
        { name: 'Microsoft Zira Desktop', lang: 'en-US' },
        { name: 'Microsoft David Desktop', lang: 'en-US' },
    ];

    const englishVoices = voices.filter(voice => voice.lang === 'en-US' || voice.lang === 'en-GB');
    const preferredAvailable = englishVoices.filter(voice =>
        preferredVoices.some(p => p.name === voice.name && p.lang === voice.lang)
    ).sort((a, b) => {
        const aIndex = preferredVoices.findIndex(p => p.name === a.name && p.lang === a.lang);
        const bIndex = preferredVoices.findIndex(p => p.name === b.name && p.lang === b.lang);
        return aIndex - bIndex;
    });
    const otherEnglish = englishVoices.filter(voice =>
        !preferredVoices.some(p => p.name === voice.name && p.lang === voice.lang)
    ).sort((a, b) => a.name.localeCompare(b.name));
    const allEnglishVoices = [...preferredAvailable, ...otherEnglish];

    return { preferredVoices, allEnglishVoices };
}

function speakWordWithVoice(word, selectedVoice) {
    const speech = new SpeechSynthesisUtterance(word);
    if (selectedVoice) {
        speech.voice = selectedVoice;
        speech.lang = selectedVoice.lang;
    }
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    speech.rate = isSafari ? 0.9 : 1.0;
    speech.pitch = isSafari && selectedVoice?.lang === 'en-GB' ? 1.1 : 1.0;
    window.speechSynthesis.speak(speech);
}

function previewVoice(selectedVoice) {
    if (!selectedVoice) {
        alert('Please select a voice first!');
        return;
    }
    speakWordWithVoice('Hello my friend!', selectedVoice);
}
