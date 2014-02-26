// Get a singleton reference to our books collection:
var myBooks = Alloy.Collections.books;

// Adds a new book to the collection and closes the current window
function addBookToCollection() {
    var book = new Apiomat.Book();
    book.setTitle($.titleInput.value);
    book.setAuthor($.authorInput.value);

	// Save the book on apiOmat
    book.save({
      onOk: function() {
        myBooks.add([{title: book.getTitle(), author: book.getAuthor()}]);
		myBooks.trigger('change');
    	$.addbook.close();
      },
      onError: function(error) {
        alert('Some error occured. '+ error.statusCode + ' --> ' + error.message);
    	$.addbook.close();
      }
    });
}