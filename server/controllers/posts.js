import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {   // form to create the pos
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();  //this save the post

    const post = await Post.find();    //update the post
    res.status(201).json(post);   // kind of a feedback of the post created
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {   //see the post on the timeline
  try {
    const post = await Post.find();
    res.status(200).json(post); // feedback code it been successful
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {  //see the specific user post
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });  //this grabe the userid of the post
    res.status(200).json(post);  //send the post
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {  
  try {
    const { id } = req.params;
    const { userId } = req.body;  //grabe the relevant post
    const post = await Post.findById(id);  //grabe the post information
    const isLiked = post.likes.get(userId);  //grabe if the user liked or not

    if (isLiked) {
      post.likes.delete(userId); //if it doesnt exist 
    } else {
      post.likes.set(userId, true); // if it exist
    }

    const updatedPost = await Post.findByIdAndUpdate( //update the post liked once you hit that button
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost); // pass the update post once we have that
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
