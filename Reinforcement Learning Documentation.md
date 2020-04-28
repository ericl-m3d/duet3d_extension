# Reinforcement Learning (RL) Documentation

**Discounting factor:**  
[Understanding the role of the discount factor](https://stats.stackexchange.com/questions/221402/understanding-the-role-of-the-discount-factor-in-reinforcement-learning) 

**What is a Terminal State:**  
[Practical Reinforcement Learning - Getting Started with Q-Networks (Q-Learning)](https://towardsdatascience.com/practical-reinforcement-learning-02-getting-started-with-q-learning-582f63e4acd9) 

**Introduction to Deep Q-Network (DQN):**  
* [Reinforcement Learning Algorithms ( includes Q-Learning, SARSA, DQN, DDPG )](https://towardsdatascience.com/introduction-to-various-reinforcement-learning-algorithms-i-q-learning-sarsa-dqn-ddpg-72a5e0cb6287)
* [Deep Reinforcement Learning (Beginner's Guide)](https://skymind.ai/wiki/deep-reinforcement-learning)
* [Training Deep Q-Networks (Video)](http://deeplizard.com/learn/video/xVkPh9E9GfE)

**Atari's DQN:**  
[Atari using DQN (PDF)](https://storage.googleapis.com/deepmind-media/dqn/DQNNaturePaper.pdf)

**Definition of Episode:**  
[Defining an **episode** in the context of Reinforcement Learning (RL)](https://www.quora.com/What-does-the-term-%E2%80%9Cepisode%E2%80%9D-mean-in-the-context-of-reinforcement-learning-RL)

**Introduction to Neural Networks (*using Synaptic.js*):**  
[How to create a Neural Network (NN) in Javascript (only 30 lines of code)](https://medium.freecodecamp.org/how-to-create-a-neural-network-in-javascript-in-only-30-lines-of-code-343dafc50d49)

----
### Sample Setup (to DWC):

**A Neural Network (NN) with a Hard ReLU (Rectified Linear Unit):**
* **Hard ReLU:** An activation function (associated with neural networks)
* **Purpose:** Disrupt linear relationship between *the inputs* and *the outputs*. 
* **Benefit:** More economical (computationally), compared to a non-linear rectifier.
* [Using Rectified Linear Activation Function for Deep-Learning Neural Networks](https://machinelearningmastery.com/rectified-linear-activation-function-for-deep-learning-neural-networks/)  

**Hard ReLU Equation:**  

<img src="https://render.githubusercontent.com/render/math?math=f(x)=max(0,x)">  

* **Input:** Sent to neuron   
* **Output:** Always either positive x or 0 (***due to the Hard Rectifier Linear Unit***)  

**Defining an Action (in a Neural Network): It's the M-Code**:  
* **Action:** Terminology used in Reinforcement Learning (RL)
* **M-code:** Terminology used in 3D printing.
* **Relation:** An action is an incremental change in parameters (*executed by an m-code*).  
  * Increments can be 0 (no action) or  0.5, 1, 20 etc. (an action)  
* **Units:** An action is ***unitless***, applicable to all m-codes. 
  * Use the known significant interval changes of each m-code to build a ***All Possible Actions*** list.

