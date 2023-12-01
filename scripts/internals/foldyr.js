/**
 * FOLDYR
 * by Clover Johnson
 *
 * @param {object} kernel - The kernel object.
 * @param {object} vcpu - The VCPU instance.
 */

class FOLDYR {
  constructor(kernel, vcpu) {
    this.kernel = kernel;
    this.vcpu = vcpu;

    this.fs = null;

    this.openFileSystem();
  }

  openFileSystem() {
    const request = indexedDB.open("FOLDYR", 1);

    request.onsuccess = (event) => {
      this.fs = event.target.result;
    };

    request.onerror = (event) => {
      console.error("Failed to open the file system:", event.target.error);
    };
  }

  createFile(path, content) {
    const transaction = this.fs.transaction("files", "readwrite");
    const objectStore = transaction.objectStore("files");

    const file = {
      path: path,
      content: content,
    };

    const request = objectStore.add(file);

    request.onsuccess = (event) => {
      console.log("File created:", event.target.result);
    };

    request.onerror = (event) => {
      console.error("Failed to create the file:", event.target.error);
    };
  }

  readFile(path) {
    const transaction = this.fs.transaction("files", "readonly");
    const objectStore = transaction.objectStore("files");

    const request = objectStore.get(path);

    request.onsuccess = (event) => {
      const file = event.target.result;
      console.log("File content:", file.content);
    };

    request.onerror = (event) => {
      console.error("Failed to read the file:", event.target.error);
    };
  }
}
