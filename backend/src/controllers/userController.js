import { registerUser, loginUser } from "../services/userService.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser(name, email, password);

    res.json({
      success: true,
      user,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    res.json({
      success: true,
      user,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    next(error);
  }
};
