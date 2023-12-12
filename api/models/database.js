const dbPath = 'H:/He De Vinci 2023-2024/Bloc 2/Javascript/vinciGeniusTest'

const db = require('better-sqlite3')( dbPath, { verbose: console.log });

module.exports = db;