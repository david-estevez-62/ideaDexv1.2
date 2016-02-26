$(document).ready(function(){

	// document.getElementById("fileInput").onchange = function() {
 //    	document.getElementById("addPost").submit();
	// };

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}



var displayinput = true;

var overlay = document.getElementById('overlay');
overlay.style.opacity = .9;
var postdiv = document.getElementById('postDiv');
$("#showPostdiv").on('click', function(){
	if(window.pageYOffset > 300){
		if(displayinput === true){
			postdiv.style.visibility = "visible";
			overlay.style.display = "block";

			disableScroll();


			displayinput = false;
		} else if(displayinput === false){
			postdiv.style.visibility = "hidden";
			overlay.style.display = "none";

			enableScroll();

			displayinput = true;

		}
	}else{
		if(displayinput === true){
			postdiv.style.visibility = "visible";

		}else if(displayinput === false){
			postdiv.style.visibility = "visible";
			overlay.style.display = "none";
			displayinput = true;
		}
	}
})


document.onscroll = function(){
	if(window.pageYOffset<100 && displayinput === true){
		postdiv.style.visibility = "visible";
	}
}

////////////////////////////
// SignUp Page Validation //
////////////////////////////

	$('.createacct').on('click', function(e){
		e.preventDefault();

		var username = $('.loginusername').val();
		console.log(username)

		var password1 = $('.loginpassword1').val();
		var password2 = $('.loginpassword2').val();

		if (password1 === password2) {
			document.getElementById("createacct").submit();
		} else {
			console.log('do nothing')
		}

	})



////////////////////////////
// Password Typing status //
////////////////////////////
		// $('.loginpassword1').keyup(function() {
		// 	console.log($(this).context.value.length)
		// 	if(Number($(this).context.value.length) > 0){
		// 		$('.status')[0].innerHTML = "typing...";
		// 	} else if(Number($(this).context.value.length) == "") {
		// 		$('.status')[0].innerHTML = "Passwords are empty";
		// 	}
		// });
		// $('.loginpassword2').keyup(function() {
		// 	if(Number($(this).context.value.length) > 0){
		// 		$('.status')[0].innerHTML = "typing...";
		// 	} else if(Number($(this).context.value.length) == "") {
		// 		$('.status')[0].innerHTML = "Password are empty";
		// 	}
		// });

		$('.loginpassword1').keyup(function() {
			var password1 = $('.loginpassword1').val();
			var password2 = $('.loginpassword2').val();
			console.log(password1)

			if(Number($(this).context.value.length) > 0  && password1 === password2){
				$('.status')[0].innerHTML = "Password match";


			} else if (Number($(this).context.value.length) > 0) {
				$('.status')[0].innerHTML = "Passwords don't match";

				console.log('btn is not clickable until ')
			}
		});

		$('.loginpassword2').keyup(function() {
			var password1 = $('.loginpassword1').val();
			var password2 = $('.loginpassword2').val();
			console.log(password1)

			if(Number($(this).context.value.length) > 0  && password1 === password2){
				$('.status')[0].innerHTML = "Password match";


			} else if (Number($(this).context.value.length) > 0) {
				$('.status')[0].innerHTML = "Passwords don't match";

				console.log('btn is not clickable until ')
			}
		});


// show/hide(toggle) password
function togglePassword() {
	

	var pw1 = document.getElementsByClassName('loginpassword1');
	var pw2 = document.getElementsByClassName('loginpassword2');

	console.log(pw1)

	var togglePw = document.getElementById('togglePw');
	if(pw1[0].type == "password"){
		pw1[0].type = "text";
		pw2[0].type = "text";
		togglePw.value = "Hide pw";
	} else {
		console.log('hi')
		pw1[0].type = "password";
		pw2[0].type = "password";
		togglePw.value = "Show pw";
	}
}

$("#togglePw").on('click', function(){
	togglePassword()
})



  

	//remove focus and border on click of (post) input event
	$("#postinput").on('click', function(){
		$(this).addClass('noborder');
		console.log(document.title);
	});

	$("#upload").on('click', function(){
		$("#fileInput").click();
	});

	$('#searchbtn').on('click', function(){
		$("#searchform").submit();
	});

	// var uniqueId = 0;

	// submit idea to your wall
	//





	// $("#submit1").on('click', function(){


	// 	var postData = $("#postinput").val();
	// 	var date = Date();

	// 	// var postData2 = $('#upload').val();
	// 	// console.log(postData)

	// 	$('#postinput').removeClass('noborder')

	// 	$.post('/ideaPosted', {postData:postData, privacy: $('#myonoffswitch').is(':checked'), date:date} , function(data){
	// 		console.log(data.posts);

	// 		// console.log('test', data);

	// 		$(".ideaTable").prepend('<tr data-postid="'+data._id+'"><td data-postid2="'+data.username+'"><img src="/img/favoriteIcon.png" class="favorite" data-postid="'+data._id+'" data-cont="'+data.contents+'" height="35px" width="35px"></td><td data-postid2="'+data.username+'"><img src="/img/votearrow.jpg" alt="" useMap="#Map" /><map name="Map" id="Map"><area alt="" title="" shape="poly" coords="3,25,22,0,38,25" class="upvote" data-postid="'+data._id+'" /><h3 class="rating">'+0+'</h3><area alt="" title="" shape="poly" coords="40,63,21,90,4,63" class="downvote" data-postid="'+data._id+'" /></map><td class="ideaBody"><h3>'+postData+'</h3><h6>'+date+'</h6><h6>'+data.username+'</h6></td><td><a href="#" class="delete" data-postid="'+data._id+'">Remove</a></td>');


	// 	});

	// 	$('#postinput').val('');



	// 	// $(".ideaTable").prepend('<tr><td></td><td class="ideaBody"><h3>' + postData + '</h3></td><td><a class="delete">Remove</a></td></tr>');

	// });









	// $(".uploadTake").hover(function(){
	// 	// console.log("hi")
	// 	console.log($(this).parent())

	// 	$('.uploadTake').before('<input type="file" accept="image/*" id="upload">')
	// 	console.log($(this).closest('input'))
	// })
	$("#submit2").on('click', function(){


		var usersProf = $('h5').text()

		// if (uniqueId === 0) {
		// 	uniqueId++
		// }
		// uniqueId++
		// console.log(uniqueId);
		console.log(usersProf);


		$.post('/follow', {usersProf:usersProf} , function(data){
			console.log(data);
			$('#submit2').remove();

		});

		// $('#submit').remove();



	});

	// $(document).on("click", '.delete', function(){
	$('.delete').on('click', function(){


		var thisPost = $(this).attr('data-postid');

		// var table = $('tr').attr('data-postid');
		console.log($(this));


		$.post('/ideaRemoved', {thisPost:thisPost}, function(data){
			// console.log(remove);
			// console.log(data);
			// var remove = $(this).parent('tr');
			// console.log(remove);
			console.log(data);
			$(this).remove();


		})


	});


	$('.upvote').on('click', function(){
		var thisPost = $(this).attr('data-postid');

		var userPosted = $(this).parent().parent().attr('data-postid2');
		console.log(userPosted);

		console.log(thisPost);

		$.post('/upvote', {thisPost:thisPost, userPosted:userPosted}, function(data){
			console.log(data);
		})
	});

	$('.downvote').on('click', function(){
		var thisPost = $(this).attr('data-postid');

		var userPosted = $(this).parent().parent().attr('data-postid2');
		console.log(userPosted);

		console.log(thisPost);

		$.post('/downvote', {thisPost:thisPost, userPosted:userPosted}, function(data){
			console.log(data);
		})
	});


	$('.favorite').on('click', function(){
		var thisPost = $(this).attr('data-postid');
		var postCont = $(this).attr('data-cont');



		var post = postCont.split('');
		post.shift();
		post.shift();
		post.pop();
		post.pop();
		var postContent = post.join('');




		var userPosted = $(this).parent().attr('data-postid2');


		$.post('/favorite', {thisPost:thisPost, userPosted:userPosted, postContent:postContent}, function(data){
			console.log(data);
			// document.write(data)
		})

	})



	// Go to users profile that was clicked(Routes will depend whether friends or not)
	// $('#findProfile').on('click', function () {



	// })






})


