const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  // Campos obrigatórios
  const obrigatorios = ["nome", "sobrenome", "email", "cpf", "telefone", "endereco", "tipo", "idade"];
  let todosPreenchidos = true;

  // Resetar bordas
  obrigatorios.forEach(id => {
    document.getElementById(id).style.borderColor = "#94a1b2"; // cor padrão
  });

  // Verificar se todos os obrigatórios foram preenchidos
  obrigatorios.forEach(id => {
    const valor = document.getElementById(id).value.trim();
    if (!valor) {
      document.getElementById(id).style.borderColor = "red";
      todosPreenchidos = false;
    }
  });

  if (!todosPreenchidos) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  // Montar objeto de envio
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
    interesse_curso: document.querySelector('input[name="interesse_curso"]:checked')?.value || ""
  };

  try {
    const response = await fetch("/api/receber-form.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      // Redirecionar para a página de obrigado
      window.location.href = "/obrigado.html";
    } else {
      alert(result.message || "Erro ao enviar formulário.");
    }
  } catch (err) {
    console.error("Erro inesperado:", err);
    alert("Erro inesperado. Tente novamente.");
  }
});
