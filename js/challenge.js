var X = function(data) {
	window.data = data.data;
}

var App = {
	"product" : function(data) {

		var procuto = document.createElement("div");
			procuto.setAttribute("class","produto");	
		
		var e = document.createElement("a");
			e.setAttribute("href",data.detailUrl);
			procuto.appendChild(e);
			
		var img = document.createElement("div");
			img.setAttribute("class","img");
			e.appendChild(img);
			
		var foto = document.createElement("img");
			foto.src = data.imageName;
			img.appendChild(foto);

		var titulo = document.createElement("div");
			titulo.textContent = data.name;
			e.appendChild(titulo);

		if( data.oldPrice > data.price ){
			var de = document.createElement("div");
				de.textContent = data.oldPrice;
				de.setAttribute("class","preco de");
				e.appendChild(de);
		}
		var por = document.createElement("div");
			por.textContent = data.price;
			por.setAttribute("class","preco red por");
			e.appendChild(por);
			
		var product = document.createElement("div");
			product.innerHTML = data.productInfo.paymentConditions;
			
		var info = document.createElement("div");
			info.appendChild(product);
			info.setAttribute("class","red");
			e.appendChild(info);

		return procuto;
	},
	"recommendations" : function(data) {
		var recommendations = document.createElement("div");
		var i = 0;
		while (data[i]) {
			recommendations.appendChild(App.product(data[i]));
		    i++;
		}
		return recommendations;
	},
	"slide": function(slider,pos){
		var produtos = slider.getElementsByTagName("div")[0].getElementsByClassName("produto");
		var i = 0;
		while( produtos[i] ){
			var className = produtos[i].className;
			className = App.removeClass(className, "p1 p2 p3 p4 p5 right left");
			if( i < pos ){
				className += " left";
			}else if( i == pos ){
				className += " p1";
			}else if( i == pos+1 ){
				className += " p2";
			}else if( i == pos+2 ){
				className += " p3";
			}else if( i == pos+3 ){
				className += " p4";
			}else if( i > pos+3 ){
				className += " right";
			}
			produtos[i].className = className;
			i++;
		}	
		return produtos;
	},
	"removeClass": function(className,remove){
		var list = remove.split(" ");
		var classArray = className.split(" ");
		var clearClass = [];
		var c=0;
		while(classArray[c]){
			if( list.indexOf(classArray[c]) == -1 ){
				clearClass.push(classArray[c]);
			}
			c++;
		}
		return clearClass;
	}
}


window.addEventListener("load", function() {
	if (window.data.recommendation.length>0) {
		window.positionSlider = 0;
		var recommendations = document.getElementById('recommendations');
		recommendations.appendChild(App.recommendations(window.data.recommendation));
		window.produtos = App.slide(recommendations, window.positionSlider);
	}
	if (window.data.reference.item) {
		document.getElementById('reference').appendChild(App.product(window.data.reference.item));
	}
	
	document.getElementsByClassName("nav prev")[0].addEventListener('click',function(){
		if ( window.positionSlider <= 0 ) return false;
		window.positionSlider--;
		App.slide(recommendations, window.positionSlider);
	});
	document.getElementsByClassName("nav next")[0].addEventListener('click',function(){
		if ( window.positionSlider >= window.produtos.length-4 ) return false;
		window.positionSlider++;
		App.slide(recommendations, window.positionSlider);
	});
	
});