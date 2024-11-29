class CopyURL {
  constructor(button) {
    this.button = document.querySelector(button);
  }

  initialize() {
    this.button.addEventListener("click", () => {
      const currentURL = window.location.href; // Obtém a URL atual
      navigator.clipboard
        .writeText(currentURL) // Copia o texto para a área de transferência
        .then(() => {
          alert("URL copiada para a área de transferência!");
        })
        .catch((err) => {
          console.error("Erro ao copiar a URL: ", err);
        });
    });
  }
}

export default CopyURL;
