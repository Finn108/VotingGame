$(document).ready(function(){
	
	//ריסט במקרה של התחלה או ריסט ידני
	function resetGame() {
		votes=25689;
		votesClickVal=1;
		votesPerSec=0;
		Gens[0] = new gen ("מצביע",10,0.2,0,"LVButton");
		Gens[1] = new gen ("עוגיות",130,1,0,"CookiesButton");
		Gens[2] = new gen ("קמפיין",810,7,0,"CampaignButton");
		Gens[3] = new gen ("רב",8100,30,0,"RabiButton");
		Gens[4] = new gen ("תא גאה",49500,150,0,"GaysButton");
	}
	
	//פונקצייה למספרים יפים
	// 1456484115 יחזור 1.456 מליארד
	function numNames(num){
		if (num<999999)
			return addCommas(Math.floor(num)); 
		var temp1 = 0;
		var temp2 = num;
		var temp3;
		while (temp2>1000){
			temp2=temp2/1000;
			temp1++;
		}
		var theNames = ["אלף", "מיליון", "מיליארד", "ביליון", "ביליארד", "טריליון", "טריליארד"];
		var temp5 = num/(Math.pow(1000,temp1))
		var temp4 = temp5.toFixed(3) + " " + theNames[temp1-1];
		return temp4;
	}
	
	//קוד מועתק להוספת פסיקים
	function addCommas(nStr)
		{
			nStr += '';
			x = nStr.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1 + x2;
		}
	
	//להכין את המשתנים של המשחק
	var votes										//כמות הקולות
	var votesClickVal;							//מספר קולות פר הקלקה ידנית
	var votesPerSec							//מספר קולות לשנייה ממחוללים
	var Gens = [];
	
	//אובייקט מחולל
	function gen(name,price,lVotesperSec,numOfGen,buttonName){
		this.name=name;
		this.price=price;
		this.lVotesperSec=lVotesperSec;
		this.numOfGen=numOfGen;
		this.buttonName=buttonName;
		this.buy = function() {
			if (votes>=this.price){
				this.numOfGen++;
				votes-=this.price;
				this.price=Math.floor(this.price*1.3);
			}
		}
	}
	
	resetGame();
	
	//כינויים
	var loneVoter=Gens[0];
	var cookies=Gens[1];
	var campaign=Gens[2];
	var rabi=Gens[3];
	var gays=Gens[4];
	
	//התנהגות כפתור ראשי
	document.getElementById("noteImg").onmouseover=function(){
		$("#noteImg").css("box-shadow", "0px 0px 10px");
	};
	document.getElementById("noteImg").onmouseout=function(){
		$("#noteImg").css("box-shadow", "0px 0px 5px");
	};
	document.getElementById("noteImg").onmousedown=function(){
		$("#noteImg").css("box-shadow", "0px 0px 0px");
	};
	document.getElementById("noteImg").onmouseup=function(){
		$("#noteImg").css("box-shadow", "0px 0px 10px");
	};
	document.getElementById("noteImg").onclick=function(){
		votes+=votesClickVal;
		document.getElementById("votesNumText").innerHTML = numNames(votes);
	};
	
	//התנהגות כפתורי מחוללים
	//כפתור מצביע בודד
	document.getElementById("LVButton").onclick=function(){loneVoter.buy()};
	document.getElementById("LVButton").onmouseover=function(){
		document.getElementById("LVButtonBlackButton").style.display="inline";
	};
	document.getElementById("LVButton").onmouseout=function(){
		document.getElementById("LVButtonBlackButton").style.display="none";
	};
	
	//כפתור עוגיות
	document.getElementById("CookiesButton").onclick=function(){cookies.buy()};
	document.getElementById("CookiesButton").onmouseover=function(){
		document.getElementById("CookiesButtonBlackButton").style.display="inline";
	};
	document.getElementById("CookiesButton").onmouseout=function(){
		document.getElementById("CookiesButtonBlackButton").style.display="none";
	};
	
	//כפתור קמפיין
	document.getElementById("CampaignButton").onclick=function(){campaign.buy()};
	document.getElementById("CampaignButton").onmouseover=function(){
		document.getElementById("CampaignButtonBlackButton").style.display="inline";
	};
	document.getElementById("CampaignButton").onmouseout=function(){
		document.getElementById("CampaignButtonBlackButton").style.display="none";
	};

	//כפתור רבי
 	document.getElementById("RabiButton").onclick=function(){rabi.buy()};
	document.getElementById("RabiButton").onmouseover=function(){
		document.getElementById("RabiButtonBlackButton").style.display="inline";
	};
	document.getElementById("RabiButton").onmouseout=function(){
		document.getElementById("RabiButtonBlackButton").style.display="none";
	}; 
	

	//הכנה וויוזאלית
	document.getElementById("votesPerSecText").innerHTML = "(" + votesPerSec + " קולות לשנייה)";
	document.getElementById("votesNumText").innerHTML = "0";
	$("#noteImg").fadeIn();
	$("#votesNumText").fadeIn();
	
	//לופ משחק
	function Mainy() {
		
		//חישוב גדילה
		votesPerSec=0;
		for (var i in Gens)
			votesPerSec+=Gens[i].lVotesperSec*Gens[i].numOfGen;
		votes+=votesPerSec/25;
		
		//וויזואליה
		document.getElementById("votesNumText").innerHTML = numNames(votes); //Math.floor(votes);
		document.getElementById("votesPerSecText").innerHTML = "(" +   votesPerSec + " קולות לשנייה)";
		
		//עדכון כפתורי מחוללים
		for (var i in Gens){
			document.getElementById(Gens[i].buttonName + "Num").innerHTML = Gens[i].numOfGen;
			document.getElementById(Gens[i].buttonName + "Price").innerHTML = Gens[i].name + " - " + numNames(Gens[i].price) + "₪";
			if (Gens[i].lVotesperSec<1){
				var t = 1/Gens[i].lVotesperSec;
				document.getElementById(Gens[i].buttonName + "BlackCont").innerHTML = "<BR>הצבעה כל " + t + " שניות";
				}
			else{
				document.getElementById(Gens[i].buttonName + "BlackCont").innerHTML = "<BR>" + Gens[i].lVotesperSec + "<BR>הצבעות לשנייה";
				}
			if (votes<Gens[i].price)
				document.getElementById(Gens[i].buttonName).style.color="gray";
			else
				document.getElementById(Gens[i].buttonName).style.color="white";
			
			//שבירה מוזרה. לעדכן לפי כמות הכפתורים בHTML
			if (i>2) break;
		}
	}
	
	//פקודת הרצה
	
	Mainy();
	setInterval(Mainy,40);
}); 

