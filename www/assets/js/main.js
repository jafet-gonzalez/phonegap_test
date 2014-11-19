var main = {
	init : function(){
		$.ajax({
			url: domain + 'appFunctions/?Ccontroler=app_main&Caction=verifyConnection',
			type: 'GET',
			dataType: 'jsonp',
			success: function(res) {
				if(res==true){
					setTimeout(function() {
						$.mobile.loading( 'hide' );
						$.mobile.changePage($("#search"),{transition:"none"});
					}, 2000);
				}else{
					alert('Favor de intentar más tarde');
				}
			},
			error:function(){
				alert('error');
			}
		});
	},
	searchListing : function(keyword,controler,load,categoryID){
		if(controler == 'N'){//listing
			var c = 'app_listing';
			var action = listing;
			var page = '#ListingResults';
		}else if(controler == 'E'){//evento
			var c = 'app_event';
			var action = events;
			var page = '#EventResults';
		}else if(controler == 'C'){//clasificado
			var c = 'app_clasified';
			var action = clasified;
			var page = '#ClasifiedResults';
		}
		if(!load){
			$( page + ' .pagination').val('1');
			var dataGET = 'keyword='+keyword+'&category_id='+categoryID+'&';
			var pagination = 'page=' + $( page + ' .pagination').val() + '&';
			$( page + ' input.searching_').val(dataGET);
			dataGET += pagination;
		}else{
			var pagination = parseInt($( page + ' .pagination').val()) + 1;
			$( page + ' .pagination').val(pagination);
			var pagination = 'page=' + pagination + '&';
			var keyword = $( page + ' .searching_' ).val();
			var dataGET = keyword + pagination;
			//console.log(dataGET);
		}
		console.log(domain + 'appFunctions/?Ccontroler=' + c + '&Caction=search&' + dataGET);
		$.ajax({
			url: domain + 'appFunctions/?Ccontroler=' + c + '&Caction=search&' + dataGET,
			type: 'GET',
			dataType: 'jsonp',
			success: function(res) {
			//console.log(res);
				/*if(res==false){
					alert('favor de intentar más tarde');
				}else{*/
					$.mobile.changePage($(page),{transition:"none"});
					//console.log(action);
					action.printListings(res,load);
				//}
			},
			error:function(){
				alert('error');
			}
		});
	},
	listingIndividual : function (id){
		if(id!='load'){
		//console.log('URL');
		//console.log(domain + 'appFunctions/?Ccontroler=app_listing&Caction=getIndividual&Cid=' + id);
		$.ajax({
			url: domain + 'appFunctions/?Ccontroler=app_listing&Caction=getIndividual&Cid=' + id,
			type: 'GET',
			dataType: 'jsonp',
			success: function(res) {
				if(res!=false){
					$.mobile.loading( 'hide' );
					$.mobile.changePage($("#ListingIndiv"),{transition:"none"});
					listing.printIndividual(res);
					//console.log(res);
				}else{
					alert('favor de intentar más tarde');
				}
			},
			error:function(){
				alert('error');
			}
		});
		}else{
			//cargamos otra página
			this.searchListing(false,'N',true,'');
		}
	},
	EventIndividual : function (id){
		if(id!='load'){
		$.ajax({
			url: domain + 'appFunctions/?Ccontroler=app_event&Caction=getIndividual&Cid=' + id,
			type: 'GET',
			dataType: 'jsonp',
			success: function(res) {
				if(res!=false){
					$.mobile.loading( 'hide' );
					$.mobile.changePage($("#EventIndiv"),{transition:"none"});
					events.printIndividual(res);
					//console.log(res);
				}else{
					alert('favor de intentar más tarde');
				}
			},
			error:function(){
				alert('error');
			}
		});
		}else{
			//cargamos otra página
			this.searchListing(false,'E',true,'');
		}
	},
	ClasifiedIndividual : function (id){
		if(id!='load'){
		$.ajax({
			url: domain + 'appFunctions/?Ccontroler=app_clasified&Caction=getIndividual&Cid=' + id,
			type: 'GET',
			dataType: 'jsonp',
			success: function(res) {
				if(res!=false){
					$.mobile.loading( 'hide' );
					$.mobile.changePage($("#ClasifiedIndiv"),{transition:"none"});
					clasified.printIndividual(res);
					//console.log(res);
				}else{
					alert('favor de intentar más tarde');
				}
			},
			error:function(){
				alert('error');
			}
		});
		}else{
			//cargamos otra página
			this.searchListing(false,'C',true,'');
		}
	},
	listingCategories : function(){
		$.ajax({
			url: domain + 'appFunctions/?Ccontroler=app_listing&Caction=getCategoriesNew&',
			type: 'GET',
			dataType: 'jsonp',
			success: function(res) {
				if(res!=false){
					$.mobile.loading( 'hide' );
					listing.chargeCategories(res);
				}else{
					alert('favor de intentar más tarde');
				}
			},
			error:function(){
				alert('error');
			}
		});
	},
	EventCategories: function(){
		$.ajax({
			url: domain + 'appFunctions/?Ccontroler=app_event&Caction=getCategories&',
			type: 'GET',
			dataType: 'jsonp',
			success: function(res) {
				if(res!=false){
					$.mobile.loading( 'hide' );
					events.chargeCategories(res);
				}else{
					alert('favor de intentar más tarde');
				}
			},
			error:function(){
				alert('error');
			}
		});
	},
	ClassifiedCategories: function(){
		$.ajax({
			url: domain + 'appFunctions/?Ccontroler=app_clasified&Caction=getAllCategories&',
			type: 'GET',
			dataType: 'jsonp',
			success: function(res) {
				if(res!=false){
					$.mobile.loading( 'hide' );
					clasified.chargeCategories(res);
				}else{
					alert('favor de intentar más tarde');
				}
			},
			error:function(){
				alert('error');
			}
		});
	},
	listingAllCategories : function(){
		$.ajax({
			url: domain + 'appFunctions/?Ccontroler=app_listing&Caction=getAllCategories&',
			type: 'GET',
			dataType: 'jsonp',
			success: function(res) {
				if(res!=false){
					$.mobile.loading( 'hide' );
					listing.chargeAllCategories(res);
				}else{
					alert('favor de intentar más tarde');
				}
			},
			error:function(){
				alert('error');
			}
		});
	},
	getGallery : function(action,id,level){
		var newaction = '';
		if(action == 'N'){
			newaction = 'app_listing';
			actionObject = listing;
			var page = '#ListingGallery';
		}else{
			newaction = 'app_event';
			actionObject = events;
			var page = '#EventGallery';
		}
		$.ajax({
			url: domain + 'appFunctions/?Ccontroler='+newaction+'&Caction=getGallery&Cid='+id+'&',
			type: 'GET',
			dataType: 'jsonp',
			success: function(res) {
				if(res!=false){
					//$.mobile.loading( 'hide' );
					$.mobile.changePage($(page),{transition:"none"});
					actionObject.chargeGallery(res);
				}else{
					alert('favor de intentar más tarde');
				}
			},
			error:function(){
				alert('error');
			}
		});
	},
	loadReviews : function(id){
		$.ajax({
			url: domain + 'appFunctions/?Ccontroler=app_listing&Caction=getReviews&Cid='+id+'&',
			type: 'GET',
			dataType: 'jsonp',
			success: function(res) {
				if(res!=false){
					//$.mobile.loading( 'hide' );
					//$.mobile.changePage($(page),{transition:"none"});
					$('#reviewsC .content ul').html('');
					listing.chargeReviews(res);
				}else{
					alert('No existen reseñas para este negocio');
				}
			},
			error:function(){
				alert('error');
			}
		});
	},
	getMap: function(action,coordenadas){
		var page = '#map';
		if(action == 'N'){
			actionObject = listing;
		}
		var latitude = coordenadas.split(',')[0]
		var longitude = coordenadas.split(',')[1]
		$.mobile.changePage($(page),{transition:"none"});
		actionObject.map(latitude,longitude);
		//navigator.geolocation.getCurrentPosition(actionObject.print, actionObject.error,{enableHighAccuracy:true});
	},
	subcategoriesListing: function(id){
		$.ajax({
			url: domain + 'appFunctions/?Ccontroler=app_listing&Caction=getSubcategories&Cid=' + id,
			type: 'GET',
			dataType: 'jsonp',
			success: function(res) {
				if(res!=false){
					$.mobile.loading( 'hide' );
					listing.chargeSubcategories(res);
				}else{
					alert('favor de intentar más tarde');
				}
			},
			error:function(){
				alert('error');
			}
		});
	}
}