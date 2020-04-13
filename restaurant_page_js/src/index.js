//import _ from 'lodash';
//import myName from './myName';

/*Element Definitions */
const content = document.getElementById("content");
/*Page Rendering Buttons*/
let menuBtnText = 'MENU'.split("").join("<br/>");
let menuBtn = createElementsWithAttributes("button", "btn-menu", "animated fadeInUp", menuBtnText, "");
let aboutusBtnText = 'ABOUT US'.split("").join("<br/>");
let aboutusBtn = createElementsWithAttributes("button", "btn-aboutus", "animated fadeInDownBig", aboutusBtnText, "");
let main = document.createElement("main");
main.setAttribute("class", "grid");
/*BR element */
let br = document.createElement("br");

/*MENU PAGE */
let btn_brunch = createElementsWithAttributes("a", "btn-brunch", "", "Brunch", "");
let btn_dessert = createElementsWithAttributes("a", "btn-dessert", "", "Dessert", "");
let btn_dinner = createElementsWithAttributes("a", "btn-dinner", "", "Dinner", "");
let menuDiv = document.createElement("div");
menuDiv.appendChild(btn_brunch);
menuDiv.appendChild(btn_dessert);
menuDiv.appendChild(btn_dinner);

function insertHomePage() {
    let about_us_title = createElementsWithAttributes("h1", "about-us-title", "", "thinkVEGAN", "");
    let restaurantImageDiv = createElementsWithAttributes("div", "restaurant-image-div", "animated fadeInDown", "", "");
    let restaurantImage = createElementsWithAttributes("img", "restaurant-image", "", "", "");
    restaurantImage.setAttribute("src", "/img/lunch-table-5929.jpg");
    restaurantImageDiv.appendChild(restaurantImage);
    let about_us = createElementsWithAttributes("p", "about-us", "", "Welcome to think Vegan. Established in 2017, we are popular with our desserts and brunches. Duis eu faucibus justo. Donec laoreet scelerisque feugiat. Etiam quis consectetur risus, quis posuere enim. Aenean blandit lacus id justo molestie, vel viverra diam tempus. In ultricies, lacus nec aliquam varius, mauris elit aliquet mauris, in lobortis lacus lorem a ex. Donec in faucibus arcu.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.", "");
    let about_us_div = createElementsWithAttributes("div", "about-us-div", "", "", "");
    /*Footer Elements */
    let footer = document.createElement("footer");
    let address = document.createElement("address");
    address.textContent = "67 Osborne Road ,KINGSCOTT , EX38 8XY";
    let phoneIcon = document.createElement("i");
    phoneIcon.setAttribute("class", "fa fa-phone");
    let phoneNumber = createElementsWithAttributes("span", "p-no", "", "&nbsp;079 2038 0756", "");
    let mailIcon = document.createElement("i");
    mailIcon.setAttribute("class", "fa fa-envelope");
    let mail = createElementsWithAttributes("a", "mail-address", "", "&nbsp;info@thinkvegan.com", "#mail");
    let insta = createElementsWithAttributes("a", "insta", "", "", "#instagram");
    let instaIcon = createElementsWithAttributes("i", "insta-icon", "fab fa-instagram fa-2x", "", "");
    insta.appendChild(instaIcon);
    let faceBook = createElementsWithAttributes("a", "face", "", "", "#face");
    let faceBookIcon = createElementsWithAttributes("i", "facebook-icon", "fab fa-facebook fa-2x", "", "");
    faceBook.appendChild(faceBookIcon);

    /*Footer */
    footer.appendChild(address);
    footer.appendChild(phoneIcon);
    footer.appendChild(phoneNumber);
    footer.appendChild(mailIcon);
    footer.appendChild(mail);
    footer.appendChild(br);
    footer.appendChild(insta);
    footer.appendChild(faceBook);

    about_us_div.appendChild(about_us_title);
    about_us_div.appendChild(about_us);

    content.appendChild(restaurantImageDiv);
    content.appendChild(about_us_div);
    content.appendChild(menuBtn);
    content.appendChild(footer);
}

function insertMenuPage() {
    content.style.overflowY = "auto";
    content.style.overflowX = "hidden";
    content.appendChild(menuDiv);
    content.appendChild(btn_brunch);
    content.appendChild(btn_dessert);
    content.appendChild(btn_dinner);
    content.appendChild(aboutusBtn);
    content.appendChild(main);
}

function createElementsWithAttributes(element, id, elemClass, text, href) {
    let elem = document.createElement(element);
    elem.setAttribute("id", id);
    elem.setAttribute("class", elemClass);
    elem.innerHTML = text;
    if (href != "") {
        elem.setAttribute("href", href);
    }
    return elem;
}

//Örnek: makeFoodCard(brunch-1,brunch/pancake.jpg,Pancake,ingredients);
function makeFoodCard(foodImgUrl, foodName, ingredients) {
    let article = document.createElement("article");
    let img = document.createElement("img");
    img.setAttribute("src", foodImgUrl);
    img.setAttribute("alt", foodName);
    let div = document.createElement("div");
    div.setAttribute("class", "text");
    let h3 = document.createElement("h3");
    h3.textContent = foodName;
    let p = document.createElement("p");
    p.textContent = ingredients;
    div.appendChild(h3);
    div.appendChild(p);
    article.appendChild(img);
    article.appendChild(br);
    article.appendChild(div);
    return article;
}

menuBtn.addEventListener("click", (e) => {
    content.innerHTML = "";
    insertMenuPage();
});

aboutusBtn.addEventListener("click", () => {
    content.innerHTML = "";
    insertHomePage();
});

btn_brunch.addEventListener("click", () => {
    main.innerHTML = "";
    let brunch_1 = makeFoodCard("/img/brunch/pancake.jpg", "PANCAKE", "flour,sugar,baking powder,baking soda,egg whites,melted butter");
    let brunch_2 = makeFoodCard("/img/brunch/basil.jpg", "BASIL", "basil ingredients");
    let brunch_3 = makeFoodCard("/img/brunch/assorted-foods.jpg", "FRUIT CUP", "pecan halves,cornstratch,honey,olive-oil");
    main.appendChild(brunch_1);
    main.appendChild(brunch_2);
    main.appendChild(brunch_3);
});

btn_dessert.addEventListener("click", () => {
    main.innerHTML = "";
    let dessert_1 = makeFoodCard("/img/desserts/bowl_banana_rice.jpg", "BANANA AND RICE", "");
    let dessert_2 = makeFoodCard("/img/desserts/dessert-1.jpg", "FRUIT YOUGURT MIX", "berries,yougurt,nut");
    let dessert_3 = makeFoodCard("/img/desserts/pumpkin.jpg", "PUMPKIN DESSERT", "pumpkin,cream,milk");
    main.appendChild(dessert_1);
    main.appendChild(dessert_2);
    main.appendChild(dessert_3);
});

btn_dinner.addEventListener("click", () => {
    main.innerHTML = "";
    let dinner_1 = makeFoodCard("/img/dinner/cheeseburger.jpg", "CHEESEBURGER", "");
    let dinner_2 = makeFoodCard("/img/dinner/pasta.jpg", "PASTA", "pasta ingredients");
    let dinner_3 = makeFoodCard("/img/dinner/pizza.jpg", "VEGAN PIZZA", "vegan pizza ingredients");
    main.appendChild(dinner_1);
    main.appendChild(dinner_2);
    main.appendChild(dinner_3);
});


insertHomePage();



