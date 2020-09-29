import data from './data.js'

const itemsContainer = document.getElementById('items')

for (let i=0; i<data.length; ++i) {
    let newDiv = document.createElement('div');
    newDiv.className = 'item'

    let img = document.createElement('img');
    img.src = data[i].image
    img.width = 300
    img.height = 300
    newDiv.appendChild(img)

    let desc = document.createElement('P')
    desc.innerText =data[i].desc
    newDiv.appendChild(desc)
    let price = document.createElement('P')
    price.innerText = data[i].price
    newDiv.appendChild(price)

    let button = document.createElement('button')
    button.id = data[i].name

    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)

    itemsContainer.appendChild(newDiv)
}

const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')
itemList.innerHTML = '<li> Hello World</li>'
console.log(itemList)

const cart = []

function addItem(name, price) {
    for (let i = 0; i < cart.length; i +=1) {
        if (cart[i].name === name) {
            cart[i].qty += 1
            return
        }
    }

    const item = {name, price, qty: 1}
    cart.push(item)
}

function showItems() {
    const qty = getQty()
    // console.log(`You have ${qty} items in your cart`)
    cartQty.innerHTML = `You have ${qty} items in your cart`

    let itemStr = ''
    for (let i = 0; i < cart.length; i += 1) {
        // console.log(`- ${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
        
        // {name:'Apple', price: 0.99, qty: 3}
        const {name, price, qty} = cart[i]

        itemStr += `<li> ${name} $${price} x ${qty} = ${qty * price}</li>`
    }
    itemList.innerHTML = itemStr

    // console.log(`Total in cart: $${getTotal()}`)
    cartTotal.innerHTML = `Total in cart: $${getTotal()}`
}

function getQty() {
    let qty = 0 
    for (let i = 0; i <cart.length; i +=1) {
        qty += cart[i].qty
    }
    return qty
}

function getTotal() {
    let total = 0
    for (let i = 0; i < cart.length; i +=1) {
        total += cart[i].price * cart[i].qty
    }
    return total.toFixed(2)
}

function removeItem(name, qty = 0) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            if (qty > 0) {
                cart[i].qty -= 1 
            }
            if (cart[i].qty < 1 || qty === 0) {
                cart.splice(i, 1)
            }
            return
        }
    }
}

addItem('Apple', 0.99)
addItem('Orange', 1.29)
addItem('Opinion', 0.02)
addItem('Frisbee', 9.92)

showItems()