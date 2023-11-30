/**
 * CMDChck
 * by Clover Johnson
 *
 * @param {object} kernel
 */

class CMDChck {
  constructor(kernel) {
    this.commandList = ["help", "whois", "clear"];
  }

  async waitForMessage() {
    return new Promise((resolve) => {
      window.onmessage = (event) => {
        resolve(event.data);
      };
    });
  }

  async getCommand() {
    let cmd = await this.waitForMessage();
    if (this.checkCommand(cmd) === "invalid") {
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke({ key: "Enter" });

      window.vgpu.ctx.fillStyle = "red";
      window.vgpu.drawKeystroke(
        "Invalid command. Run 'help' for a list of commands.",
        true
      );
      window.vgpu.ctx.fillStyle = "white";

      return;
    } else {
      switch (cmd.split(" ")[0]) {
        case "help":
          this.help(cmd);
          break;
        case "whois":
          this.whois(cmd);
          break;
        case "clear":
            this.clear(cmd);
            break;

        default:
          break;
      }
    }

    return;
  }

  checkCommand(input) {
    if (this.commandList.includes(input.split(" ")[0])) {
      return input;
    } else {
      return "invalid";
    }
  }

  /* BEGIN COMMANDS */

  help(command) {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("JsKern Help Menu", true);

    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("| help", true);
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("⊢ display this help menu and exit", true);

    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("| clear", true);
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("⊢ clear the screen", true);
    
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("| whois [user]", true);
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("⊢ display information about [user]", true);
  }

  whois(command) {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });

    if (command.split(" ")[1] == "amnst") {
      window.vgpu.drawKeystroke("Administrators:", true);
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke("Current user, root", true);
    } else if (command.split(" ")[1] == "me") {
      window.vgpu.drawKeystroke("Current user:", true);
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke("Administrators", true);
    } else if (command.split(" ")[1] == "root") {
      window.vgpu.drawKeystroke("root:", true);
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke("Owner", true);
    } else {
      window.vgpu.ctx.fillStyle = "red";
      window.vgpu.drawKeystroke(
        "Invalid parameter. Valid parameters are 'amnst', 'me' and 'root'.",
        true
      );
      window.vgpu.ctx.fillStyle = "white";
    }
  }

  clear(command) {
    window.vgpu.clearCanvas();
  } 

  get(command) {
    // TODO: use fetch API for http requests
  }

  string(command) {
    // TODO: add string manipulation
  }

  calc(command) {
    // TODO: add math (boring)
  }


  // TODO: Implement IndexedDB file system for touch, ls, cd, etc.
  
  ls(command) {
    // TODO
  }

  touch(command) {
    // TODO
  }

  cd(command) {
    // TODO
  }


  /* END COMMANDS */
}
