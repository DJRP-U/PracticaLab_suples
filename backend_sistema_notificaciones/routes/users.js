var express = require('express');
var router = express.Router();

let jwt = require('jsonwebtoken');

const { body, validationResult } = require('express-validator');


const MensajeController = require('../app/controls/MensajeController');
var mensajeController = new MensajeController();
const RecordatorioController = require('../app/controls/RecordatorioController');
var recordatorioController = new RecordatorioController();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Middleware para autenticacion 
var auth = function middleware(req, res, next) {
  const token = req.headers["token-api"];
  if (token) {
    require("dotenv").config();
    const llave = process.env.KEY_SQ;
    jwt.verify(token, llave, async (err, decoded) => {
      if (err) {
        res.status(401);
        res.json({ tag: "token expirado o no valido", code: 401 });
      } else {
        var models = require("../app/models");
        req.decoded = decoded;
        let aux = await models.cuenta.findOne({
          where: { external_id: req.decoded.external },
        });
        if (!aux) {
          res.status(401);
          res.json({ tag: "token no valido", code: 401 });
        } else {
          next();
        }
      }
    });
  } else {
    res.status(401);
    res.json({ tag: "No existe token", code: 401 });
  }
};



/*MENSAJE CONTROLLER*/
router.post('/mensaje/guardar',mensajeController.guardar);
router.post('/mensaje/guardar_archivo', mensajeController.guardar_archivo);
router.post('/mensaje/enviar', mensajeController.enviarMensajeLogicApps);
router.get('/mensaje/listar',  mensajeController.listarMensaje);
router.post('/mensaje/rechazar',  mensajeController.enviarMensajeRechazar);
router.post('/mensaje/enviar/respuesta',  mensajeController.enviarRespuesta);
router.get('/mensaje/listar/:valor',  mensajeController.obtenerValor);
router.get('/mensaje/listar/:external',  mensajeController.obtener);
router.post('/mensaje/recibir', mensajeController.recibirMensaje);

/*RECORDATORIO CONTROLLER*/
router.get('/recordatorio/listar/:external', recordatorioController.listar);
router.post('/recordatorio/registrar', recordatorioController.guardar);

module.exports = router;
