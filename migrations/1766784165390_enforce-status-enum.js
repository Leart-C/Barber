/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createType("appointment_status", ["BOOKED", "DONE", "CANCELED"]);

  pgm.sql(`
    ALTER TABLE appointments
      ALTER COLUMN status DROP DEFAULT;
  `);

  pgm.sql(`
    ALTER TABLE appointments
      ALTER COLUMN status
      TYPE appointment_status
      USING status::appointment_status;
  `);

  pgm.sql(`
    ALTER TABLE appointments
      ALTER COLUMN status SET DEFAULT 'BOOKED';
  `);

  pgm.sql(`
    ALTER TABLE appointments
      ALTER COLUMN status SET NOT NULL;
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql(`
    ALTER TABLE appointments
      ALTER COLUMN status TYPE varchar(20);
  `);

  pgm.dropType("appointment_status");
};
