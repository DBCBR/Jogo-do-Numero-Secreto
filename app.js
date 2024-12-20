// Declaração de variáveis
let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Funções de manipulação do DOM
function exibirTextoNaTela(tag,texto){ // Função que exibe um texto na tela
    let campo = document.querySelector(tag); // Seleciona o elemento HTML pelo nome da tag 
    campo.innerHTML = texto; // Insere o texto no elemento HTML selecionado 
    if ('speechSynthesis' in window) { // Verifica se o navegador suporta a Web Speech API
        let utterance = new SpeechSynthesisUtterance(texto); // Cria um objeto de fala 
        utterance.lang = 'pt-BR';  // Define o idioma da fala
        utterance.rate = 1.5; // Define a velocidade da fala
        window.speechSynthesis.speak(utterance);  // Faz a fala do texto
    } else { // Se o navegador não suportar a Web Speech API
        console.log("Web Speech API não suportada neste navegador."); // Exibe uma mensagem no console
    }
}

// Funções do jogo do número secreto 
function exibirMensagemInicial(){ // Função que exibe a mensagem inicial do jogo 
    exibirTextoNaTela('h1', 'Jogo do número secreto'); // Exibe o título do jogo 
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10'); // Exibe a mensagem de instrução 
}

// Chamada de funções
exibirMensagemInicial(); // Exibe a mensagem inicial do jogo 

// Funções de manipulação do DOM 
function verificarChute(){ // Função que verifica o chute do usuário 
    let chute = document.querySelector('input').value; // Pega o valor do input 

    // Verifica se o chute é um número válido 
    if (chute == numeroSecreto) { // Se o chute for igual ao número secreto 
        exibirTextoNaTela('h1', 'Parabéns, você acertou!'); // Exibe a mensagem de parabéns 
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // Verifica se a palavra é no plural ou singular 
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; // Mensagem de tentativas 
        exibirTextoNaTela('p', mensagemTentativas); // Exibe a mensagem de tentativas 
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão de reiniciar
    } else { // Se o chute for diferente do número secreto 
        if (chute > numeroSecreto) { // Se o chute for maior que o número secreto 
            exibirTextoNaTela('p', 'O número secreto é menor!'); // Exibe a mensagem de que o número secreto é menor 
        } else { // Se o chute for menor que o número secreto 
            exibirTextoNaTela('p', 'O número secreto é maior!'); // Exibe a mensagem de que o número secreto é maior 
        }
        tentativas++; // Incrementa o número de tentativas 
        limparCampo(); // Limpa o campo de input 
    }
}

// Funções do jogo do número secreto 
function gerarNumeroAleatorio(){ // Função que gera um número aleatório 
    let numeroEscolhido = parseInt(Math.random() * 10 + 1); // Gera um número aleatório entre 1 e 10 
    let quantidadeDeNumerosSorteados = listaDeNumerosSorteados.length; // Pega a quantidade de números sorteados

    if (quantidadeDeNumerosSorteados == 10) { // Verifica se todos os números já foram sorteados 
        listaDeNumerosSorteados = []; // Limpa a lista de números sorteados 
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { // Verifica se o número já foi sorteado 
        return gerarNumeroAleatorio(); // Chama a função novamente 
    } else { // Se o número não foi sorteado 
        listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona o número sorteado na lista 
        console.log(listaDeNumerosSorteados); // Exibe a lista de números sorteados no console 
        return numeroEscolhido; // Retorna o número sorteado 
    }
}

// Funções de manipulação do DOM
function limparCampo(){ // Função que limpa o campo de input 
    chute = document.querySelector('input'); // Seleciona o input 
    chute.value = ''; // Limpa o valor do input 
}

// Funções de manipulação do DOM
function reiniciarJogo(){ // Função que reinicia o jogo 
    numeroSecreto = gerarNumeroAleatorio(); // Gera um novo número secreto 
    limparCampo(); // Limpa o campo de input 
    tentativas = 1; // Reseta o número de tentativas 
    exibirMensagemInicial(); // Exibe a mensagem inicial do jogo 
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilita o botão de reiniciar 
}    