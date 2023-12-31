/**
 * CMDChck
 * by Clover Johnson
 *
 * @param {object} kernel
 */

class CMDChck {
  constructor(kernel) {
    this.kernel = kernel

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
      "ls",
      "touch",
      "snake",
      "glass",
      "exit"
        ];
    this.intCommands = {
      help: this.help,

      whois: this.whois,
      spec: this.spec,
      time: this.time,

      clear: this.clear,
      import: this.importcmd,

      calc: this.calc,
      echo: this.echo,
      string: this.string,

      ls: this.ls,
      touch: this.touch,
      snake: this.snake,
      glass: this.glass,

      exit: this.exit
        };
    this.commands = [
      {
        command: "| help",
        description: "display this help menu and exit",
      },
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
          "imports external commands from a file. very dangerous if you dont know what you're doing.",
      },
      { command: "| spec", description: "shows system information." },
      { command: "| time [get]", description: "shows the current time." },
      { command: "| ls", description: "lists files in the file system." },
      { command: "| snake [type] [key] [val]", description: "amends, adds, or reads Snake registry values. val must be in unescaped quotes." },
      { command: "| touch [file] [contents]", description: "creates a new file. contents must be in unescaped quotes" },
      { command: "| glass [object]", description: "checks values of information.." },
      { command: "| exit", description: "exits the shell." },
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
      if (this.intCommands[command].constructor.name === 'AsyncFunction') {
        await this.intCommands[command](cmd);
      } else {
        this.intCommands[command](cmd); 
      }
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

