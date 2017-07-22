# Javascript Neural Net
A neural net written in Javascript. The net is trained using a genetic algorithm.

## New in the Latest Update
**Nets**
* New property `afunctions`. Currently, four functions are in the list (linear, binary, sigmoid, and ReLU) but more are available in `AFunctions.js`. These are the activation functions available for each Node.

**Nodes**
* Each Node can mutate to have an activation function. Any function that takes a number and returns a number is eligible, just add it to `afunctions` in `Net.js`.
* In the `getValue` function, Node color is updated based on the activation function.

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
Currently the nets are training on a 2x2 pixel image.

**Inputs**
* Top Left pixel [-1, 1]
* Top Right pixel [-1, 1]
* Bottom Left pixel [-1, 1]
* Bottom Right pixel [-1, 1]

**Output**
* Solid? [0, 1]
* Horizontal? [0, 1]
* Vertical? [0, 1]
* Diagonal? [0, 1]

**Try it yourself!**

I recommend using Chrome, right clicking, Inspect, and using the console. Use the command `bestMember.output(input)` where `input` is an array of your input. You must have at least as many inputs as your net requires!

If you'd like to try the 2x2 pixel image example, keep in mind the expect input range [-1, 1]. Your console input would look something like `bestMember.output([1, 1, -0.5, -0.5, 1])`. The input of `1` at the end is a constant input factor (which has been included in the training input).

## Contributing
Contributions are welcome! If you have some better way of training, if you want to make the user interface better... go ahead!
Check out the issues tab and see if you can help out with any of those.

## Credits
Makes use of the [p5.js library](https://p5js.org) for visualizing the Net and some math functions.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
