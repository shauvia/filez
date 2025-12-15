import db from "#db/client";

export async function createFolder({ name }) {
  const sql = `
        INSERT INTO folders (name) 
        VALUES ($1)
        RETURNING *
    `;

  const {
    rows: [folder],
  } = await db.query(sql, [name]);
  console.log("folder", folder);
  return folder;
}

export async function getFolderIdByName(name) {
  const sql = `
    SELECT id FROM folders WHERE name = $1
  `;

  const {
    rows: [id],
  } = await db.query(sql, [name]);
  console.log();
  return id;
}
