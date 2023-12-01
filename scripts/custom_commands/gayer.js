window.gayer = function(command) {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });
    
    switch (command.split(" ")[1]) {
        case "gay":
            window.vgpu.drawKeystroke("lo", true, "#E40303");
            window.vgpu.drawKeystroke("ve ", true, "#FF8C00");
            window.vgpu.drawKeystroke("is ", true, "#FFED00");
            window.vgpu.drawKeystroke("lo", true, "#008026");
            window.vgpu.drawKeystroke("v", true, "#24408E");
            window.vgpu.drawKeystroke("e", true, "#732982");
            break;
        case "les":
            window.vgpu.drawKeystroke("lo", true, "#D52D00");
            window.vgpu.drawKeystroke("v", true, "#EF7627");
            window.vgpu.drawKeystroke("e ", true, "#FF9A56");
            window.vgpu.drawKeystroke("is ", true, "#FFFFFF");
            window.vgpu.drawKeystroke("l", true, "#D162A4");
            window.vgpu.drawKeystroke("o", true, "#B55690");
            window.vgpu.drawKeystroke("ve", true, "#A30262");
            break;
        case "bis":
            window.vgpu.drawKeystroke("love ", true, "#D60270");
            window.vgpu.drawKeystroke("is ", true, "#9B4F96");
            window.vgpu.drawKeystroke("love", true, "#0038A8");
        case "tra":
            window.vgpu.drawKeystroke("lo", true, "#0038A8");
            window.vgpu.drawKeystroke("ve ", true, "#F5A9B8");
            window.vgpu.drawKeystroke("is ", true, "#FFFFFF");
            window.vgpu.drawKeystroke("lo", true, "#F5A9B8");
            window.vgpu.drawKeystroke("ve", true, "#0038A8");
            break;
        case "pan":
            window.vgpu.drawKeystroke("love ", true , "#FF218C");
            window.vgpu.drawKeystroke("is ", true, "#FFD800");
            window.vgpu.drawKeystroke("love", true, "#21B1FF");
            break;
        default:
            window.vgpu.drawKeystroke("[ERR]: Invalid parameter. Valid parameters are 'gay', 'les', 'bis', 'tra' and 'pan'.", true, "error");
            break;
    }
    return;
}