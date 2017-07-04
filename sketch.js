const populationSize = 200;
const n_inputs = 4;
const n_layers = 3;
const n_height = 7;
const n_outputs = 2;
const node_spacing = 90;
const node_diameter = 50;
const fit_tests = [
  new Test([1, 257, 35, 87],  [10, 35]),
  new Test([1, 303, 54, 101], [14, 55]),
  new Test([1, 282, 50, 93],  [19, 62]),
  new Test([1, 259, 34, 66],  [4,  35]),
  new Test([1, 170, 19, 38],  [5,  16]),
  new Test([1, 161, 27, 46],  [0,  13]),
  new Test([1, 156, 20, 36],  [7,  27]),
  new Test([1, 282, 72, 93],  [27, 62]),
  new Test([1, 135, 35, 46],  [14, 25]),
  new Test([1, 159, 24, 42],  [12, 27]),
  new Test([1, 143, 18, 30],  [9,  25]),
  new Test([1, 318, 44, 80],  [9,  20]),
  // new Test([1, 8,  17,  0,  0,  0],  [0]),
  // new Test([1, 14, 38,  4,  11, 0],  [4]),
  // new Test([1, 37, 143, 21, 47, 9],  [12]),
  // new Test([1, 21, 58,  7,  16, 3],  [2]),
  // new Test([1, 40, 166, 31, 58, 10], [27]),
  // new Test([1, 22, 68,  6,  14, 4],  [7]),
  // new Test([1, 21, 87,  10, 28, 4],  [14]),
  // new Test([1, 23, 73,  7,  18, 2],  [10])
  // new Test([1, 2, 3], [-1, 1/2, 3]),
  // new Test([6, 3, 0], [3, 2, 0]),
  // new Test([4, 3, 2], [1, 4/3, 8])
];

var population;
var bestMember;
var go = false;
var startingDist;
var start_stop;

setup = function() {
  createCanvas(node_spacing*(n_layers+1) + 20, node_spacing*max(n_inputs,n_height,n_outputs) + 20);
  textAlign(CENTER);
  population = new Population(genFounders(populationSize), fit_tests);
  population.calcFitnesses();
  bestMember = population.getBest();
  bestMember.show();
  startingDist = bestMember.distance;
  createP("");
  start_stop = createButton('Start');
  progressP = createP("Starting Accuracy: " + nfc(bestMember.distance,6) + "<br>Current Accuracy: " + nfc(bestMember.distance,6) + "<br>Population Size: " + populationSize + "<br> Generation: " + population.gen);
  start_stop.mousePressed(toggle);
}

draw = function() {
  if (go) {
    population.nextGen();
    population.calcFitnesses();
    bestMember = population.getBest();
    bestMember.show();
    progressP.html("Starting Accuracy: " + nfc(startingDist,6) + "<br>Current Accuracy: " + nfc(bestMember.distance,10) + "<br>Population Size: " + populationSize + "<br> Generation: " + population.gen);
  }
}

genFounders = function(num) {
  var list = [];
  for (var n = 0; n < num; n++) {
    list.push(new Net(n_inputs, n_layers, n_height, n_outputs));
  }
  return list;
}

toggle = function() {
  if (go) start_stop.html('Resume');
  else start_stop.html('Pause');
  go = !go;
}
