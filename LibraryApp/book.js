let myLibrary = [];
const newBook = document.getElementById("new-book-btn");
const addBook = document.getElementById("add-book-btn");
var booksTable = document.createElement("table");
booksTable.setAttribute("class", "table table-bordered");
booksTable.setAttribute("id", "show-books-table");
const newBtn = document.createElement("button");
var isNewBookFormVisible = false;

function addThead() {
    var tableDiv = document.getElementById("table-div");

    let thList = ["title", "author", "page", "Is Read?", "delete"];
    var header = booksTable.createTHead();
    var row = header.insertRow(0);
    for (let index = 0; index < thList.length; index++) {
        var cell = row.insertCell(index);
        cell.textContent = thList[index];
    }
    tableDiv.appendChild(booksTable);
}

newBook.addEventListener("click", () => {
    if (isNewBookFormVisible == false) {
        document.getElementById("add-new-book-form").style.display = "inline";
        isNewBookFormVisible = true;
    }
    else {
        document.getElementById("add-new-book-form").style.display = "none";
        isNewBookFormVisible = false;
    }
});

addBook.addEventListener("click", () => {
    //! add book to myLibrary from input text.   
    //TODO: Aynı kitaptan varsa myLibrary içinde yoksa ekle. 
    let title = document.getElementById("book-title").value;
    let author = document.getElementById("book-author").value;
    let pages = document.getElementById("book-pages").value;
    let isRead = document.getElementById("book-read").checked;

    (title === "" || author === "" || pages === "") ? alert("Please fill all fields.") : addBookToLibrary(title, author, pages, isRead);

});

//!Remove html table row and change read status
booksTable.addEventListener("click", (e) => {
    let clickedBook = e.target.id.slice(e.target.id.length - 1);
    (e.target.id === "delete-btn") ? e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode) :
        (e.target.textContent === "no") ? changeReadStatus(e.target, clickedBook, true) :
            (e.target.textContent === "yes") ? changeReadStatus(e.target, clickedBook, false) : console.log("click");
});

// function Book(title, author, page, isRead) {
//     this.title = title;
//     this.author = author;
//     this.page = page;
//     this.isRead = isRead;
// }

class Book {
    constructor(title, author, page, isRead) {
        this.title = title;
        this.author = author;
        this.page = page;
        this.isRead = isRead;
    }
}

function addBookToLibrary(bookTitle, author, page, isread) {
    var book = new Book(bookTitle, author, page, isread);
    if (isBookExist(book)) {
        alert("This book is exist. Please try to add another one.");
    }
    else {
        myLibrary.push(book);
        window.localStorage.setItem('Library', JSON.stringify(myLibrary));
        addNewBook();
    }
}

function isBookExist(newBook) {
    var isExist = false;
    for (let index = 0; index < myLibrary.length; index++) {
        (myLibrary[index].title === newBook.title) ? isExist = true : isExist = false;
    }
    return isExist;
}

function addNewBook() {
    let ind = myLibrary.length - 1;
    addBooksToTable(-1, ind);
}

function addBooksToTable(rowIndex, bookIndex) {
    let newBook = booksTable.insertRow(rowIndex);
    let bookValues = Object.values(myLibrary[bookIndex]);
    bookValues.push(newBtn);
    bookValues.map((val) => {
        let newCell = newBook.insertCell(bookValues.indexOf(val));
        if (val.nodeName != undefined) {
            var btn = document.createElement("button");
            addAttributesToElement(btn, "btn btn-danger", "delete-btn", "delete", val);
            newCell.appendChild(btn);
        }
        else if (val === false || val === true) {
            var btn = document.createElement("button");
            (val === true) ? addAttributesToElement(btn, "btn btn-success", "is-read-btn" + bookIndex, "yes") :
                addAttributesToElement(btn, "btn btn-warning", "is-read-btn" + bookIndex, "no");
            newCell.appendChild(btn);
        }
        else {
            let newCellText = document.createTextNode(val);
            newCell.appendChild(newCellText);
        }
    });
    booksTable.appendChild(newBook);
}

function changeReadStatus(element, bookId, readStatus) {
    myLibrary[bookId].isRead = readStatus;
    console.log(myLibrary[bookId]);
    (readStatus === true) ? addAttributesToElement(element, "btn btn-success", "is-read-btn" + bookId, "yes") : addAttributesToElement(element, "btn btn-warning", "is-read-btn" + bookId, "no");
}

function render() {
    addThead();
    for (let index = 0; index < myLibrary.length; index++) {
        addBooksToTable(index, index);
    }
}

function addAttributesToElement(element, classValue, idValue, textValue) {
    element.setAttribute("class", classValue);
    element.setAttribute("id", idValue);
    element.textContent = textValue;
}

function addBooks() {
    var book1 = new Book("Türlerin Kökeni", "Charles Darwin", 600, false);
    myLibrary.push(book1);
}

addBooks();
render();


