function calcMaxLineLength(canvas) {
  return Math.ceil(canvas.width / 14) * 14 + 10 - 28;
}

/**
 *  VGPU
 *  by Clover Johnson
 *
 *  @param {object} kernel
 */

class VGPU {
  $state;

  $typewriterX = 10;
  $typewriterY = 24;

  constructor(kernel) {
    this.ctx = kernel.ctx;
    this.canvas = kernel.canvas;
    this.overlay = document.getElementById("overlay");

    this.maxLineLength = calcMaxLineLength(this.canvas);

    this.typedText = "";

    this.xnppos = 10;
    this.ynppos = 0;
  }

  setNPPOS() {
    this.xnppos = this.$typewriterX;
    this.ynppos = this.$typewriterY;
  }

  /**
   * Draws a keystroke on the canvas based on the key pressed.
   *
   * @param {KeyboardEvent} e - The event object representing the key press.
   * @param {boolean} isWord - Whether the input is a word or not.
   */
  drawKeystroke(e, isWord) {
    if (isWord) {
      // If the input is a word, iterate over each character in the word
      Array.from(e).forEach((element) => {
        // Check if the typewriter has reached the end of the line
        if (this.$typewriterX + 14 > this.canvas.width) {
          // Move the typewriter to the beginning of the next line
          this.$typewriterX = 10;
          this.$typewriterY += 28;
        }

        // Draw the character at the current typewriter position
        this.ctx.fillText(element, this.$typewriterX, this.$typewriterY);

        // Move the typewriter to the right
        this.$typewriterX += 14;
      });
      return;
    }

    if (e.key.length === 1) {
      // Check if the typewriter has reached the end of the line
      if (this.$typewriterX + 14 > this.canvas.width) {
        // Move the typewriter to the beginning of the next line
        this.$typewriterX = 10;
        this.$typewriterY += 28;
      }

      this.typedText += e.key.toLowerCase();

      // Draw the character at the current typewriter position
      this.ctx.fillText(e.key, this.$typewriterX, this.$typewriterY);

      // Move the typewriter to the right
      this.$typewriterX += 14;
    } else if (e.key === "Backspace") {
      const prevCharX = this.$typewriterX - 14;
      const prevCharY = this.$typewriterY;

      // Skip backspace if the previous character is on the same line as xnppos
      // and on or before ynppos line
      if (prevCharX <= this.xnppos - 14 && prevCharY === this.ynppos) {
        return;
      } else if (
        !(prevCharX <= this.xnppos && prevCharY > this.ynppos) &&
        prevCharX < this.xnppos &&
        prevCharY > this.ynppos
      ) {
        // Move the typewriter to the end of the previous line
        this.$typewriterX = this.maxLineLength;
        this.$typewriterY -= 28;
      } else if (prevCharX <= this.xnppos && prevCharY > this.ynppos) {
        if (this.$typewriterX - 14 < 0 || this.$typewriterX - 14 === 0) {
          // Move the typewriter to the end of the previous line
          this.$typewriterX = this.maxLineLength;
          this.$typewriterY -= 28;
        } else {
          // backspace if the previous character is on xnppos column
          // and below ynppos line
          this.$typewriterX -= 14;
        }
      } else {
        // Move the typewriter to the left
        this.$typewriterX -= 14;
        this.typedText = this.typedText.slice(0, -1);
      }

      // Clear the previous character from the canvas
      this.ctx.clearRect(this.$typewriterX, this.$typewriterY - 20, 24, 28);
    } else if (e.key === "Enter") {
      if (!window.vcpu.inCommand) {
        // Move the typewriter to the beginning of the next line
        this.$typewriterX = 10;
        this.$typewriterY += 28;
      } else {
        window.postMessage(this.typedText);
        window.vcpu.inCommand = false;
        window.vcpu.acceptInput = false;
        this.typedText = "";
      }
    }

    // Update the state of the canvas
    this.$state = this.canvas.toDataURL();
    window.kernel.scrollTop = window.kernel.scrollHeight;
  }

  /**
   * Redraws the canvas and reinstates it's properties.
   *
   * @return {void}
   */
  redrawCanvas() {
    // Reinstate properties
    this.ctx.font = "24px monospace";
    this.ctx.fillStyle = "white";

    // Redraw the canvas
    this.ctx.drawImage(this.$state, 0, 0);
  }

  drawCursor() {
    this.ctx.fillText("_", this.$typewriterX, this.$typewriterY);
  }
}
