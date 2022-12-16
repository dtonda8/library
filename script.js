const formDiv = document.querySelector('#add-book-div');
const pageMaskDiv = document.querySelector('#page-mask');
const submitBtn = document.querySelector('#submit');
const haveReadInput = document.querySelector('#has-read-it');
const grid = document.querySelector('#grid-display');
const addBookBtn = document.querySelector('#add-book')

function toggleBookPopUp() {
    formDiv.classList.toggle('unactive');
    pageMaskDiv.classList.toggle('unactive');
}

addBookBtn.addEventListener('click', toggleBookPopUp)

let books = {};

function inputsValid(event) {
    event.preventDefault();

    let inputs = Array.from(document.querySelectorAll('.input'));

    for (let input of inputs) {
        if (input.value.trim() === '') {
            alert(`${input.placeholder} is invalid`);
            return false
        }
    }
    let bookObj = {};
    [bookObj.title, bookObj.author, bookObj.pages] = inputs.map(input => input.value.trim());
    bookObj.isRead = document.querySelector('#has-read-it').checked;

    if (books[bookObj.title]) {
        alert(`${bookObj.title} is already here`);
        return false;
    }

    // clear previous values on text inputs
    inputs.forEach(input => input.value = '')

    books[bookObj.title] = bookObj;
    addBookToGrid(bookObj)
    toggleBookPopUp();
    return true;
}

submitBtn.addEventListener('click', inputsValid)

function removeBook(event) {
    let bookTitle = event.target.id.split('-')[0]; 
    let cardToDelete = document.getElementById(`${bookTitle}-card`);
    cardToDelete.remove();
    delete books[bookTitle];
}

function changeRead(e) {
    let bookTitle = e.target.id.split('-')[0]; 
    books[bookTitle].isRead ? e.target.textContent = "Not read" : e.target.textContent = "Read";
    books[bookTitle].isRead = !books[bookTitle].isRead;
}

function addBookToGrid(bookObj){
    let card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', `${bookObj.title}-card`)
    console.log(`${bookObj.title}-card`)

    let title = document.createElement('div');
    title.textContent = bookObj.title;

    let author = document.createElement('div');
    author.textContent = bookObj.author;

    let pages = document.createElement('div');
    pages.textContent = bookObj.pages;

    let readBtn = document.createElement('button');
    if (bookObj.isRead) {
        readBtn.textContent = "Not read";
    } else readBtn.textContent = "Read";

    readBtn.setAttribute('id', `${bookObj.title}-read`)
    readBtn.addEventListener('click', changeRead)

    let removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.setAttribute('id', `${bookObj.title}-remove`)
    removeBtn.addEventListener('click', removeBook)

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(readBtn);
    card.appendChild(removeBtn);

    grid.appendChild(card)
}
