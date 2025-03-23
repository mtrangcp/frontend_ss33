const products = [
    {
        id: 1,
        name: 'Điện thoại Samsung Galaxy A54',
        price: 7490000,
        image: 'https://cdn.tgdd.vn/Products/Images/42/335177/samsung-galaxy-a56-5g-green-thumb-600x600.jpg'
    },
    {
        id: 2,
        name: 'Laptop Dell Inspiron 15',
        price: 15990000,
        image: 'https://bizweb.dktcdn.net/100/446/400/products/laptop-dell-vostro-3490-1-gia-loc.jpg?v=1699258008053'
    },
    {
        id: 3,
        name: 'Tai nghe AirPods Pro',
        price: 4990000,
        image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836'
    },
    {
        id: 4,
        name: 'Đồng hồ thông minh Apple Watch',
        price: 8990000,
        image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MXM23ref_FV99_VW_34FR+watch-case-46-aluminum-jetblack-nc-s10_VW_34FR+watch-face-46-aluminum-jetblack-s10_VW_34FR?wid=752&hei=720&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=TnVrdDZWRlZzTURKbHFqOGh0dGpVRW5TeWJ6QW43NUFnQ2V4cmRFc1VnYUdWejZ5THhpKzJwRmRDYlhxN2o5aXB2QjR6TEZ4ZThxM3VqYkZobmlXM3RGNnlaeXQ4NGFKQTAzc0NGeHR2aVk0VEhOZEFKYmY1ZHNpalQ3YVhOWk9WVlBjZVFuazArV21YaFcvTVJ5dzR2eDMxaWg4TFhITTVrUW41Z084dENpYmZuSTdFUnErS0g3SWYxazQrNDdyRzE3K0tORmZaUy9vOVdqTEp2dmJNL3gwYlE3R0w4Z1RCbG9qQTd1MjYyL1owaE5aVCt2Ri82aDRacTg0bXlaZA'
    },
    {
        id: 5,
        name: 'Máy ảnh Canon EOS M50',
        price: 12490000,
        image: 'https://cdn.vjshop.vn/may-anh/mirrorless/canon/canon-eos-r50/black-18-45/canon-eos-r50-lens-18-45mm-500x500.jpg'
    },
    {
        id: 6,
        name: 'Loa Bluetooth JBL Flip 5',
        price: 2190000,
        image: 'https://bizweb.dktcdn.net/100/445/498/products/jbl-go-4-3-4-left-black-48178-x1.jpg?v=1732646465910'
    },
    {
        id: 7,
        name: 'Bàn phím cơ Logitech G Pro',
        price: 2490000,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1MvD76Mt-Ne0IC2DPMMsTZpG05xDxJOzkqw&s'
    },
    {
        id: 8,
        name: 'Chuột không dây Logitech MX Master',
        price: 1890000,
        image: 'https://product.hstatic.net/200000722513/product/h_mx_master_3_wireless__graphite_.jpg_1e5491e35f754dcc90b90582a9c3be95_ca0c63ca59de4ed1b4d46fcc5c81c1ed.png'
    }
];

let carts = [];

let listProducts = document.querySelector("#listProducts");
let itemCart = document.querySelector("#proInCart");
let totalAmout = document.querySelector("#totalAmout");

const renderData = () => {
    listProducts.innerHTML = "";

    let htmls = products.map((item) => {
        return `
            <div class="col text-center">
                <div class="card shadow" style="width: 18rem; height: 20rem">
                    <img src="${item.image}" class="card-img-top" alt="img" />
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text"  style="color: red; font-weight: bold;">${convertMoney(item.price)} </p>
                        <a href="#" onclick="addCart(${item.id})" class="btn btn-success" >Thêm vào giỏ hàng</a>
                    </div>
                </div>
            </div>
        `;
    })

    let converts = htmls.join("");
    listProducts.innerHTML = converts;
}

renderData();
renderCart();


function addCart(id) {
    let index = carts.findIndex(el => el.idProduct === id);

    if (index === -1) {
        let objCart = {
            idProduct: id,
            quantity: 1
        }
        carts.push(objCart);
    } else {
        carts[index].quantity++;
    }

    renderCart();
}

function renderCart() {
    itemCart.innerHTML = "";
    if (carts.length === 0) {
        itemCart.innerHTML = "<p>Giỏ hàng trống</p>";
        totalAmout.textContent = convertMoney(0);

    } else {

        let htmls = carts.map((item, index) => {
            for (let i = 0; i < products.length; i++) {
                if (products[i].id === item.idProduct) {

                    return `
                        <div class="item">
                            <div class="item-info">
                                <h5 class="card-title">${products[i].name}</h5>
                                <p style="color: red; font-weight: bold; text-align: start;"><span>${convertMoney(products[i].price)}</span> X <span>${item.quantity}</span></p>
                            </div>
        
                            <div>
                                <button class="btn btn-success" onclick="decreaseQuantity(${index})">-</button>
                                <span>${item.quantity}</span>
                                <button class="btn btn-success" onclick="increaseQuantity(${index})">+</button>
                                <button class="btn btn-danger" onclick="delCart(${index})">X</button>
                            </div>
                        </div>
                    `;
                }
            }
        });

        let convert = htmls.join("");
        itemCart.innerHTML = convert;

        let sum = sumCart();
        totalAmout.textContent = convertMoney(sum);
    }
}

function sumCart() {
    let sum = 0;
    for (const objcart of carts) {
        for (const objpro of products) {
            if (objcart.idProduct === objpro.id) {
                sum += objpro.price * objcart.quantity;
            }
        }
    }
    return sum;
}

function convertMoney(money) {
    return money.toLocaleString('vi', { style: 'currency', currency: 'VND' });
}

function payCart() {
    let sum = convertMoney(sumCart());
    alert(`Cảm ơn bạn đã mua hàng \n Tổng giá trị đơn hàng: ${sum}`);

    carts.length = 0;
    renderCart();
}

function decreaseQuantity(index) {
    carts[index].quantity--;

    if (carts[index].quantity === 0) {
        carts.splice(index, 1);
    }
    renderCart();
}

function increaseQuantity(index) {
    carts[index].quantity++;
    renderCart();
}

function delCart(index) {
    let name = "";
    for (const el of products) {
        if (el.id === carts[index].idProduct) name = el.name;
    }
    let check = confirm(`Có chắn chắn xóa sản phẩm "${name}" khỏi giỏ hàng?`);
    if (check) {
        carts.splice(index, 1);
        renderCart();
    }
}







