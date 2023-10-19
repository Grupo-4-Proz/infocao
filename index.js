window.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const cornerThreshold = 0.1; // Defina o valor apropriado para cornerThreshold (por exemplo, 0.1 para 10% das bordas)

    const header = document.querySelector('#header'); // Use o seletor correto para o elemento header

    if (
        mouseX <= screenWidth * cornerThreshold || mouseX >= screenWidth * (1 - cornerThreshold)
    ) {
        header.style.top = '0';
    } else {
        header.style.top = '-50px';
    }
});

// Referência para o balão de recepção e seus controles
const balao = document.querySelector("#balao_recepcao");
const btnFechar = document.querySelector(".balao_btn");
const elemento = document.querySelector("#recepcao");



// Função para mostrar o balão de recepção
function showBalao() {
    // Obtém a posição do elemento #recepcao
    const rect = elemento.getBoundingClientRect();
    
    // Define a posição do balão baseado na posição de #recepcao
    balao.style.left = (rect.left - balao.offsetWidth / 1.9) + "px";
    balao.style.top = (rect.top - balao.offsetHeight - 30) + "px";
    
    // Mostra o balão
    balao.classList.add('visible');
}

// Usar transform translate para os outros baloes? Ou fazer ele "ouvir" onde o mouse está e posicionar no elemento
// Exibe o balão no carregamento da página
showBalao();

// Evento para fechar o balão
btnFechar.addEventListener('click', () => balao.classList.remove('visible'));

// Evento para mostrar o balão ao clicar no #recepcao
elemento.addEventListener('click', showBalao);

// Funções para manipular eventos de mouse para os balões
function handleMouseEvents(balaoElement) {
    return {
        over: function() {
            // Posiciona e mostra o balão ao passar o mouse
            const rect = this.getBoundingClientRect();
            const balaoHeight = balaoElement.offsetHeight;
            
            // Obtém a posição vertical do balão ajustada para não ultrapassar o topo visível da página
            let topPosition = rect.top - balaoHeight;
            
            // Verifica se o balão está acima do topo da página visível
            if (topPosition < 0) {
              topPosition = 0; // Ajusta a posição para alinhar com o topo visível da página
            }
            
            balaoElement.style.left = rect.left + "px";
            balaoElement.style.top = topPosition + "px";
            balaoElement.classList.add('visible');
            
        },
        out: function() {
            // Esconde o balão ao remover o mouse do elemento
            balaoElement.classList.remove('visible');
        }
    };
}

// Mapeamento dos elementos e seus respectivos balões
const balaoElements = {
    "#racao": "#balao_racao",
    "#roupinhas":"#balao_origem",
    "#gaiola_3":"#balao_ongs",
    "#recep_infocao":"#balao_divulgue_ongs",
    "#espera":"#balao_adotante",
    "#vet":"#balao_nao_adotante",
    "#cachorro_colo":"#balao_mural_depoimentos"


};
console.log(balaoElements);

// Adiciona eventos para cada elemento mapeado e seu respectivo balão
for (let key in balaoElements) {
    const element = document.querySelector(key);
    const events = handleMouseEvents(document.querySelector(balaoElements[key]));
    element.addEventListener('mouseover', events.over);
    element.addEventListener('mouseout', events.out);
}

// Função gerenciadora de modais (abrir e fechar)
function manageModal(modalSelector, overlaySelector) {
    const modal = document.querySelector(modalSelector);
    const overlay = document.querySelector(overlaySelector);
    const closeModalButton = modal.querySelector(".modalClose");

    return {
        open: function() {
            // Mostra o modal e o overlay
            modal.style.display = "block";
            overlay.style.display = "block";
        },
        close: function() {
            // Esconde o modal e o overlay
            modal.style.display = "none";
            overlay.style.display = "none";
        },
        init: function(triggerSelector) {
            // Inicializa os eventos para mostrar e esconder o modal
            document.querySelectorAll(triggerSelector).forEach(element => {
                element.addEventListener('click', this.open);
            });
            closeModalButton && closeModalButton.addEventListener('click', this.close);
            overlay.addEventListener('click', this.close);
        }
    };
}

