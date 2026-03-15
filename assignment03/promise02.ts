import fs from "node:fs/promises";
import path from "node:path";

/**
 * Determines the type of the given filesystem path.
 *
 * @param pathName - Path of the file or directory.
 * @returns A Promise that resolves to:
 * - `"FILE"` if the path refers to a file
 * - `"DIRECTORY"` if the path refers to a directory
 * - `"OTHER"` for other filesystem types
 */
function getFileType(pathName: string): Promise<string> {
  return fs.stat(pathName).then((stat) => {
    if (stat.isFile()) return "FILE";
    if (stat.isDirectory()) return "DIRECTORY";
    return "OTHER";
  });
}

/**
 * Retrieves the contents of a path.
 *
 * - If the path is a file, the file path is returned.
 * - If the path is a directory, the names of files inside it are returned.
 * - For other types, an empty array is returned.
 *
 * @param pathName - Path of the file or directory.
 * @returns A Promise resolving to either the file path or an array of file names.
 */
function getContents(pathName: string): Promise<string | string[]> {
  return getFileType(pathName)
    .then((type) => {
      if (type === "FILE") {
        return pathName;
      }

      if (type === "DIRECTORY") {
        return fs.readdir(pathName);
      }

      return [];
    })
    .catch((err) => {
      throw err;
    });
}

/**
 * Calculates the total size of a file or directory.
 *
 * - If the path is a file, it returns the file size in bytes.
 * - If the path is a directory, it recursively calculates the total
 *   size of all files inside the directory.
 *
 * @param pathName - Path to the file or directory.
 * @returns A Promise resolving to the total size in bytes.
 */
function getSize(pathName: string): Promise<number> {
  return getContents(pathName).then((content) => {

    if (!Array.isArray(content)) {
      return fs.stat(content).then((stats) => stats.size);
    }

    if (content.length === 0) return 0;

    return new Promise<number>((resolve, reject) => {
      let totalSize = 0;
      let processed = 0;

      content.forEach((element) => {
        const filePath = path.join(pathName, element);

        getSize(filePath)
          .then((size) => {
            totalSize += size;
            processed++;

            if (processed === content.length) {
              resolve(totalSize);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  });
}

/**
 * Calculates and prints the total size of the "./LinkedList" directory.
 */
getSize("./LinkedList")
  .then((size) => {
    console.log("Total Size:", size, "bytes");
  })
  .catch((err) => {
    console.error("Failed:", err.message);
  });
