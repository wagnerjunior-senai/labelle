const campoCep = document.getElementById("cep");
const mensagemCep = document.getElementById("mensagemCep");

campoCep.addEventListener("blur", consultarCEP);

async function consultarCEP() {
    const cep = campoCep.value.replace(/\D/g, "");

    mensagemCep.textContent = "";

    if (cep.length !== 8) {
        mensagemCep.textContent = "Digite um CEP válido com 8 números.";
        return;
    }

    try {
        mensagemCep.textContent = "Consultando CEP...";

        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
            mensagemCep.textContent = "CEP não encontrado.";
            return;
        }

        document.getElementById("rua").value = dados.logradouro || "";
        document.getElementById("bairro").value = dados.bairro || "";
        document.getElementById("cidade").value = dados.localidade || "";
        document.getElementById("estado").value = dados.uf || "";

        mensagemCep.textContent = "Endereço preenchido com sucesso!";
        mensagemCep.style.color = "#315442";

        document.getElementById("numero").focus();

    } catch (erro) {
        mensagemCep.textContent = "Não foi possível consultar o CEP. Tente novamente.";
    }
}

campoCep.addEventListener("input", function () {
    let valor = campoCep.value.replace(/\D/g, "").slice(0, 8);

    if (valor.length > 5) {
        valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    campoCep.value = valor;
});

document.getElementById("formCadastro").addEventListener("submit", function (evento) {
    evento.preventDefault();

    alert("Cadastro preenchido com sucesso! Obrigada por escolher a La Belle Vanity Clinic.");

    this.reset();
    mensagemCep.textContent = "";
});