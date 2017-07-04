// Net ( Integer, Integer, Integer, Integer, (optional) [2D Array of Nodes], (optional) Float )
// Number of #Inputs, Width, Height, #Outputs, (optional) Layers, (optional) Mutation Rate
function Net(n, m, h, o, l, r) {
  Net.prototype.genLayers = function(n, m) {
    var layers = [];
    for (var i = 0; i <= m; i++) {
      var layer = layers[i] = [];
      if (i == 0) nodesInLayer = n; // If it's the first column
      else if (i == m) nodesInLayer = o; // If it's the last column
      else nodesInLayer = h; // The hidden layers
      for (var j = 0; j < nodesInLayer; j++) {
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
  this.mr = r || 0.05; // 5% default mutation rate

  // output : [Array of Number] -> [Array of Number]
  // Clears all nodes, sets the input nodes for the given values,
  //   and propogates to produce an output value of the last node.
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
    var outputs = [];
    for (var i = 0; i < lastLayer.length; i++) {
      outputs[i] = lastLayer[i].getValue();
    }
    return outputs;
  }

  Net.prototype.distFromGoal = function(tests) {
    // How far, in n-dimensional space, is this net from acheiving all of its goals?
    // The goal is to have a difference of 0 between it's result and the desired result
    var averageDistance = 0;
    for (var i = 0; i < tests.length; i++) {
      var test = tests[i];
      var output = this.output(test.input);
      var distance = 0;
      for (var k = 0; k < output.length; k++) {
        test.difference = output[k] - test.desire[k];
        distance += pow(test.difference, 2);
      }
      averageDistance += pow(distance, 0.5);
    }
    this.distance = averageDistance / tests.length;
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

  // mutate : Returns a Net
  // Modifies the current Net by mutating every Node, then returns a cloned
  //   version of itself to avoid overlapping references.
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

  // clone : Returns a Net
  // Produces a replica of the current Net, but severs all references.
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
    return new Net(0, 0, 0, 0, newLayers, this.mr);
  }

  // Draws the current Net on the canvas.
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
