import mysql from 'mysql';

var mysqlConnection;
function begin_connection(){
    mysqlConnection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'db_lizard'
    });
    mysqlConnection.connect(function (err) {
        if(err) {
            console.log("Error en bd: ",err);
            setTimeout(begin_connection, 2000);
        } else {
            console.log('BD conectada');
        }
    });
    mysqlConnection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
          begin_connection();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
          throw err;                                  // server variable configures this)
        }
      });
}

begin_connection();
export {mysqlConnection};