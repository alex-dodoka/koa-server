const { Client } = require('pg');

module.exports = {
  getConnection: async () => {
    const client = new Client({
      user: 'dodoka',
      host: '10.10.63.155',
      password: '1369870oO',
      database: 'ideas_db',
      port: 5432
    });

    await client.connect();
    return client;
  }
};
