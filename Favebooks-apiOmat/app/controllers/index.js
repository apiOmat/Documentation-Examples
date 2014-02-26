// Get a singleton reference to our books collection:
var myBooks = Alloy.Collections.books;

signup();

function signup()
{
	var user = new Apiomat.User();
	user.setUserName("user@example.com");
	user.setPassword("pw");
	Apiomat.Datastore.configure(user);
	
	var saveCB = {
		onOk: function() {
			alert('Saved user successfully');
			loadBooks();
		},
		onError: function(error) {
			alert('Some error occured. ' + error.statusCode + ' --> ' + error.message);
		}
	};
	user.loadMe({
		onOk: function() {
			alert('Successfully logged in');
			loadBooks();
		},
		onError: function(error) {
			alert('User doesn\'t exist. Will create new one...');
			user.save(saveCB);
		}
	});
}

// gets all books from the backend
function loadBooks() {
	// filter if you want to. Like: "Apiomat.Book.getBooks('author=="Author Newman"', ..."
	Apiomat.Book.getBooks(undefined, {
		onOk: function(loadedBooks) {
			myBooks.reset();
			if (typeof loadedBooks !== 'undefined')
			{
				for (var i=0; i < loadedBooks.length; i++) {
					myBooks.add([{title: loadedBooks[i].getTitle(), author: loadedBooks[i].getAuthor()}]);
				}
			}
			myBooks.trigger('change');
		},
		onError: function(error) {
			alert('Can\'t load list: '+ error.statusCode + ' --> ' + error.message);
		}
	});
}

function showBook(event) {
	var selectedBook = event.source;
	var args = {
		title : selectedBook.title,
		author : selectedBook.author
	};
	var bookview = Alloy.createController("bookdetails", args).getView();

    if (OS_IOS) {
        $.navGroupWin.openWindow(bookview);
    }
    if (OS_ANDROID) {
        bookview.open();
    }
}

function addBook(){
    var myAddBook = Alloy.createController("addbook",{}).getView();
    if (OS_IOS) {
        $.navGroupWin.openWindow(myAddBook);
    }
    if (OS_ANDROID) {
        myAddBook.open();
    }
}

// Open main window
if(OS_IOS) { 
   $.navGroupWin.open(); 
} 
if (OS_ANDROID) { 
   $.index.open(); 
}