document.getElementById("formulario").addEventListener("submit", async (evento) => {
  evento.preventDefault();

  // Campos obrigatórios
  const camposObrigatorios = [
    "nome",
    "email",
    "cpf",
    "telefone",
    "endereco",
    "tipo",
    "interesse_curso"
  ];

  // Verifica se todos os obrigatórios estão preenchidos
  let faltando = [];
  camposObrigatorios.forEach(campo => {
    const valor = document.getElementById(campo).value.trim();
    if (!valor) {
      faltando.push(campo);
    }
  });

  // Se faltar algo, mostra alerta e interrompe
  if (faltando.length > 0) {
    alert("⚠️ Por favor, preencha todos os campos obrigatórios antes de enviar.");
    faltando.forEach(id => {
      document.getElementById(id).style.borderColor = "red";
    });
    return;
  }

  // Se tudo estiver certo, coleta os dados
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
    interesse_curso: document.getElementById("interesse_curso").value
  };

  try {
    const response = await fetch("/api/receber-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Feedback visual (opcional)
      alert("✅ Formulário enviado com sucesso!");
      // Redireciona para página de obrigado
      window.location.href = "obrigado.html";
    } else {
      alert("❌ Erro ao enviar o formulário. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("⚠️ Ocorreu um erro ao enviar o formulário. Tente novamente.");
  }
});
