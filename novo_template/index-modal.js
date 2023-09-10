const header = document.querySelector('.barra_topo');
const cornerThreshold = 0.3; // 30% dos cantos

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
            balaoElement.style.left = rect.left + "px";
            balaoElement.style.top = (rect.top - balaoElement.offsetHeight) + "px";
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
    "#gaiola_3" : "#balao_ongs",
    "#recep_infocao" : "#balao_divulgue_ongs"
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

// Configuração do modal de não-adotante
const modalNaoAdotante = manageModal("#modal_nao_adotante", "#modalOverlay");
modalNaoAdotante.init("#maca_2");

// Configuração do modal ONGs
const modalOngs = manageModal("#modal_ongs", "#modalOverlay");
modalOngs.init("#gaiola_3");

const modalDivulgueOngs = manageModal("#modal_divulgue_ongs", "#modalOverlay");
modalDivulgueOngs.init("#recep_infocao");

document.addEventListener("DOMContentLoaded", function() {
    const idList = [
        "cachorro_colo", "carinho_chao", "atendente_adocao", "gaiola_3", "gaiola_2", "gaiola_1", "gaiola_vazia", "vet", "groomer", "dog_gym", "menina_cachorro", "recep_infocao", "gaiolas", "casinha", "brincando_bolinha", "quadro_3", "quadro_2", "quadro_1", "recepcao", "roupinhas", "almofada", "pct_racao", "racao", "corgi", "passeador", "espera", /* Adicione todos os IDs aqui */
    ];

    idList.forEach(id => {
        const image = document.getElementById(id);
        if (image) {
            // Adicionar evento de passar o mouse
            image.addEventListener("mouseenter", function() {
                image.style.filter = "grayscale(100%)";
            });

            // Adicionar evento de retirar o mouse
            image.addEventListener("mouseleave", function() {
                
                image.style.filter = "none";
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const ongForm = document.getElementById("ongForm");
    const ongInfoOngs = document.getElementById("modalOverlayOngs");
    const ongInfoDivulgue = document.getElementById("modalOverlayDivulgue");

    if (ongForm) {
        ongForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Recupere os valores dos campos do formulário
            const ongName = document.getElementById("nomeOng").value;
            const ongStory = document.getElementById("historiaOng").value;
            const ongLink = document.getElementById("linkOng").value;

            // Copie os valores para os modais (substitua os IDs dos elementos conforme necessário)
            if (ongInfoOngs) {
                ongInfoOngs.innerHTML = `
                    <p>Nome da ONG: ${ongName}</p>
                    <p>História da ONG: ${ongStory}</p>
                    <p>Link da ONG: <a href="${ongLink}" target="_blank">${ongLink}</a></p>
                `;
            }

            if (ongInfoDivulgue) {
                ongInfoDivulgue.innerHTML = `
                    <p>Nome da ONG: ${ongName}</p>
                    <p>História da ONG: ${ongStory}</p>
                    <p>Link da ONG: <a href="${ongLink}" target="_blank">${ongLink}</a></p>
                `;
            }

            // Crie um card com as informações preenchidas
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <div class="card-content">
                    <h3>${ongName}</h3>
                    <p>${ongStory}</p>
                    <a href="${ongLink}" class="helpButton">Ajude aqui</a>
                </div>
            `;

            // Adicione o card ao elemento com o ID "ongInfo"
            if (ongInfoOngs) {
                ongInfoOngs.appendChild(card);
            }
        });
    }

    // Função para copiar e exibir informações da ONG
    function exibirInformacoesONG() {
        const ongForm = document.getElementById("ongForm");
        const nomeONG = ongForm.querySelector("#nomeOng").value;
        const historiaONG = ongForm.querySelector("#historiaOng").value;
        const linkONG = ongForm.querySelector("#linkOng").value;

        const ongInfo = {
            nome: nomeONG,
            historia: historiaONG,
            link: linkONG,
        };

        localStorage.setItem("ongInfo", JSON.stringify(ongInfo));
        atualizarModalONGs();
    }

    // Função para atualizar os modais com as informações armazenadas
    function atualizarModalONGs() {
        const ongInfoString = localStorage.getItem("ongInfo");
        const ongInfo = JSON.parse(ongInfoString);

        if (ongInfo) {
            const mensagemOngs = `Nome da ONG: ${ongInfo.nome}<br>História da ONG: ${ongInfo.historia}<br>Link da ONG: ${ongInfo.link}`;
            if (ongInfoOngs) {
                ongInfoOngs.innerHTML = mensagemOngs;
            }

            if (ongInfoDivulgue) {
                ongInfoDivulgue.innerHTML = mensagemOngs;
            }
        }
    }

    // Adicionar um evento de envio ao formulário no modal_divulgue_ongs
    if (ongForm) {
        ongForm.addEventListener("submit", function (event) {
            event.preventDefault();
            exibirInformacoesONG();
        });
    }

    // Chamar a função para atualizar os modais quando a página for carregada
    atualizarModalONGs();
});
