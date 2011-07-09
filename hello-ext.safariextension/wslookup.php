<?php

$id = $_REQUEST['id'];
$apiUrl = "http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/wa/wsLookup?id=".$id;

$c = curl_init();
curl_setopt($c, CURLOPT_URL, $apiUrl);
curl_setopt($c, CURLOPT_HEADER, false);

// make the call
$content = curl_exec($c);
echo $content;
curl_close($c);
?>