// var ideaDelete = function(e){
//   e.preventDefault();

//   var originalIdeaElement = $(this).closest('.idea');
//   var targetId = originalIdeaElement.attr('data-id');

//   $.post('/ideaRemoved', {targetId: targetId}, function(dataFromServer){
//     // When a success response is sent back
//     originalIdeaElement.remove();
//   });
// };











// If searching through users then search through database





// // CLIENT-SIDE

// /**
//  * Handle submission of the new idea form
//  */
// var onIdeaSubmit = function(e){
//   // Prevent default submission behavior
//   e.preventDefault();

//   // Get data from form inputs:
//   //  The keys of this object need to match
//   //  up with the keys in our schema because
//   //  we are just directly storing the submitted
//   //  object into the database with req.body
//   //  on the server-side.
//   var newIdeaData = {
//     name: $('#idea-name').val(),
//     ABV: parseFloat($('#idea-abv').val()),
//     type: $('#idea-type').val(),
//     brewer: $('#idea-brewer').val()
//   };

//   // Reset the form easily
//   this.reset();

//   // Add validation here if necessary

//   // If the data is good, let's make an ajax call
//   $.post('/api/addIdea', newIdeaData, function(dataFromServer){
//     console.log('DataFromServer:', dataFromServer);

//     // Add the new idea to the list
//     // $('#idea-list').append(
//     //   '<li>' + dataFromServer.name + '</li>'
//     // );

