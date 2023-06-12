const { Thought, User } = require('../models');

module.exports = {

  // Get all  thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      const thoughtObj = {
        thoughts
      };
      res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single  thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }
      res.json({
        thought
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Create a new  thought

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({
          message: 'Thougth created, but found no user with that ID',
        });
      }

    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a  thoughts by its _id and remove a  thoughts's associated thoughts when deleted
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }
      res.json({ message: 'Thought successfully deleted' });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Update  thoughts by its _id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
      );
      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }
      res.json({ message: 'Thought successfully updated' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a reaction stored in a single thought's reactions array field
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};