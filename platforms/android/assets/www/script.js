
$(document).on('pagecreate', '#home', function(){      
    var url = 'http://api.themoviedb.org/3/',
        mode = 'search/movie?query=',
        movieName = '&query='+encodeURI('Batman'),        
        key = '&api_key=bd6eaa461a2c2712bbd379ec9cd6e5bf';        
     
    $.ajax({
        url: url + mode + key + movieName ,
        dataType: "jsonp",
        async: true,
        success: function (result) {
            ajax.parseJSONP(result);
        },
        error: function (request,error) {
            alert('Network error has occurred please try again!');
        }
    });         
});
 
$(document).on('pagebeforeshow', '#headline', function(){      
    $('#movie-data').empty();
    $.each(movieInfo.result, function(i, row) {
        if(row.id == movieInfo.id) {
            $('#movie-data').append('<li><img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2'+row.poster_path+'"></li>');
            $('#movie-data').append('<li>Title: '+row.original_title+'</li>');
            $('#movie-data').append('<li>Release date'+row.release_date+'</li>');
            $('#movie-data').append('<li>Popularity : '+row.popularity+'</li>');   
            $('#movie-data').append('<li>Popularity : '+row.vote_average+'</li>');             
            $('#movie-data').listview('refresh');            
        }
    });    
});
 
$(document).on('tap', '#movie-list li a', function(){  
    movieInfo.id = $(this).attr('data-id');
    //$.mobile.changePage( "#headline", { transition: "slide", changeHash: false });
	$( ":mobile-pagecontainer" ).pagecontainer( "change", "#headline", { transition: "slide", changeHash: false } );
});
 
var movieInfo = {
    id : null,
    result : null
}
 
var ajax = {  
    parseJSONP:function(result){  
        movieInfo.result = result.results;
        $.each(result.results, function(i, row) {
            console.log(JSON.stringify(row));
            $('#movie-list').append('<li><a href="" data-id="' + row.id + '"><img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2'+row.poster_path+'"/><h3>' + row.title + '</h3><p>' + row.vote_average + '/10</p></a></li>');
        });
        $('#movie-list').listview('refresh');
    }
}