//     // Clone the first idea in the list:
//     //  Works in a pinch, but if there are no beers
//     //  in the list to get, then this will fail
//     var newIdeaEl = $('.idea').first().clone();
//     newIdeaEl.find('strong').text(dataFromServer.name);
//     newIdeaEl.attr('data-id', dataFromServer._id);
//     $('#idea-list').append(newIdeaEl);
//   });
// };

// var ideaEdit = function(e){
//   e.preventDefault();

//   $('#edit-modal').modal('show');

//   var originalBeerElement = $(this).closest('.idea');
//   var targetId = originalBeerElement.attr('data-id');

//   $.get('/api/getIdea/' + targetId, function(dataFromServer){
//     $('#edit-modal .idea-name').val(dataFromServer.name);
//     $('#edit-modal .idea-abv').val(dataFromServer.ABV);
//     $('#edit-modal .idea-type').val(dataFromServer.type);
//     $('#edit-modal .idea-brewer').val(dataFromServer.brewer);
//     $('#edit-modal .idea-id').val(dataFromServer._id);
//   });
// };

// var ideaEditSubmit = function(e){
//   e.preventDefault();

//   var dataFromClient = {
//     name: $('#edit-modal .idea-name').val(),
//     ABV: $('#edit-modal .idea-abv').val(),
//     type: $('#edit-modal .idea-type').val(),
//     brewer: $('#edit-modal .idea-brewer').val()
//   };

//   var targetId = $('#edit-modal .idea-id').val();

//   $.post('/api/editIdea/' + targetId, dataFromClient, function(dataFromServer){
//     console.log(dataFromServer);

//     // Hide the modal in the end
//     $('#edit-modal').modal('hide');

//     // Update the on-page DOM element
//     $('[data-id="'+targetId+'"]')
//       .find('strong')
//       .text(dataFromServer.name);
//   });
// };

// ANGULAR CLIENT SIDE
// var newsApp = angular.module('newsApp',
//   ['ngResource', 'ngRoute']
// );

// // Configure our client-side routing
// newsApp.config(function($routeProvider){
//   $routeProvider
//     .when('/', {
//       templateUrl: '/templates/home',
//       controller: 'homeController'
//     })
//     .when('/acct/:id/1-4', {
//       templateUrl: '/templates/view',
//       controller: 'viewController'
//     });
// });


