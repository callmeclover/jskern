/**
 * CMDChck
 * by Clover Johnson
 *
 * @param {object} kernel
 */

class CMDChck {
  constructor(kernel) {
    this.commandList = [
      "help",
      "whois",
      "clear",
      "calc",
      "echo",
      "string",
      "import",
      "spec",
      "time",
    ];
    this.intCommands = {
      help: this.help,
      whois: this.whois,
      clear: this.clear,
      calc: this.calc,
      echo: this.echo,
      string: this.string,
      import: this.importcmd,
      spec: this.spec,
      time: this.time,
    };
    this.commands = [
      { command: "| help", description: "display this help menu and exit" },
      { command: "| clear", description: "clear the screen" },
      {
        command: "| whois [user]",
        description: "display information about [user]",
      },
      {
        command: "| calc [oper] [num1] [num2]",
        description: "calculates [num1] [oper] [num2]",
      },
      {
        command: "| echo [str]",
        description: "logs str. str must be in unescaped quotes.",
      },
      {
        command: "| string [manip] [str]",
        description: "manipulates str. str must be in unescaped quotes.",
      },
      {
        command: "| import [url]",
        description:
          "imports external commands from a url. very dangerous if you dont know what you're doing.",
      },
      { command: "| spec", description: "shows system information." },
      { command: "| time [get]", description: "shows the current time." },
    ];
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

    const command = cmd.split(" ")[0];

    if (this.commandList.includes(command)) {
      this.intCommands[command](cmd);
    } else {
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke({ key: "Enter" });

      window.vgpu.drawKeystroke(
        "[ERR]: Invalid command. Run 'help' for a list of commands.",
        true,
        "error"
      );
    }

    return;
  }

  /* BEGIN COMMANDS */

  help(command) {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vcpu.cmdHandler.commands.forEach(({ command, description }) => {
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke(command, true, "info");
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke(description, true);
    });
  }

  whois(command) {
    const validParameters = ["amnst", "me", "root"];
    const parameter = command.split(" ")[1];

    if (validParameters.includes(parameter)) {
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke({ key: "Enter" });

      switch (parameter) {
        case "amnst":
          window.vgpu.drawKeystroke("Administrators:", true);
          window.vgpu.drawKeystroke({ key: "Enter" });
          window.vgpu.drawKeystroke({ key: "Enter" });
          window.vgpu.drawKeystroke("Current user, root", true);
          break;

        case "me":
          window.vgpu.drawKeystroke("Current user:", true);
          window.vgpu.drawKeystroke({ key: "Enter" });
          window.vgpu.drawKeystroke("Administrators", true);
          break;

        case "root":
          window.vgpu.drawKeystroke("root:", true);
          window.vgpu.drawKeystroke({ key: "Enter" });
          window.vgpu.drawKeystroke("Owner", true);
          break;
      }
    } else {
      window.vgpu.drawKeystroke(
        "[ERR]: Invalid parameter. Valid parameters are 'amnst', 'me' and 'root'.",
        true,
        "error"
      );
    }
  }

  clear(command) {
    window.vgpu.clearCanvas();
  }

