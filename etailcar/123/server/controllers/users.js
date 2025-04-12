import { UserModel } from '../models/UserModel.js';

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createUser = async (req, res) => {
  try {
    const newuser = req.body;

    const user = new UserModel(newuser);
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateUser = req.body;

    const user = await UserModel.find(
      { _id: updateUser._id },
      updateUser,
      { new: true }
    );
    console.log('[user]',user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};



export const removeUser = async (req, res) => {
  try {
    const updateUser = req.body;

    const user = await UserModel.findByIdAndDelete(
      { _id: updateUser._id }
      
    );
    console.log('[user]',user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const checkloginUser = async (req, res) => {
  try {
    const user_login = req.body;
   
    const user = await UserModel.findOne(
      { username: user_login.username }
      
    );
    console.log('[user]pass:',user.password);
    console.log('[userlogin]pass:',user_login.password);
 
    if (!user.password.localeCompare(user_login.password)){
      console.log('[user]',user);
      res.status(200).json(user);
    }
    else{
      res.status(500).json({ error: err });
    }
    
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

