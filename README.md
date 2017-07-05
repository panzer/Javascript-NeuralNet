# Javascript Neural Net
A neural net written in Javascript. The net is trained using a genetic algorithm.

## New in the Latest Update
**Population**
* `worstMember` method to find the Net with the worst fitness
* Mutation rate of each Net is reduced as the generation increases

**Nets**
* Constructor now includes:
    * \# of inputs
    * \# of hidden layers
    * \# of nodes in hidden layers
    * \# of outputs.
* `output` function now outputs an array of numbers in order to support multiple outputs.
* `distFromGoal` function computes differenty to account for multiple outputs

**Nodes**
* Mutation rate is now inherited from the parent Net

## How it works
1. A population of `populationSize` nets is created, with each net having `n_inputs`, `n_layers`, `n_height` and `n_outputs`.
2. A scaled fitness is calculated for each net (the sum of all fitnesses in the population is 1)
    * The fitness of each net is determined by `fit_tests` provided in the `sketch.js` file.
    * The net with the _least_ difference between desired output and actual output is the most fit.
3. The best net of that generation is drawn on screen
4. A new generation of Nets is created
    * The best Net is always included
    * The rest of the generation is made up by choosing the most fit Nets and applying slight mutations in the weights
5. Steps 2 - 4 repeat

## How to use it
Load up `index.html` and press the 'Start' button.
If you'd like to make modifications to the net, or the training data, you may be able to find what you're looking for in the `sketch.js` file.

### Current Training Data
Currently the nets are training on MLB (Major League Baseball) data. For each player, there is:

**Inputs**
* Number of Games
* Number of At Bats
* Number of Runs

**Output**
* Number of HRs (Home Runs)
* Number of RBIs (Runs Batted In)

**Try it yourself!**

I recommend using Chrome, right clicking, Inspect, and using the console. Use the command `bestMember.output(input)` where `input` is an array of your input. You must have at least as many inputs as your net requires!

If you'd like to try MLB data, check out some statistics [here](http://newyork.yankees.mlb.com/stats/sortable.jsp?c_id=nyy#playerType=ALL). Your console input would look something like `bestMember.output([1, 32, 57, 12])`. The input of `1` at the beginning is a constant input factor (which has been included in the training input).

## Contributing
Contributions are welcome! If you have some better way of training, if you want to make the user interface better... go ahead!
Check out the issues tab and see if you can help out with any of those.

## Credits
Makes use of the [p5.js library](https://p5js.org) for visualizing the Net and some math functions.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
