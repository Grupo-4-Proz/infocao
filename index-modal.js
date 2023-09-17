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




/////Contador caracteres Formulário Adotante Conte Sua Historia e ONGS//////

function atualizarContador() {
    const maxCaracteres = 400;
    const textarea = document.getElementById('historia-Ong');
    const contador = document.getElementById('contador-caracteres');
    const caracteresRestantes = maxCaracteres - textarea.value.length;

    contador.textContent = caracteresRestantes + ' caracteres restantes';

    const historiaAdocao = document.getElementById('historiaAdocao');
    const contadorAdocao = document.getElementById('contador-caracteres-adocao');
    const caracteresDigitadosAdocao = historiaAdocao.value.length;
    const caracteresRestantesAdocao = 400 - caracteresDigitadosAdocao;

    contadorAdocao.textContent = caracteresRestantesAdocao + ' caracteres restantes';
}
    atualizarContador();
    setInterval(atualizarContador, 1000);




//////Exibir Miniatura Formulário Adotante Conte Sua Historia/////

// function exibirMiniatura() {
//     const inputFoto = document.getElementById('foto');
//     const miniatura = document.getElementById('miniatura');

//     if (inputFoto.files && inputFoto.files[0]) {
//         const reader = new FileReader();

//         reader.onload = function(e) {
//             miniatura.src = e.target.result;
//             miniatura.style.display = 'block';
//         };

//         reader.readAsDataURL(inputFoto.files[0]);
//     } else {
//         miniatura.src = '';
//         miniatura.style.display = 'none';
//     }
// }


//////Exibir Miniatura Formulário ONGS/////

// const imagemInput = document.getElementById('imagem');
// const miniaturaImagem = document.getElementById('miniatura-imagem');

// imagemInput.addEventListener('change', () => {
//     if (imagemInput.files && imagemInput.files[0]) {
//         const reader = new FileReader();

//         reader.onload = function(e) {
//             miniaturaImagem.src = e.target.result;
//             miniaturaImagem.style.display = 'block';
//         };

//         reader.readAsDataURL(imagemInput.files[0]);
//     } else {
//         miniaturaImagem.src = '';
//         miniaturaImagem.style.display = 'none';
//     }
// });

//////Exibir Miniatura Formulário Adotante Conte Sua Historia e ONGS/////

function exibirMiniatura(inputElement, miniaturaElement) {
    if (inputElement.files && inputElement.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            miniaturaElement.src = e.target.result;
            miniaturaElement.style.display = 'block';
        };

        reader.readAsDataURL(inputElement.files[0]);
    } else {
        miniaturaElement.src = '';
        miniaturaElement.style.display = 'none';
    }
}

const inputFoto = document.getElementById('foto');
const miniatura = document.getElementById('miniatura');

inputFoto.addEventListener('change', () => {
    exibirMiniatura(inputFoto, miniatura);
});

const imagemInput = document.getElementById('imagem');
const miniaturaImagem = document.getElementById('miniatura-imagem');

imagemInput.addEventListener('change', () => {
    exibirMiniatura(imagemInput, miniaturaImagem);
});

// Função para enviar o formulário e criar um cartão de ONG
function submitForm() {
    const nomeOng = document.getElementById("nomeOng").value;
    const historiaOng = document.getElementById("historiaOng").value;
    const imagemOng = document.getElementById("imagemOng").value;
    const urlOng = document.getElementById("urlOng").value;

    if (nomeOng === "" || historiaOng === "" || imagemOng === "" || urlOng === "") {
        alert("Por favor, preencha todos os campos do formulário.");
        return;
    }

    const cardDiv = document.createElement("div");
    cardDiv.className = "ong-card";

    const cardImage = document.createElement("img");
    cardImage.src = imagemOng;
    cardImage.alt = nomeOng;

    const cardTitle = document.createElement("h3");
    cardTitle.innerText = nomeOng;

    const cardHistory = document.createElement("p");
    cardHistory.innerText = historiaOng;

    const cardButton = document.createElement("a");
    cardButton.href = urlOng;
    cardButton.className = "help-button";
    cardButton.innerText = "Ajude aqui";

    cardDiv.appendChild(cardImage);
    cardDiv.appendChild(cardTitle);
    cardDiv.appendChild(cardHistory);
    cardDiv.appendChild(cardButton);

    document.getElementById("ongCards").appendChild(cardDiv);

    closeModal("modalDivulgueOngs");

    // Limpa os campos do formulário
    document.getElementById("nomeOng").value = "";
    document.getElementById("historiaOng").value = "";
    document.getElementById("imagemOng").value = "";
    document.getElementById("urlOng").value = "";
}