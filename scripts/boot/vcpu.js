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
    window.vgpu.drawKeystroke("JsKern v0.0.1", true);
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("Waiting for the VGPU...", true);
    setTimeout(async () => {
      window.vgpu.drawKeystroke({ key: "Backspace" });
      window.vgpu.drawKeystroke({ key: "Backspace" });
      window.vgpu.drawKeystroke({ key: "Backspace" });

      window.vgpu.drawKeystroke(": Done!", true);

      setTimeout(async () => {
        window.vgpu.drawKeystroke({ key: "Enter" });
        window.vgpu.drawKeystroke("Waiting for the VCPU...", true);

        setTimeout(async () => {
          window.vgpu.drawKeystroke({ key: "Backspace" });
          window.vgpu.drawKeystroke({ key: "Backspace" });
          window.vgpu.drawKeystroke({ key: "Backspace" });

          window.vgpu.drawKeystroke(": Done!", true);

            window.vgpu.drawKeystroke({ key: "Enter" });
            window.vgpu.drawKeystroke({ key: "Enter" });
            window.vgpu.drawKeystroke("Ready for input!", true);
            
            setTimeout(async () => {
            while (true) {
              window.vgpu.drawKeystroke({ key: "Enter" });
            window.vgpu.drawKeystroke({ key: "Enter" });

            window.vgpu.drawKeystroke("~/ (amnst) $ ", true);
            window.vgpu.setNPPOS();

            this.acceptInput = true;
            this.inCommand = true;
            await this.cmdHandler.getCommand();
            }
          }, 2000);
        }, 3000);
      }, 4000);
    }, 2000);
  }
}
