import express from "express";
import fetch from "node-fetch";
import http from "http";
import bodyParser from "body-parser";
import { mysqlConnection } from "./database.js";
import cors from "cors";

var app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3001;

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const values = [ username, password ];
    console.log(values);
    mysqlConnection.query("SELECT id_user, username, email FROM user WHERE username = ? and password = ?", values, (err, rows, fields) => {
        if(!err) {
            if(rows.length > 0) {
                res.status(200).send(rows[0]);
            } else {
                res.status(400).send('El usuario no existe');
            }
        } else {
            res.status(500).send(err);
            console.log(err);
        }
    });
    //res.json("OK");
});

app.get('/usuario', (req, res) => {
    const { id_usuario } = req.body;
    console.log(id_usuario);
    mysqlConnection.query("SELECT * FROM usuario WHERE idusuario = ?", [id_usuario], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
    //res.json("OK");
});

app.get('/usuarios', (req, res) => {

    mysqlConnection.query("SELECT * FROM usuario", (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
    //res.json("OK");
});

app.get('/usuario_insert', (req, res) => {
    const { nombre_usuario, contrasena } = req.body;
    mysqlConnection.query("insert into usuario values (null, ?, ?, 1);", [nombre_usuario, contrasena], (err, rows, fields) => {
        if(!err) {
            res.json("El usuario se registro correctamente");
        } else {
            console.log(err);
        }
    });
    //res.json("OK");
});

app.get('/usuario_update', (req, res) => {
    const { id_usuario, nombre_usuario, contrasena } = req.body;
    mysqlConnection.query("UPDATE usuario set nombre_usuario=?, contrasena=? where idusuario=?;", [nombre_usuario, contrasena, id_usuario], (err, rows, fields) => {
        if(!err) {
            res.json("La actualización se realizo correctamente");
        } else {
            console.log(err);
        }
    });
    //res.json("OK");
});

/*app.get('/users', (req, res) => {
    const { alias, contrasena } = req.body;
    console.log(alias, contrasena);
    mysqlConnection.query("SELECT * FROM test.usuarios where alias = ? and contrasena = ?", [alias, contrasena], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
    //res.json("OK");
});*/

app.get('/tasks', (req, res) => {

    mysqlConnection.query("SELECT * FROM favorite_books", (err, rows, fields) => {
        if(!err) {
            res.send(JSON.stringify(rows));
            console.log(rows);
        } else {
            console.log(err);
        }
    });
    
});

app.get('/task/:id', (req, res) => {
    const { id } = req.params;
    console.log("get_id: ",id);
    mysqlConnection.query("SELECT * FROM favorite_books where idbooks = ?", [id], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
    //res.json("OK");
});

app.put('/task/update/:id', (req, res) => {
    const { id } = req.params;
    console.log("update: ",id);
    mysqlConnection.query("SELECT * FROM favorite_books where idbooks = ?", [id], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
    //res.json("OK");
});

app.delete('/task/delete/:id', (req, res) => {
    const { id } = req.params;
    console.log("delete: ",id);
    mysqlConnection.query("SELECT * FROM favorite_books where idbooks = ?", [id], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
    //res.json("OK");
});

function test_buffer(bodyData) {
    const respond = fetch(API, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${Buffer.from(
                'enrique.sanchez@beliveo.com:TRMlE7mDfJCuFT8TwVJ9099B'
            ).toString('base64')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: bodyData
    })
        .then(response => {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
            return response.text();
        })
        .then(text => console.log(text))
        .catch(err => console.error(err));

    console.log(respond);
}


http.createServer(app).listen(port, function () {
    console.log("Servidor en puerto ", port);
});