
var _url = "http://jsonplaceholder.typicode.com/photos";

var _data = null;

var placeholdit = {
	textSize: 20,
	width: 300,
	height: 300,
	initBackground: function () {
			var letters = '0123456789abcdef'.split(''); //  generate color
	   		var color = '';
		    for (var i = 0; i < 6; i++ ) {
		        color += letters[Math.floor(Math.random() * 16)];
		    }
    	return color;
	}
};


function makeItemList(items) {
	function makeItem(item) {
		return {
			template: "photoItem",
			itemTitle: {
				text: item.title + " id=" + item.id
			},
			photoItem : {
				image: "https://placeholdit.imgix.net/~text?txtsize=" + placeholdit.textSize+ "&bg=" + placeholdit.initBackground() + "&txt=Hello World&w=" 
					+ placeholdit.width + "&h=" + placeholdit.height,
				width: placeholdit.width,
				heigth: placeholdit.height
			}
		};	
	};
	
	return _.map(items, function(item) {
		return makeItem(item);
	});
}


var xhr = Ti.Network.createHTTPClient({
	 onload : function(e) {
	 	 var data = JSON.parse(this.responseText);

         var itemList = makeItemList(data);
         console.log(itemList);
         $.photos.sections[0].appendItems(itemList);
         alert('success');
     },
     onerror : function(e) {
         Ti.API.debug(e.error);
         alert('error');
     },
     timeout : 5000 
});





$.index.addEventListener("open", function() {
	xhr.open("GET", _url);
	xhr.send();
});

$.index.open();
