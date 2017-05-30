function Edge(i,j,w) {
  this.i = i; // The i pos of the Node it points to
  this.j = j;
  this.weight = w;

  Edge.prototype.clone = function() {
    return new Edge(this.i, this.j, this.weight);
  }
}

// Evening.
// Evening.
// Very warm tonight.
// Someone out there?
//
// I don't think we've met.
// No, we havent.
// My name is McCann.
// Staying here long?
// No, not long. Whats your name?
// Webber.
// nice to meet you,,,, many happy returns... are you going out?
// Yes.
// On your birthday?
// Yes, why not?
// Theyre throwing a party here for you tonight
// Oh really? Thats a shame.
// Ah no. Its nice
// Im sorry, im not in the mood for a party tonight
// oh is that so? im sorry.
// Yes, im going out to celebrate quietly. on my own.
// thats a shame
