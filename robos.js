(function () {
    const cnv = document.querySelector('#canvas');
    const ctx = cnv.getContext('2d');


    //movimentos
    let aEsquerda = false;
    let wCima = false;
    let dDireita = false;
    let sBaixo = false;

    let setaEsquerda = false
    let setaCima = false
    let setaDireita = false
    let setaBaixo = false


    let partida = document.querySelector(`.vitoria`)

    let empate = "EMPATOU"
    let vJogador1 = "JOGADOR 1 VENCEU!!"
    let vJogador2 = "JOGADOR 2 VENCEU!!"


    //vida
    let vida1 = 100;
    let vida2 = 100;
    let quadradoVida1 = document.querySelector('.vida1');
    let quadradoVida2 = document.querySelector('.vida2');
    quadradoVida1.textContent = vida1;
    quadradoVida2.textContent = vida2;

    //rounds
    let rounds = 5;
    let placar = document.querySelector(`.rounds`);

    // arrays
    const quadrados = [];

    // quadrados
    const jogador1 = new quadrado(630, 270, 110, 110, "#f98", 1);
    quadrados.push(jogador1);

    const jogador2 = new quadrado(20, 270, 110, 110, "#5f8", 1);
    quadrados.push(jogador2);


    // pressionar as teclas
    window.addEventListener('keydown', function (e) {
        const nomeKey = e.key;
        console.log(nomeKey);
        switch (nomeKey) {
            case 'a':
                aEsquerda = true;
                break;
            case 'w':
                wCima = true;
                break;
            case 'd':
                dDireita = true;
                break;
            case 's':
                sBaixo = true;
                break;
        }
    });

    //soltar as teclas  
    window.addEventListener('keyup', (e) => {
        const key = e.key;
        switch (key) {
            case 'a':
                aEsquerda = false;
                break;
            case 'w':
                wCima = false;
                break;
            case 'd':
                dDireita = false;
                break;
            case 's':
                sBaixo = false;
                break;
        }
    });

    function moverQuadrado1() {
        if (aEsquerda && !dDireita) {
            jogador2.posX -= jogador2.velocidade;
        }
        if (dDireita && !aEsquerda) {
            jogador2.posX += jogador2.velocidade;
        }
        if (wCima && !sBaixo) {
            jogador2.posY -= jogador2.velocidade;
        }
        if (sBaixo && !wCima) {
            jogador2.posY += jogador2.velocidade;
        }


        //fiixar na tela - NÃO SAI DO CANVAS - Precisa pensar em como fazer isso com o obstáculo
        jogador2.posX = Math.max(0, Math.min(cnv.width - jogador2.width, jogador2.posX));
        jogador2.posY = Math.max(0, Math.min(cnv.height - jogador2.height, jogador2.posY));

    }

    window.addEventListener('keydown', function (e) {
        const nomeKey = e.key;
        console.log(nomeKey);
        switch (nomeKey) {
            case 'ArrowLeft':
                setaEsquerda = true;
                break;
            case 'ArrowUp':
                setaCima = true;
                break;
            case 'ArrowRight':
                setaDireita = true;
                break;
            case 'ArrowDown':
                setaBaixo = true;
                break;
        }
    });

    //soltar as teclas  
    window.addEventListener('keyup', (e) => {
        const key = e.key;
        switch (key) {
            case 'ArrowLeft':
                setaEsquerda = false;
                break;
            case 'ArrowUp':
                setaCima = false;
                break;
            case 'ArrowRight':
                setaDireita = false;
                break;
            case 'ArrowDown':
                setaBaixo = false;
                break;
        }
    });

    function moverQuadrado2() {
        if (setaEsquerda && !setaDireita) {
            jogador1.posX -= jogador1.velocidade;
        }
        if (setaDireita && !setaEsquerda) {
            jogador1.posX += jogador1.velocidade;
        }
        if (setaCima && !setaBaixo) {
            jogador1.posY -= jogador1.velocidade;
        }
        if (setaBaixo && !setaCima) {
            jogador1.posY += jogador1.velocidade;
        }


        //fiixar na tela - NÃO SAI DO CANVAS - Precisa pensar em como fazer isso com o obstáculo
        jogador1.posX = Math.max(0, Math.min(cnv.width - jogador1.width, jogador1.posX));
        jogador1.posY = Math.max(0, Math.min(cnv.height - jogador1.height, jogador1.posY));
    }



    function exibirQuadrados() {
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        for (const i in quadrados) {
            const quadrado = quadrados[i];
            if (quadrado.imagem) {
                ctx.drawImage(quadrado.imagem, quadrado.posX, quadrado.posY, quadrado.width, quadrado.height)
            } else {
                ctx.fillStyle = quadrado.color
                ctx.fillRect(quadrado.posX, quadrado.posY, quadrado.width, quadrado.height);

            }
        }
    }


    //solicitar uma animação ao browser e chamar a função
    //que é a propria função atualizarTela
    function atualizarTela() {
        window.requestAnimationFrame(atualizarTela, cnv);
        moverQuadrado1();
        moverQuadrado2();
        exibirQuadrados();
        fimJogo()



        if (jogador1.posX - jogador2.posX < 50 && jogador1.posX - jogador2.posX > -50 && jogador1.posY - jogador2.posY < 70 && jogador1.posY - jogador2.posY > -70) {
            jogador1.posX = 630;
            jogador1.posY = 270;
            jogador2.posX = 20;
            jogador2.posY = 270;
            if (rounds > 0) {
                vida1 -= parseInt(Math.random() * 20);
                vida2 -= parseInt(Math.random() * 20);
                console.log(vida1);
                quadradoVida1.textContent = vida1;
                console.log(vida2);
                quadradoVida2.textContent = vida2;
                rounds--;
                placar.textContent = rounds;
            }
        }




    }

    function fimJogo() {
        if (rounds == 0) {
            jogador1.posX = 630;
            jogador1.posY = 270;
            jogador2.posX = 20;
            jogador2.posY = 270;

            wCima = false;
            dDireita = false;
            sBaixo = false;
            aEsquerda = false;

            setaEsquerda = false
            setaCima = false
            setaDireita = false
            setaBaixo = false

            if (vida1 == vida2) {
                partida.textContent = empate
            } else if (vida1 >= vida2) {
                partida.textContent = vJogador1
            } else {
                partida.textContent = vJogador2
            }
        }
    }

    // fu

    function imgQuadrado1() {
        const img = new Image()
        img.src = './images/Robo1.png'
        img.onload = () => {
            jogador1.imagem = img
            atualizarTela()
        }
    }

    function imgQuadrado2() {
        const img = new Image()
        img.src = './images/robo2.png'
        img.onload = () => {
            jogador2.imagem = img

            atualizarTela()
        }
    }

    function draw() {
        var ctx = document.getElementById("cnv").getContext("2d");
        var img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            ctx.beginPath();
            ctx.moveTo(30, 96);
            ctx.lineTo(70, 66);
            ctx.lineTo(103, 76);
            ctx.lineTo(170, 15);
            ctx.stroke();
        };
        img.src = "./images/arena.png";
    }

    imgQuadrado1()
    imgQuadrado2()
    atualizarTela();


}());