document.getElementById("formulario").addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const data = {
    nome: document.getElementById("nome").value,
    sobrenome: document.getElementById("sobrenome").value,
    email: document.getElementById("email").value,
    cpf: document.getElementById("cpf").value,
    telefone: document.getElementById("telefone").value,
    endereco: document.getElementById("endereco").value,
    tipo: document.getElementById("tipo").value,
    idade: document.getElementById("idade").value,
    escolaridade: document.getElementById("escolaridade").value,
    opiniao_evento: document.getElementById("opiniao_evento").value,
    opiniao_cursos: document.getElementById("opiniao_cursos").value
  };

  const response = await fetch("/api/receber-form.js", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  document.href="obrigado.html";
});

