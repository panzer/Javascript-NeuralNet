const populationSize = 200;
const n_inputs = 5;
const n_layers = 4;
const node_spacing = 90;
const node_diameter = 50;
const fit_tests = [
  new Test([37, 138, 30, 38, 7],  16),
  new Test([36, 131, 26, 46, 12], 19),
  new Test([23, 76,  13, 15, 2],  29),
  new Test([16, 28,  1,  6,  1],  3),
  new Test([37, 136, 14, 33, 2],  16),
  new Test([24, 65,  12, 22, 4],  4),
  new Test([19, 60,  6,  6,  3],  3),
  new Test([11, 9,   2,  1,  0],  0),
  new Test([34, 124, 16, 32, 3],  18),
  new Test([41, 147, 21, 37, 16], 19),
  new Test([9,  18,  2,  0,  0],  0),
  new Test([20, 0,   0,  0,  0],  0),
  new Test([8,  17,  0,  0,  0],  0),
  new Test([14, 38,  4,  11, 0],  4),
  new Test([37, 143, 21, 47, 9],  12),
  new Test([21, 58,  7,  16, 3],  2),
  new Test([40, 166, 31, 58, 10], 27),
  new Test([22, 68,  6,  14, 4],  7),
  new Test([21, 87,  10, 28, 4], 14),
  new Test([23, 73,  7,  18, 2], 10)
  // new Test([1, 2, 3], 4),
  // new Test([6, 3, 0], -3)
];

var population;
var bestMember;
var go = false;
var startingDist;
var start_stop;

setup = function() {
  createCanvas(node_spacing*(n_layers+1) + 50, node_spacing*n_inputs + 50);
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
    progressP.html("Starting Accuracy: " + nfc(startingDist,6) + "<br>Current Accuracy: " + nfc(bestMember.distance,6) + "<br>Population Size: " + populationSize + "<br> Generation: " + population.gen);
  }
}

genFounders = function(num) {
  var list = [];
  for (var n = 0; n < num; n++) {
    list.push(new Net(n_inputs, n_layers));
  }
  return list;
}

toggle = function() {
  if (go) start_stop.html('Resume');
  else start_stop.html('Pause');
  go = !go;
}
