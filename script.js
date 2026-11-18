
// LA BELLE VANITY CLINIC
// Menu responsivo para celulares

const botaoMenu = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu-principal");

if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", () => {
        const menuAberto = menu.classList.toggle("aberto");

        botaoMenu.setAttribute("aria-expanded", menuAberto);
        botaoMenu.setAttribute(
            "aria-label",
            menuAberto ? "Fechar menu" : "Abrir menu"
        );

        botaoMenu.textContent = menuAberto ? "✕" : "☰";
    });

    // Fecha o menu depois que uma opção é selecionada
    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("aberto");
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu");
            botaoMenu.textContent = "☰";
        });
    });

    // Fecha o menu ao pressionar Escape
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            menu.classList.remove("aberto");
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu");
            botaoMenu.textContent = "☰";
        }
    });
}

/* JANELA DE INFORMAÇÕES DOS TRATAMENTOS */

const botoesTratamento = document.querySelectorAll("[data-tratamento]");
const modalTratamento = document.querySelector("#modal-tratamento");
const tituloModal = document.querySelector("#modal-titulo");
const descricaoModal = document.querySelector("#modal-descricao");
const botaoFecharModal = document.querySelector("#modal-fechar");

const informacoesTratamentos = {
    facial: {
        titulo: "Estética facial",
        descricao:
            "Os tratamentos faciais são cuidados voltados às necessidades da pele do rosto. Conforme o procedimento, podem ajudar na hidratação, na melhora da textura e na aparência da pele. A escolha deve considerar o tipo de pele e os objetivos de cada pessoa."
    },

    corporal: {
        titulo: "Estética corporal",
        descricao:
            "Os tratamentos corporais reúnem diferentes técnicas de cuidado com o corpo e o bem-estar. Dependendo do procedimento, podem ter objetivos como melhorar a aparência da pele ou proporcionar relaxamento. A técnica adequada depende de uma avaliação individual."
    },

    skincare: {
        titulo: "Skincare e limpeza de pele",
        descricao:
            "Skincare é a rotina de cuidados com a pele, que pode incluir limpeza, hidratação e proteção solar. A limpeza de pele profissional ajuda a remover impurezas. Os produtos e a frequência devem ser escolhidos de acordo com as necessidades da pele."
    }
};

function abrirModalTratamento(tipo) {
    const tratamento = informacoesTratamentos[tipo];

    if (!tratamento || !modalTratamento) return;

    tituloModal.textContent = tratamento.titulo;
    descricaoModal.textContent = tratamento.descricao;

    modalTratamento.hidden = false;
    document.body.classList.add("modal-aberto");
    botaoFecharModal.focus();
}

function fecharModalTratamento() {
    if (!modalTratamento) return;

    modalTratamento.hidden = true;
    document.body.classList.remove("modal-aberto");
}

botoesTratamento.forEach((botao) => {
    botao.addEventListener("click", () => {
        abrirModalTratamento(botao.dataset.tratamento);
    });
});

if (botaoFecharModal) {
    botaoFecharModal.addEventListener("click", fecharModalTratamento);
}

if (modalTratamento) {
    modalTratamento.addEventListener("click", (evento) => {
        if (evento.target === modalTratamento) {
            fecharModalTratamento();
        }
    });
}

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && modalTratamento && !modalTratamento.hidden) {
        fecharModalTratamento();
    }
});

/* BOTÃO VOLTAR AO TOPO */

const botaoVoltarTopo = document.querySelector("#voltar-topo");

if (botaoVoltarTopo) {
    botaoVoltarTopo.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* =====================================
   QUIZ DE AUTOCUIDADO LA BELLE VANITY
===================================== */

const formularioQuiz = document.querySelector("#quiz-form");
const resultadoQuiz = document.querySelector("#quiz-resultado");
const tituloResultadoQuiz = document.querySelector("#quiz-resultado-titulo");
const textoResultadoQuiz = document.querySelector("#quiz-resultado-texto");
const botaoRefazerQuiz = document.querySelector("#quiz-refazer");

const resultadosQuiz = {
    facial: {
        titulo: "Seu momento é: Glow Facial! 🌸",
        texto:
            "Você está com vontade de dedicar atenção especial à pele do rosto. Conheça os cuidados faciais da La Belle Vanity Clinic e descubra quais opções podem combinar com suas necessidades."
    },

    relax: {
        titulo: "Seu momento é: Pausa para Você! 🕯️",
        texto:
            "Seu resultado combina com uma pausa na correria. Reserve um tempo para descansar, cuidar de si e conhecer experiências de bem-estar que respeitem suas preferências."
    },

    corporal: {
        titulo: "Seu momento é: Bem-estar por Inteiro! 🌿",
        texto:
            "Você quer dar atenção ao corpo e ao seu bem-estar. Explore os cuidados corporais oferecidos pela La Belle Vanity Clinic e conheça as opções adequadas aos seus objetivos."
    },

    rotina: {
        titulo: "Seu momento é: Skin Glow! 💧",
        texto:
            "Você tem interesse em criar uma rotina de cuidados. Limpeza suave, hidratação e proteção solar são etapas importantes. Os produtos devem ser escolhidos conforme as necessidades da sua pele."
    }
};

if (formularioQuiz && resultadoQuiz) {
    formularioQuiz.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const respostas = new FormData(formularioQuiz);
        const pontuacao = {
            facial: 0,
            relax: 0,
            corporal: 0,
            rotina: 0
        };

        ["quiz1", "quiz2", "quiz3"].forEach((pergunta) => {
            const resposta = respostas.get(pergunta);

            if (resposta && Object.hasOwn(pontuacao, resposta)) {
                pontuacao[resposta]++;
            }
        });

        const categoriaVencedora = Object.keys(pontuacao).reduce(
            (melhor, categoria) =>
                pontuacao[categoria] > pontuacao[melhor]
                    ? categoria
                    : melhor,
            "facial"
        );

        const resultado = resultadosQuiz[categoriaVencedora];

        tituloResultadoQuiz.textContent = resultado.titulo;
        textoResultadoQuiz.textContent = resultado.texto;
        resultadoQuiz.hidden = false;

        resultadoQuiz.focus();
        resultadoQuiz.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
}

if (botaoRefazerQuiz && formularioQuiz && resultadoQuiz) {
    botaoRefazerQuiz.addEventListener("click", () => {
        formularioQuiz.reset();
        resultadoQuiz.hidden = true;

        formularioQuiz.querySelector("input").focus();
    });
}
