var b = p5.board('/dev/ttyACM0', 'arduino');
var u1, u2, u4, u8, u16, u32, u64, u128, check;

var input = [0,0,0,0,0,0,0,0];

var txt = "";

var empty = true;

// check = b.pin(7, 'digital', 'input');

u1 = b.pin(5, 'digital', 'input');
u2 = b.pin(3, 'digital', 'input');
u4 = b.pin(10, 'digital', 'input');
u8 = b.pin(9, 'digital', 'input');
u16 = b.pin(8, 'digital', 'input');
u32 = b.pin(6, 'digital', 'input');
u64 = b.pin(11, 'digital', 'input');
u128 = b.pin(4, 'digital', 'input');

$("#page-content textarea").focus();


setInterval(function(){
	if (!input.equals([0, 0, 0, 0, 0, 0, 0, 0]) && binToString(input).string !== ""){
		var charCode = binToString(input).num;
		var char = binToString(input).string;
		txt += char;
		console.log(input);

		$("#page-content #insert textarea").val(txt);
		makeQRCode($("#page-content #insert textarea").val());
	}
}, 1500);

// check.read(function(val){
// 	if(val == 1){
// 		var charCode = binToString(input).num;
// 		var char = binToString(input).string;
// 		txt += char;
// 		console.log(input);
// 	}

// 	$("#page-content #insert textarea").val(txt);
// 	makeQRCode($("#page-content #insert textarea").val());
// });

u1.read(function(val){
	if(val == 1){
		input[7] = 1;
		console.log("u1", val);
	}else if (val == 0){
		input[7] = 0;
	}
	// console.log("u1", val);
});

u2.read(function(val){
	if(val == 1){
		input[6] = 1;
		console.log("u2", val);
	}else if (val == 0){
		input[6] = 0;
	}
	// console.log("u2", val);
});

u4.read(function(val){
	if(val == 1){
		input[5] = 1;
		console.log("u4", val);
	}else if (val == 0){
		input[5] = 0;
	}
	// console.log("u4", val);
});

u8.read(function(val){
	if(val == 1){
		input[4] = 1;
		console.log("u8", val);
	}else if (val == 0){
		input[4] = 0;
	}
	// console.log("u8", val);
});

u16.read(function(val){
	if(val == 1){
		input[3] = 1;
		console.log("u16", val);
	}else if (val == 0){
		input[3] = 0;
	}
	// console.log("u16", val);
});

u32.read(function(val){
	if(val == 1){
		input[2] = 1;
		console.log("u32", val);
	}else if (val == 0){
		input[2] = 0;
	}
	// console.log("u32", val);
});

u64.read(function(val){
	if(val == 1){
		input[1] = 1;
		console.log("u64", val);
	}else if (val == 0){
		input[1] = 0;
	}
	// console.log("u64", val);
});

u128.read(function(val){
	if(val == 1){
		input[0] = 1;
		console.log("u128", val);
	}else if (val == 0){
		input[0] = 0;
	}
	// console.log("u128", val);
});


// Function to determine the typed character from the 
// binary string passed in from the "keyboard".
// Returns a character from "a-z".
function binToString(arr){
	var bin = arr.join("");
	var temp = {};
	
	temp.num = parseInt(bin, 2);

	temp.string = String.fromCharCode(temp.num);

	return temp;
}



//QR code
$("#page-content textarea").on('change keyup', function(event) {
	event.preventDefault();
	// makeQRCode($(this).val());
});

function makeQRCode(txt){
	var head = "Typed with the Brilliant(-ly useless) 8-bit Keyboard\n";
	txt = head + txt;
	console.log(txt);
	$("#qrcode").qrcode({width: 200, height: 200, text: txt});
}

var feedback = function(p){
	p.setup = function(){
		p.createCanvas(250,120);
		p.background(255);
	};

	p.draw = function(){
		p.background(255);
		p.noStroke();

		p.push();
		for (var x=1; x<=8; x++){
			var y = x;
			if (x > 4){
				switch (y){
					case 5:
						y = 4;
						break;
					case 6:
						y = 3;
						break;
					case 7:
						y = 2;
						break;
					case 8:
						y = 1;
						break;
				}
			}

			switch (x){
				case 1:
					if (input[0] == 1){
						p.fill(255,0,0);
					}else{
						p.fill(0,0,255);
					}
					break;
				case 2:
					if (input[1] == 1){
						p.fill(255,0,0);
					}else{
						p.fill(0,0,255);
					}
					break;
				case 3:
					if (input[2] == 1){
						p.fill(255,0,0);
					}else{
						p.fill(0,0,255);
					}
					break;
				case 4:
					if (input[3] == 1){
						p.fill(255,0,0);
					}else{
						p.fill(0,0,255);
					}
					break;
				case 5:
					if (input[4] == 1){
						p.fill(255,0,0);
					}else{
						p.fill(0,0,255);
					}
					break;
				case 6:
					if (input[5] == 1){
						p.fill(255,0,0);
					}else{
						p.fill(0,0,255);
					}
					break;
				case 7:
					if (input[6] == 1){
						p.fill(255,0,0);
					}else{
						p.fill(0,0,255);
					}
					break;
				case 8:
					if (input[7] == 1){
						p.fill(255,0,0);
					}else{
						p.fill(0,0,255);
					}
					break;
			}
			
			p.rect(20*x, 20*y, 20, 20);
			p.translate(7,0);
		}
		p.pop();

		p.textSize(32);
		p.fill(0);
		p.text(binToString(input).string, p.width/2-10, p.height/2-20);
	};
};

new p5(feedback, document.getElementById("feedback"));



Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});
