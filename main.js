//Adding an event listener for when the form is submitted
// document.getElementById('myForm').addEventListener('click',saveBookmark);


//Function to save the bookmark
function saveBookmark(e){
 
 //Get form values
 var siteName = document.getElementById('siteName').value;
 var siteUrl = document.getElementById('siteUrl').value;

 
if (!validateForm(siteName,siteUrl)) {

	return false;
}


 var bookmark = {
 	name : siteName,
 	url : siteUrl
 }
	
// //Local storage test
// localStorage.setItem('test',"Hello world");
// console.log(localStorage.getItem('test'));
// localStorage.removeItem('test');
// console.log(localStorage.getItem('test'));



  if(localStorage.getItem('bookmarks') === null){
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  else{
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
   bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }


//Clear form
document.getElementById('myForm').reset();

//Re-fetch bookmarks
fetchBookmarks();

 // Prevent form from submitting
  e.preventDefault();
}




//Deleting the bookmarks
function deleteBookmark(url) {

//Get bookmark from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

//Looping through the bookmarks and removing from array
for (var i = 0; i < bookmarks.length; i++) {
  
  if (bookmarks[i].url == url) {

  	bookmarks.splice(i, 1);

  }
 // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  }  

//Re-fetch bookmarks
fetchBookmarks();

}


function fetchBookmarks() {

	// Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    console.log(bookmarks);

    //Get output id
    var bookmarkList = document.getElementById('bookmarkList');

    //Build output
    bookmarkList.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
    	
    	var name = bookmarks[i].name;
    	var url = bookmarks[i].url;

    	bookmarkList.innerHTML += 
                                  '<tr>'+
                                  '<td><span style="font-size:15px;text-transform:capitalize;">'+name+'</span></td>'+
                                  '<td><a class ="btn btn-primary btn-sm"  target="_blank" href="'+addhttp(url)+'">Visit Site</a></td>'+
                                  '<td><a onclick="deleteBookmark(\''+url+'\')" class ="btn btn-danger btn-sm" href="#">Delete</a></td>'+
                                  '</tr>'

                                  

}


}


function validateForm(siteName,siteUrl) {

//Form validation
if (!siteName || !siteUrl) {
	window.alert("Please enter the details");
	return false;
}



var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

if (!siteUrl.match(regex)) {
	alert("Enter a valid url");
	return false;
}

return true;

}

function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "http://" + url;
  }
  return url;
}
