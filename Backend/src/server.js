import { WebSocketServer } from 'ws';

//Criar um Servidor WebSocket na porta 8080 deste computador
const servidorWS = new WebSocketServer({ port: 8080 });

servidorWS.on('connection', function connection(ws) {

  //Avisa se ocorrer algum erro de conexão
  ws.on('error', console.error);

  //Função que ocorre quando alguem envia uma mensagem ao servidor
  ws.on('message', function message(data) {

    //Função para enviar a mensagem para cada um no servidor
    servidorWS.clients.forEach( (client) => { client.send(data.toString()) } )
  });

});