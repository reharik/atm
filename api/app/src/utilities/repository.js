const pgasync = require('pg-async');
const config = require('config');
const winston = require('winston');

module.exports = function() {
  const pg = new pgasync.default(config.postgres.config);

  return {
    async getById(id, table) {
      try {
        let query = (`SELECT * from "${table}" where "id" = '${id}'`);
        winston.debug(query);

        return await pg.query(query)
          .then(result => {
            const row = result.rows[0];
            return row && row.document ? row.document : {};
          });
      } catch (err) {
        let errorMessage = `error retrieving document(s) from table: ${table}, id: ${id}`;
        winston.error(errorMessage);
        winston.error(err);
        throw new Error(`${errorMessage} -- ${err.message}`);
      }
    },

    async getByPIN(PIN) {
      try {
        let query = (`SELECT * from "users" where "pin" = '${PIN}'`);
        winston.debug(query);

        return await pg.query(query)
          .then(result => {
            const row = result.rows[0];
            return row && row.document ? row.document : {};
          });
      } catch (err) {
        let errorMessage = `error retrieving document(s) from table: users, PIN: ${PIN}`;
        winston.error(errorMessage);
        winston.error(err);
        throw new Error(`${errorMessage} -- ${err.message}`);
      }
    },

    async getByIds(ids, table) {
      try {
        let query = (`SELECT * from "${table}" where "id" in (${ids.join()})`);
        winston.debug(query);

        return await pg.query(query)
          .then(result => {
            const row = result.rows[0];
            return row && row.document ? row.document : {};
          });
      } catch (err) {
        let errorMessage = `error retrieving document(s) from table: ${table} with ids ${ids.join()}`;
        winston.error(errorMessage);
        winston.error(err);
        throw new Error(`${errorMessage} -- ${err.message}`);
      }
    },

    async save(table, document) {
      try {
        let query = `INSERT INTO "${table}" ("id", "document")
        SELECT '${document.id}','${JSON.stringify(document)}'
        ON CONFLICT (id)
        DO UPDATE SET document = '${JSON.stringify(document)}'`;
        winston.debug(query);
        return await pg.query(query);
      } catch (err) {
        let errorMessage = `error saving document: ${JSON.stringify(document)},
 table: ${table}, id: ${document.id}`;
        winston.error(errorMessage);
        winston.error(err);
        throw new Error(`${errorMessage} -- ${err.message}`);
      }
    },

    async saveUser(document) {
      let doc = JSON.stringify(document);
      try {
        let query = `INSERT INTO "users" ("id", "pin", "document")
        SELECT '${document.id}', '${document.pin}', '${doc}'
        ON CONFLICT (id)
        DO UPDATE SET pin = '${document.pin}', document = '${doc}'`;
        winston.debug(query);
        return await pg.query(query);
      } catch (err) {
        let errorMessage = `error saving document: ${doc},
 table: users, id: ${document.id}`;
        winston.error(errorMessage);
        winston.error(err);
        throw new Error(`${errorMessage} -- ${err.message}`);
      }
    }
  };
}();
