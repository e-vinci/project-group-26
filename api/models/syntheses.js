const db = require('./db_conf.js');

module.exports.getAllSyntheses = () => {
    const stmt = db.prepare('SELECT * FROM syntheses');
    return stmt.all();
}

