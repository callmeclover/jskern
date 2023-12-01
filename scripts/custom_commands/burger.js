window.burger = function (command) {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });

    let pparam = ["lettuce", "tomato", "onion", "pickles", "cheese", "patty"];
    
    let param = command.split(" ")
    param.shift()

    string = ["borger bun"];

    if (param.length === 0) {
        window.vgpu.drawKeystroke(
            "[ERR]: No parameter provided. Please supply the toppings in the first parameter.",
            true,
            "error"
        );
        return;
        
    }

    param.forEach(topping => {
        if (pparam.includes(topping)) {
            string.push(topping);
        } else {
            window.vgpu.drawKeystroke(
                "[ERR]: Invalid parameter. Valid parameters are 'lettuce', 'tomato', 'onion', 'pickles', 'patty' and 'cheese'.",
                true,
                "error"
            );
        }
    });

    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });

    string.push("borger bun")
    string.forEach(topping => {
        switch (topping) {
            case "lettuce":
                window.vgpu.drawKeystroke(" lettuce", true, "#00ff7f");
                break;
            case "patty":
                window.vgpu.drawKeystroke("  patty", true, "#a0522d");
                break;
            case "tomato":
                window.vgpu.drawKeystroke(" tomatos", true, "#ff6347");
                break;
            case "onion":
                window.vgpu.drawKeystroke(" onions", true, "#f5deb3");
                break;
            case "pickles":
                window.vgpu.drawKeystroke(" pickles", true, "#2e8b57");
                break;
            case "cheese":
                window.vgpu.drawKeystroke(" cheese", true, "#ffa500");
                break;
            case "borger bun":
                window.vgpu.drawKeystroke("borger bun", true, "#f4a460");
                break;
        
            default:
                break;
        }

        window.vgpu.drawKeystroke({ key: "Enter" });
    });
    
    return;
  };
  
  // do not edit below
  window.burger.description = "mmmmm, yummy borger!";
  window.burger.parameters = ["top"];
  