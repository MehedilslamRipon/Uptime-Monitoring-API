const fs = require("fs");
const path = require("path");

const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, "/../.data/");

// write data to file
lib.create = function (dir, file, data, callback) {
   // open file for writing
   fs.open(
      `${lib.basedir + dir}/${file}.json`,
      "wx",
      function (err, fileDescriptor) {
         if (!err && fileDescriptor) {
            //  convert data to string
            const stringData = JSON.stringify(data);

            // write data to file nad close it
            fs.writeFile(fileDescriptor, stringData, function (err) {
               if (!err) {
                  fs.close(fileDescriptor, function (error) {
                     if (!error) {
                        callback(false);
                     } else {
                        callback("error closing the new file");
                     }
                  });
               } else {
                  callback("error writing to new file");
               }
            });
         } else {
            callback("there was an error, file may already exists!");
         }
      }
   );
};

// read data to file
lib.read = (dir, file, callback) => {
   fs.readFile(`${lib.basedir + dir}/${file}.json`, "utf8", (err, data) => {
      callback(err, data);
   });
};

// update existing file
lib.update = (dir, file, data, callback) => {
   // file open for writing
   fs.open(`${lib.basedir + dir}/${file}.json`, "r+", (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
         const stringData = JSON.stringify(data);

         // truncate the file
         fs.ftruncate(fileDescriptor, (err) => {
            if (!err) {
               // write to the file and close it
               fs.writeFile(fileDescriptor, stringData, (err) => {
                  if (!err) {
                     fs.close(fileDescriptor, (err) => {
                        if (!err) {
                           callback(false);
                        } else {
                           callback("Error closing file!");
                        }
                     });
                  } else {
                     callback("Error writing to file");
                  }
               });
            } else {
               callback(`Error truncating file`);
            }
         });
      } else {
         console.log(`Error updating. File may not existing`);
      }
   });
};

// delete existing file
lib.delete = (dir, file, callback) => {
   // unlink file
   fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
      if (!err) {
         callback(false);
      } else {
         callback("Error deleting file!");
      }
   });
};

module.exports = lib;
