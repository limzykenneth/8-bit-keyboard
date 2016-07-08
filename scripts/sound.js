var note = [];
function setup() {
  createCanvas( windowWidth, windowHeight );
  s = Synth({ maxVoices:4, waveform:'PWM', attack:ms(1), decay:ms(1000) });

  s.play( [440, 880, 1320], 1/4 );
  s.amp(0);
}

function draw() {
  
}

function playSound(charCode){
  var m = map(charCode, 64, 123, 400, 2000);
  note.push(m);
  s.play(note, 1/4);
  s.amp(1/4);
}

function stopSound(){
  note = [];
  s.amp(0);
}

// function mousePressed(){
//   // s.play([1000, 2000, 500], 1/4);
//   s.amp(1/4);
// }

// function mouseReleased(){
//   // s.play([440, 880, 1320], 1/4);
//   s.amp(1/4);
// }