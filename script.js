function animarBordaSimples(card) {
    const canvas = card.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = card.offsetWidth;
    canvas.height = card.offsetHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#c57a2a";
    ctx.lineWidth = 3;

    let progresso = 0;
    const perimetro = (canvas.width * 2) + (canvas.height * 2);

    function animar() {
        progresso += 8; // velocidade

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();

        let restante = progresso;

        // Topo
        if (restante > 0) {
            const len = Math.min(restante, canvas.width);
            ctx.moveTo(0, 0);
            ctx.lineTo(len, 0);
            restante -= canvas.width;
        }

        // Direita
        if (restante > 0) {
            const len = Math.min(restante, canvas.height);
            ctx.lineTo(canvas.width, len);
            restante -= canvas.height;
        }

        // Base
        if (restante > 0) {
            const len = Math.min(restante, canvas.width);
            ctx.lineTo(canvas.width - len, canvas.height);
            restante -= canvas.width;
        }

        // Esquerda
        if (restante > 0) {
            const len = Math.min(restante, canvas.height);
            ctx.lineTo(0, canvas.height - len);
            restante -= canvas.height;
        }

        ctx.stroke();

        if (progresso < perimetro) {
            requestAnimationFrame(animar);
        }
    }

    animar();
}

const cards = document.querySelectorAll(".servico-card");

const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animarBordaSimples(entry.target);
        }
    });
}, { threshold: 0.4 });

cards.forEach(card => obs.observe(card));
