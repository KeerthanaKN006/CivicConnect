import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const { uid, email, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json(existingUser);
    }

    // Create new user
    const newUser = new User({
      uid,
      email,
      name,
      role: "citizen" // Default role
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const makeAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      { role: "admin" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserRole = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.json({ role: "citizen" }); // Default role if user not found
    }

    res.json({ role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