  echo(command) {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });
    const regex = /"(.*?[^\\])"/;
    const match = command.match(regex);

    if (match) {
      window.vgpu.drawKeystroke(match[1], true);
    } else {
      const errorMessage = `[ERR]: Invalid or non-existent second parameter found. Is it in quotes that aren't escaped?`;
      window.vgpu.drawKeystroke(errorMessage, true, "error");
    }
  }

  get(command) {
    // TODO: use fetch API for http requests
  }

  string(command) {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });

    const validateParameter = (parameter) => {
      const regex = /"(.*?[^\\])"/;
      const match = parameter.match(regex);
      if (match) {
        return match[1];
      } else {
        window.vgpu.drawKeystroke(
          "[ERR]: Invalid or non-existent third parameter found. Is it in quotes that aren't escaped?",
          true,
          "error"
        );
        return null;
      }
    };

    const scrambleString = (str) => {
      // Convert the string into an array of characters
      var chars = str.split("");

      // Shuffle the array using Fisher-Yates algorithm
      for (var i = chars.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = chars[i];
        chars[i] = chars[j];
        chars[j] = temp;
      }

      // Join the characters back into a string
      var scrambledStr = chars.join("");

      return scrambledStr;
    };

    const processCommand = (parameter, action) => {
      let value;
      switch (action) {
        case "lw":
          value = validateParameter(parameter);
          if (value) {
            window.vgpu.drawKeystroke(value.toLowerCase(), true);
          }
          break;
        case "up":
          value = validateParameter(parameter);
          if (value) {
            window.vgpu.drawKeystroke(value.toUpperCase(), true);
          }
          break;
        case "wf":
          value = validateParameter(parameter);
          if (value) {
            window.vgpu.drawKeystroke(value.toWellFormed(), true);
          }
          break;
        case "rv":
          value = validateParameter(parameter);
          if (value) {
            window.vgpu.drawKeystroke(value.split("").reverse().join(""), true);
          }
          break;
        case "sc":
          value = validateParameter(parameter);
          if (value) {
            window.vgpu.drawKeystroke(scrambleString(value), true);
          }
          break;

        default:
          window.vgpu.drawKeystroke(
            "[ERR]: Invalid or non-existent second parameter found. Valid parameters are 'lw', 'up', 'wf', 'sc', and 'rv'.",
            true,
            "error"
          );
          break;
      }
    };

    processCommand(command, command.split(" ")[1]);
  }

  calc(command) {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });

    const params = command.split(" ");
    const operation = params[1];
    const num1 = parseFloat(params[2]);
    const num2 = parseFloat(params[3]);

    const validateParams = () => {
      if (isNaN(num1) || isNaN(num2)) {
        window.vgpu.drawKeystroke(
          "[ERR]: Invalid or missing second or third parameter. Valid parameters are INT or FLOAT.",
          true,
          "error"
        );
        return false;
      }
      return true;
    };

    switch (operation) {
      case "add":
        if (validateParams()) {
          window.vgpu.drawKeystroke((num1 + num2).toString(), true);
        }
        break;

      case "sub":
        if (validateParams()) {
          window.vgpu.drawKeystroke((num1 - num2).toString(), true);
        }
        break;

      case "mul":
        if (validateParams()) {
          window.vgpu.drawKeystroke((num1 * num2).toString(), true);
        }
        break;

      case "div":
        if (validateParams()) {
          window.vgpu.drawKeystroke((num1 / num2).toString(), true);
        }
        break;

      default:
        window.vgpu.drawKeystroke(
          "[ERR]: Invalid first parameter. Valid parameters are 'add', 'sub', 'mul' and 'div'.",
          true,
          "error"
        );
        break;
    }
  }

  spec(command) {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });

    if (window.vcpu.bootTime <= 1000) {
      window.vgpu.drawKeystroke(
        "Boot time: " + window.vcpu.bootTime + " ms",
        true,
        "success"
      );
    } else if (window.vcpu.bootTime <= 2500) {
      window.vgpu.drawKeystroke(
        "Boot time: " + window.vcpu.bootTime + " ms",
        true,
        "warning"
      );
    } else {
      window.vgpu.drawKeystroke(
        "Boot time: " + window.vcpu.bootTime + " ms",
        true,
        "error"
      );
    }
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke(
      "User agent: " + navigator.userAgent,
      true,
      "info"
    );
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke(
      "Network type: " + navigator.connection.effectiveType,
      true,
      "info"
    );
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke(
      "Device memory: " + navigator.deviceMemory + " GB",
      true,
      "info"
    );
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vcpu.batteryManager.then((battery) => {
      // Access battery information here
      window.vgpu.drawKeystroke(
        "Battery level: " + battery.level * 100 + "%",
        true,
        "info"
      );
    });
  }

  importcmd(command) {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });
    if (!command.split(" ")[1]) {
      window.vgpu.drawKeystroke(
        "[ERR]: No command name provided. Please supply the command name in the first parameter.",
        true,
        "error"
      );
      return;
    } else {
      window.vgpu.drawKeystroke(
        "[WARN]: Importing commands is very dangerous! Make sure you know what you are doing.",
        true,
        "warning"
      );
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke(
        "[INFO]: Not implemented *entirely* in this version.",
        true,
        "info"
      );

      const commandName = command.split(" ")[1];
      if (window.vcpu.cmdHandler.intCommands[commandName]) {
        window.vgpu.drawKeystroke({ key: "Enter" });
        window.vgpu.drawKeystroke(
          "[ERR]: Command already exists. Please use a different command name.",
          true,
          "error"
        );
        return;
      }
      if (!window[commandName]) {
        window.vgpu.drawKeystroke({ key: "Enter" });
        window.vgpu.drawKeystroke(
          "[ERR]: Command does not exist. Please use a valid command name.",
          true,
          "error"
        );
        return;
      }
      const commandFunction = window[commandName];
      this[commandName] = commandFunction;
      if (window[commandName].description) {
        let stringofparams = "";
        window[commandName].parameters.forEach((param) => {
          stringofparams += " [" + param + "]";
        });
        window.vcpu.cmdHandler.commands.push({
          command: "| " + commandName + stringofparams,
          description: window[commandName].description,
        });
      } else {
        let stringofparams = "";
        window[commandName].parameters.forEach((param) => {
          stringofparams += " [" + param + "]";
        });
        window.vcpu.cmdHandler.commands.push({
          command: "| " + commandName + stringofparams,
          description: "No description provided.",
        });
      }
      window.vcpu.cmdHandler.intCommands[commandName] = this[commandName];
      window.vcpu.cmdHandler.commandList.push(commandName);

      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke(
        "[OK]: Command '" + commandName + "' imported successfully.",
        true,
        "success"
      );
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke({ key: "Enter" });
    }
  }

  time(command) {
    let time = new Date();
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });

    switch (command.split(" ")[1]) {
      case "get-ms":
        window.vgpu.drawKeystroke(time.getMilliseconds().toString(), true);
        break;
      case "get-sec":
        window.vgpu.drawKeystroke(time.getSeconds().toString(), true);
        break;
      case "get-min":
        window.vgpu.drawKeystroke(time.getMinutes().toString(), true);
        break;
      case "get-hour":
        window.vgpu.drawKeystroke(time.getHours().toString(), true);
        break;
      case "get-day":
        window.vgpu.drawKeystroke(time.getDay().toString(), true);
        break;
      case "get-month":
        window.vgpu.drawKeystroke(time.getMonth().toString(), true);
        break;
      case "get-year":
        window.vgpu.drawKeystroke(time.getFullYear().toString(), true);
        break;
      case "get-time":
        window.vgpu.drawKeystroke(time.toLocaleTimeString(), true);
        break;
      case "get-date":
        window.vgpu.drawKeystroke(time.toLocaleDateString(), true);
        break;

      default:
        window.vgpu.drawKeystroke(
          "[ERR]: Invalid or missing second parameter. Valid parameters are 'get-ms', 'get-sec', 'get-min', 'get-hour', 'get-day', 'get-month' 'get-year', 'get-time', or 'get-date'.",
          true,
          "error"
        );
        return null;
        break;
    }
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
