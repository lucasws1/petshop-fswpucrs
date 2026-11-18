// Ano do copyright
document.getElementById("ano").textContent = new Date().getFullYear();

// Indicador aberto/fechado: segunda a sábado, 8h às 19h
function atualizarStatusLoja() {
  const agora = new Date();
  const dia = agora.getDay();
  const hora = agora.getHours();
  const aberto = dia >= 1 && dia <= 6 && hora >= 8 && hora < 19;

  const badge = document.getElementById("statusLoja");
  badge.textContent = aberto ? "Aberto agora" : "Fechado no momento";
  badge.className = "badge " + (aberto ? "text-bg-success" : "text-bg-danger");
}

atualizarStatusLoja();
setInterval(atualizarStatusLoja, 60000); // reavalia a cada minuto

/* =========================================================
 * FORMULÁRIOS (cadastro.html e agendamento.html)
 * ========================================================= */

const CHAVE_PERFIL = "patasPelosPerfil"; // dados do cadastro, guardados só neste navegador

// ---------- Funções utilitárias ----------

// Data local no formato AAAA-MM-DD (toISOString usaria UTC e poderia errar o dia)
function dataLocalISO(data = new Date()) {
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${data.getFullYear()}-${mes}-${dia}`;
}

function formatarData(iso) {
  return iso.split("-").reverse().join("/");
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Máscaras de digitação
function mascaraCPF(valor) {
  return valor
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function mascaraTelefone(valor) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length > 10) return d.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  if (d.length > 6) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  if (d.length > 2) return d.replace(/(\d{2})(\d{0,5})/, "($1) $2");
  return d;
}

function mascaraCEP(valor) {
  return valor
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/(\d{5})(\d{1,3})/, "$1-$2");
}

// Valida CPF pelos dígitos verificadores
function validarCPF(valor) {
  const d = valor.replace(/\D/g, "");
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  for (let t = 9; t < 11; t++) {
    let soma = 0;
    for (let i = 0; i < t; i++) soma += Number(d[i]) * (t + 1 - i);
    if (((soma * 10) % 11) % 10 !== Number(d[t])) return false;
  }
  return true;
}

// Aplica uma máscara enquanto o usuário digita
function aplicarMascara(campo, funcaoMascara) {
  campo.addEventListener("input", () => {
    campo.value = funcaoMascara(campo.value);
  });
}

// Mostra uma mensagem (alerta do Bootstrap) e leva o foco até ela
function mostrarAlerta(elemento, tipo, mensagem) {
  elemento.className = `alert alert-${tipo}`;
  elemento.textContent = mensagem; // textContent evita injeção de HTML
  elemento.scrollIntoView({ behavior: "smooth", block: "center" });
  elemento.focus();
}

// Guarda e lê os dados do cadastro (localStorage), sem quebrar se estiver bloqueado
function salvarPerfil(perfil) {
  try {
    localStorage.setItem(CHAVE_PERFIL, JSON.stringify(perfil));
  } catch (erro) {
    /* sem armazenamento: o cadastro continua valendo nesta sessão */
  }
}

function lerPerfil() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_PERFIL));
  } catch (erro) {
    return null;
  }
}

// ---------- Página de cadastro ----------
function iniciarCadastro() {
  const form = document.getElementById("formCadastro");
  if (!form) return;

  const alerta = document.getElementById("alertaCadastro");
  const cpf = document.getElementById("cpf");

  aplicarMascara(cpf, mascaraCPF);
  aplicarMascara(document.getElementById("telefone"), mascaraTelefone);
  aplicarMascara(document.getElementById("cep"), mascaraCEP);

  // Não aceita nascimento no futuro
  document.getElementById("nascimento").max = dataLocalISO();

  // CPF: além do formato, confere os dígitos verificadores
  cpf.addEventListener("input", () => {
    const invalido = cpf.value.length === 14 && !validarCPF(cpf.value);
    cpf.setCustomValidity(invalido ? "CPF inválido." : "");
  });

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      form.querySelector(":invalid").focus();
      mostrarAlerta(alerta, "danger", "Revise os campos destacados antes de enviar.");
      return;
    }

    const dados = Object.fromEntries(new FormData(form));
    salvarPerfil({
      nome: dados.nome,
      telefone: dados.telefone,
      pet: dados.nomePet,
      rua: dados.rua,
      numero: dados.numero,
      bairro: dados.bairro,
    });

    form.reset();
    form.classList.remove("was-validated");
    mostrarAlerta(
      alerta,
      "success",
      `Cadastro realizado! ${dados.nome} e ${dados.nomePet} já fazem parte da família Patas & Pelos.`
    );
  });

  form.addEventListener("reset", () => {
    form.classList.remove("was-validated");
    alerta.className = "d-none";
  });
}

// ---------- Página de agendamento ----------

// Valores em reais: [sem tele-busca, com tele-busca] — iguais à tabela do index.html
const PRECOS = {
  banho: { local: 50, tele: 70 },
  banhotosa: { local: 70, tele: 90 },
};
const NOMES_SERVICO = { banho: "Banho", banhotosa: "Banho e Tosa" };
const NOMES_MODALIDADE = { tele: "Tele-busca", local: "Entrega do pet no local" };

function iniciarAgendamento() {
  const form = document.getElementById("formAgendamento");
  if (!form) return;

  const alerta = document.getElementById("alertaAgendamento");
  const data = document.getElementById("data");
  const horario = document.getElementById("horario");
  const blocoTele = document.getElementById("teleBusca");
  const camposTele = blocoTele.querySelectorAll("input");

  const escolhido = (nome) => {
    const marcado = form.querySelector(`input[name="${nome}"]:checked`);
    return marcado ? marcado.value : null;
  };

  // Impede datas passadas
  data.min = dataLocalISO();

  // Preenche com os dados do cadastro, se existirem
  const perfil = lerPerfil();
  if (perfil) {
    document.getElementById("tutor").value = perfil.nome || "";
    document.getElementById("telefoneAg").value = perfil.telefone || "";
    document.getElementById("pet").value = perfil.pet || "";
    document.getElementById("ruaBusca").value = perfil.rua || "";
    document.getElementById("numeroBusca").value = perfil.numero || "";
    document.getElementById("bairroBusca").value = perfil.bairro || "";
    document.getElementById("avisoPerfil").classList.remove("d-none");
  }

  aplicarMascara(document.getElementById("telefoneAg"), mascaraTelefone);

  // Endereço de busca: só aparece (e só é obrigatório) na tele-busca
  function atualizarTeleBusca() {
    const tele = escolhido("modalidade") === "tele";
    blocoTele.classList.toggle("d-none", !tele);
    camposTele.forEach((campo) => {
      campo.disabled = !tele;
      campo.required = tele;
    });
  }

  // Dia e horário: sem domingo e sem horário que já passou
  function validarDataHora() {
    data.setCustomValidity("");
    horario.setCustomValidity("");

    if (data.value) {
      const diaSemana = new Date(`${data.value}T00:00:00`).getDay();
      if (diaSemana === 0) {
        data.setCustomValidity("O pet shop não abre aos domingos. Escolha outro dia.");
      }
    }

    if (data.value === dataLocalISO() && horario.value) {
      const agora = new Date();
      const hhmm = `${String(agora.getHours()).padStart(2, "0")}:${String(agora.getMinutes()).padStart(2, "0")}`;
      if (horario.value <= hhmm) {
        horario.setCustomValidity("Esse horário já passou. Escolha um horário mais tarde.");
      }
    }

    // Mensagens de erro específicas nos campos de data e horário
    document.getElementById("fb-data").textContent = data.validity.customError
      ? data.validationMessage
      : "Escolha a data do atendimento.";
    document.getElementById("fb-horario").textContent = horario.validity.customError
      ? horario.validationMessage
      : "Escolha um horário entre 8h e 18h, de 30 em 30 minutos.";
  }

  // Resumo lateral: atualiza na hora, conforme o usuário escolhe
  function atualizarResumo() {
    const servico = escolhido("servico");
    const modalidade = escolhido("modalidade");

    const texto = (id, valor, padrao) => {
      document.getElementById(id).textContent = valor || padrao;
    };
    texto("resumoServico", NOMES_SERVICO[servico], "Não escolhido");
    texto("resumoModalidade", NOMES_MODALIDADE[modalidade], "Não escolhido");
    texto("resumoData", data.value ? formatarData(data.value) : "", "Não escolhida");
    texto("resumoHorario", horario.value, "Não escolhido");

    const valor = servico && modalidade ? formatarMoeda(PRECOS[servico][modalidade]) : "—";
    document.getElementById("resumoValor").textContent = valor;
  }

  function atualizarTudo() {
    atualizarTeleBusca();
    validarDataHora();
    atualizarResumo();
  }

  form.addEventListener("input", atualizarTudo);
  form.addEventListener("change", atualizarTudo);
  atualizarTudo();

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    validarDataHora();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      form.querySelector(":invalid").focus();
      mostrarAlerta(alerta, "danger", "Revise os campos destacados antes de confirmar.");
      return;
    }

    const servico = escolhido("servico");
    const modalidade = escolhido("modalidade");
    const valor = formatarMoeda(PRECOS[servico][modalidade]);
    const nomePet = document.getElementById("pet").value;
    const mensagem =
      `Agendamento confirmado! ${NOMES_SERVICO[servico]} para ${nomePet}, ` +
      `${NOMES_MODALIDADE[modalidade].toLowerCase()}, no dia ${formatarData(data.value)} às ${horario.value}. ` +
      `Valor: ${valor}.`;

    form.reset();
    form.classList.remove("was-validated");
    atualizarTudo();
    mostrarAlerta(alerta, "success", mensagem);
  });

  form.addEventListener("reset", () => {
    form.classList.remove("was-validated");
    alerta.className = "d-none";
    setTimeout(atualizarTudo, 0); // espera o reset terminar de limpar os campos
  });
}

iniciarCadastro();
iniciarAgendamento();
