
const apiKey = document.getElementById("apiKey");
const mensagem = document.getElementById("mensagem");
const conversa = document.getElementById("conversa");
const btnEnviar = document.getElementById("btnEnviar");
const status = document.getElementById("status");

// INSTRUÇÃO DE SISTEMA DA BELLE BOT
const instrucaoSistema = `
Você é a Belle Bot, assistente virtual da empresa
La Belle Vanity Clinic.

Sua função é auxiliar clientes com dúvidas sobre estética,
beleza, tratamentos faciais, corporais, procedimentos
injetáveis e autocuidado.

VALORES DOS PROCEDIMENTOS:

- Limpeza de pele: R$ 180,00.
- Tratamento facial: R$ 290,00.
- Tratamento corporal: R$ 250,00.
- Depilação a laser: R$ 220,00.

PROCEDIMENTOS INJETÁVEIS:

A clínica também oferece:
- Preenchimento labial.
- Preenchimento facial.
- Preenchimento de olheiras.
- Preenchimento de mento (queixo).
- Preenchimento de mandíbula.
- Toxina botulínica (Botox).
- Bioestimuladores de colágeno.
- Skinbooster.
- Outros tratamentos estéticos injetáveis.

IMPORTANTE SOBRE OS VALORES DOS INJETÁVEIS:

Nunca informe preços fixos para preenchimentos, Botox,
bioestimuladores, skinbooster ou outros procedimentos
injetáveis.

Quando perguntarem os valores, explique que o preço é
definido após uma consulta de avaliação individualizada,
considerando as necessidades e características de cada cliente.

PROMOÇÃO:

A clínica possui uma promoção demonstrativa de inauguração
de 15% de desconto.

Não prometa que o desconto se aplica aos procedimentos
injetáveis sem confirmação.

REGRAS DE ATENDIMENTO:

- Responda sempre em no máximo 100 tokens.
- Se precisar de uma resposta maior, faça um resumo objetivo.
- Responda às saudações de maneira educada e acolhedora.
- Utilize linguagem elegante, profissional e simpática.
- Convide os clientes a agendarem uma avaliação quando
  demonstrarem interesse em procedimentos.
- Não faça diagnósticos.
- Não prometa resultados.
- Não substitua a avaliação de um profissional habilitado.

Para perguntas fora do contexto de estética ou saudações,
responda exatamente:

"Estou configurado com a função de auxiliar no contexto
de estética. Esta pergunta foge do meu contexto".
`;

// ADICIONAR MENSAGENS NA TELA
function adicionarMensagem(texto, tipo) {
    const novaMensagem = document.createElement("div");

    novaMensagem.classList.add("mensagem", tipo);
    novaMensagem.textContent = texto;

    conversa.appendChild(novaMensagem);
    conversa.scrollTop = conversa.scrollHeight;
}

// ENVIAR MENSAGEM PARA O CHATGPT
async function enviarMensagem() {
    const chave = apiKey.value.trim();
    const texto = mensagem.value.trim();

    if (!chave) {
        status.textContent = "Digite sua chave da API OpenAI.";
        apiKey.focus();
        return;
    }

    if (!texto) {
        status.textContent = "Digite uma mensagem antes de enviar.";
        mensagem.focus();
        return;
    }

    adicionarMensagem(texto, "usuario");

    mensagem.value = "";
    status.textContent = "Belle Bot está preparando sua resposta...";

    btnEnviar.disabled = true;

    try {
        const resposta = await fetch(
            "https://api.openai.com/v1/responses",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${chave}`
                },

                body: JSON.stringify({
                    model: "gpt-5.4-nano",
                    instructions: instrucaoSistema,
                    input: texto,
                    temperature: 0.3,
                    max_output_tokens: 100
                })
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                dados.error?.message || "Erro ao acessar a API."
            );
        }

        let respostaBot = "";

        if (dados.output) {
            dados.output.forEach(item => {
                if (item.type === "message" && item.content) {
                    item.content.forEach(conteudo => {
                        if (conteudo.type === "output_text") {
                            respostaBot += conteudo.text;
                        }
                    });
                }
            });
        }

        if (!respostaBot) {
            respostaBot = "Não consegui gerar uma resposta. Tente novamente.";
        }

        adicionarMensagem(respostaBot, "bot");
        status.textContent = "Resposta recebida! ✨";

    } catch (erro) {
        status.textContent = "Não foi possível enviar a mensagem.";

        adicionarMensagem(
            "Ops! " + erro.message,
            "bot"
        );

    } finally {
        btnEnviar.disabled = false;
        mensagem.focus();
    }
}

// EVENTO DO BOTÃO
btnEnviar.addEventListener("click", enviarMensagem);

// ENVIAR COM ENTER
mensagem.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter" && !evento.shiftKey) {
        evento.preventDefault();
        enviarMensagem();
    }
});
