function atualizarContador() {
    var textarea = document.getElementById("historia");
    var contador = document.getElementById("contador-caracteres");
    var caracteresDigitados = textarea.value.length;
    var caracteresRestantes = 400 - caracteresDigitados;
    contador.textContent = caracteresRestantes + " caracteres restantes";
}

// Adiciona um ouvinte de evento de entrada ("input") no campo de texto
var textarea = document.getElementById("historia");
textarea.addEventListener("input", atualizarContador);

// Chama a função inicialmente e a cada segundo para garantir que a contagem seja atualizada
atualizarContador();
setInterval(atualizarContador, 1000); // Atualiza a cada segundo

console.log(bosta)