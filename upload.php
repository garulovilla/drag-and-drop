<?php
	error_reporting( E_ALL );
	ini_set( 'display_errors', '1' );
	if( isset($_FILES['file']) ) {
		$fileName = $_FILES['file']['name'];
		$fileType = $_FILES['file']['type'];
		$fileSize = $_FILES['file']['size'];
		$destino = "uploads/" . $fileName;
		if ( move_uploaded_file( $_FILES['file']['tmp_name'], $destino ) ) {
			echo $fileName;
		} else {
			echo 'error';
		}
	} else {
		echo 'error';
	}
?>
