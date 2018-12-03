
const mysql = require('mysql');
const config = {
  db: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
  }
};
const db = mysql.createConnection(config.db);
// even though mysql package wants me to use callbacks
// nowadays I prefer promises and lambda does support that! :sparkles:
function query(statement, params) {
  return new Promise((resolve, reject) => {
    db.query(statement, params, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    })
  });
}
exports.hello = async () => {
  const result = await query('select "lambda with rds"');
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: result
    })
  };
};
