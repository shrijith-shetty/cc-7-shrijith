import fs from "node:fs";
import path from "node:path";

/**
 * Determines the type of a given path.
 *
 * It checks whether the provided path refers to a file,
 * directory, or another type of filesystem object.
 *
 * @param path - The filesystem path to check.
 * @returns A Promise resolving to:
 * - `"FILE"` if the path is a file
 * - `"DIRECTORY"` if the path is a directory
 * - `"OTHER"` for any other type
 */
function getFileType(path: string): Promise<"FILE" | "DIRECTORY" | "OTHER"> {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err: NodeJS.ErrnoException | null, stats: fs.Stats) => {
      if (err) {
        return reject(new Error("file system error"));
      }
      if (stats.isFile()) {
        resolve("FILE");
      } else if (stats.isDirectory()) {
        resolve("DIRECTORY");
      } else {
        resolve("OTHER");
      }
    });
  });
}

/**
 * Retrieves the contents of a given path.
 *
 * - If the path is a file, the file path is returned.
 * - If the path is a directory, an array of file names inside the directory is returned.
 * - For other types, an empty array is returned.
 *
 * @param path - The filesystem path to inspect.
 * @returns A Promise resolving to either:
 * - A string representing the file path
 * - An array of file names if the path is a directory
 */
function getContents(path: string): Promise<string | string[]> {
  return new Promise((resolve, reject) => {
    getFileType(path)
      .then((fileType) => {
        switch (fileType) {
          case "FILE":
            resolve(path);
            break;
          case "DIRECTORY":
            fs.readdir(path, (err, files) => {
              if (err) {
                return reject(new Error("file system error"));
              }
              resolve(files);
            });
            break;

          default:
            resolve([]);
        }
      })
      .catch(reject);
  });
}

/**
 * Calculates the size of a file or the total size of files inside a directory.
 *
 * - If the path points to a file, the size of that file is returned.
 * - If the path points to a directory, the sizes of all files inside
 *   the directory are summed and returned.
 *
 * @param filepath - The file or directory path.
 * @returns A Promise resolving to the total size in bytes.
 */
function getSize(filepath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    getContents(filepath)
      .then((fileOrDirectory) => {
        if (!Array.isArray(fileOrDirectory)) {
          fs.stat(fileOrDirectory, (err, stats) => {
            if (err) return reject(new Error("file system error"));
            resolve(stats.size);
          });
          return;
        }

        if (fileOrDirectory.length === 0) {
          resolve(0);
          return;
        }

        let totalSize = 0;
        let proceed = 0;

        fileOrDirectory.forEach((element) => {
          const filePath = path.join(filepath, element);
          fs.stat(filePath, (err, stats) => {
            if (!err) {
              totalSize += stats.size;
            }
            proceed++;
            if (proceed === fileOrDirectory.length) resolve(totalSize);
          });
        });
      })
      .catch(reject);
  });
}
