const fs = require('fs');
const util = require('util');
const uuid = require('./uuid');

// Promise fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 * Write data to file
 *  @param {string} destination The path to the file you want to save to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  Read data from file and append json object to it.
 *  @param {object} content Content to append to file.
 *  @param {string} file The path to the file to save.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

/**
 *  Read data from file and remove json object with uuid
 *  @param {object} content Content to remove from file.
 *  @param {string} file The path to the file to save.
 *  @returns {void} Nothing
 */
const readAndRemove = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      const noteIndex = parsedData.findIndex((element) => element.id === content);
      // No match = do nothing
      if (noteIndex === -1) {
        return
      }
      parsedData.splice(noteIndex, 1);
      writeToFile(file, parsedData);
    }
  });
};

/**
 *  Generate uuid not already in database use.
 *  @param {string} file The path to the file to save.
 *  @returns {id} uuid
 */
const getUniqueUuid = (file) => {
  let newId;
  const data = fs.readFileSync(file, 'utf8');
  const parsedData = JSON.parse(data);
  let idExists = true;

  while (idExists) {
    newId = uuid();
    idExists = parsedData.findIndex((element) => element.id === newId) !== -1;
  }

  return newId;
};

module.exports = { readFromFile, writeToFile, readAndAppend, readAndRemove, getUniqueUuid };