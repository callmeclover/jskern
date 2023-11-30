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

    this.inCommand = false;
    this.acceptInput = false;

    this.cmdHandler = new CMDChck(kernel);

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
    window.vgpu.drawKeystroke(" v0.0.1", true);
      window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("Boot time: " + new Date(this.bootBegin - Date.now()).getMilliseconds()+" ms", true);

    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });

    window.vgpu.drawKeystroke("Welcome to JsKern! Type 'help' for a list of commands.", true, "info");
   
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("Default", true);
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("Info", true, "info");
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("Error", true, "error");
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("Warning", true, "warning");
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("Success", true, "success");



    while (true) {
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke("~/ (amnst) $ ", true);
      window.vgpu.setNPPOS();
      this.acceptInput = true;
      this.inCommand = true;
      await this.cmdHandler.getCommand();
    }
  }
}
