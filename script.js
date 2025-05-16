let main = document.getElementById("main");
let credits = 1000;
let currentRotation = 0;  // Keep track of needle's angle

// Initialize the Home Screen with apps (Roulette & Calculator)
function initializeHomeScreen() {
    main.innerHTML = `
        <div id="devices">
            <div id="box1">
                <div id="camera"><div id="circle"></div></div>
            </div>
            <div id="box2" style="display:flex; align-items:center;">
                <div id="apps" style="margin-right:10px;">
                    <div id="app1"></div>
                    <div id="appname">Roulette</div>
                </div>
                <div id="apps">
                    <div id="app2"></div>
                    <div id="appname2">Calculator</div>
                </div>
                  <div id="apps" >
                    <div id="app3"></div>
                    <div id="appname3">Google</div>
                </div>
            </div>
            <div id="box3">
                <div id="box3_1">
                     <div class="apps">
        <div id="app1_box3" style="margin-top: 30px;margin-left: 7px;"></div>
    </div>
    <div class="apps">
        <div id="app2_box3" style="margin-top: 30px;margin-left: 5px;"></div>
    </div>
    <div class="apps">
        <div id="app3_box3" style="margin-top: 30px;margin-left: 5px;"></div>
    </div>
                </div>
   
</div>
        </div>
    `;

    // Style main container
    main.style.backgroundColor = "#f2f2f2";
    main.style.justifyContent = "center";
    main.style.alignItems = "center";
    main.style.padding = "";

    // Style and set roulette app icon
    let app1 = document.getElementById('app1');
    Object.assign(app1.style, {
        width: "30px",
        height: "30px",
        border: "1px solid black",
        borderRadius: "7px",
        color:"white",
        backgroundImage: "url(https://cdn11.bigcommerce.com/s-5jyc0a7/images/stencil/1280x1280/products/275/2141/30-inch-roulette-wheel-metal-table__65365.1669147704.png?c=2)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        cursor: "pointer"
    });
    app1.addEventListener("click", showGameScreen);

    // Style and set calculator app icon
    let app2 = document.getElementById('app2');
    Object.assign(app2.style, {
        width: "30px",
        height: "30px",
        border: "1px solid black",
        borderRadius: "7px",
        backgroundImage: "url(https://cdn.jim-nielsen.com/ios/512/calculator-2017-10-10.png?rf=1024)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        cursor: "pointer"
    });

    app2.addEventListener("click", showCalculatorScreen);

    let app3 = document.getElementById('app3');  // you had 'app2' here by mistake
Object.assign(app3.style, {
    width: "30px",
    height: "30px",
    border: "1px solid black",
    borderRadius: "7px",
    backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT65WTmiisS-2uqMBJ8C-OwNvh02PWiwMLxxg&s)", // add your Google icon image path here
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    cursor: "pointer"
});
app3.addEventListener("click", showGoogleScreen);

let app1_box3 = document.getElementById('app1_box3');
Object.assign(app1_box3.style, {
    width: "30px",
    height: "30px",
    border: "1px solid black",
    borderRadius: "7px",
    backgroundImage: "url(https://cdn11.bigcommerce.com/s-5jyc0a7/images/stencil/1280x1280/products/275/2141/30-inch-roulette-wheel-metal-table__65365.1669147704.png?c=2)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    cursor: "pointer"
});
app1_box3.addEventListener("click", showGameScreen);

let app2_box3 = document.getElementById('app2_box3');
Object.assign(app2_box3.style, {
    width: "30px",
    height: "30px",
    border: "1px solid black",
    borderRadius: "7px",
    backgroundImage: "url(https://cdn.jim-nielsen.com/ios/512/calculator-2017-10-10.png?rf=1024)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    cursor: "pointer"
});
app2_box3.addEventListener("click", showCalculatorScreen);

let app3_box3 = document.getElementById('app3_box3');
Object.assign(app3_box3.style, {
    width: "30px",
    height: "30px",
    border: "1px solid black",
    borderRadius: "7px",
    backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT65WTmiisS-2uqMBJ8C-OwNvh02PWiwMLxxg&s)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    cursor: "pointer"
});
app3_box3.addEventListener("click", showGoogleScreen);


}


   

