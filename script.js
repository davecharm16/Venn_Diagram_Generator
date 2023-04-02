const generate =()=>{
    // Initialize variables
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = "1000"
    canvas.height = "700"

    //get the user inputs
    let arr1 = document.getElementById("a").value.replace(/\s/g, '');
    arr1 = Array.from(new Set(arr1.split(",")))
    let arr2 = document.getElementById("b").value.replace(/\s/g, '');
    arr2 = Array.from(new Set(arr2.split(",")))
    let arr3 = document.getElementById("c").value.replace(/\s/g, '');
    arr3 = Array.from(new Set(arr3.split(",")))

    console.log(arr1,arr2,arr3)
    let info = extractInformation(arr1, arr2, arr3);
    console.log(info);

    // Define circle parameters

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.5;
    const colors = ["#FF4136", "#2ECC40", "#0074D9", "#000000"];

    // Define function to draw circle
    function drawCircle(x, y, r, strokeColor, opa = 'rgba(255, 255, 255, 0.2)') {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = `${opa}`;
    ctx.fill();
    }

    // Define function to draw text
    function drawText(x, y, text, size = 15, style="black") {
        ctx.font = `${size}px Arial`;
        ctx.fillStyle = style;
        ctx.textAlign = "center";
        ctx.fillText(text, x, y);
    }


    // Draw circles
    const x1 = centerX - radius / 2;
    const x2 = centerX + radius / 2;
    const y1 = centerY - radius / 2;
    const y2 = centerY + radius / 2;

    drawCircle(x1, y1, radius, colors[0]);
    drawCircle(x2, y1, radius, colors[1]);
    drawCircle(centerX, y2, radius, colors[2]);

    //draw labels
    drawText(x1-220, y1, "A", 30, "red");
    drawText(x2+220, y1, "B", 30, "green");
    drawText(centerX, y2+220, "C", 30, "blue");

    //draw Values 
    switch (getSelectedValue()) {
      case 'u':
        drawCircle(x1, y1, radius, colors[2]);
        drawCircle(x2, y1, radius, colors[2]);
        drawCircle(centerX, y2, radius, colors[2]);
        drawVal(ctx, info.A, x1-50, y1-20,"#0000FF", size=20);
        drawVal(ctx, info.B, x2+50, y1-20,"#0000FF", size=20);
        drawVal(ctx, info.C, centerX, y2+50,"#0000FF",size=20);
        drawVal(ctx, info.AB, centerX, y1-50);
        drawVal(ctx, info.AC, (x1 + radius / 4)-60, (centerY - radius / 4)+80);
        drawVal(ctx, info.BC, (x2 + radius / 4)-30, (centerY - radius / 4)+80);
        drawVal(ctx, info.ABC, centerX, (centerY - radius / 4)+50,"#0000FF",size=20);
        break;
      
      case 'i':
        drawCircle(x1, y1, radius, colors[0],'rgba(255, 0, 0, 0.5)');
        drawCircle(x2, y1, radius, colors[0],'rgba(255, 0, 0, 0.5)');
        drawCircle(centerX, y2, radius, colors[0],'rgba(255, 0, 0, 0.5)');
        drawVal(ctx, info.A, x1-50, y1-20);
        drawVal(ctx, info.B, x2+50, y1-20);
        drawVal(ctx, info.C, centerX, y2+50);
        drawVal(ctx, info.AB, centerX, y1-50,"#FFFFFF");
        drawVal(ctx, info.AC, (x1 + radius / 4)-60, (centerY - radius / 4)+80,"#FFFFFF");
        drawVal(ctx, info.BC, (x2 + radius / 4)-30, (centerY - radius / 4)+80,"#FFFFFF");
        drawVal(ctx, info.ABC, centerX, (centerY - radius / 4)+50,"#FFFFFF");
        break;
      
      case 's':
        drawCircle(x1, y1, radius, colors[0]);
        drawCircle(x2, y1, radius, colors[1]);
        drawCircle(centerX, y2, radius, colors[2]);
        drawVal(ctx, info.A, x1-50, y1-20, "#8B4000", 20);
        drawVal(ctx, info.B, x2+50, y1-20, "#8B4000", 20);
        drawVal(ctx, info.C, centerX, y2+50, "#8B4000", 20);
        drawVal(ctx, info.AB, centerX, y1-50, "#8B4000", 20);
        drawVal(ctx, info.AC, (x1 + radius / 4)-60, (centerY - radius / 4)+80, "#8B4000", 20);
        drawVal(ctx, info.BC, (x2 + radius / 4)-30, (centerY - radius / 4)+80, "#8B4000", 20);
        drawVal(ctx, info.ABC, centerX, (centerY - radius / 4)+50);
        break;
    
      default:
        // console.log(getSelectedValue())
        drawVal(ctx, info.A, x1-50, y1-20);
        drawVal(ctx, info.B, x2+50, y1-20);
        drawVal(ctx, info.C, centerX, y2+50);
        drawVal(ctx, info.AB, centerX, y1-50);
        drawVal(ctx, info.AC, (x1 + radius / 4)-60, (centerY - radius / 4)+80);
        drawVal(ctx, info.BC, (x2 + radius / 4)-30, (centerY - radius / 4)+80);
        drawVal(ctx, info.ABC, centerX, (centerY - radius / 4)+50);
        break;
    }
}

