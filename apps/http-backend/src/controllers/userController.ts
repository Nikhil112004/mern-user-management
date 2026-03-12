import type { Request, Response } from "express";
import { User } from "../models/User.js";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);
    const total = await User.countDocuments();

    res.json({
      users,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {

    let profileImage = "";

    if (req.file) {
      profileImage = (req.file as any).path;
    }

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobile: req.body.mobile,
      gender: req.body.gender,
      status: req.body.status,
      location: req.body.location,
      profile: profileImage
    });

    await user.save();

    res.status(201).json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user"})
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user" });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        res.json({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
}

export const searchUsers = async (req: Request, res: Response) => {
    try {
        const q = String(req.query.q || "");

        const users = await User.find({
            $or: [
                { firstName: { $regex: q, $options: "i" } },
                { lastName: { $regex: q, $options: "i" } },
                { email: { $regex: q, $options: "i" } },
                { location: { $regex: q, $options: "i" } },
            ] 
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error searching users" });
    }
};