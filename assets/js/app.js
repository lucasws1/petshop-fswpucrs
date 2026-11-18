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