function drawVal(ctx,arr, x, y, color = "#000000", size = 15){
    output = " "
    if(arr.length >=2){
        for (let i = 0; i < arr.length; i++){
            (i%5==0)? output+=arr[i] + ", " : output+=arr[i] + ","
        }
    }
    else if(arr.length == 1){
        output+=arr[0]+""
    }
    
    drawTextInBox(ctx, output, 40, 20, x, y, color, size)
}


function extractInformation (arr1, arr2, arr3){

    let a = arr1
    let b = arr2
    let c = arr3
    
    let intersectAB = a.filter(val => b.includes(val));
    let intersectAC = a.filter(val => c.includes(val));
    let intersectBC = b.filter(val => c.includes(val));
    let intersectABC = intersectAB.filter(val => intersectAC.includes(val));

    intersectAB = intersectAB.filter(val => !intersectABC.includes(val))
    intersectAC = intersectAC.filter(val => !intersectABC.includes(val))
    intersectBC = intersectBC.filter(val => !intersectABC.includes(val))

    a = a.filter(val => !intersectABC.includes(val) && !intersectAB.includes(val) && !intersectAC.includes(val))
    b = b.filter(val => !intersectABC.includes(val) && !intersectAB.includes(val) && !intersectBC.includes(val))
    c = c.filter(val => !intersectABC.includes(val) && !intersectAC.includes(val) && !intersectBC.includes(val))

    
    return({
        A: a,
        B : b,
        C : c,
        AB : intersectAB,
        AC : intersectAC,
        BC : intersectBC,
        ABC : intersectABC
    })
}

function drawTextInBox(ctx, text, boxWidth, boxHeight,x1, y1, color = "#000000", size) {
    ctx.font = `${size}px Arial`
    const lines = [];
    let currentLine = '';
    const words = text.split(' ');
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine.length > 0 ? currentLine + ' ' + word : word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > boxWidth) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);
  
    const lineHeight = 30;
    const x = x1;
    const y = y1;
    const textHeight = lines.length * lineHeight;
    const textY = y + (boxHeight - textHeight) / 2;
  
    for (let i = 0; i < lines.length; i++) {
      ctx.fillStyle = color;
      ctx.fillText(lines[i], x, textY + (i * lineHeight));
    }
}

function getSelectedValue()
{
    var selectedValue = document.getElementById("sel").value;
    return selectedValue;
}

// getSelectedValue();
