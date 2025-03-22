function drawHangman(canvasRef, guessesLeft) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = 300;

    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(size * 0.2, size * 0.9); ctx.lineTo(size * 0.8, size * 0.9);
    ctx.moveTo(size * 0.5, size * 0.9); ctx.lineTo(size * 0.5, size * 0.1);
    ctx.moveTo(size * 0.5, size * 0.1); ctx.lineTo(size * 0.7, size * 0.1);
    ctx.moveTo(size * 0.7, size * 0.1); ctx.lineTo(size * 0.7, size * 0.2);
    ctx.stroke();

    if (guessesLeft < 6) { 
        ctx.beginPath(); 
        ctx.arc(size * 0.7, size * 0.3, size * 0.1, 0, Math.PI * 2); 
        ctx.stroke(); 
    }
    if (guessesLeft < 5) { 
        ctx.beginPath(); 
        ctx.moveTo(size * 0.7, size * 0.4); 
        ctx.lineTo(size * 0.7, size * 0.6); 
        ctx.stroke(); 
    }
    if (guessesLeft < 4) { 
        ctx.beginPath(); 
        ctx.moveTo(size * 0.7, size * 0.45); 
        ctx.lineTo(size * 0.6, size * 0.55); 
        ctx.stroke(); 
    }
    if (guessesLeft < 3) { 
        ctx.beginPath(); 
        ctx.moveTo(size * 0.7, size * 0.45); 
        ctx.lineTo(size * 0.8, size * 0.55); 
        ctx.stroke(); 
    }
    if (guessesLeft < 2) { 
        ctx.beginPath(); 
        ctx.moveTo(size * 0.7, size * 0.6); 
        ctx.lineTo(size * 0.6, size * 0.75); 
        ctx.stroke(); 
    }
    if (guessesLeft < 1) { 
        ctx.beginPath(); 
        ctx.moveTo(size * 0.7, size * 0.6); 
        ctx.lineTo(size * 0.8, size * 0.75); 
        ctx.stroke(); 
    }
}
