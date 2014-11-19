var clasified = {
	printListings : function(Listings,load){
		if(load)
			$('#ClasifiedResults .content ul .loadMore').remove();
		else
			$('#ClasifiedResults .content ul').html('');
		if(Listings != null && Listings != false){
		$.each(Listings,function(index,value){
			var link = parseInt(value.level)>=10?'href="#'+value.id+'"':'';
			var icon = parseInt(value.level)>=10?'data-icon="arrow-r"':'data-icon=false';
			var phone = value.phone?'<p>Tel. '+value.phone + '</p>':'';
			var address = value.address?'<p>'+value.address + '</p>':'';
			var email = value.email?'<p>'+value.email + '</p>':'';
			var listingData = '<li ' + icon + ' name="'+value.level+'" ><a ' + link + '><h1>' + value.title + '</h1>' + address + phone + email + '</a></li>';
			//console.log(listingData);
			$('#ClasifiedResults .content ul').append(listingData);
			$('#ClasifiedResults .content ul').listview('refresh');
		});
		$('#ClasifiedResults .content ul').append('<li class="loadMore"><a href="#load">Load More Classifieds</a></li>');
		$('#ClasifiedResults .content ul').listview('refresh');
		}else{
			$('#ClasifiedResults .content ul').append('<li data-icon=false class="loadMore"><a>No More Results</a></li>');
			$('#ClasifiedResults .content ul').listview('refresh');
		}
		$.mobile.loading( 'hide' );
		
		setTimeout(function(){
			$('#ClasifiedResults .content').css('height',$('#ClasifiedResults').css('min-height'));
		}, 500);
	},
	printIndividual : function(results){
		$('#ClasifiedIndiv .container .details').html('');
		console.log(results);
		/*var stars = '<div class="ratingStars"><a href="#reviews" name="'+results.id+'" >';
		var i = 0;
		for(i=0;i<5;i++){
			stars += (i <= results.stars-1)?"<span class='star on'></span>":"<span class='star off'></span>";
		}
		stars += '<span> ( Ver Reseñas )</span></a></div><span class="clear"></span></br></br>'
		*/
		stars = '';
		var on = '';
		var toAppend = '<div class="blacBox first">' + stars + results.img;
		//toAppend += stars;
		toAppend += '<h1>'+results.name+'</h1><p class="categories">'+results.categories+'</p><div class="clear"></div><div class="division"></div>';
		toAppend += '<p>'+results.address+'</p>';
		toAppend += '<a href="tel:'+results.phone+'" class="phone_button" data-role="button">TEL. '+results.phone+'</a></div>';
		$('#ClasifiedIndiv .container .details').append(toAppend);
		
		$('#ClasifiedIndiv .container .details .phone_button').button();
		$('#ClasifiedIndiv .container .details').append('<div class="blacBox"><div class="description">'+results.description+'</div></div>');
		
		var height = $('#ClasifiedIndiv .container .details .links .link .borderIco').width();
		$('#ClasifiedIndiv .container .details .links .link .borderIco').css('height',height+'px');
	},
	chargeCategories : function(results){
		$('#cCategories .content .categoriesContent').html('').append('<ul id="ccategoriesAll" class="ccategoriesAll"></ul>');
		var items = 10;
		$.each(results,function(index,value){
			if(value.subcategories == null){
				$('#cCategories .content .categoriesContent ul').append('<li><a class="categoryButtonn" name="'+value.title+'" href="#'+value.id+'">'+value.title+'</a></li>');
			}else{
				subcatecories = '<ul class="subcategories" data-filter="true" data-role="listview" >';
				$.each(value.subcategories,function(indexS,valueS){
					subcatecories += '<li><a href="#'+valueS.id+'" name="'+valueS.title+'" >'+valueS.title+'</a></li>';
				});
				subcatecories += '</ul>';
				$('#cCategories .content .categoriesContent ul').append('<li><div class="category" data-role="collapsible-set"><div data-role="collapsible" data-theme="a" data-iconpos="right" data-content-theme="a"><h3>'+value.title+'</h3><p>'+subcatecories+'</p></div></div></li>');
				subcatecories = '';
			}
		});
		setTimeout(function(){
			$('#cCategories .content').css('height',$('#allCategories').css('min-height'));
			$('#cCategories .content .categoriesContent').css('height',$('#allCategories').css('min-height'));
			$('#cCategories .content .categoriesContent ul').append('<div class="clear"></div>');
			$('#cCategories .content .categoriesContent .category').collapsibleset();
		}, 200);
		
	}
}