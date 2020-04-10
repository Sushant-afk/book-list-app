class Book
{
    constructor(title,author,isbn)
    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
var button = document.querySelector('#add-button');
const table = document.querySelector('#table-body');
var books = [];


function displayBooks(key)
{ 

    if(localStorage.getItem(key) === null)
    {
      // do nothing
    }

    else
    {   
      const storedbooks = JSON.parse(localStorage.getItem(key));
      storedbooks.forEach(book => {
          books.push(book);

          let row = document.createElement('tr');
        
          row.innerHTML = `
         
           <td align = "center">${book.title}</td>
           <td align = "center">${book.author}</td>
           <td align = "center">${book.isbn}</td>
           <td align = "center"><button class = "delete">Remove</button></td>
          `;
  
          table.append(row);   
          
          
      });
      
    }
}
document.addEventListener('DOMContentLoaded',displayBooks("Books"));
// displayBooks("Books");

function showAlert(message, className) {
  const div = document.createElement('div');
  div.className = `alert-${className}`;
  div.classList.add('alert');
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);

  // Vanish in 3 seconds
  setTimeout(() => document.querySelector('.alert').remove(), 2000);
}


button.addEventListener('click',(event) => {

    event.preventDefault();

    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const isbn = document.getElementById('isbn').value;

    if(title === '' || author === '' || isbn === '') {
      showAlert('Please fill in all fields', 'danger');
    } 

    else
    {
        let row = document.createElement('tr');
        
        row.innerHTML = `
         <td align = "center">${title}</td>
         <td align = "center">${author}</td>
         <td align = "center">${isbn}</td>
         <td align = "center"><button class = "delete">Remove</button></td>
        `;

        table.append(row);
        showAlert('Book added!','success');

        let book = new Book(title,author,isbn);
        books.push(book);

        localStorage.setItem("Books",JSON.stringify(books));
        
    }

    document.getElementById('author').value = "";
    document.getElementById('title').value = "";
    document.getElementById('isbn').value = "";


});

table.addEventListener('click', (e) => {

    if(e.target.classList.contains('delete'))
    {
      //Remove from UI
        e.target.parentElement.parentElement.remove();

     // Remove from local storage 
      const storedbooks = JSON.parse(localStorage.getItem("Books"));

      storedbooks.forEach((book,index) =>{
        if(book.isbn === e.target.parentElement.previousElementSibling.textContent)
        {
           storedbooks.splice(index,1);
          
        }
        localStorage.setItem("Books",JSON.stringify(storedbooks));
      });

      showAlert('Book removed!','danger');
  
    }

})
