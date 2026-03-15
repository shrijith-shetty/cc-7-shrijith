import fs from "node:fs/promises";
import path from "node:path";

/**
 * Determines the type of a given filesystem path.
 *
 * @param pathName - The path to check.
 * @returns A promise that resolves to:
 * - `"FILE"` if the path is a file
 * - `"DIRECTORY"` if the path is a directory
 * - `"OTHER"` for any other type
 */
async function getFileType(pathName: string): Promise<string> {
  try {
    const stats = await fs.stat(pathName);
    if (stats.isFile()) return "FILE";
    if (stats.isDirectory()) return "DIRECTORY";
    return "OTHER";
  } catch (err) {
    throw err;
  }
}

/**
 * Retrieves the contents of a given path.
 *
 * - If the path is a file, the file path is returned.
 * - If the path is a directory, an array of file names inside the directory is returned.
 * - For other types, an empty array is returned.
 *
 * @param pathName - The file or directory path.
 * @returns A promise resolving to either a file path or an array of file names.
 */
async function getContents(pathName: string): Promise<string | string[]> {
  try {
    const type = await getFileType(pathName);

    if (type === "FILE") return pathName;
    if (type === "DIRECTORY") return await fs.readdir(pathName);
    return [];
  } catch (err) {
    throw err;
  }
}

/**
 * Calculates the size of a file or the total size of all files inside a directory.
 *
 * - If the path is a file, it returns the file size in bytes.
 * - If the path is a directory, it recursively calculates the total size
 *   of all files and subdirectories inside it.
 *
 * @param pathName - Path to the file or directory.
 * @returns A promise that resolves to the total size in bytes.
 */
export async function getSize(pathName: string): Promise<number> {
  try {
    const content = await getContents(pathName);

    if (!Array.isArray(content)) {
      const size = await fs.stat(content);
      return size.size;
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

            if (processed === content.length) resolve(totalSize);
          })
          .catch((err) => reject(err));
      });
    });
  } catch (err) {
    throw err;
  }
}

/**
 * 
 * Calculates and prints the total size of the "./LinkedList" directory.
 */
getSize("./LinkedList")
  .then((size) => {
    console.log("Total Size:", size, "bytes");
  })
  .catch((err) => {
    console.error("Failed:", err.message);
  });
