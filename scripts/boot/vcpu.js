const { compareVersions, compare, satisfies, validate } = window.compareVersions

/**
 * VCPU
 * by Clover Johnson
 *
 * @param {object} kernel
 */
class VCPU {
  constructor(kernel) {
    this.ctx = kernel.ctx;
    this.canvas = kernel.canvas;
    this.kernel = kernel;
    window.scrollTo(0,0)

    this.version = "";

    this.inCommand = false;
    this.acceptInput = false;

    // Handlers
    this.cmdHandler = new CMDChck(kernel);
    this.foldyr = new FOLDYR(kernel, this);

    // Navigator managers
    this.batteryManager = navigator.getBattery();

    this.bootBegin = Date.now();

    this.agent = navigator.userAgent;
    this.spec = ["Boot time: " + Date.now().toLocaleString()];
  }

  async asyncForEach(array) {
    array.forEach((element) => {
      window.vgpu.drawKeystroke(element, true);
      window.vgpu.drawKeystroke({ key: "Enter" });
    });
  }

  async getVersion() {
    try {
      let fetchReq = await fetch('https://raw.githubusercontent.com/callmeclover/jskern/main/version.txt');
      let version = await fetchReq.text()
      return [version, compare(version, this.version, '=')];
  } catch (error) {
    window.vgpu.drawKeystroke("[ERR]: Failed to fetch latest; " + error, true, "error");
    return;
  }
}

async getThisVersion() {
  try {
    let fetchReq = await fetch('version.txt');
    let version = await fetchReq.text()
    return version;
} catch (error) {
  window.vgpu.drawKeystroke("[ERR]: Failed to fetch latest; " + error, true, "error");
  return;
}
}

  async boot() {
    window.vgpu.drawKeystroke("JsKern", true, "info");
    window.vgpu.drawKeystroke(" " + this.version, true);
    window.vgpu.drawKeystroke({ key: "Enter" });
    this.bootTime = new Date(this.bootBegin - Date.now()).getMilliseconds();
    window.vgpu.drawKeystroke("Boot time: " + this.bootTime + " ms", true);

    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke('Checking for updates...', true);
    this.version = await this.getThisVersion();
    window.alert(this.version)
    let utdArray = await this.getVersion();

    if (utdArray[1] === true) {
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke('[OK]: JsKern is up to date!', true, "success");
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke('[OK]: HERE (' + this.version + ') == REMOTE (' + utdArray[0] + ')', true, "success");
    } else if (utdArray[1] === false) {
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke('[WARN]: JsKern is outdated!', true, "warning");
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke('[WARN]: HERE (' + this.version + ') != REMOTE (' + utdArray[0] + ')', true, "warning");
    }

    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });

    window.vgpu.drawKeystroke(
      "Welcome to JsKern! Type 'help' for a list of commands.",
      true,
      "info"
    );

    while (true) {
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke("~/ (", true);
      window.vgpu.drawKeystroke(window.kernel.snake.user + "@", true, "success");
      window.vgpu.drawKeystroke(window.kernel.snake.type, true, "contrast");
      window.vgpu.drawKeystroke(") $ ", true);
      window.vgpu.setNPPOS();
      this.acceptInput = true;
      this.inCommand = true;
      await this.cmdHandler.getCommand();
    }
  }
}
