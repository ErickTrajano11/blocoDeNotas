// Espera o conteúdo da página carregar completamente antes de executar o script.
// É uma boa prática para evitar erros de JavaScript tentando acessar elementos
// que ainda não existem na página.
document.addEventListener('DOMContentLoaded', () => {

    // 1. SELECIONANDO O ELEMENTO
    // ----------------------------
    // Primeiro, precisamos de uma referência ao nosso elemento <textarea>.
    // Usamos 'document.getElementById' para pegar o elemento pelo 'id' que definimos no HTML.
    const blocoDeNotas = document.getElementById('blocoDeNotas');
    const salvarNotas = document.getElementById('salvarNotas');
    const limparNotas = document.getElementById('limparNotas');
    const alternarModo = document.getElementById('alternarModo');

    // Adicionando um evento de clique ao botão "Limpar Notas"
    limparNotas.addEventListener('click', () => {
        // Aqui, 'blocoDeNotas' agora é uma variável que contém o nosso <textarea>
        // Quando o botão "Limpar Notas" for clicado, o conteúdo do bloco de notas será limpo
        blocoDeNotas.value = '';
        localStorage.removeItem('minhaNota'); // Remove a nota salva do localStorage
        console.log("Notas limpas!"); // Mensagem de confirmação no console
    });

    // 2. CARREGANDO DADOS DO LOCALSTORAGE
    // ------------------------------------
    // O 'localStorage' é um recurso do navegador que permite salvar informações
    // que persistem mesmo depois que o navegador é fechado.
    // Usamos 'localStorage.getItem()' para buscar um item salvo.
    // Aqui, estamos procurando por um item que salvamos com a chave 'minhaNota'.
    const notaSalva = localStorage.getItem('minhaNota');

    // Verificamos se encontramos alguma nota salva.
    if (notaSalva) {
        // Se 'notaSalva' não for nulo (ou seja, existe algo salvo),
        // nós colocamos o valor salvo de volta no nosso 'blocoDeNotas'.
        blocoDeNotas.value = notaSalva;
    }

    // 3. ADICIONANDO UM 'EVENTLISTENER'
    // ---------------------------------
    // Agora, a parte principal: queremos fazer algo sempre que o usuário digitar.
    // O 'addEventListener' é como um "ouvinte" que fica esperando por uma ação específica.
    //
    // Parâmetros do addEventListener:
    //   - O primeiro é o TIPO DE EVENTO que queremos ouvir. 'input' é disparado
    //     toda vez que o valor do <textarea> muda (ou seja, o usuário digita, apaga, etc).
    //   - O segundo é a FUNÇÃO que será executada quando o evento acontecer.
    //     Esta função é chamada de "callback".
    salvarNotas.addEventListener('click', () => {
        // 4. SALVANDO DADOS NO LOCALSTORAGE
        // -----------------------------------
        // Dentro da nossa função de callback, pegamos o valor atual do bloco de notas
        // e o salvamos no localStorage.
        // Usamos 'localStorage.setItem()' para isso.
        //
        // Parâmetros do setItem:
        //   - O primeiro é a CHAVE (o "nome" do nosso dado). Usaremos a mesma chave 'minhaNota'.
        //   - O segundo é o VALOR que queremos salvar. 'blocoDeNotas.value' contém o texto
        //     que está atualmente na área de texto.
        localStorage.setItem('minhaNota', blocoDeNotas.value);

        console.log("Nota salva no localStorage!"); // Uma mensagem no console para fins de depuração.
    });

    // Adicionando evento para alternar o modo escuro
    alternarModo.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Salvar modo no localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('modoAtual', 'dark');
        } else {
            localStorage.setItem('modoAtual', 'light');
        }
    });

    // Ao carregar a página, carrega o modo salvo no localStorage
    const modoSalvo = localStorage.getItem('modoAtual');
    if (modoSalvo === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

});
