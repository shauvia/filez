import db from "#db/client";
import { createFile } from "./queries/filesQueries.js";
import { createFolder, getFolderIdByName } from "./queries/foldersQueries.js";

await db.connect();
await seedFoldersAndFiles();
await db.end();
console.log("🌱 Database seeded.");

async function seedFoldersAndFiles() {
  const folders = [{ name: "books" }, { name: "authors" }, { name: "readers" }];
  // const files = [{ fileName: "", filesize: -100, folderId: -100 }];

  for (const folder of folders) {
    await createFolder(folder);
    console.log("seed folder", folder);
    const folderId = await getFolderIdByName(folder.name);
    console.log("folderId", folderId, "folder.name", folder.name);
    for (let i = 0; i < 5; i++) {
      let file = {
        name: folder.name + i,
        size: i,
        folderId: folderId.id,
      };
      console.log("seed file", file);
      await createFile(file);
    }
  }
  console.log("Database seeded successfully");
}
