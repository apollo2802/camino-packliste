import { DatabaseSync } from "node:sqlite";

// Execute the worker's actual SQL, rather than imitating quota decisions in mocks.
export function sqliteEnvironment(t) {
  const connection = new DatabaseSync(":memory:");
  t.after(() => connection.close());
  let transactions = Promise.resolve();
  const DB = {
    prepare(sql) {
      let values = [];
      return {
        bind(...next) { values = next; return this; },
        execute() { return { success: true, changes: Number(connection.prepare(sql).run(...values).changes) }; },
        async run() { return this.execute(); },
        async first() { return connection.prepare(sql).get(...values) || null; }
      };
    },
    batch(statements) {
      const result = transactions.then(() => {
        connection.exec("BEGIN");
        try {
          const results = statements.map((statement) => statement.execute());
          connection.exec("COMMIT");
          return results;
        } catch (error) {
          connection.exec("ROLLBACK");
          throw error;
        }
      });
      transactions = result.catch(() => {});
      return result;
    }
  };
  return { connection, env: { ACCESS_CODE: "test-access-code", SESSION_SECRET: "test-session-secret-that-is-long-enough", DB } };
}
