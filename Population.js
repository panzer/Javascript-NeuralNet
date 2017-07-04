function Population(founders, tests) {
  this.members = founders;
  this.gen = 0;
  this.tests = tests;

  Population.prototype.nextGen = function() {
    // A new population
    var newPop = [];
    for (var i = 0; i < this.members.length-1; i++) {
      // This is a new algorithm to select based on fitness probability!
      // It only works if all the fitness values are normalized and add up to 1
      var index = 0;
      var r = random(1);
      // Keep subtracting probabilities until you get less than zero
      // Higher probabilities will be more likely to be fixed since they will
      // subtract a larger number towards zero
      var anet;
      while (r > 0) {
        //console.log(index);
        anet = this.members[index];
        r -= anet.fitness;
        index++; // And move on to the next
      }
      // Go back one
      index--;
      anet = this.members[index];
      // Clone with mutation
      var copy = anet.clone();
      copy.mr = min(0.05, 100/(this.gen+1));
      newPop[i] = copy.mutate();
    }
    // Throwing the previous best in the mix makes sure we're only improving.
    newPop.push(this.getBest().clone());
    this.members = newPop;
    this.gen++;
  }

  Population.prototype.calcFitnesses = function() {
    var total = 0;
    for (var i = 0; i < this.members.length; i++) {
      var anet = this.members[i];
      total += anet.calcFitness(this.tests);
    }
    for (var i = 0; i < this.members.length; i++) {
      var anet = this.members[i];
      anet.normalizeFitness(total);
      this.members[i] = anet;
    }
  }

  Population.prototype.getBest = function() {
    var bestFitness = 0;
    var best;
    for (var i = 0; i < this.members.length; i++) {
      var anet = this.members[i];
      if (anet.fitness > bestFitness) {
        bestFitness = anet.fitness;
        best = anet;
      }
    }
    return best;
  }

  Population.prototype.getWorst = function() {
    var worstFitness = Number.MAX_VALUE;;
    var worst;
    for (var i = 0; i < this.members.length; i++) {
      var anet = this.members[i];
      if (anet.fitness < worstFitness) {
        worstFitness = anet.fitness;
        worst = anet;
      }
    }
    return worst;
  }
}
