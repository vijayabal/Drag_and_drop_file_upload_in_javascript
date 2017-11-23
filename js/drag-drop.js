var dataArray = [];  // data URIs and add them in an array
var maxFiles = 25;   // number of images or video files to display
var img = 0, vid = 0, usup = 0; //Image, video and Unsupported file count
var imgVideoDataList = []; //Total Image and Video files count
var imageFileList = [], videoFileList = [];
var oldfilename; // Image and Video files alone
var base64img;
$(document).ready(function() {
	//Ajax call
	
	
	//Scroll top to image drop area
	var draged = true;
	$(document).on('dragover', function(e){
		e.preventDefault();
		if (draged == true){
			$('html, body').animate({
					scrollTop: $(".dropImage").position().top
			}, 500, function(){
				draged = true;
			});
			draged = false;	
		}
	});
	
	
	jQuery.event.props.push('dataTransfer'); //Drag and Drop set event
	var inputFile = document.getElementById('file'); //input file type element
	var button = $('#myButton'); //Add files button
	// Code for choose file from input file type
	// Choose files directly from folder
	$(document).delegate('#file', 'change', function(e) {
			var eventType = "InputFile";
			var newFiles = e.target.files;
			addFiles(newFiles,eventType);
	});
	
	//Add files enabled after choose execution
	button.click(function() {
		 inputFile.click();
	});
	// Code for Drag and Drop	
	// Execute drop event to the dropzone.
	$('#dropImage').on('drop', function(e) {
		e.preventDefault();
		var eventType = "DropFile";
		var filesList = e.dataTransfer.files;
		addFiles(filesList,eventType);
	});
		
	$('#dropImage').bind('dragenter', function() {
		$(this).css({'box-shadow':'inset 0px 0px 20px rgba(0, 0, 0, 0.1)', 'border':'4px dashed #bb2b2b'});
		return false;
	});
	
	$('#dropImage').bind('drop', function() {
		$(this).css({'box-shadow':'none', 'border' :'4px dashed rgba(0,0,0,0.2)'});
		return false;
	});
	
	if(window.localStorage.length > 0) {
		$('#uploaded-files').show();
		for (var t = 0; t < window.localStorage.length; t++) {
			var key = window.localStorage.key(t);
			var value = window.localStorage[key];
			// Append the list items
			if(value != undefined || value != '') {
				$('#uploaded-files').append(value);
			}
		}
	} else {
		$('#uploaded-files').hide();
	}  
	
	//Textarea Validation
	$("#textAbout").on("blur", function(){
		var minlen = $("#textAbout").attr("minlength");
		var maxlen = $("#textAbout").attr("maxlength");
		var text_length = $('#textAbout').val().length;
		if(minlen > text_length || maxlen < text_length){
			$("#txt_area_error").css("display", "block");
			$("#countValue").css("display", "none");
			$("#txt_area_error").html("Character count must be between 4 to 1,00,000 characters!");
			$('#textAbout').focus();
		}
		if(!$('#textAbout').val().replace(/\s/g, '').length){
				$("#txt_area_error").css("display", "block");
				$("#countValue").css("display", "none");
				$("#txt_area_error").html("Description only contains spaces. Please provide valid content!");
				$('#textAbout').focus();
			}
	});
	
	$("#textAbout").on("keyup", function(){
		 var text_len = $('#textAbout').val().length;
		 var text_maxlen = $("#textAbout").attr("maxlength");
		 var text_left = text_maxlen - text_len;
		 if(text_left >= 1){
			$("#txt_area_error").css("display", "none");
			$("#countValue").css("display", "block");
			text_left = text_left.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			$('#countValue').html(text_left + ' Characters left');
		}else if(text_left <= 0){
			$("#txt_area_error").css("display", "block");
			$("#countValue").css("display", "none");
			$("#txt_area_error").html("You have reached 1,00,000 characters!");
		}else{
			$("#txt_area_error").css("display", "none");
			$("#countValue").css("display", "block");
		}
	});
	
	$("#textAbout").on("focus", function(){
		$(".about-temple-desc").css("border", "1px solid #c8c8e4");
	});
	$("#uploadbutton").on("click", function(e){
		e.preventDefault();
		$.ajax({
			url: "http://10.1.0.255:8080/wp_new_page/wp-content/themes/twentyseventeen/mysqlconnection.php", 
			type: "POST", 
			data: {action : 'my_ajax',
					id: "Vijayabal"}, 
			success: function(id)
				{
				console.log("Success" + id);
				}
				
			});
	});
});
function rename(e){
		
		$(e).siblings("input.filename").removeAttr("disabled");
		oldfilename = $(e).siblings("input.filename").val();
		$(e).siblings("input.filename").focus();
}
function renameValidation(e, filename){
		var renameVal = $(e).val();
		if($(e).val()!="" && !/\s/.test(renameVal)){
			
			if(renameVal==oldfilename){
			
					$(e).siblings('#errValue').html('Keeping same name!');
					$(e).siblings('#errValue').css('display', 'block'); 
					$(e).siblings('#errValue').delay(1000).fadeOut();
					$(e).attr("disabled", "disbaled");
				
					
				
			}else{
					$(e).siblings('#errValue').html('Renamed successfully!');
					$(e).siblings('#errValue').css('display', 'block'); 
					$(e).siblings('#errValue').delay(1000).fadeOut();
					$(e).attr("disabled", "disbaled");
				
				
			}		
		}else{
			
				$(e).siblings('#errValue').html('Please enter valid name!');
				$(e).siblings('#errValue').css('display', 'block');
				$(e).removeAttr("disabled");
				$(e).focus();
			
		}
		
		return (function(){
				return oldfilename=renameVal;
			})();
			
	}
	  
