import express from "express";
const app = express();
export default app;

import { getAllFiles, createFile } from "./db/queries/filesQueries.js";
import { getAllFolders, getFolderById } from "./db/queries/foldersQueries.js";

app.use(express.json());

app.get("/files", async (req, res) => {
  const files = await getAllFiles();
  res.send(files);
});

app.get("/folders", async (req, res) => {
  const folders = await getAllFolders();
  res.send(folders);
});

app.get("/folders/:id", async (req, res) => {
  const id = +req.params.id;
  const folder = await getFolderById(id);
  if (!folder) {
    return res.status(404).send(`Folder with id ${id} doesn't exist.`);
  }
  res.send(folder);
});

app.post("/folders/:id/files", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body required.");
  if (!req.body.name || !req.body.size) {
    return res.status(400).send("Missing required fields: name, size");
  }
  const folderId = +req.params.id;
  const folder = await getFolderById(folderId);

  if (!folder) {
    return res
      .status(404)
      .send("The folder with the provided ID does not exist");
  }
  const file = {
    name: req.body.name,
    size: +req.body.size,
    folderId: folderId,
  };

  let createdfile = await createFile(file);
  res.status(201).send(createdfile);
});

app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});
