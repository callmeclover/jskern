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
  }

  async openFileSystemDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('fileSystem', 1);

      request.onerror = function(event) {
        window.vgpu.drawKeystroke({ key: "Enter" });
        window.vgpu.drawKeystroke("[ERR]: File system returned with '" + event.target.error + "'", true, "error");
        reject(event.target.error);
      };

      request.onsuccess = function(event) {
        const fs = event.target.result; // Get the opened database
        resolve(fs);
      };

      request.onupgradeneeded = function(event) {
        const db = event.target.result;

        if (!db.objectStoreNames.contains('files')) {
          db.createObjectStore('files', {keyPath: 'id', autoIncrement: true});
        }
      };
    });
  }

  async createFile(data, fileName) {
    try {
      const fs = await this.openFileSystemDB();
      const transaction = fs.transaction('files', 'readwrite');
      const objectStore = transaction.objectStore('files');
  
        const request = objectStore.add(new File(data, fileName));
  
      return new Promise((resolve, reject) => {
        request.onerror = function(event) {
          reject(event.target.error);
        };
  
        request.onsuccess = function(event) {
          resolve(event.target.result);
        };
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async list() {
    return new Promise((resolve, reject) => {
      this.openFileSystemDB()
        .then((fs) => {
          const transaction = fs.transaction('files', 'readonly');
          const objectStore = transaction.objectStore('files');
          const request = objectStore.getAll();

          request.onerror = function(event) {
            reject(event.target.error);
          };

          request.onsuccess = function(event) {
            resolve(event.target.result);
          };
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}