//Remove file from uploader list
function removeFiles(element) {
	var removeTxt = "Selected file has been removed from upload list!";
	var removeImage = templateUrl+"/images/remove.png";
	var	topVal = $(element).parent().position().top;
	$(element).parent().remove();
	//Image and Video file remove from fileList
	imageFileList.length = $('#imageGallery > .image-grid').length;
	videoFileList.length = $('#videoGallery > .image-grid').length;
	imgVideoDataList.length = (imageFileList.length) + (videoFileList.length);
		//Show Drag and Drop and hide upload holder if uploader is empty
		if($('#imageGallery > .image-grid').length == 0 && $('#videoGallery > .image-grid').length == 0){
			$('#uploaded-holder').hide();
			$('#dropImage').css('display', 'block');
			$('#myButton').css('display', 'none');
			$('#imageGallery').hide();
			$('#videoGallery').hide();
			$('input[type=file]').val('');
			imgVideoDataList.length=0;
		}else if($('#imageGallery > .image-grid').length == 0){
			$('#imageGallery').hide();
		}else if($('#videoGallery > .image-grid').length == 0){
			$('#videoGallery').hide();
		}
		errorMsg(removeTxt, removeImage, topVal);	
		
}
function errorMsg(errorTxt, imageUrl, marginTop){

		$('.draggable-area-upload-image div.count').css('display', 'block');
		$('.draggable-area-upload-image div.count').css({'background-image':'url(' + imageUrl + ')','top': marginTop-80 +'px','z-index':'99999'});
		$('.draggable-area-upload-image div.count').html(errorTxt);
		
		$('.draggable-area-upload-image div.count').delay(3000).fadeOut();
}
function addFiles(files, eveType){
	// Show the upload file holder
		$('#uploaded-holder').show();
		// Each dropped files execution
		$.each(files, function(index, file) {
		// FileReader - execution starts
			var fileReader = new FileReader();
				fileReader.onload = (function(file) {				
					return function(e) { 
						// Push the data into an array
						dataArray.push(files[index]);
						var image = this.result;
						var video = this.result
										
						//Check if load file is image or video
						if(files[index].type.match('image/jpeg')||files[index].type.match('image/png')){
							img++;
							imgVideoDataList.push(files[index]);
							imageFileList.push(files[index]);
						}else if(files[index].type.match('video.*')){
							vid++;
							imgVideoDataList.push(files[index]);
							videoFileList.push(files[index]);
						}else{
							usup++;						
						}
						//Find unsupporetd files  and show error message
						if(usup > 0){
							$('#usfileError').css('display', 'block');
							$('#usfileError').html('You have selected '+ usup +' unsupported files. We skip that from your selection!');
							$('#usfileError').delay(3000).fadeOut();							
						}else{
							$('#usfileError').css('display', 'none');
						}
						//Show success message
						if(imgVideoDataList.length == 1) {
							var successTxt = "Successfully! 1 file has been added";
							var successImage = templateUrl+"/images/add.png";
							var topVal = $('#dropped-files').position().top + 50;
							errorMsg(successTxt, successImage, topVal);
						}else if(imgVideoDataList.length > 1){
							var successTxt="Successfully! "+imgVideoDataList.length+" files has been added";
							var successImage = templateUrl+"/images/add.png";
							errorMsg(successTxt, successImage, topVal);
						}else{
							imgVideoDataList.length=0;
							$('.draggable-area-upload-image div.count').css('display','none');
						}
						// Limit exceed files in a list
						if(files[index].type.match('image/jpeg')||files[index].type.match('image/png')){
							if($('#dropped-files > .image-grid').length < maxFiles) { 
								// add the image inside the dropzone
								var fname = files[index].name;
								var	fname1 = fname.substring(0, fname.lastIndexOf('.'));
								var	ftype = fname.substring(fname.lastIndexOf('.'));
								$('#dropped-files #imageGallery').append('<div class="image-grid"><img id="blah" src='+image+' alt="uploadedImage"/><span class="closeImg" onclick = "removeFiles(this)"></span><div class="info"><p><strong>Name</strong>: <input onblur="renameValidation(this, this.value)" class="filename" type="text" value="'+fname1+'" name="fileName" disabled/><span class="fileEdit" onclick="rename(this)">&nbsp;&nbsp;&nbsp;</span><br/><span id="errValue"></span><strong>Type</strong>: '+files[index].type+'<br/><strong>Size</strong>: '+(files[index].size/1024).toFixed(2)+' kb</div></div>'); 
								$('#dropped-files #imageGallery').show();
								files[index].name = $(".filename").val()+"."+ftype;
								
								}
						}else if(files[index].type.match('video.*')){
							if($('#dropped-files > .image-grid').length < maxFiles) { 
								// add the video file inside the upload area
								var fname = files[index].name;
									fname = fname.substring(0, fname.lastIndexOf('.'));
									
								$('#dropped-files #videoGallery').append('<div class="image-grid"><video width="175" height="160" controls><source src='+video+' type='+files[index].type+'></video><span class="closeVideo" onclick = "removeFiles(this)"></span><div class="info"><p><strong>Name</strong>: <input onblur="renameValidation(this, this.value)" class="filename" type="text" value="'+fname+'" name="fileName" disabled/><span class="fileEdit" onclick="rename(this)">&nbsp;&nbsp;&nbsp;</span><br/><span id="errValue"></span><strong>Type</strong>: '+files[index].type+'<br/><strong>Size</strong>: '+(files[index].size/1024/1024).toFixed(2)+' MB</div></div>');
								$('#dropped-files #videoGallery').show();
							}
						}
					}; 
				})(files[index]);
			fileReader.readAsDataURL(file);
			
		});
		usup=0;
		
		if(eveType="InputFile"){
			$('#dropImage').css('display', 'none');
			$('#myButton').css('display', 'block');
		}
}	
