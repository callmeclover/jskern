/**
 * MEM
 * by Clover Johnson
 *
 * @param {object} kernel - The kernel object.
 * @param {object} vcpu - The VCPU instance.
 */

class MEMManager {
  $memory;
    constructor(kernel, vcpu) {
      this.kernel = kernel;
      this.vcpu = vcpu;

      this.$memory = sessionStorage;
    }

    setMemory(key, value) {
      this.memory.setItem(key, value);
    }

    getMemory(key) {
      return this.memory.getItem(key);
    }
    
    deleteMemory(key) {
      this.memory.removeItem(key);
    }

    clearMemory() {
      this.memory.clear();
    }
  }