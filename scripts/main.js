var b = p5.board('/dev/cu.usbmodem1a21', 'arduino');
var u1, u2, u4, u8, u16, u32, u64, u128, check;

var input = [0,0,0,0,0,0,0,0];

var txt = "";

var empty = true;

check = b.pin(7, 'digital', 'input');

u1 = b.pin(5, 'digital', 'input');
u2 = b.pin(3, 'digital', 'input');
u4 = b.pin(10, 'digital', 'input');
u8 = b.pin(9, 'digital', 'input');
u16 = b.pin(8, 'digital', 'input');
u32 = b.pin(6, 'digital', 'input');
u64 = b.pin(11, 'digital', 'input');
u128 = b.pin(4, 'digital', 'input');

$("#page-content textarea").focus();

check.read(function(val){
  if(val == 1){
    var charCode = binToString(input).num;
    var char = binToString(input).string;
    txt += char;
    console.log(input);
  }

  $("#page-content #insert textarea").val(txt);
  makeQRCode($("#page-content #insert textarea").val());
});

u1.read(function(val){
  if(val == 1){
    input[0] = 1;
    console.log("u1", val);
  }else if (val == 0){
    input[0] = 0;
  }
  // console.log("u1", val);
});

u2.read(function(val){
  if(val == 1){
    input[1] = 1;
    console.log("u2", val);
  }else if (val == 0){
    input[1] = 0;
  }
  // console.log("u2", val);
});

u4.read(function(val){
  if(val == 1){
    input[2] = 1;
    console.log("u4", val);
  }else if (val == 0){
    input[2] = 0;
  }
  // console.log("u4", val);
});

u8.read(function(val){
  if(val == 1){
    input[3] = 1;
    console.log("u8", val);
  }else if (val == 0){
    input[3] = 0;
  }
  // console.log("u8", val);
});

u16.read(function(val){
  if(val == 1){
    input[4] = 1;
    console.log("u16", val);
  }else if (val == 0){
    input[4] = 0;
  }
  // console.log("u16", val);
});

u32.read(function(val){
  if(val == 1){
    input[5] = 1;
    console.log("u32", val);
  }else if (val == 0){
    input[5] = 0;
  }
  // console.log("u32", val);
});

u64.read(function(val){
  if(val == 1){
    input[6] = 1;
    console.log("u64", val);
  }else if (val == 0){
    input[6] = 0;
  }
  // console.log("u64", val);
});

u128.read(function(val){
  if(val == 1){
    input[7] = 1;
    console.log("u128", val);
  }else if (val == 0){
    input[7] = 0;
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
  makeQRCode($(this).val());
  empty = false;

  timeout.reset(600000);
});

var timeout = new Timer(function(){
    if(!empty){
      window.location.reload();
    }
  }, 600000);

function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = function() {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    };

    // start timer using current settings (if it's not already running)
    this.start = function() {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    };

    // start with new interval, stop current interval
    this.reset = function(newT) {
        t = newT;
        return this.stop().start();
    };
}

function makeQRCode(txt){
  var head = "Typed with the Brilliant(-ly useless) 8-bit Keyboard\n";
  txt = head + txt;
  $("#qrcode").qrcode({width: 200, height: 200, text: txt});
}