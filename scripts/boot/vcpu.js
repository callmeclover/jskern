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
    window.scrollTo(0,0)

    this.version = "v0.2.1";

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

  async boot() {
    window.vgpu.drawKeystroke("JsKern", true, "info");
    window.vgpu.drawKeystroke(" " + this.version, true);
    window.vgpu.drawKeystroke({ key: "Enter" });
    this.bootTime = new Date(this.bootBegin - Date.now()).getMilliseconds();
    window.vgpu.drawKeystroke("Boot time: " + this.bootTime + " ms", true);

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
      window.vgpu.drawKeystroke("amnst", true, "contrast");
      window.vgpu.drawKeystroke(") $ ", true);
      window.vgpu.setNPPOS();
      this.acceptInput = true;
      this.inCommand = true;
      await this.cmdHandler.getCommand();
    }
  }
}
