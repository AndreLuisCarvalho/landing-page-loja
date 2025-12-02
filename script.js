function animarBordaSimples(card) {
    const canvas = card.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    const radius = 15; // <- AQUI define o border-radius
    const w = canvas.width = card.offsetWidth;
    const h = canvas.height = card.offsetHeight;

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = "#c57a2a";
    ctx.lineWidth = 3;

    // Cálculo do perímetro considerando curvas
    const perimetro =
        2 * (w + h - 2 * radius) +
        (Math.PI * radius * 2);

    let progresso = 0;

    function desenharCaminho(p) {
        ctx.beginPath();

        // COMEÇA NO TOPO ESQUERDO (após a curva)
        let x = radius;
        let y = 0;

        ctx.moveTo(x, y);

        let restante = p;

        // 1. Linha topo (até antes da curva direita)
        let topo = w - radius * 2;
        if (restante > 0) {
            let len = Math.min(restante, topo);
            ctx.lineTo(x + len, y);
            restante -= topo;
            x += len;
        }

        // 2. Curva topo direita
        if (restante > 0) {
            let arcLen = radius * Math.PI / 2;
            let len = Math.min(restante, arcLen);
            let pct = len / arcLen;

            ctx.quadraticCurveTo(
                w, 0,
                w, radius * pct
            );

            restante -= arcLen;
            x = w;
            y = radius * pct;
        }

        // 3. Lado direito
        let lado = h - radius * 2;
        if (restante > 0) {
            let len = Math.min(restante, lado);
            ctx.lineTo(x, y + len);
            restante -= lado;
            y += len;
        }

        // 4. Curva inferior direita
        if (restante > 0) {
            let arcLen = radius * Math.PI / 2;
            let len = Math.min(restante, arcLen);
            let pct = len / arcLen;

            ctx.quadraticCurveTo(
                w, h,
                w - radius * pct, h
            );

            restante -= arcLen;
            x = w - radius * pct;
            y = h;
        }

        // 5. Base
        if (restante > 0) {
            let len = Math.min(restante, topo);
            ctx.lineTo(x - len, y);
            restante -= topo;
            x -= len;
        }

        // 6. Curva inferior esquerda
        if (restante > 0) {
            let arcLen = radius * Math.PI / 2;
            let len = Math.min(restante, arcLen);
            let pct = len / arcLen;

            ctx.quadraticCurveTo(
                0, h,
                0, h - radius * pct
            );

            restante -= arcLen;
            x = 0;
            y = h - radius * pct;
        }

        // 7. Lado esquerdo
        if (restante > 0) {
            let len = Math.min(restante, lado);
            ctx.lineTo(0, y - len);
            restante -= lado;
            y -= len;
        }

        // 8. Curva topo esquerda
        if (restante > 0) {
            let arcLen = radius * Math.PI / 2;
            let len = Math.min(restante, arcLen);
            let pct = len / arcLen;

            ctx.quadraticCurveTo(
                0, 0,
                radius * pct, 0
            );
        }

        ctx.stroke();
    }

    function animar() {
        progresso += 10; // velocidade
        ctx.clearRect(0, 0, w, h);
        desenharCaminho(progresso);

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

// Lista de imagens
const logos = [
  "Dados/SITE/1.svg",
  "Dados/SITE/2.svg",
  "Dados/SITE/3.svg",
  "Dados/SITE/4.svg",
  "Dados/SITE/5.svg",
  "Dados/SITE/6.svg",
  "Dados/SITE/7.svg",
  "Dados/SITE/8.svg",
  "Dados/SITE/9.svg",
  "Dados/SITE/10.svg",
  "Dados/SITE/11.svg",
  "Dados/SITE/12.svg",
  "Dados/SITE/13.svg",
  "Dados/SITE/14.svg",
];

const track = document.getElementById("filmTrack");

// 1) Coloca as imagens na faixa
logos.forEach(src => {
  const img = document.createElement("img");
  img.src = src;
  track.appendChild(img);
});

// 2) DUPLICA o conteúdo -> isso torna o loop perfeito
track.innerHTML += track.innerHTML;

// velocidade
let x = 0;
const speed = 1.2;

function loop() {
  x -= speed;

  // metade do tamanho = ponto perfeito para reset suave
  const resetPoint = track.scrollWidth / 2;

  if (Math.abs(x) >= resetPoint) {
    x = 0; // reset sem pulo
  }

  track.style.transform = `translateX(${x}px)`;
  requestAnimationFrame(loop);
}

loop();
