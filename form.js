let arrayPostagens = [];

function criarPostagem(){
    const nomeOng = document.getElementById("nomeOng").value;
    const historiaOng = document.getElementById("historiaOng").value;
    const imagemOng = document.getElementById("imagemOng").value;
    const urlOng = document.getElementById("urlOng").value;

    if (nomeOng && historiaOng && imagemOng && urlOng) {
        const novaPostagem = {
        nomeOng: nomeOng,
        historiaOng: historiaOng,
        imagemOng: imagemOng,
        urlOng: urlOng,
        };

        // Adicione a nova postagem ao seu array
        arrayPostagens.push(novaPostagem);

        // Chame a função para exibir todas as postagens (se necessário)
        exibirPostagens();

    //Limpe o formulário
    document.getElementById("ongForm").reset();
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}


function exibirPostagens() {
  let ongCards = document.getElementById("ongCards");
  ongCards.innerHTML = ""; // Limpa o conteúdo existente

  for (let i = 0; i < arrayPostagens.length; i++) {
    let article = document.createElement("article");
    article.innerHTML = `
      <h3>${arrayPostagens[i].nomeOng}</h3>
      <p class="subtitulo">${arrayPostagens[i].historiaOng}</p>
      <div class="data">${arrayPostagens[i].imagemOng}</div>
      <p>${arrayPostagens[i].urlOng}</p>`;

    article.id = `post-${i + 1}`;
    ongCards.appendChild(article);
  }
}
