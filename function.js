


// POS Database of products wit their barcodes, name, and price
let products = {
    "5060626030015": { name: "Lacasera", price: 5000 },
    "6156000264042": { name: "Bottle water", price: 1500 },
    "333": { name: "Bread", price: 800 },
    "444": { name: "Indomie", price: 300 },
    "555": { name: "Sugar", price: 1200 },
}

// End of POS Database




let cart = [];
let total = 0;
let scanner;
let scanLocked = false



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

            // double scan
            if (scanLocked) return;

            scanLocked = true;

            // --------add to cart -----

            if (products[decodedText]) {
                let p = products[decodedText];
                cart.push(p);
                total += p.price;
                updateCart();
            }

            // ---------- end of add to cart -----------






            //--------Show Result ------------

            let resultElement = document.getElementById("result");

            resultElement.innerText = "Result: " + decodedText;

            // this is able to let Links scanned Clickable
            if (decodedText.startsWith("http://") || decodedText.startsWith("https://")) {
                resultElement.innerHTML = 'Result: <a href=" ' + decodedText + '" target="_blank">' + decodedText + "</a>";

            } else {
                resultElement.innerText = "Result:" + decodedText;
            }
            // end of Scanned Links that ar clickable


            setTimeout(() => {
                scanLocked = false;
            }, 1500);


        },
        (error) => {
            console.log(error);
        }
    );
}



// updateCart or Show Cart list
function updateCart() {

    let cartList = document.getElementById("cart");
    cartList.innerHTML = "";

    cart.forEach(item => {
        let li = document.createElement("li");

        li.textContent = item.name + " - ₦" + item.price;

        cartList.appendChild(li);
    });

    document.getElementById("total").innerText = "Total: ₦" + total;
}



//------ Checkout Code -----------
function checkout() {
    alert("Total = ₦" + total);

    cart = [];
    total = 0;


    updateCart();
}










// Stop scan
function stopScanner() {
    if (scanner) {
        scanner.stop().then(() => {
            console.log("Stopped");
        });
    }
}