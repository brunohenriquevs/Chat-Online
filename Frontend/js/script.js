//elementos login
const login = document.querySelector(".login")
const loginForm = login.querySelector(".login_form")
const loginInput = login.querySelector(".login_input")

//elementos chat
const chat = document.querySelector(".chat")
const chatForm = document.querySelector(".chat_form")
const chatInput = document.querySelector(".chat_input")
const chatMessage = document.querySelector(".chat_message")

//objeto para cadastrar usuario
const usuario ={id:"",nome:"",cores:""}

//lista de cores
cores = [
    "gold",
    "hotpink",
    "darkkhaki",
    "cornflowerblue",
    "darkgoldenrod",
    "cadetblue"
]

//função para gerar uma cor aleatória para o usuário
const corAleatoria = () =>{
    indexAleatorio = Math.floor(Math.random() * cores.length)
    return cores[indexAleatorio]
}

let clienteConexao

const menssagemMinha = (menssagem) =>{

    //criando estrutura HTML
    const div = document.createElement("div")

    div.classList.add("message_self")

    div.innerHTML = menssagem

    return div
}

const menssagemOutro = (usuarioNome, usuarioCor, menssagem) =>{

    //criando estrutura HTML
    const div = document.createElement("div")
    const span = document.createElement("span")

    div.appendChild(span)

    div.classList.add("message_other")
    span.classList.add("message_sender")

    span.style.color = usuarioCor

    span.innerHTML = usuarioNome
    div.innerHTML += menssagem 

    return div
}


//Função para processar a mensagem recebida do servidor
const processarMensagem = ({data}) =>{

    //desestruturando o objeto
    const {usuarioId, usuarioNome, usuarioCor, menssagem} = JSON.parse(data)

    //Estrutura HTML para mensagem minha
    const estrutura = usuarioId == usuario.id ? menssagemMinha(menssagem) : menssagemOutro(usuarioNome, usuarioCor, menssagem)

    chatMessage.appendChild(estrutura)
}


loginForm.addEventListener("submit",(evt)=>{

    //não deixa a página recarregar
    evt.preventDefault();

    //dados do usuario
    usuario.id = crypto.randomUUID()
    usuario.nome = loginInput.value
    usuario.cores = corAleatoria()

    login.style.display = "none";
    chat.style.display = "flex";

    //Conecta cliente no servidor
    clienteConexao = new WebSocket("ws://localhost:8080")

    clienteConexao.onmessage = processarMensagem
})

chatForm.addEventListener("submit",(evt) =>{
    evt.preventDefault()

    //conteúdo da menssagem
    const dadosMenssagem = {
        usuarioId: usuario.id,
        usuarioNome: usuario.nome,
        usuarioCor: usuario.cores,
        menssagem: chatInput.value
    } 


    //envia uma mensagem para o servidor
    clienteConexao.send(JSON.stringify(dadosMenssagem))

    //Limpa o campo de envio
    chatInput.value = ""
})