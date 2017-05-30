# Javascript Neural Net
A neural net written in Javascript. The net is trained using a genetic algorithm.

## How it works
1. A population of `populationSize` nets is created, with each net having `n_inputs`, `n_layers` and one output
2. A scaled fitness is calculated for each net (the sum of all fitnesses in the population is 1)
    * The fitness of each net is determined by `fit_tests` provided in the `sketch.js` file.
    * The net with the _least_ difference between desired output and actual output is the most fit.
3. The best net of that generation is drawn on screen
4. A new generation of nets is created
    * The best net is always included
    * The rest of the generation is made up by choosing the most fit nets and applying slight mutations in the weights
5. Steps 2 - 4 repeat

## How to use it
Load up index.html and press the Start button.
#### Current Training Data
Currently the nets are training on MLB (Major League Baseball) data. For each player, there is:
**Input**
* # of Games
* # of At Bats
* # of Runs
* # of Hits
* # of Times the player has reached 2nd base

**Output**
* # of RBIs (Runs Batted In)

At the moment, the system is decently accurate. It will often be off by one or two RBIs.

## Contributing
Contributions are welcome! If you have some better way of training, if you want to make the user interface better... go ahead!
Check out the issues tab and see if you can help out with any of those.

## Credits
Makes use of the [p5.js library](https://p5js.org) for visualizing the net.
