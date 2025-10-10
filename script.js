const form = document.getElementById("formulario");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let valid = true;

  // Limpa erros anteriores
  form.querySelectorAll("input, select, textarea").forEach(field => {
    field.classList.remove("erro");
  });

  // Validação de campos obrigatórios
  const obrigatorios = ["nome", "sobrenome", "email", "cpf", "telefone", "endereco", "tipo", "idade"];
  obrigatorios.forEach(id => {
    const field = document.getElementById(id);
    if (!field.value.trim()) {
      field.classList.add("erro");
      valid = false;
    }
  });

  if (!valid) {
    alert("Por favor, preencha todos os campos obrigatórios!");
    return;
  }

  // Dados do formulário
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
    opiniao_cursos: document.getElementById("opiniao_cursos").value,
    interesse_curso: document.getElementById("curso_interesse")?.value || ""
  };

  try {
    const response = await fetch("/api/receber-form", { // caminho corrigido
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      // Redireciona para página de agradecimento
      window.location.href = "/obrigado.html"; // caminho absoluto
    } else {
      alert(result.message || "Erro ao enviar formulário");
    }

  } catch (err) {
    console.error("Erro ao enviar formulário:", err);
    alert("Erro ao enviar formulário. Tente novamente.");
  }
});