// Configuração do modal de origem
const modalOrigem = manageModal("#modal_origem", "#modalOverlay");
modalOrigem.init("#roupinhas");
// Configuração do modal de ração
const modalRacao = manageModal("#modal_pesq_alimentacao", "#modalOverlay");
modalRacao.init("#racao");

// Configuração do modal de adoção
const modalAdotante = manageModal("#modal_adotante", "#modalOverlay");
modalAdotante.init("#espera");

const modalOngs = manageModal("#modalOngs", "#modalOverlay");
modalOngs.init("#gaiola_3");

// Configuração do modal de não-adotante
const modalNaoAdotante = manageModal("#modal_nao_adotante", "#modalOverlay");
modalNaoAdotante.init("#vet");

const modalDivulgueOngs = manageModal("#modalDivulgueOngs", "#modalOverlay");
modalDivulgueOngs.init("#recep_infocao");

const modalMural = manageModal("#modal_mural", "#modalOverlay");
modalMural.init("#cachorro_colo");

document.addEventListener("DOMContentLoaded", function() {
    const idList = [
        "cachorro_colo", "carinho_chao", "atendente_adocao", "gaiola_3", "vet", "groomer", "dog_gym", "menina_cachorro", "recep_infocao", "brincando_bolinha", "recepcao", "roupinhas", "racao", "corgi", "passeador", "espera", /* Adicione todos os IDs aqui */
    ];

    idList.forEach(id => {
        const image = document.getElementById(id);
        if (image) {
            image.addEventListener("click", function() {
                
                image.style.filter = "none";
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const mobileElements = document.querySelectorAll('.mobile');
    mobileElements.forEach(element => {
        const span = element.querySelector('span');
        if (span) { // Verifica se o elemento span existe
            span.addEventListener('click', (event) => {
                event.stopPropagation(); // Impede que o evento de clique no span se propague para o elemento pai.
                const textoMobile = element.querySelector('.texto_mobile');
                textoMobile.classList.toggle('ativo');

                // Adicione um console.log para depuração
                console.log('Elemento clicado:', element);
                console.log('Classe .ativo:', textoMobile.classList.contains('ativo'));
            });
        }
    });
});
  
//// JS CLAUDINEI INICIO


// Função para atualizar o contador de caracteres em tempo real adotante conte sua historia
const textarea = document.getElementById('historiaAdocao');
        const contadorCaracteres = document.getElementById('contador-caracteres-adocao');
        const limparCamposBtn = document.getElementById('limpar-campos');

        textarea.addEventListener('input', function () {
            const caracteresDigitados = textarea.value.length;
            const caracteresRestantes = 400 - caracteresDigitados;

            contadorCaracteres.textContent = caracteresRestantes + ' caracteres restantes';
        });

        limparCamposBtn.addEventListener('click', function () {
            // Quando o botão de Limpar Campos é clicado, redefina o contador para 400 caracteres.
            contadorCaracteres.textContent = '400 caracteres restantes';

            // Oculte a miniatura da imagem.
            miniatura.style.display = 'none';
        });


// Função para validar a extensão do arquivo e carregar miniatura adotante
function validarImagem() {
    var fotoInput = document.getElementById("foto");
    var miniatura = document.getElementById("miniatura");

    var file = fotoInput.files[0];
    if (file) {
        var fileName = file.name.toLowerCase();
        if (fileName.endsWith(".jpg")) {
            // A extensão do arquivo é .jpg, então mostramos a miniatura
            miniatura.style.display = "block";
            miniatura.src = URL.createObjectURL(file);
        } else {
            alert("Por favor, selecione um arquivo de imagem com extensão .jpg");
            fotoInput.value = ""; // Limpa a seleção de arquivo
            miniatura.style.display = "none"; // Oculta a miniatura
        }
    }
}

// Função para validar o formulário
function validarFormulario() {
    const nome = document.getElementById("nome").value;
    const estado = document.getElementById("estado").value;
    const cidade = document.getElementById("cidade").value;
    const foto = document.getElementById("foto").files[0];
    const historia = document.getElementById("historiaAdocao").value;

    if (nome === "" || estado === "" || cidade === "" || !foto || historia === "") {
        alert("Por favor, preencha todos os campos do formulário e carregue uma imagem.");
        return false;
    }

    return true;
}

//// JS CLAUDINEI FIM


// JS ANA CLARA

// Função para validar URLs
function isValidUrl(url) {
    const pattern = /^https?:\/\/.+/i;
    return pattern.test(url);
}

function createOngCard(formData) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "ong-card";

    // Crie o contêiner para o conteúdo (título, história e botão)
    const contentContainer = document.createElement("div");
    contentContainer.className = "content";

    // Crie o elemento de imagem
    const cardImage = document.createElement("img");
    cardImage.src = formData.imagemOng;
    cardImage.alt = "Logo da ONG"; // Adicione um texto alternativo para acessibilidade

    // Crie o título da ONG como um elemento h3
    const cardTitle = document.createElement("h3");
    cardTitle.innerText = formData.nomeOng;

    // Crie a história da ONG como um parágrafo
    const cardHistory = document.createElement("p");
    cardHistory.innerText = formData.historiaOng;

    // Crie o botão "Ajude aqui" como um link
    const cardButton = document.createElement("a");
    cardButton.href = formData.urlOng;
    cardButton.target = "_blank"; // Abre o link em uma nova janela
    cardButton.className = "help-button";
    cardButton.innerText = "Ajude aqui";

    contentContainer.appendChild(cardTitle);
    contentContainer.appendChild(cardHistory);
    contentContainer.appendChild(cardButton);

    cardDiv.appendChild(cardImage);
    cardDiv.appendChild(contentContainer);

    return cardDiv;
}

// Função para criar cartões com base nos dados do localStorage
function createOngCards() {
    const ongCardsContainer = document.getElementById("ongCards");

    // Limpar os cartões existentes
    ongCardsContainer.innerHTML = "";

    // Recuperar e exibir os dados do localStorage, se disponíveis
    const formDataArrayJSON = localStorage.getItem("formDataArray");
    if (formDataArrayJSON) {
        const formDataArray = JSON.parse(formDataArrayJSON);

        // Criar cartões a partir dos dados armazenados
        formDataArray.forEach(function (formData) {
            const cardDiv = createOngCard(formData);
            ongCardsContainer.appendChild(cardDiv);
        });
    }
}

// Chame a função para criar cartões quando a página é carregada
document.addEventListener("DOMContentLoaded", createOngCards);

// Função para atualizar o contador de caracteres em tempo real
function atualizarContador() {
    const textareaOng = document.getElementById("historiaOng");
    const contadorOng = document.getElementById("caracteresRestantes");
    const maxCaracteresOng = 300;

    if (contadorOng) {
        const caracteresDigitadosOng = textareaOng.value.length;
        const caracteresRestantesOng = maxCaracteresOng - caracteresDigitadosOng;

        contadorOng.textContent = caracteresRestantesOng + " caracteres restantes";
    }
}

// Adicione um ouvinte de evento de entrada aos campos de texto
document.getElementById("historiaOng").addEventListener("input", atualizarContador);

// Função para limpar todos os campos do formulário
function limparFormulario() {
    const textareaOng = document.getElementById("historiaOng");
    const nomeOng = document.getElementById("nomeOng");
    const imagemOng = document.getElementById("imagemOng");
    const urlOng = document.getElementById("urlOng");

    // Limpar os valores dos campos
    textareaOng.value = "";
    nomeOng.value = "";
    imagemOng.value = "";
    urlOng.value = "";

    // Atualizar o contador após limpar
    atualizarContador();
}

// Adicione um ouvinte de evento ao botão "Limpar Formulário"
document.getElementById("reset").addEventListener("click", function() {
    limparFormulario();
});

// Mova a definição da função submitForm para o escopo global
function submitForm(event) {
    event.preventDefault(); // Impede a recarga da página

    const nomeOng = document.getElementById("nomeOng").value;
    const historiaOng = document.getElementById("historiaOng").value;
    const urlOng = document.getElementById("urlOng").value;
    const imagemOngInput = document.getElementById("imagemOng");
    const imagemOngPath = URL.createObjectURL(imagemOngInput.files[0]);

    if (nomeOng === "" || historiaOng === "" || urlOng === "") {
        alert("Por favor, preencha todos os campos do formulário.");
        return;
    }

    // Adicionar validação de URL
    if (!isValidUrl(urlOng)) {
        alert("URL inválida. Insira uma URL válida.");
        return;
    }

    // Recuperar dados existentes do localStorage ou inicializar um array vazio
    const formDataArray = JSON.parse(localStorage.getItem("formDataArray")) || [];

    // Criar um objeto para representar os dados do formulário atual
    const formData = {
        nomeOng,
        historiaOng,
        urlOng,
        imagemOng: imagemOngPath,
    };

    const ongCardsContainer = document.getElementById("ongCards");
    const cardDiv = createOngCard(formData);
    ongCardsContainer.appendChild(cardDiv);

    // Adicionar os dados do formulário atual ao array
    formDataArray.push(formData);

    // Armazenar o array atualizado no localStorage
    try {
        localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
        console.log("Formulário enviado com sucesso!");
    } catch (error) {
        console.error("Erro ao armazenar os dados no localStorage:", error);
        // Você pode adicionar tratamento de erros mais robusto aqui
    }

    // Limpar os campos do formulário
    limparFormulario();

    // Recarregue ou atualize a exibição dos cartões aqui, se necessário
    createOngCards();
}

function limparLocalStorage() {
    localStorage.removeItem("formDataArray");
}

document.addEventListener("DOMContentLoaded", function () {
    limparLocalStorage(); // Chame a função para limpar o localStorage quando a página é carregada
});


// MOBILE ONGS 

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('mobile_ongForm');
    const historiaInput = document.getElementById('historiaOmobile');
    const contadorCaracteres = document.getElementById('contador-caracteres-mobile');

    historiaInput.addEventListener('input', function () {
        const caracteresDigitados = historiaInput.value.length;
        const caracteresRestantes = 300 - caracteresDigitados;

        contadorCaracteres.textContent = caracteresRestantes + " caracteres restantes";
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Isso ainda previne o envio do formulário

        // Resto do seu código aqui
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // Obtenha a referência ao contêiner de cartões
    const ongCardsContainer = document.getElementById('ongCards');
  
    // Função para adicionar um cartão
    function addCard(nome, historia, link, imagemSrc) {
      const ongCard = document.createElement('div');
      ongCard.classList.add('ong-card');
  
      const cardContent = `
        <img src="${imagemSrc}" alt="${nome}">
        <div class="content">
          <h3>${nome}</h3>
          <p>${historia}</p>
          <a href="${link}" class="help-button" target="_blank">Ajude aqui</a>
          <!-- Adicionado target="_blank" para abrir em nova guia -->
        </div>
      `;
  
      ongCard.innerHTML = cardContent;
      ongCardsContainer.appendChild(ongCard);
    }
  
    // Adicione cartões manualmente
    addCard('Amigo não se Compra', 'A gente acredita que todo animal de rua merece um lar. Por isso, nosso trabalho é conectar os animais que estão em abrigos com pessoas que estejam procurando por um doguinho ou gatinho pra chamar de seu.', 'https://www.amigonaosecompra.com.br/paginas/sobre-o-amigo', '/Public/img/ONGs/amigo_nao_se_compra.png');
    addCard('Amor Animal de Marilia', 'Cuidar de animais era um sonho de criança da Jaqueline, a fundadora da ONG Amor Animal de Marilia. Ela começou a recolher animais abandonados nas ruas e doar para pessoas responsáveis, que pudessem cuidar desses animais.', 'https://www.amoranimalmarilia.com.br/', '/Public/img/ONGs/amor_animal.jpg');
    addCard('ONG 3', 'História da ONG 3', 'https://link-da-ong3.com', '/Public/img/ONGs/animalar.png');
    addCard('ONG 4', 'História da ONG 4', 'https://link-da-ong4.com', '/Public/img/ONGs/focinho_amigo.jpg');
    addCard('ONG 5', 'História da ONG 5', 'https://link-da-ong5.com', '/Public/img/ONGs/liga-das-patinha.png');
    addCard('ONG 6', 'História da ONG 6', 'https://link-da-ong6.com', '/Public/img/ONGs/sos_unhas_e_garras.jpg');
  });
  
