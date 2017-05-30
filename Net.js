function Net(n, m, l) {
  Net.prototype.genLayers = function(n, m) {
    var layers = [];
    for (var i = 0; i <= m; i++) {
      var layer = layers[i] = [];
      if (i == m) n = 1; // If it's the last column, we only want one output.
      for (var j = 0; j < n; j++) {
        layer[j] = new Node(i,j,this);
        if (i > 0) {
          var connections = [];
          var prevLayer = layers[i-1];
          for (var c in prevLayer) {
            var pnode = prevLayer[c];
            connections[c] = new Edge(pnode.i, pnode.j, random(-1,1));
          }
          var node = layer[j];
          node.edges = connections;
        }
      }
    }
    return layers;
  }
  this.layers = l || this.genLayers(n, m);
  this.fitness = 0;
  this.distance;

  Net.prototype.output = function(input) {
    for (var i = 0; i < this.layers.length; i++) {
      var layer = this.layers[i];
      for (var j = 0; j < layer.length; j++) {
        var node = layer[j];
        node.calculated = false;
        node.value = 0;
        node.net = this;
      }
    }
    for (var i = 0; i < this.layers[0].length; i++) {
      this.layers[0][i].value = input[i];
    }
    var lastLayer = this.layers[this.layers.length - 1];
    return lastLayer[0].getValue();
  }

  Net.prototype.distFromGoal = function(tests) {
    // How far, in n-dimensional space, is this net from acheiving all of its goals?
    // The goal is to have a difference of 0 between it's result and the desired result

    var distance = 0;
    var error = 0;
    for (var i = 0; i < tests.length; i++) {
      var test = tests[i];
      //var inp = [round(random(255)), round(random(255)), round(random(255))];
      //var expect = rgbToHsl(inp[0], inp[1], inp[2])[0] * 360;
      test.difference = this.output(test.input) - test.desire;
      //console.log(error);
      distance += pow(test.difference, 2);
    }
    this.distance = pow(distance, 0.5);
    return this.distance;
  }

  Net.prototype.calcFitness = function(tests) {
    // Have some way of determining how good this net is
    // Higher number = better
    var distance = this.distFromGoal(tests);
    this.fitness = 1 / distance;
    //console.log(distance);
    return this.fitness;
  }

  Net.prototype.normalizeFitness = function(total) {
    this.fitness /= total;
    return this.fitness;
  }

  Net.prototype.mutate = function() {
    // Go through every node and call its mutate function
    for (var i = 0; i < this.layers.length; i++) {
      var layer = this.layers[i];
      for (var j = 0; j < layer.length; j++) {
        var tn = layer[j];
        tn.mutate();
      }
    }
    return this.clone();
  }

  Net.prototype.clone = function() {
    var newLayers = [];
    for (var i = 0; i < this.layers.length; i++) {
      var newLayer = [];
      for (var j = 0; j < this.layers[i].length; j++) {
        var oldNode = this.layers[i][j];
        newLayer.push(oldNode.clone());
      }
      newLayers.push(newLayer);
    }
    return new Net(0, 0, newLayers);
  }

  Net.prototype.show = function() {
    background(230);
    for (var i = 0; i < this.layers.length; i++) {
      var layer = this.layers[i];
      for (var j = 0; j < layer.length; j++) {
        var node = layer[j];
        node.show();
      }
    }
  }
}

// Learning binary
// var test01 = {
//   input : [1, 1, 1, 0, 1],
//   desire : 29
// }
// var test02 = {
//   input : [0, 0, 0, 1, 1],
//   desire : 3
// }
// var test03 = {
//   input : [0, 1, 0, 1, 0],
//   desire : 10
// }
// var test04 = {
//   input : [0, 1, 1, 1, 1],
//   desire : 15
// }
// var test05 = {
//   input : [1, 0, 1, 0, 1],
//   desire : 21
// }

// Some tests for guessing attributes of RGB colors, doesnt work :/
// var test01 = {
//   rgb : [34, 56, 121, 255],
//   hsl : [225, 56.1, 30.4]
// }
// var test02 = {
//   rgb : [100, 230, 21, 255],
//   hsl : [97, 83.3, 49.2]
// }
// var test03 = {
//   rgb : [240, 12, 190, 255],
//   hsl : [313, 90.5, 49.4]
// }
// var test04 = {
//   rgb : [24, 255, 230, 255],
//   hsl : [174, 100.0, 54.7]
// }
// var test05 = {
//   rgb : [245, 2, 2, 255],
//   hsl : [0, 98.4, 48.4]
// }
// var test06 = {
//   rgb : [0,77,0,255],
//   hsl : [120, 100.0, 15.1]
// }
