const { readFile } = require("fs/promises");
const { join } = require("path");
const { error } = require("./constants");
const User = require("./user");
const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content);
    if (!validation.valid) throw new Error(validation.error);
    const users = File.parseCsvToJSon(content);
    return users;
  }
  static async getFileContent(filePath) {
    const filename = join(__dirname, filePath);
    return (await readFile(filename)).toString("utf-8");
  }
  static isValid(csvToString, options = DEFAULT_OPTION) {
    const [header, ...fileWithOutHeader] = csvToString.split("\n");
    const isHeaderValid = header === options.fields.join(",");
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }
    const isContentLengthAccepted =
      fileWithOutHeader.length > 0 &&
      fileWithOutHeader.length <= options.maxLines;
    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAVGE,
        valid: false,
      };
    }
    return { valid: true };
  }

  static parseCsvToJSon(csvString) {
    const lines = csvString.split("\n");
    const firstLine = lines.shift();
    const header = firstLine.split(",");
    const users = lines.map((line) => {
      const columns = line.split(",");
      let user = {};
      for (const index in columns) {
        user[header[index]] = columns[index];
      }
      return new User(user);
    });
    return users;
  }
}

module.exports = File;
