function Edge(i,j,w) {
  this.i = i; // The i pos of the Node it points to
  this.j = j;
  this.weight = w;

  Edge.prototype.clone = function() {
    return new Edge(this.i, this.j, this.weight);
  }
}