// Show the Roulette Game Screen
function showGameScreen() {
    main.innerHTML = `
        <div id="appFullScreen">
            <h1>Roulette Game</h1>
            <p id="credits">Credits: ${credits}</p>
            <div id="wheel" style="position:relative; width:300px; height:300px; margin:auto;"></div>
            <div id="controls" style="text-align:center; margin-top:20px;">
                <button id="spinBtn">🎯 Spin</button>
                <button id="homeBtn">🔙 Home</button>
            </div>
            <p id="result" style="text-align:center; font-weight:bold; margin-top:15px;"></p>
        </div>
    `;
    main.style.backgroundColor = "#fff8dc";
    main.style.padding = "20px";
    main.style.justifyContent = "center";
    main.style.alignItems = "center";

    createWheel();

    document.getElementById("spinBtn").addEventListener("click", spinWheel);
    document.getElementById("homeBtn").addEventListener("click", initializeHomeScreen);
}

// Build the roulette wheel with numbers and needle
function createWheel() {
    const wheel = document.getElementById("wheel");
    wheel.innerHTML = "";

    const radius = 130;
    const centerX = 150;
    const centerY = 150;

    for (let i = 1; i <= 40; i++) {
        const num = document.createElement("div");
        num.className = "wheel-number";
        num.textContent = i;

        const angle = (i - 1) * (360 / 40) * (Math.PI / 180);
        const x = centerX + radius * Math.cos(angle) - 15;
        const y = centerY + radius * Math.sin(angle) - 15;

        Object.assign(num.style, {
            position: "absolute",
            left: `${x}px`,
            top: `${y}px`,
            width: "30px",
            height: "30px",
            textAlign: "center",
            lineHeight: "30px",
            borderRadius: "50%",
            border: "1px solid #333",
            backgroundColor: "#eee",
            userSelect: "none"
        });

        wheel.appendChild(num);
    }

    if (!document.getElementById("needle")) {
        let needle = document.createElement("div");
        needle.id = "needle";
        Object.assign(needle.style, {
            position: "absolute",
            width: "6px",
            height: "140px",
            backgroundColor: "darkred",
            top: "10px",
            left: "147px",
            borderRadius: "3px",
            boxShadow: "0 0 10px crimson",
            zIndex: "100",
            transformOrigin: "bottom center",
            transition: "transform 4s cubic-bezier(0.33, 1, 0.68, 1)"
        });
        wheel.appendChild(needle);
    }
}

// Spin the roulette needle and calculate results
function spinWheel() {
    const resultDisplay = document.getElementById("result");
    const creditsDisplay = document.getElementById("credits");
    const needle = document.getElementById("needle");

    if (credits <= 0) {
        resultDisplay.innerText = "❌ No more credits! Please restart.";
        return;
    }

    let bet = prompt(`You have ${credits} credits.\nEnter your bet (1 to ${credits}):`, "1");
    bet = Number(bet);

    if (isNaN(bet) || bet < 1 || bet > credits) {
        alert("Invalid bet amount.");
        return;
    }

    let userNumber = prompt("Pick a number between 1 and 40:", "1");
    userNumber = Number(userNumber);

    if (isNaN(userNumber) || userNumber < 1 || userNumber > 40) {
        alert("Invalid number chosen.");
        return;
    }

    credits -= bet;
    creditsDisplay.innerText = `Credits: ${credits}`;

    const totalNumbers = 40;
    const randomResult = Math.floor(Math.random() * totalNumbers) + 1;
    const degreesPerNumber = 360 / totalNumbers;
    const spins = 5; // full spins for animation

    const finalRotation = currentRotation + spins * 360 + (360 - (randomResult - 1) * degreesPerNumber);

    needle.style.transform = `rotate(${finalRotation}deg)`;
    currentRotation = finalRotation % 360;

    resultDisplay.innerText = `Spinning...`;

    setTimeout(() => {
        if (randomResult === userNumber) {
            let winAmount = bet * 35;  // standard roulette payout
            credits += winAmount;
            resultDisplay.innerText = `🎉 You won! Number was ${randomResult}. You gained ${winAmount} credits.`;
        } else {
            resultDisplay.innerText = `😞 You lost! Number was ${randomResult}. Try again.`;
        }
        creditsDisplay.innerText = `Credits: ${credits}`;
    }, 4200);
}

