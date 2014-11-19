//var domain = "http://www.inyourhands.com.mx/";
//var domain = "http://inyourhands.com.mx/";
//var domain = "http://iyh.local/";
var domain = "http://www.inyourhands.com.mx/";

var map = false;
var NegocioCenter = false;
var directionsDisplay = false;
var directionsService = false;
 var watchID = null;
document.addEventListener("deviceready", onDeviceReady(), false);

	

function success(position){
	alert('Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />');
}
function error(error){
	alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
}
function carrouselStart(e){ 
	if(typeof e.touches != 'undefined'){
		point = e.touches[0]; 
		pointStartX = point.pageX; 
		pointStartY = point.pageY; 
		null; 
	}
 }
function carrouselMove(e){
	if(typeof point != 'undefined'){
		deltaX = Math.abs(point.pageX - pointStartX); 
		deltaY = Math.abs(point.pageY - pointStartY); 
		if (deltaX >= deltaY) { 
			e.preventDefault(); 
		} else { 
			null; 
		} 
	}
}
function onDeviceReady(){
	/*if (navigator.geolocation) { 
		alert('Nav on');
		setTimeout(function(){
		navigator.geolocation.getCurrentPosition(function(position){
			alert("success " + position.coords.latitude + ' , ' + position.coords.longitude)
		}, function(error){
			alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
		},
		{enableHighAccuracy:true});
		}, 600);
	}else{
		alert('Nav off');
	}
	
	*/
	main.init();
	/*$.mobile.loading( 'show', {
		text: 'Loading',
		textVisible: true,
		theme: 'e',
		html: ""
	});*/
	setTimeout(function(){
		//navigator.splashscreen.hide();
	}, 500);
	
	
	
	$(document).ready(function() {
		//var options = { timeout: 30000 };
		//watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
		//$('#mainpage').hide();

		$('.container .details .links .ui-link').live('click',function(e){
			e.preventDefault();
		});
		$('.moreOptions').live('click',function(e){
			e.preventDefault();
			if(!$(this).hasClass('on')){
				$('.moreOptions').addClass('on');
				$('.footer .ui-grid-c').animate({height:'50px'},{duration:200,queue:false});
			}else{
				$('.moreOptions').removeClass('on');
				$('.footer .ui-grid-c').animate({height:'0px'},{duration:200,queue:false});
			}
		});
		$('.footer .ui-link').click(function(){
			$('.footer .ui-grid-c').animate({height:'0px'},{duration:200,queue:false});
		});
		/*$('.footer .lineFooter .classified').click(function(e){
			e.preventDefault();
			$('.footer .ui-grid-c').animate({height:'0px'},{duration:200,queue:false});
			main.searchListing('','C',false,'');
			$.mobile.loading( 'show', {
				text: 'Loading',
				textVisible: true,
				theme: 'e',
				html: ""
			});
		});*/
		$('.phonelisting').live('click',function(e){
			e.preventDefault();
			if ($(this).attr('name'))
				location.href = $(this).attr('name');
		});
		//$('#mainpage').removeClass('ui-page-active');
		$('#categories').live('pageshow',function(event, ui){
			event.preventDefault();
			if($.trim($('#categories .content').html()) == ''){
				//cargaremos todas las categorias
				$.mobile.loading( 'show', {
					text: 'Loading',
					textVisible: true,
					theme: 'e',
					html: ""
				});
				main.listingCategories();
			}else{
				listingTopCat.refresh();
			}
		});
		$('#eCategories').live('pageshow',function(event, ui){
			if($.trim($('#eCategories .content .categoriesContent ul').html()) == ''){
				//cargaremos todas las categorias
				$.mobile.loading( 'show', {
					text: 'Loading',
					textVisible: true,
					theme: 'e',
					html: ""
				});
				main.EventCategories();
			}else{
				eventCat.refresh();
			}
		});
		$('#cCategories').live('pageshow',function(event, ui){
			if($.trim($('#cCategories .content .categoriesContent ul').html()) == ''){
				//cargaremos todas las categorias
				$.mobile.loading( 'show', {
					text: 'Loading',
					textVisible: true,
					theme: 'e',
					html: ""
				});
				main.ClassifiedCategories();
			}else{
				//classifiedCat.refresh();
			}
		});
		$('#allCategories').live('pageshow',function(event, ui){
			if($.trim($('#allCategories .content .categoriesContent').html()) == ''){
				//cargaremos todas las categorias
				$.mobile.loading( 'show', {
					text: 'Loading',
					textVisible: true,
					theme: 'e',
					html: ""
				});
				main.listingAllCategories();
			}
		});
		if($('#search form .typeSearch input[type="checkbox"]').size()>0){
			$('#search form .typeSearch input[type="checkbox"]').checkboxradio()
			$('#search form .typeSearch input[type="checkbox"]').attr("checked",false).checkboxradio("refresh");
			$('#search form .typeSearch input[type="checkbox"]').eq(0).attr("checked",true).checkboxradio("refresh");
		}
		$('#search form .typeSearch .ui-checkbox').on( "change", function(event, ui) {
			$('#search form .typeSearch input[type="checkbox"]').attr("checked",false).checkboxradio("refresh");
			$(event.target).attr("checked",true).checkboxradio("refresh");
		});
		$('#search form').submit(function(e){
			e.preventDefault();
			var keyword = $(this).find('#keyword').val();
			controler = $(this).find('input[type="checkbox"]:checked').val()
			$('#ListingResults .header h2.title,#subcategory .header h2.title').text(keyword);
			main.searchListing(keyword,controler,false,'');
			$.mobile.loading( 'show', {
				text: 'Loading',
				textVisible: true,
				theme: 'e',
				html: ""
			});
			return false;
		});
		$('#categories .categories .ui-link, #allCategories .categoriesContent .categoryButtonn, #allCategories .categoriesContent .category .subcategories li a[href],#subcategory .categoriesContent .subcategories li a[href]').live('click',function(e){
			e.preventDefault();
			var cat = $(this).attr('href').replace('#','');
			var dots = $(this).attr('name').length > 17?'...':'';
			var name = $(this).attr('name').substring(0,17) + dots;
			$('#ListingResults .header h2.title,#subcategory .header h2.title').text(name);
			if( cat.indexOf( "sub_" ) != -1 ){
				cat = cat.replace('sub_','');
				console.log('Category ID: ' + cat);
				main.subcategoriesListing(cat);
			}else{
				main.searchListing('','N',false,cat);
			}
			
			$.mobile.loading( 'show', {
				text: 'Loading',
				textVisible: true,
				theme: 'e',
				html: ""
			});
		});
		$('#eCategories .categoriesContent .categoryButton').live('click',function(e){
			e.preventDefault();
			var cat = $(this).attr('href').replace('#','');
			var dots = $(this).attr('name').length > 17?'...':'';
			var name = $(this).attr('name').substring(0,17) + dots;
			$('#ListingResults .header h2.title').text(name);
			
			main.searchListing('','E',false,cat);
			$.mobile.loading( 'show', {
				text: 'Loading',
				textVisible: true,
				theme: 'e',
				html: ""
			});
		});
		$('#cCategories .categoriesContent .categoryButtonn').live('click',function(e){
			e.preventDefault();
			var cat = $(this).attr('href').replace('#','');
			var dots = $(this).attr('name').length > 17?'...':'';
			var name = $(this).attr('name').substring(0,17) + dots;
			$('#ClasifiedResults .header h2.title').text(name);
			console.log('buscar por categoria');
			main.searchListing('','C',false,cat);
			$.mobile.loading( 'show', {
				text: 'Loading',
				textVisible: true,
				theme: 'e',
				html: ""
			});
		});
		$('#ListingResults .content ul li .ui-link-inherit').live('click',function(e){
			e.preventDefault;
			var id = $(this).attr('href');
			id = id.split('#');
			if(id[1] != null){
				id = id[1];
				$.mobile.loading( 'show', {
					text: 'Loading',
					textVisible: true,
					theme: 'e',
					html: ""
				});
				main.listingIndividual(id);
			}else{
				//no hay id del listado
			}
		});
		$('#EventResults .content ul li .ui-link-inherit').live('click',function(e){
			e.preventDefault;
			var id = $(this).attr('href');
			id = id.split('#');
			if(id[1] != null){
				id = id[1];
				$.mobile.loading( 'show', {
					text: 'Loading',
					textVisible: true,
					theme: 'e',
					html: ""
				});
				main.EventIndividual(id);
			}else{
				//no hay id del listado
			}
		});
		$('#ClasifiedResults .content ul li .ui-link-inherit').live('click',function(e){
			e.preventDefault;
			var id = $(this).attr('href');
			id = id.split('#');
			if(id[1] != null){
				id = id[1];
				$.mobile.loading( 'show', {
					text: 'Loading',
					textVisible: true,
					theme: 'e',
					html: ""
				});
				main.ClasifiedIndividual(id);
			}else{
				//no hay id del listado
			}
		});
		$('.container .details .blacBox .ratingStars a').live('click',function(e){
			e.preventDefault();
			e.stopPropagation();
			var name = $(this).attr('name');
			main.loadReviews(name);
		});
		$('.container .details .links .ui-link').live('click',function(e){
			e.preventDefault;
			e.stopPropagation();
			//console.log($(this).attr('href'));
			var link = $(this).attr('href');
			var name = $(this).attr('name');
			if( link == '#void'){
				//do nothing
			}else{
				var split = link.split('!')[0];
				var link = link.split('!')[1];
				if(split == '#mail'){
					window.location = 'mailto:' + name;
					//console.log('link: ' + name);
				}else if(split == '#fotos'){
					//console.log('ver fotos: ' + link);
					var action = link.split('_')[0];
					var id = link.split('_')[1];
					var level = link.split('_')[2];
					//console.log(action + ' // ' + id + ' // ' + level);
					main.getGallery(action,id,level);
				}else if( split == '#link'){
					//window.location = name;
					//window.open(name,'_system');
					//var ref = window.open(encodeURI(name), '_system');
					var ref = window.open(encodeURI(name),'_system','location=yes','closebuttoncaption=Return');
					ref.addEventListener('loadstart', function(event) { alert(event.type + ' - ' + event.url); } );
					ref.addEventListener('loaderror', function(event) { alert(event.type + ' - ' + event.url + ' - ' + event.code + ' - ' + event.message); } );
					return false;
					//console.log('ver link: ' + encodeURI(name) );
				}else if( split == '#video'){
					$.mobile.changePage($('#video'),{transition:"slide"});
					$('#video .content').html('').append(name);
				}else if( split == '#reviews'){
					//var name = id
					main.loadReviews(name);
				}else if( split == '#map'){
					console.log('Map');
					var action = name.split('_')[0];
					var coordenadas = name.split('_')[1];
					main.getMap(action,coordenadas);
					//navigator.geolocation.getCurrentPosition(success, error,{enableHighAccuracy:true});
				}
			}
		});
	});
	
};
function onSuccess(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                            'Longitude: ' + position.coords.longitude     + '<br />' +
                            '<hr />'      + element.innerHTML;
}
function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
}
function initialize_map(latitude,longitude){
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsService = new google.maps.DirectionsService();
	directionsDisplay.setOptions( { suppressMarkers: true } );
	if($("#MapContent").length){
		NegocioCenter = new google.maps.LatLng(latitude,longitude);
		var mapOptions = {
			zoom: 14,
			center: NegocioCenter,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		var icon = new google.maps.MarkerImage(
			'pinmap.png',
			new google.maps.Size(34,50),
			new google.maps.Point(0,0),
			new google.maps.Point(19,46)
		);
		map = new google.maps.Map(document.getElementById("MapContent"), mapOptions);
		marker = new google.maps.Marker({
			position: NegocioCenter,
			map: map,
			icon: icon
		});
		return map;
	}
}