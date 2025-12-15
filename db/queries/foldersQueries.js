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

export async function getAllFolders() {
  const sql = `SELECT * FROM folders`;
  const { rows: folders } = await db.query(sql);
  return folders;
}

export async function getFolderById(id) {
  const sql = `
  SELECT *, 
  (SELECT json_agg(files)
  FROM files
  WHERE files.folder_id = folders.id) AS files
  FROM folders WHERE folders.id = $1
  `;
  const {
    rows: [folder],
  } = await db.query(sql, [id]);
  return folder;
}
