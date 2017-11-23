<?php
get_header();
?>

<div class="container">
		<div class="list-area">
			<p class="list-para">DRAG and DROP</p>
		</div>
		<div class="draggable-area">
			<div class="draggable-area-desc">
				<textarea placeholder="Description" name="descriptionarea"/></textarea>
			</div>
			
			<div class="draggable-area-upload-image">
				<div id="usfileError"></div>
				<div id="dropImage" class="dash-border dropImage" ondragover="return false"><img id="leftImg" src="<?php bloginfo('template_url')?>/images/croparea.jpg" alt="image"/><h3>DRAG<br/>YOUR FILES HERE<br/><br/><span class="mid">______</span>OR<span class="mid">______</span><br/><br/><input type="file" name="file" id="file" class="inputfile" multiple/><label for="file">CHOOSE</label></h3></div>
				<div class="count"></div>
				<button id="myButton" type="button"><span class="plus">+</span> ADD FILES</button>	
				<div id="uploaded-holder" class="Upload-holder">
				<div id="dropped-files">
						<div id="imageGallery"><h3>Image Gallery</h3></div>	
						<div id="videoGallery"><h3>Video Gallery</h3></div>	
				</div>
				</div>
				
			</div>
			<div style="text-align:center">
						<input id="uploadbutton" type="button" value="UPLOAD"/>
			</div>
			
			<div class="about-temple-desc">
				<textarea id="textAbout" placeholder="About the Temple" name="aboutTempleArea" minlength="4" maxlength="100000"/></textarea>
				<p id="txt_area_error"></p>
				<p id="countValue"></p>
			</div>
			<div style="text-align:center">
				<input id="textLoad" type="button" value="UPLOAD"/>
			</div>
		</div>	
			
</div>

<?php get_footer(); ?>
