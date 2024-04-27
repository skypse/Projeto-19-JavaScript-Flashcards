// Encontrando os elementos
const flashcards = document.getElementById('flashcards');
const createBox = document.getElementById('create_card');
const question = document.getElementById("question");
const answer = document.getElementById("answer");

// Verificando localStorage sob a chave 'items'. Se houver, converte os dados de uma string JSON para um objeto JavaScript e armazena em contentArray. Caso contrário, define contentArray como uma array vazia.
let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

// Função para criar um flashcard na interface
function divMaker(text){
  // Criando os elementos necessários para o flashcard
  let div = document.createElement('div');
  let h2_question = document.createElement('h2');
  let h2_answer = document.createElement('h2');

  // Configuração da clase do css
  div.className = 'flashcard';

  // Style da 'question', do flashcard + insere textp
  h2_question.setAttribute('style', "border-top 1px solid red; padding: 15px; margin-top: 30px");
  h2_question.innerHTML = text.my_question;

  // Style da 'answer', do flashcard + insere textp
  h2_answer.setAttribute('style', 'text-align: center; display:none; color:red');
  h2_answer.innerHTML = text.my_answer;

  // Adiciona elementos de pergunta como parente do container do flashcard ('question' e 'answer')
  div.appendChild(h2_question);
  div.appendChild(h2_answer);

  // Evento de clique
  div.addEventListener('click', function(){
    // Verifica se a resposta está oculta
    if(h2_answer.style.display == 'none'){
      h2_answer.style.display = 'block'; // se tiver oculta, ela exibe
    }
    else{
      h2_answer.style.display = 'none' // se tiver vísivel, ela oculta
    }
  })

  // Adiciona o flascard a lista dos flashcards na interface
  flashcards.appendChild(div)
}

// Exibir flashcards existentes na interface
contentArray.forEach(divMaker);

// Função para adicionar um novo flashcard
function addFlashcard(){
  let flashcard_info = {
    // Os valores daqui são obtidos dos valores HTML com ids 'question' e 'answer'
    'my_question' : question.value,
    'my_answer' : answer.value
  }
  //Armazena todos flashcards
  contentArray.push(flashcard_info);

  // A array é convertida em JSON, e em seguida é armazenada no 'localstorage', sob a chave "items". Permitindo que os card sejam salvos localmente permitindo que eles persistem mesmo após o fechamento da página
  localStorage.setItem('items', JSON.stringify(contentArray));

  // Exibe o flash card
  divMaker(contentArray[contentArray.length - 1]);
  question.value = '';
  answer.value = '';
}

// Função deletar cards
function delFlashcard(){
  localStorage.clear();
  flashcards.innerHTML = '';
  contentArray = [];
}

// Função que mostra a crate
function showCreateCardBox(){
  createBox.style.display = 'block';
}

// Função esconde o createbox
function hideCreateBox(){
  createBox.style.display = 'none';
}

// Adiciona eventos de clique aos botões
document.getElementById("save_card").addEventListener("click", addFlashcard);
document.getElementById("delete_cards").addEventListener("click", delFlashcard);
document.getElementById("show_card_box").addEventListener("click", showCreateCardBox);
document.getElementById("close_card_box").addEventListener("click", hideCreateBox);
