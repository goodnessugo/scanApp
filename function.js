let scanner;


// starting scan
function startScanner() {

    scanner = new Html5Qrcode("reader");

    scanner.start(
        { facingMode: "environment" }, //back camera
        {
            fps: 10,
            qrbox: 250
        },
        (decodedText) => {
            document.getElementById("result").innerText = "Result:" + decodedText;

        },
        (error) => {
            console.log(error);
        }
    );
}



// Stop scan
function stopScanner() {
    if (scanner) {
        scanner.stop().then(() => {
            console.log("Stopped");
        });
    }
}