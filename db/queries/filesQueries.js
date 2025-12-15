import db from "#db/client";

export async function createFile({ name, size, folderId }) {
  console.log("{ name, size, folderId }", { name, size, folderId });

  const sql = `
    INSERT INTO files( name, size, folder_id)
    VALUES($1, $2, $3 ) 
    RETURNING *`;

  const {
    rows: [onefile],
  } = await db.query(sql, [name, size, folderId]);
  console.log("onefile", onefile);
  return onefile;
}

export async function getAllFiles() {
  const sql = `SELECT *, (SELECT name 
  FROM folders WHERE folders.id = files.folder_id) 
  AS folder_name FROM files`;
  const { rows: files } = await db.query(sql);
  return files;
}
