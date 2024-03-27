function setCookies() {
    const firstName = document.getElementById('firstname')?.value;
    const email = document.getElementById('email')?.value;

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 10);
    Cookies.set('firstname', firstName, { expires: 10 });
    Cookies.set('email', email, { expires: 10 });
    showWelcomeMessageOrForm()
}

function setCookiesAndShowWelcomeMessage() {
    const firstName = document.getElementById('firstname')?.value;
    const email = document.getElementById('email')?.value;

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 10);
    Cookies.set('firstname', firstName, { expires: 10 });
    Cookies.set('email', email, { expires: 10 });
    showWelcomeMessageOrForm()
}

function showCookies() {
    const para = document.createElement('p');
    para.textContent = `Email: ${getCookie('email')}, Firstname: ${getCookie('firstname')}`;
    document.body.appendChild(para);

}

function getCookie(name) {
    return Cookies.get(name);
}

function showForm() {
    const form = document.getElementById('login-form');
    form.style.display = 'block';
    const loggedInPara = document.getElementById('loggedin');
    loggedInPara.style.display = 'none';
}

function hideForm() {
    const form = document.getElementById('login-form');
    form.style.display = 'none';
}

function deleteCookiesAndShowForm() {
    Cookies.remove('firstname');
    Cookies.remove('email');
    showForm();
}
function showWelcomeMessageOrForm() {
    const firstName = getCookie('firstname');
    const email = getCookie('email');
    if (firstName && email) {
        const h1 = document.createElement('h1');
        h1.id = 'loggedin';
        h1.textContent = `Welcome ${firstName}`;
        const span = document.createElement('span');
        span.style.fontWeight = 'normal';
        span.fontSize = '10px';
        span.style.cursor = 'pointer';
        span.style.fontStyle = 'italic';
        span.addEventListener('click', deleteCookiesAndShowForm);
        h1.appendChild(span);
        span.textContent = `(logout)`;
        document.body.appendChild(h1);
        hideForm();
    } else {
        showForm();
    }
}

// shopping cart example

const availableItems = ["Shampoo", "Soap", "Sponge", "Water"];
if (!window?.sessionStorage) {
    alert('Sorry, your browser does not support Web storage. Try again with a better one');
} else {
    createStore();
    displayCart();
}


function getCartFromSessionStorage() {
    let cart = {}
    if (sessionStorage.getItem('cart')) {
        cart = JSON.parse(sessionStorage.getItem('cart'));
    }
    return cart;
}

function addItemToCart(item) {
    const cart = getCartFromSessionStorage();
    if (cart[item]) {
        cart[item] += 1;
    } else {
        cart[item] = 1;
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function removeItemFromCart(item) {
    const cart = getCartFromSessionStorage();
    if (cart[item] === 1) {
        delete cart[item];
    } else {
        if (cart[item]) {
            cart[item] -= 1;
        }
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function clearCart() {
    sessionStorage.removeItem('cart');
    displayCart();
}

function createStore() {
    const h2 = document.createElement('h2');
    h2.textContent = 'Available products:';
    document.body.appendChild(h2);
    const ul = document.createElement('ul');
    document.body.appendChild(ul);
    for (const item of availableItems) {
        const li = document.createElement('li');
        li.textContent = item;
        li.addEventListener('click', () => addItemToCart(item));
        ul.appendChild(li);
    }

}

function displayCart() {
    let div = document.getElementById('cart');
    if (div) {
        document.body.removeChild(div);
    }
    div = document.createElement('div');

    div.id = 'cart';
    const h2 = document.createElement('h2');
    h2.textContent = 'Your cart:';

    const ul = document.createElement('ul');
    div.appendChild(h2);
    div.appendChild(ul);
    document.body.appendChild(div);
    const cart = getCartFromSessionStorage();
    if (Object.keys(cart).length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Your cart is empty';
        ul.appendChild(li);
    } else {
        for (const item in cart) {
            const li = document.createElement('li');
            li.textContent = `${item} (${cart[item]})`;
            li.addEventListener('click', () => removeItemFromCart(item));
            ul.appendChild(li);
        }
    }

}
