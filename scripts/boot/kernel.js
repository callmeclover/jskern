/**
 * Kernel
 * by Clover Johnson
 *
 * @param {HTMLCanvasElement} canvas
 */

class Kernel {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.snake = {};

    // Set the canvas size
    this.canvas.width = window.innerWidth;
    this.canvas.height = 10000;

    // Set the font and text color
    this.ctx.font = "24px monospace";
    this.ctx.fillStyle = "white";
  }

  async fatal(stack) {
    window.vgpu.drawKeystroke("[FATAL]: A fatal error has been thrown. The shell will now close. Stack: '" + stack + "'", true, "fatal");
    setTimeout(() => {
    window.alert("[FATAL]: A fatal error has been thrown. The shell will now close. Stack: '" + stack + "'");
    window.close();

  }, 2000);
  }

  exit() {
    window.close();
  }
}
