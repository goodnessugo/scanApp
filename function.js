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
            // only for displaying the scanned text
            // document.getElementById("result").innerText = "Result:" + decodedText;

            // include displaying clickable website links
            let resultElement = document.getElementById("result");

            if (decodedText.startsWith("http://") || decodedText.startsWith("https://")) {
                resultElement.innerHTML = 'Result: <a href=" ' + decodedText + '" target="_blank">' + decodedText + "</a>";

            } else {
                resultElement.innerText = "Result:" + decodedText;
            }

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