const config = require('../../config.js')
const db = require('better-sqlite3')(config.dbPath, { verbose: console.log });

module.exports = db;
