import Server from './classes/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = new Server();
// BODY PARSER
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

// CORS
server.app.use(cors({ origin: true, credentials: true }));

// ROUTES
server.app.use('/', router);

server.start(() => {
    console.log('SERVIDOR CORRIENDO EN EL PUERTO: ' + server.port);
});