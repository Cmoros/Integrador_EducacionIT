import fs from "fs";

const dir = "./views";
async function getFilesNames(dir, ext = "", exceptions = new Set()) {
  const files = await fs.promises.readdir(dir);
  return files.filter((file) => file.includes(ext) && !exceptions.has(file));
}

const exceptionsHbsFiles = new Set(["main.hbs", "404.hbs"]);

const hbsFiles = await getFilesNames(dir, ".hbs", exceptionsHbsFiles).then(
  (files) => {
    return new Set(files.map((file) => file.split(".hbs")[0]));
  }
);

export default hbsFiles;
