
var identity = function(x) {
  return x;
}

var binary = function(x) {
  if (x < 0) {
    return 0;
  } else {
    return 1;
  }
}

var sigmoid = function(x) {
  return 1 / (1 + pow(Math.E, -x));
}

var arctan = function(x) {
  atan(x);
}

var relu = function(x) {
  if (x < 0) {
    return 0;
  } else {
    return x;
  }
}

var softSine = function(x) {
  return x / (1 + abs(x));
}

var guassian = function(x) {
  return pow(Math.E, pow(-x, 2))
}
