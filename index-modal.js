window.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (
        (mouseX <= screenWidth * cornerThreshold || mouseX >= screenWidth * (1 - cornerThreshold))
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
        element.addEventListener('click', () => {
            const textoMobile = element.querySelector('.texto_mobile');
            textoMobile.classList.toggle('ativo');

            // Adicione um console.log para depuração
            console.log('Elemento clicado:', element);
            console.log('Classe .ativo:', textoMobile.classList.contains('ativo'));
        });
    });
});

// Função para atualizar o contador de caracteres em tempo real
function atualizarContador() {
    const textareaOng = document.getElementById("historiaOng");
    const contadorOng = document.getElementById("caracteresRestantes");
    const maxCaracteresOng = 200;

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

// // Adicione um ouvinte de evento ao botão "Limpar Formulário"
// document.getElementById("reset").addEventListener("click", function() {
//     limparFormulario();
// });


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
};

//// JS CLAUDINEI FIM

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
    
    document.getElementById("nomeOng").value = "";
    document.getElementById("historiaOng").value = ""; 
    document.getElementById("imagemOng").value = ""; 
    document.getElementById("urlOng").value = ""; 
    // Limpa o campo de arquivo
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