// Show Calculator Screen with buttons and display logic
function showCalculatorScreen() {
    main.innerHTML = `
        <div id="appFullScreen" style="max-width: 350px; background: #000; border-radius: 20px; padding: 20px; color: white; user-select:none;">
            <div style="display:flex; justify-content: space-between; align-items:center; margin-bottom: 15px;">
                <h1 style="font-weight: 900; font-size: 2rem; margin: 0;">Calculator</h1>
                <button id="homeBtnCalc" style="font-size: 1.5rem; background:none; border:none; color:white; cursor:pointer;">🔙</button>
            </div>
            <div id="calcDisplay" style="height: 70px; background: #1c1c1e; border-radius: 15px; text-align: right; padding: 10px 20px; font-size: 2.5rem; line-height: 70px; overflow-x: auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                0
            </div>
            <div id="calcButtons" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 20px;">
                <button class="calc-btn" data-value="AC" style="background: #a6a6a6; color: black; border-radius: 15px;">AC</button>
                <button class="calc-btn" data-value="+/-" style="background: #a6a6a6; color: black; border-radius: 15px;">+/-</button>
                <button class="calc-btn" data-value="%" style="background: #a6a6a6; color: black; border-radius: 15px;">%</button>
                <button class="calc-btn" data-value="/" style="background: orange; color: white; border-radius: 15px;">÷</button>

                <button class="calc-btn" data-value="7">7</button>
                <button class="calc-btn" data-value="8">8</button>
                <button class="calc-btn" data-value="9">9</button>
                <button class="calc-btn" data-value="*" style="background: orange; color: white; border-radius: 15px;">×</button>

                <button class="calc-btn" data-value="4">4</button>
                <button class="calc-btn" data-value="5">5</button>
                <button class="calc-btn" data-value="6">6</button>
                <button class="calc-btn" data-value="-" style="background: orange; color: white; border-radius: 15px;">−</button>

                <button class="calc-btn" data-value="1">1</button>
                <button class="calc-btn" data-value="2">2</button>
                <button class="calc-btn" data-value="3">3</button>
                <button class="calc-btn" data-value="+" style="background: orange; color: white; border-radius: 15px;">+</button>

                <button class="calc-btn" data-value="0" style="grid-column: span 2;">0</button>
                <button class="calc-btn" data-value=".">.</button>
                <button class="calc-btn" data-value="=" style="background: orange; color: white; border-radius: 15px;">=</button>
            </div>
        </div>
    `;

    main.style.backgroundColor = "#000";
    main.style.justifyContent = "center";
    main.style.alignItems = "center";
    main.style.padding = "40px 0";

    document.getElementById("homeBtnCalc").addEventListener("click", initializeHomeScreen);

    setupCalculatorLogic();
}

// Calculator logic
function setupCalculatorLogic() {
    let display = document.getElementById("calcDisplay");
    let currentInput = "0";
    let previousInput = null;
    let operator = null;
    let resetNext = false;

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function calculate() {
        if (previousInput === null || operator === null) return;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);
        let result;

        switch (operator) {
            case '+': result = prev + curr; break;
            case '-': result = prev - curr; break;
            case '*': result = prev * curr; break;
            case '/': 
                if (curr === 0) {
                    alert("Error: Division by zero");
                    return;
                }
                result = prev / curr; 
                break;
            default: return;
        }
        currentInput = result.toString();
        previousInput = null;
        operator = null;
        resetNext = true;
        updateDisplay();
    }

    document.querySelectorAll(".calc-btn").forEach(button => {
        button.addEventListener("click", () => {
            const val = button.getAttribute("data-value");

            if ("0123456789.".includes(val)) {
                if (resetNext) {
                    currentInput = val === "." ? "0." : val;
                    resetNext = false;
                } else {
                    if (val === "." && currentInput.includes(".")) return;
                    currentInput = currentInput === "0" && val !== "." ? val : currentInput + val;
                }
                updateDisplay();
                return;
            }

            switch(val) {
                case "AC":
                    currentInput = "0";
                    previousInput = null;
                    operator = null;
                    resetNext = false;
                    updateDisplay();
                    break;
                case "+/-":
                    if (currentInput !== "0") {
                        currentInput = currentInput.startsWith("-") ? currentInput.slice(1) : "-" + currentInput;
                        updateDisplay();
                    }
                    break;
                case "%":
                    currentInput = (parseFloat(currentInput) / 100).toString();
                    updateDisplay();
                    break;
                case "+":
                case "-":
                case "*":
                case "/":
                    if (operator !== null) {
                        calculate();
                    }
                    operator = val;
                    previousInput = currentInput;
                    resetNext = true;
                    break;
                case "=":
                    calculate();
                    break;
            }
        });
    });
}

// Initialize the home screen on page load
initializeHomeScreen();

function showGoogleScreen() {
    main.innerHTML = `
      <div id="appFullScreen">
        <h1>Google Search</h1>
        <button id="openGoogle">Open Google</button>
        <button id="homeBtn">🔙 Home</button>
      </div>
    `;

    document.getElementById('openGoogle').addEventListener('click', () => {
      window.open('https://www.google.com', '_blank');
    });

    document.getElementById('homeBtn').addEventListener('click', initializeHomeScreen);
}

