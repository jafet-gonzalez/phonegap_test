var galleryscroll;
var listing = {
	printListings : function(Listings,load){
		$.mobile.changePage($('#ListingResults'),{transition:"none"});
		if(load)
			$('#ListingResults .content ul .loadMore').remove();
		else
			$('#ListingResults .content ul').html('');
		if(Listings != null && Listings != false){
		$.each(Listings,function(index,value){
			var auxLink = value.listing.phone?'href="tel:'+value.listing.phone+'"':'';
			var link = parseInt(value.listing.level)>=50?'href="#'+value.listing.id+'"':auxLink;
			var icon = parseInt(value.listing.level)>=50?'data-icon="arrow-r"':'data-icon=false';
			var phone = value.listing.phone?'<p class="yellow phonelisting">Tel. '+value.listing.phone + '</p>':'';
			var address = value.listing.address?'<p>'+value.listing.address + '</p>':'';
			var cat = '<p>' + value.categories + '</p>';
			var image = value.img!=false?value.img:'';
			var listingData = '<li class="listing lv'+value.listing.level+'" ' + icon + ' ><a '+link+'>'+image+'<h1>'+value.listing.title+'</h1>'+cat+address+phone+'</a></li>';
			$('#ListingResults .content ul').append(listingData);
			$('#ListingResults .content ul').listview('refresh');
			//console.log(value.categories);
		})
			$('#ListingResults .content ul').append('<li class="loadMore" data-icon="search"><a class="yellow" href="#load">Load More Listings</a></li>');
			$('#ListingResults .content ul').listview('refresh');
		}else if(Listings == false){
			$('#ListingResults .content ul').append('<li data-icon=false class="loadMore"><a>No Results</a></li>');
			$('#ListingResults .content ul').listview('refresh');
			//console.log('NO results');
		}else{
			$('#ListingResults .content ul').append('<li data-icon=false class="loadMore"><a>No More Results</a></li>');
			$('#ListingResults .content ul').listview('refresh');
			//console.log('NO more results');
		}
		$.mobile.loading( 'hide' );
		
		setTimeout(function(){
			$('#ListingResults .content').css('height',$('#ListingResults').css('min-height'));
		}, 500);
	},
	printIndividual : function(results){
		$('#ListingIndiv .container .details').html('');
		//console.log(results.stars);
		var stars = '<div class="ratingStars"><a href="#reviews" name="'+results.id+'" >';
		var i = 0;
		for(i=0;i<5;i++){
			stars += (i <= results.stars-1)?"<span class='star on'></span>":"<span class='star off'></span>";
		}
		stars += '<span> ( Ver Reseñas )</span></a></div><span class="clear"></span></br></br>'
		var on = '';
		var toAppend = '<div class="blacBox first">' + stars + results.img;
		//toAppend += stars;
		toAppend += '<h1>'+results.name+'</h1><p class="categories">'+results.categories+'</p><div class="clear"></div><div class="division"></div>';
		toAppend += '<p>'+results.address+'</p>';
		toAppend += results.phone?'<div class="clear"></div><a href="tel:'+results.phone+'" class="phone_button" data-role="button">TEL. '+results.phone+'</a></div>':'';
		$('#ListingIndiv .container .details').append(toAppend);
		toAppend = '<fieldset class="ui-grid-c links">';
		toAppend += '<div class="ui-block-a link"><a href="#fotos!N_'+results.id+'_'+results.level+'" class="ui-link"><div class="borderIco on"><img class="glow" alt="" src="assets/img/icon_glow.png"/><img class="action_ico" alt="" src="assets/img/photos.png" /></div></a><span>Ver Fotos</span><div class="clear"></div></div>';
		toAppend += '<div class="ui-block-b link"><a href="#void" class="ui-link"><div class="borderIco"><img class="glow" alt="" src="assets/img/icon_glow.png"/><img class="action_ico" alt="" src="assets/img/checkin.png" /></div></a><span>Check-In Aquí</span><div class="clear"></div></div>';
		var email = results.email?'#mail':'#void';
		on = results.email?'on':'';
		toAppend += '<div class="ui-block-c link"><a href="'+email+'" name="'+results.email+'" class="ui-link"><div class="borderIco '+on+'"><img class="glow" alt="" src="assets/img/icon_glow.png"/><img class="action_ico" alt="" src="assets/img/mail.png" /></div></a><span>Mail</span><div class="clear"></div></div>';
		var map_link = results.maptuning?"#map":'#void'
		on = results.maptuning?'on':'';
		toAppend += '<div class="ui-block-d link"><a href="'+map_link+'" name="N_'+results.maptuning+'" class="ui-link"><div class="borderIco '+on+'"><img class="glow" alt="" src="assets/img/icon_glow.png"/><img class="action_ico" alt="" src="assets/img/comollegar.png" /></div></a><span>Cómo llegar</span><div class="clear"></div></div>';
		toAppend += '</fieldset>';
		//second block
		$('#ListingIndiv .container .details').append(toAppend);
		toAppend = '<fieldset class="ui-grid-c links">';
		toAppend += '<div class="ui-block-a link"><a href="#reviews" name="'+results.id+'" class="ui-link"><div class="borderIco on"><img class="glow" alt="" src="assets/img/icon_glow.png"/><img class="action_ico" alt="" src="assets/img/resena.png" /></div></a><span>Ver Reseñas</span><div class="clear"></div></div>';
		toAppend += '<div class="ui-block-b link"><a href="#void" class="ui-link"><div class="borderIco"><img class="glow" alt="" src="assets/img/icon_glow.png"/><img class="action_ico" alt="" src="assets/img/vercheckin.png" /></div></a><span>Ver Check-Ins</span><div class="clear"></div></div>';
		var url = results.url?'#link':'#void';
		on = results.url?'on':'';
		toAppend += '<div class="ui-block-c link"><a data-rel="external" data-ajax="false" target="_system" href="'+url+'" name="'+results.url+'" class="ui-link"><div class="borderIco '+on+'"><img class="glow" alt="" src="assets/img/icon_glow.png"/><img class="action_ico" alt="" src="assets/img/website.png" /></div></a><span>Ir a su Sitio Web</span><div class="clear"></div></div>';
		var video = results.video?'#video':'#void';
		on = results.video?'on':'';
		//console.log('VIDEO');
		//console.log(results.video);
		toAppend += '<div class="ui-block-d link"><a href="'+video+'" name=' + "'" +results.video + "'" + ' class="ui-link"><div class="borderIco '+on+'"><img class="glow" alt="" src="assets/img/icon_glow.png"/><img class="action_ico" alt="" src="assets/img/video.png" /></div></a><span>Video</span><div class="clear"></div></div>';
		toAppend += '</fieldset>';
		$('#ListingIndiv .container .details').append(toAppend);
		
		$('#ListingIndiv .container .details .phone_button').button();
		$('#ListingIndiv .container .details').append('<div class="blacBox"><div class="description">'+results.description+'</div></div>');
		
		var height = $('#ListingIndiv .container .details .links .link .borderIco').width();
		$('#ListingIndiv .container .details .links .link .borderIco').css('height',height+'px');
	},
	chargeCategories : function(results){
		var aux = '';
		var letter = ['a','b','c'];
		var link = '';
		$('#categories .content').html('').append("<ul class='ctcontent' id='ctcontent'></ul>");
		$.each(results,function(index,value){
			//las que tienen subcategorias:
				//231 Médicos
				//135 Restaurantes
				//303 Servicio a domicilio
				//159 Escuelas
			//console.log(value);
			if( value.id == '231' || value.id == '135' || value.id == '303' || value.id == '159' )
				link = 'sub_' + value.id;
			else
				link = value.id;
			
			if(index%3==0 && index>0){
				$('#categories .content .ctcontent').append('<li><fieldset class="ui-grid-b categories">' + aux + '</fieldset></li>');
				aux = '<div class="ui-block-'+letter[index%3]+' category"><a href="#'+link+'" name="'+value.title+'" class="ui-link"><img class="glow" alt="" src="assets/img/glow_icon.png"/><img class="cat_ico" alt="" src="assets/img/cat/'+value.id+'.png" /></a></div>';
			}else{
				aux += '<div class="ui-block-'+letter[index%3]+' category"><a href="#'+link+'" name="'+value.title+'" class="ui-link"><img class="glow" alt="" src="assets/img/glow_icon.png"/><img class="cat_ico" alt="" src="assets/img/cat/'+value.id+'.png" /></a></div>';
			}
			if( index == results.length - 1){
				$('#categories .content .ctcontent').append('<li><fieldset class="ui-grid-b categories">' + aux + '</fieldset></li>');
			}
			
		});
		var height = $('#categories .content .categories .category').width()-2;
		$('#categories .content .categories .category').css('height',height+'px');
		
		//ajustaremos el tamaño del contenido
		var height = $('#categories').css('min-height');
		$('#categories .content').css('height',height);
		
		setTimeout(function(){
			$('#categories .content').css('height',$('#categories').css('min-height'));
			//$('#categories .content .ctcontent').css('height',$('#categories').css('min-height'));
			listingTopCat = new iScroll('topCatContent',{
				hScrollbar:false,vScrollbar:false
			});
		}, 500);
		
	},
	chargeAllCategories : function(results){
		//$('#allCategories .content .categoriesContent').html('').append('<ul class="ccategoriesAll" data-role="listview" data-theme="a" data-inset="true" data-filter="true"></ul>');
		$('#allCategories .content .categoriesContent').html('').append('<input id="search_input" placeholder="Buscar categoría..."><ul id="ccategoriesAll" class="ccategoriesAll"></ul>');
		var items = 10;
		$.each(results,function(index,value){
		//if(index < items){
			if(value.subcategories == null){
				//$('#allCategories .content .categoriesContent').append('<div class="category" data-role="collapsible-set"><div data-role="collapsible" data-theme="a" data-iconpos="right" data-content-theme="a"><h3>'+value.title+'</h3></div></div>')
				//$('#allCategories .content .categoriesContent .ccategoriesAll').append('<li><a class="categoryButtonn" name="'+value.title+'" href="#'+value.id+'" data-role="button" data-icon="arrow-r" data-iconpos="right" data-theme="a">'+value.title+'</a></li>');
				$('#allCategories .content .categoriesContent .ccategoriesAll').append('<li><a class="categoryButtonn" name="'+value.title+'" href="#'+value.id+'">'+value.title+'</a></li>');
			}else{
				subcatecories = '<ul class="subcategories" data-filter="true" data-role="listview" >';
				$.each(value.subcategories,function(indexS,valueS){
					subcatecories += '<li><a href="#'+valueS.id+'" name="'+valueS.title+'" >'+valueS.title+'</a></li>';
				});
				subcatecories += '</ul>';
				$('#allCategories .content .categoriesContent .ccategoriesAll').append('<li><div class="category" data-role="collapsible-set"><div data-role="collapsible" data-theme="a" data-iconpos="right" data-content-theme="a"><h3>'+value.title+'</h3><p>'+subcatecories+'</p></div></div></li>');
				subcatecories = '';
			}
			//}
		});
		//$('#allCategories .content .categoriesContent .categoryButton').button();
		//$('#allCategories .content .categoriesContent .category').collapsibleset();
		//$('#allCategories .content .categoriesContent .category .subcategories').listview();
		
		
		setTimeout(function(){
			
			$('#allCategories .content').css('height',$('#allCategories').css('min-height'));
			$('#allCategories .content .categoriesContent').css('height',$('#allCategories').css('min-height'));
			
			//$('#allCategories .content .categoriesContent .ccategoriesAll').listview();
			//$('#allCategories .content .categoriesContent .ccategoriesAll').listview('refresh');
			$('#allCategories .content .categoriesContent .ccategoriesAll').append('<div class="clear"></div>');
			
			/*results.splice(0,items);
			var i = results.length / items;
			//console.log( results.length + ' - ' + i);
			for(j = 0; j < i; j++){
				setTimeout(function(){
					$.each(results,function(index,value){
						if(index < items && value){
							if(value.subcategories == null){
								//$('#allCategories .content .categoriesContent').append('<div class="category" data-role="collapsible-set"><div data-role="collapsible" data-theme="a" data-iconpos="right" data-content-theme="a"><h3>'+value.title+'</h3></div></div>')
								$('#allCategories .content .categoriesContent .ccategoriesAll').append('<li><a name="'+value.title+'" class="categoryButtonn" href="#'+value.id+'" data-role="button" data-icon="arrow-r" data-iconpos="right" data-theme="a">'+value.title+'</a></li>');
							}else{
								subcatecories = '<ul class="subcategories" data-filter="true" data-role="listview" >';
								$.each(value.subcategories,function(indexS,valueS){
									subcatecories += '<li><a name="'+valueS.title+'" href="#'+valueS.id+'">'+valueS.title+'</a></li>';
								});
								subcatecories += '</ul>';
								$('#allCategories .content .categoriesContent .ccategoriesAll').append('<li class="noppadding"><div class="category" data-role="collapsible-set"><div data-role="collapsible" data-theme="a" data-iconpos="right" data-content-theme="a"><h3>'+value.title+'</h3><p>'+subcatecories+'</p></div></div></li>');
								subcatecories = '';
							}
							
						}
					});
					results.splice(0,items);
					$('#allCategories .content .categoriesContent .category').collapsibleset();
					//$('#allCategories .content .categoriesContent .ccategoriesAll').listview('refresh');
					//$('#allCategories .content .categoriesContent .category .subcategories').listview();
				}, 2000);
			}*/
			
			//listingCat = new iScroll('categoriesContent',{hScrollbar:false,vScrollbar:false});
			$('#allCategories .content .categoriesContent .category').collapsibleset();
			$('#search_input').fastLiveFilter('#ccategoriesAll');
		}, 200);
		
	},
	chargeGallery : function(results){
		var last = 0;
		$('#ListingGallery .content .gallery .slider ul').html('');
		$.each(results,function(index,value){
			$('#ListingGallery .content .gallery .slider ul').append('<li><a class="wrap_img"><img alt="" src="'+value+'"/></a></li>');
			last = index;
		});
		$('#ListingGallery .content .gallery').css('height', ( $(window).height() - $('#ListingGallery .header').height() - $('#ListingGallery .footer').height() ) + 'px')
		$('#ListingGallery .content .gallery .slider ul').css('width',((last+1)*550)+'px')
		if($("#ListingGallery .content .gallery #gallery-slider").length){
			var width = $('#ListingGallery .content .gallery').width();
			$('#ListingGallery .content .gallery .slider ul li').css('width',width+'px');
			$('#ListingGallery .content .gallery .slider ul img').css('width',(width-25)+'px');
			if( $('#ListingGallery .content .gallery .arrows').size() < 1 )
				$('#ListingGallery .content .gallery').append("<a href='#' class='arrows left'></a><a href='#' class='arrows right'></a>");
			galleryscroll = new iScroll('gallery-slider',{
				snap:'li',momentum:false,
				hScrollbar:false,vScrollbar:false,vScroll:false,
				hScroll:true,
				onBeforeScrollStart:carrouselStart,onBeforeScrollMove:carrouselMove,
				onScrollEnd : function(){
					$('#gallery-slider ul li.active').removeClass('active');
					$('#gallery-slider ul li:nth-child(' + (this.currPageX+1) + ')').addClass('active');
				}
			});
			//galleryscroll.refresh();
			setTimeout(function(){
				$.each($('#ListingGallery .content .gallery .slider ul li'),function(index, value){
					li = $(value);
					img = li.find('img');
					if( img.height() <= img.width() ){
						li.addClass('rotate');
						nw = ( $(window).height() - $('#ListingGallery .header').height() - $('#ListingGallery .footer').height() ) * .9;
						nm = ( nw - li.width() ) / 2;
						img.css({ 
							width : nw + 'px',
							maxWidth : nw + 'px',
							marginLeft : (-1 * nm) + 'px',
							marginRight : (-1 * nm) + 'px'
						});
					}else{
						img.css( 'width' , ( width - 25 ) + 'px' );
					}
				});
			},700);
		}
	},
	chargeReviews : function(results){
		$.mobile.changePage($('#reviewsC'),{transition:"none"});
		var reviews = $('#reviewsC .content ul');
		reviews.append(results);
		setTimeout(function(){
			$('#reviewsC .content').css('min-height',$('#reviewsC').css('min-height'));
		}, 200);
	},
	map: function(latitude,longitude,flag){
		$('#map .header h2.title').text('Cómo llegar');
		setTimeout(function(){
			$('#map .content').css('height',$('#map').css('min-height'));
			this.map = initialize_map(latitude,longitude);
			navigator.geolocation.getCurrentPosition(listing.print, listing.error,{enableHighAccuracy:true});
		}, 400);
	},
	print : function(position){
		//console.log('Latitude: '           + position.coords.latitude              + '<br />' + 'Longitude: '          + position.coords.longitude             + '<br />');
		listing.userLocation(position.coords.latitude,position.coords.longitude);
	},
	userLocation : function(latitude,longitude){
		setTimeout(function(){
		center = new google.maps.LatLng(latitude,longitude);
		marker = new google.maps.Marker({
			position: center,
			map: map
		});
		//marcamos la ruta
		var request = {
			origin: center,
			destination: NegocioCenter,
			travelMode: google.maps.DirectionsTravelMode['DRIVING'],
			unitSystem: google.maps.DirectionsUnitSystem['METRIC'],
			provideRouteAlternatives: true
		};
			directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setMap(map);
					//directionsDisplay.setPanel($("#panel_ruta").get(0));
					directionsDisplay.setDirections(response);
				} else {
					alert("No existen rutas entre ambos puntos");
				}
			});
		}, 600);
	},
	error : function(error){
		//console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
		alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
	},
	chargeSubcategories: function(results){
		$.mobile.changePage($('#subcategory'),{transition:"none"});
		$('#subcategory .content .categoriesContent').html('').append('<ul class="subcategories" ></ul>');
		var container = $('#subcategory .content .subcategories');
		$.each(results,function(index,value){
			container.append('<li class="noppadding"><a class="categoryButtonn" href="#'+value.id+'" name="'+value.title+'" >'+value.title+'</a></li>');//data-role="button" data-icon="arrow-r" data-iconpos="right" data-theme="a"
		});
		//container.listview();
		setTimeout(function(){
			$('#subcategory .content').css('padding','0 15px').css('height',$('#subcategory').css('min-height'));
			$('#subcategory .content .categoriesContent').css('height',$('#subcategory').css('min-height'));
		}, 200);
		//container.listview('refresh');
	}
}
$('#ListingGallery .content .gallery .arrows,#EventGallery .content .gallery .arrows').live('click',function(e){
	e.preventDefault();
	$this = $(this);
	$active = $this.parent().find('.slider .reel li.active');
	$total = $this.parent().find('.slider .reel li').size();
	index = $active.size()>0?$active.index():0;
	if( $this.hasClass('right') ){
		index = index+1>=$total?-1:index+1;
	}else{
		index = index-1;
	}
	if(index>=0)
		galleryscroll.scrollToPage(index,200);
	//galleryscroll.refresh();
});