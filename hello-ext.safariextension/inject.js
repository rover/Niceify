function switchTab(tab) {
	$('.visible').removeClass('visible').addClass('hidden');
	$('#pane-'+tab).removeClass('hidden').addClass('visible');
	$('.tab-highlighted').removeClass('tab-highlighted').addClass('tab-normal');
	$('#tab-'+tab).removeClass('tab-normal').addClass('tab-highlighted');
}

function gather() {
	$('.ASTrackLi').each(function(i, e) {
		var newItem = {
			name: $('.ASTrackName', e).html(),
			artist: $('.ASArtistName', e).html(),
			time: $('.ASTrackTimeMS', e).html(),
			link: $('.ASTrackLink', e).html()
		};
		pageSongs.push(newItem);
	});
}


function startPlaying(i) {
	if (pageSongs.length<=0)
		gather();
		
	if (playing) {
		$('#current-song').html('');
		$('#ASTrack'+currentSong).removeClass('visible').addClass('hidden');
		currentSong = i;
		$('#ASTrack'+i).removeClass('hidden').addClass('visible');
		var iframe = document.createElement('iframe');
		iframe.height=0;
		iframe.width=0;
		iframe.src=pageSongs[i].link;
		//console.log('played link: '+pageSongs[i].name);
		$('#current-song').html(iframe);
		timer = setTimeout('startPlaying('+(i+1)+')', pageSongs[i].time);
	}
}

function stopPlaying() {
	clearTimeout(timer);
	playing == false;
}

var timer;

var pageAutoplay = false;
var playing = false;
var currentSong = 0;

var pageSongs = [];

if (localStorage.getItem('ASAutoplay')==='true') {
	playing = true;
	pageAutoplay = true;
	$('#check-autoplay').attr('checked', 'checked');
	//$('#btnPlay').src = safari.extension.baseURI+'buttons/finals/bluepauses.png';
	startPlaying();
}

$('#btnPlay').click(function(i, e) {
	playing = !playing;
	if (playing) { 
		//switch to pause button
		//e.src = 'safari-extension://com.apollicSoftware.Niceify-9NBDAAEKKY/d116eaab/external.js';
		
		//TODO: track song time on pause when player works better
		startPlaying(currentSong);
	} else {
		//e.src = 'safari-extension://com.apollicSoftware.Niceify-9NBDAAEKKY/d116eaab/buttons/finals/blueplays.png';
		stopPlaying();
	}
	
	
});

$('#btnBack').click(function() {
	var c = currentSong-1;
	if (c>=0) {
		stopPlaying();
		startPlaying(c);
	}
});

/*var ammo = [];
$('#btnAwesome').click(function(i, e) {
	//when this button is clicked, all your dreams come true. also you'll never be hungry or tired again.
	$(ammo).each(function() {
		useForEvil(this);
	});
	profit();
});*/

$('#btnForward').click(function() {
	var c = currentSong+1;
	if (c<=pageSongs.length) {
		stopPlaying();
		startPlaying(c);
	}
});

$('#btnStar').click(function() {
	//save song to some database yet to be created
});

$('#btnPrefs').click(function() {
	var container = document.getElementById('container');
	if ($(container).hasClass('start')) {
		$(container).removeClass('start').addClass('show');
	} else {
		$(container).toggleClass('hide').toggleClass('show');
	}
	switchTab('prefs');
});

//player toggles
$('#check-scroll').click(function() {
	if ($(this).attr('checked')) {
		localStorage.setItem('ASScrollPlay', 'true');
	}
});

$('#check-autoplay').click(function() {
	if (!pageAutoplay) {
		localStorage.setItem('ASAutoplay', 'true');
		startPlaying(0);
		//setTimeout('window.location.reload(true)', 1000);
	} else {
		localStorage.setItem('ASAutoplay', 'false');
		//stop or reload page
	}
	pageAutoplay = !pageAutoplay;
});




