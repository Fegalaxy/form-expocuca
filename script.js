// script.js
document.getElementById("visitForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    nome: document.getElementById("nome").value,
    sobrenome: document.getElementById("sobrenome").value,
    email: document.getElementById("email").value,
    idade: document.getElementById("idade").value,
    escolaridade: document.getElementById("escolaridade").value,
    opiniao_evento: document.getElementById("opiniao_evento").value,
    opiniao_cursos: document.getElementById("opiniao_cursos").value
  };

  try {
    const response = await fetch("/.netlify/functions/receber-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    const msgEl = document.getElementById("mensagem");

    if (response.ok) {
      msgEl.className = "sucesso";
      msgEl.textContent = result.message;
      document.getElementById("visitForm").reset();
    } else {
      msgEl.className = "erro";
      msgEl.textContent = result.message || "Erro ao enviar formulário.";
    }
  } catch (err) {
    console.error("⚠️ Erro inesperado:", err);
    const msgEl = document.getElementById("mensagem");
    msgEl.className = "erro";
    msgEl.textContent = "Erro inesperado. Tente novamente.";
  }
});
