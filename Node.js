function Node(i, j, net) {
  this.i = i;
  this.j = j;
  this.value = 0;
  this.edges = [];
  this.net = net;
  this.color = 'gray';
  this.calculated = false;
  this.showWeightVals = false;

  Node.prototype.show = function() {
    // Drawing circle
    stroke('black');
    strokeWeight(1);
    fill(this.color);
    ellipse(this.translatePoint(this.i), this.translatePoint(this.j), node_diameter, node_diameter);
    // Drawing edges
    for (var n = 0; n < this.edges.length; n++) {
      var edge = this.edges[n];
      strokeWeight(abs(edge.weight)*2);
      if (edge.weight < 0) stroke('red');
      else if (edge.weight > 0) stroke('green');
      var dx = this.translatePoint(edge.i);
      var dy = this.translatePoint(edge.j);
      var sx = this.translatePoint(this.i);
      var sy = this.translatePoint(this.j);
      line(dx, dy, sx, sy);
      if (this.showWeightVals) {
        push();
        translate(this.translatePoint(this.i), this.translatePoint(this.j));
        rotate(atan2(-(dy-sy), -(dx-sx)));
        strokeWeight(1);
        stroke('white');
        text("" + nfc(edge.weight, 2), -80, -2);
        pop();
      }
    }
    // Showing current value
    fill('white');
    stroke('black');
    strokeWeight(1);
    textSize(node_diameter/4);
    text("" + nfc(this.value, 2), this.translatePoint(this.i), this.translatePoint(this.j));
  }

  Node.prototype.getValue = function() {
    var total = this.value;
    if (!this.calculated) {
      for (var i = 0; i < this.edges.length; i++) {
        var edge = this.edges[i];
        var layers = this.net.layers;
        var node = layers[edge.i][edge.j];
        var val = node.getValue();
        total += edge.weight * val;
      }
      this.calculated = true;
    }
    this.value = total;
    this.color = 'blue';
    return total;
  }

  Node.prototype.mutate = function() {
    // For each edge, there is a certain chance that a mutation will occur
    for (var i = 0; i < this.edges.length; i++) {
      if (random() <= this.net.mr) {
        var edge = this.edges[i];
        edge.weight *= random(0.9, 1.1);
        if (random() <= this.net.mr) edge.weight *= -1;
        // if (edge.weight > 1) edge.weight = 1;
        // else if (edge.weight < -1) edge.weight = -1;
      }
    }
  }

  Node.prototype.clone = function() {
    var newNode = new Node(this.i, this.j, this.net);
    var edgesClone = []
    for (var i = 0; i < this.edges.length; i++) {
      edgesClone[i] = this.edges[i].clone();
    }
    newNode.edges = edgesClone;
    return newNode;
  }

  Node.prototype.translatePoint = function(p) {
    return 50 + p*node_spacing;
  }
}
