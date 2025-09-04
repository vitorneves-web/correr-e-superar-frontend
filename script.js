document.getElementById("form-checkout").addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    nome: document.getElementById("nome").value,
    telefone: document.getElementById("telefone").value,
    cpf: document.getElementById("cpf").value,
    email: document.getElementById("email").value
  };

  const response = await fetch("http://localhost:3000/criar-pagamento", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });

  const result = await response.json();

  if (result.qr_code_base64) {
    document.getElementById("qrCodeContainer").style.display = "block";
    document.getElementById("qrCode").src = `data:image/jpeg;base64,${result.qr_code_base64}`;
    document.getElementById("pixCode").value = result.qr_code;
  } else {
    alert("Erro ao gerar pagamento!");
  }
});
