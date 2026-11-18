
const formulario = document.getElementById("formAgendamento");
const mensagem = document.getElementById("mensagem");

const hoje = new Date();
const ano = hoje.getFullYear();
const mes = String(hoje.getMonth() + 1).padStart(2, "0");
const dia = String(hoje.getDate()).padStart(2, "0");

document.getElementById("data").min = `${ano}-${mes}-${dia}`;

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const email = document.getElementById("email").value.trim();
    const experiencia = document.getElementById("experiencia").value;
    const data = document.getElementById("data").value;
    const horario = document.getElementById("horario").value;

    const dataFormatada = data.split("-").reverse().join("/");

    const texto = 
`Olá! Gostaria de solicitar um agendamento na La Belle Vanity Clinic.

Nome: ${nome}
WhatsApp: ${whatsapp}
E-mail: ${email}
Experiência: ${experiencia}
Data desejada: ${dataFormatada}
Horário desejado: ${horario}

Aguardo a confirmação. Obrigada!`;

    const numeroClinica = "5511922156257";
    const link = `https://wa.me/${numeroClinica}?text=${encodeURIComponent(texto)}`;

    mensagem.innerHTML = `
        <strong>✨ Solicitação preparada com sucesso!</strong><br>
        Agora clique abaixo para enviar seus dados pelo WhatsApp.
        <br><br>
        <a href="${link}" target="_blank" rel="noopener noreferrer"
           style="display:inline-block;background:#18392c;color:white;
           padding:13px 20px;border-radius:25px;text-decoration:none;">
           Enviar pelo WhatsApp
        </a>
    `;

    mensagem.scrollIntoView({ behavior: "smooth" });
});