  async awaitInput() {
    window.vgpu.setNPPOS();
    window.vcpu.acceptInput = true;
    window.vcpu.inCommand = true;
    let inp = await this.waitForMessage();
    return inp;
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
    if (command.split(" ")[1] == "help") {
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke({ key: "Enter" });

      window.vgpu.drawKeystroke(
        "whois [user] - display information about [user]",
        true,
        "info"
      );
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke(
        "valid parameters: amnst, me, root",
        true
      );
      return;
    }
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
    if (command.split(" ")[1] == "help") {
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke({ key: "Enter" });

      window.vgpu.drawKeystroke(
        "echo [str] - logs [str]. str must be in unescaped quotes",
        true, "info"
      );
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke(
        "valid parameters: amnst, me, root",
        true
      );
      return;
    }

    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });
    const regex = /"(.*?)"/i;
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
    if (command.split(" ")[1] == "help") {
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke({ key: "Enter" });

      window.vgpu.drawKeystroke(
        "string [manipulation] [str] - manipulates str. str must be in unescaped quotes.",
        true, "info"
      );
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke(
        "valid parameters: lw, up, wf, rv, sc; \"string\"",
        true
      );
      return;
    }
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });

    const validateParameter = (parameter) => {
      const regex = /"(.*?)"/i;
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
    if (command.split(" ")[1] == "help") {
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke({ key: "Enter" });

      window.vgpu.drawKeystroke(
        "calc [oper] [num1] [num2] - calculates [num1] [oper] [num2].",
        true, "info"
      );
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke(
        "valid parameters: add, sub, mul, div",
        true
      );
      return;
    }
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
    if (command.split(" ")[1] == "help") {
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke({ key: "Enter" });

      window.vgpu.drawKeystroke(
        "spec - displays system information.",
        true,
        "info"
      );
      return;
    }
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
    if (command.split(" ")[1] == "help") {
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke({ key: "Enter" });

      window.vgpu.drawKeystroke(
        "import - imports external commands from a file. very dangerous if you don't know what you're doing.",
        true,
        "info"
      );
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke(
        "valid parameters: name of command",
        true
      );
      return;
    }
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
            "[ERR]: Command '" +
              commandName +
              "' already exists. Please use a different command name.",
            true,
            "error"
          );
          return;
        }
        if (!window[commandName]) {
          window.vgpu.drawKeystroke({ key: "Enter" });
          window.vgpu.drawKeystroke(
            "[ERR]: Command '" +
              commandName +
              "' does not exist. Please use a valid command name.",
            true,
            "error"
          );
          return;
        }

        if (commandName.substring(0, 4) === "vgpu" || commandName.substring(0, 4) === "VGPU" || commandName.substring(0, 4) === "vcpu" || commandName.substring(0, 4) === "VCPU" || commandName.substring(0, 6) === "kernel" || commandName.substring(0, 6) === "Kernel") {
          window.vgpu.drawKeystroke({ key: "Enter" });
          window.vgpu.drawKeystroke(
            "[ERR]: Command '" +
              commandName +
              "' is reserved. Please use a different command name.",
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
    if (command.split(" ")[1] == "help") {
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke({ key: "Enter" });

      window.vgpu.drawKeystroke(
        "time [get] - shows the current time.",
        true,
        "info"
      );
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke(
        "valid parameters: get-ms, get-sec, get-min, get-hour, get-day, get-month, get-year, get-time, get-date",
        true
      );
      return;
    }
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

  async snake(command) {
    if (command.split(" ")[1] == "help") {
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke({ key: "Enter" });

      window.vgpu.drawKeystroke(
        "snake [type] [key] [val] - amends, adds, or reads Snake registry values. val must be in unescaped quotes.",
        true, "info"
      );
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke(
        "valid parameters: amend, add, get, list; entry; \"value\"",
        true
      );
      return;
    }

    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });

    const splitCommand = command.split(" ");
    splitCommand.shift();

    const [operation, param1] = splitCommand;
    
    let param2;
    if (/"(.*?)"/i.exec(command) != null) {
      param2 = /"(.*?)"/i.exec(command)[1]
    }

    switch (operation) {
      case "amend":
        if (!param1) {
          window.vgpu.drawKeystroke("[ERR]: Missing second parameter.", true, "error");
          return;
        } else if (window.kernel.snake[param1] === undefined) {
          window.vgpu.drawKeystroke(`[ERR]: '${param1}' does not exist in the Snake registry.`, true, "error");
          return;
        } else {
          if (!param2) {
            window.vgpu.drawKeystroke("[ERR]: Missing third parameter.", true, "error");
            return;
          }

          if (param1 === "password" || param1 === "user" || param1 === "type") {
            window.vgpu.drawKeystroke(`Entry '${param1}' is protected. Please input your password: `, true);
            let inp = await window.vcpu.cmdHandler.awaitInput();

            if (inp === window.kernel.snake.password) {
              window.vgpu.drawKeystroke({ key: "Enter" });
              window.vgpu.drawKeystroke(`[OK]: Amended ${param1} with value ${param2}.`, true, "success");
              window.kernel.snake[param1] = param2;
            } else {
              window.vgpu.drawKeystroke({ key: "Enter" });
              window.vgpu.drawKeystroke(`[ERR]: Incorrect password.`, true, "error");
              return;
            }
          } else {
            window.kernel.snake[param1] = param2;
            window.vgpu.drawKeystroke(`[OK]: Amended ${param1} with value ${param2}.`, true, "success");
          }
        }
        break;
      case "get":
        if (!param1) {
          window.vgpu.drawKeystroke("[ERR]: Missing second parameter.", true, "error");
          return;
        } else if (!window.kernel.snake[param1]) {
          window.vgpu.drawKeystroke(`[ERR]: '${param1}' does not exist in the Snake registry.`, true, "error");
          return;
        } else {
          window.vgpu.drawKeystroke(`${window.kernel.snake[param1]}`, true);
        }
        break;
      case "add":
        if (!param1) {
          window.vgpu.drawKeystroke("[ERR]: Missing second parameter.", true, "error");
          return;
        } else if (window.kernel.snake[param1]) {
          window.vgpu.drawKeystroke(`[ERR]: '${param1}' already exists in the Snake registry.`, true, "error");
          return;
        } else {
          if (!param2) {
            window.vgpu.drawKeystroke("[ERR]: Missing third parameter.", true, "error");
            return;
          }
          window.kernel.snake[param1] = param2;
          window.vgpu.drawKeystroke(`[OK]: Added ${param1} to the Snake registry with value ${param2}.`, true, "success");
        }
        break;
      case "list":
        if (param1 === "--use-value") {
          for (const [key, value] of Object.entries(window.kernel.snake)) {
            window.vgpu.drawKeystroke({ key: "Enter" });
            window.vgpu.drawKeystroke(`'${key}': '${value}'`, true);
          }
        } else {
          window.vgpu.drawKeystroke("[INFO]: 'snake list' only lists entries, to list values, use 'snake list --use-value'.", true, "info");
          for (const [key] of Object.entries(window.kernel.snake)) {
            window.vgpu.drawKeystroke({ key: "Enter" });
            window.vgpu.drawKeystroke(`'${key}'`, true);
          }
        }
        break;
      default:
        window.vgpu.drawKeystroke("[ERR]: Invalid or missing first parameter. Valid parameters are 'amend', 'get', 'list', or 'add'.", true, "error");
        return null;
    }

    localStorage.setItem("snake", JSON.stringify(window.kernel.snake));
  }

  async glass(command) {
    if (command.split(" ")[1] == "help") {
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke({ key: "Enter" });

      window.vgpu.drawKeystroke(
        "glass [object] - checks information of a value",
        true
      );
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke(
        "valid parameters: version",
        true
      );
      return;
    }

    window.vgpu.drawKeystroke({ "key": "Enter" })
    window.vgpu.drawKeystroke({ "key": "Enter" })

    switch (command.split(" ")[1]) {
      case "version":
        let utdArray = await window.vcpu.getVersion();
        if (utdArray[1] === true) {
          window.vgpu.drawKeystroke({ key: "Enter" });
          window.vgpu.drawKeystroke('[OK]: JsKern is up to date!', true, "success");
          window.vgpu.drawKeystroke({ key: "Enter" });
          window.vgpu.drawKeystroke('[OK]: HERE (' + window.vcpu.version + ') == REMOTE (' + utdArray[0] + ')', true, "success");
        } else if (utdArray[1] === false) {
          window.vgpu.drawKeystroke({ key: "Enter" });
          window.vgpu.drawKeystroke('[WARN]: JsKern is outdated!', true, "warning");
          window.vgpu.drawKeystroke({ key: "Enter" });
          window.vgpu.drawKeystroke('[WARN]: HERE (' + window.vcpu.version + ') != REMOTE (' + utdArray[0] + ')', true, "warning");
        }
        break;
      default:
        window.vgpu.drawKeystroke("[ERR]: Invalid or missing first parameter. Valid parameters are 'version'.", true, "error");
        return null;
    }
  }

  async ls(command) {

    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });

    await window.vcpu.foldyr.openFileSystemDB()

    await window.vcpu.foldyr.list()
    .then((res) => {
      window.vgpu.drawKeystroke(res, true);
    });
  }

  async touch(command) {
    let fileName;
    if (command.split(" ")[1]) {
      fileName = command.split(" ")[1];
    } else {
      window.vgpu.drawKeystroke("[ERR]: Missing file name parameter.", true, "error");
      return;
    }
    const regex = /"(.*?[^\\])"/;
    const match = command.match(regex);
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });

    if (match) {
      const data = match[1];
  
      // Create the file using FOLDYR
      await window.vcpu.foldyr.createFile([data], fileName)
        .then((fileId) => {
          window.vgpu.drawKeystroke(`[OK]: File "${fileName}" created with ID: ${fileId}`, true, "success");
        })
        .catch((error) => {
          window.vgpu.drawKeystroke(`[ERR]: Error creating file: ${error}`, true, "error");
        });
    } else {
      window.vgpu.drawKeystroke("[ERR]: Invalid or missing string parameter. Please enclose the string in quotes.", true, "error");
    }
  }

  async exit(command) {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });

    window.vgpu.drawKeystroke("Are you sure you want to exit? [y/n]: ", true, "info");
    let inp = await window.vcpu.cmdHandler.awaitInput();
    if (inp == 'y') {
      window.kernel.exit();
    } else {
      window.vgpu.drawKeystroke("[INFO]: Aborted.", true, "info");
    }
  }

  async genfile(command) {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });

    // TODO: run scripts 
  }

  /* END COMMANDS */
}
