/* =====================================================
   THUG MANE BEAT STORE
   SHOPPING CART
   ===================================================== */


/* ================= CART ================= */

let cart = [];


/* ================= ELEMENTS ================= */

const cartItems = document.getElementById("cart-items");

const cartTotal = document.getElementById("cart-total");

const cartCount = document.getElementById("cart-count");

const checkoutButton = document.getElementById("checkout-button");

const checkoutSection = document.getElementById("checkout");

const checkoutForm = document.getElementById("checkout-form");

const orderMessage = document.getElementById("order-message");


/* ================= FORMAT PRICE ================= */

function formatPrice(price) {

    return new Intl.NumberFormat("fr-FR").format(price);

}


/* ================= UPDATE CART ================= */

function updateCart() {

    cartItems.innerHTML = "";


    /* EMPTY CART */

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "0";

        cartCount.textContent = "0";

        checkoutButton.disabled = true;

        return;

    }


    /* CART ITEMS */

    cart.forEach((item, index) => {

        const itemElement = document.createElement("div");

        itemElement.className = "cart-item";


        itemElement.innerHTML = `

            <div class="cart-item-info">

                <h3>
                    ${item.beat}
                </h3>

                <p>
                    ${item.license}
                </p>

            </div>


            <div>

                <span class="cart-item-price">
                    ${formatPrice(item.price)} FCFA
                </span>

                <button
                    class="remove-button"
                    data-index="${index}"
                >
                    REMOVE
                </button>

            </div>

        `;


        cartItems.appendChild(itemElement);

    });


    /* TOTAL */

    const total = cart.reduce(
        (sum, item) => sum + item.price,
        0
    );


    cartTotal.textContent = formatPrice(total);

    cartCount.textContent = cart.length;

    checkoutButton.disabled = false;


    /* REMOVE BUTTONS */

    document
        .querySelectorAll(".remove-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(button.dataset.index);

                    cart.splice(index, 1);

                    updateCart();

                }
            );

        });

}


/* ================= ADD TO CART ================= */

document
    .querySelectorAll(".buy-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const beat =
                    button.dataset.beat;

                const license =
                    button.dataset.license;

                const price =
                    Number(button.dataset.price);


                const item = {

                    beat: beat,

                    license: license,

                    price: price

                };


                cart.push(item);


                updateCart();


                /* CHANGE BUTTON TEXT */

                const originalText =
                    button.textContent;

                button.textContent =
                    "ADDED ✓";


                setTimeout(() => {

                    button.textContent =
                        originalText;

                }, 1200);


                /* SCROLL TO CART */

                document
                    .getElementById("cart")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });


/* ================= CHECKOUT BUTTON ================= */

checkoutButton.addEventListener(
    "click",
    () => {

        checkoutSection.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* ================= CHECKOUT FORM ================= */

checkoutForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        if (cart.length === 0) {

            orderMessage.textContent =
                "Your cart is empty.";

            return;

        }


        const name =
            document
                .getElementById("customer-name")
                .value
                .trim();


        const email =
            document
                .getElementById("customer-email")
                .value
                .trim();


        const phone =
            document
                .getElementById("customer-phone")
                .value
                .trim();


        const total = cart.reduce(
            (sum, item) => sum + item.price,
            0
        );


        /* ORDER NUMBER */

        const orderNumber =
            "TM-" +
            Date.now();


        /* CREATE ORDER SUMMARY */

        const products =
            cart
                .map(
                    item =>
                        `${item.beat} - ${item.license}`
                )
                .join(", ");


        /* TEMPORARY MESSAGE */

        orderMessage.innerHTML = `

            <strong>
                Order prepared ✓
            </strong>

            <br><br>

            Order number:
            <strong>${orderNumber}</strong>

            <br><br>

            Customer:
            ${name}

            <br>

            Email:
            ${email}

            <br>

            Phone:
            ${phone || "Not provided"}

            <br><br>

            Product:
            ${products}

            <br>

            Total:
            <strong>
                ${formatPrice(total)} FCFA
            </strong>

            <br><br>

            Payment will be connected
            in the next stage.

        `;

    }
);


/* ================= INITIALIZATION ================= */

updateCart();


console.log(
    "Thug Mane Beat Store is running!"
);
