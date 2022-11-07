import hbsFiles from "../db/hbsFiles.js";

export default class ModelPage {
  constructor() {
    this.hbsFiles = hbsFiles;
  }

  findPage(page) {
    return hbsFiles.has(page);
  }
}
