import express, { Request, Response } from "express";
import PrivateUser, { PrivateUserAttributes } from "../Models/PrivateUser";
import PublicUser, { PublicUserAttributes } from "../Models/PublicUser";
import { isValidEmail, isValidPassword } from "../utils/Auth";
import bcrypt from "bcrypt";

const router = express.Router();

type LoginReqType = {
  email: string;
  password: string;
};

type FoundUserType = PrivateUserAttributes & {
  publicUser?: PublicUserAttributes | null;
};

router.post("/login", async (req: Request, res: Response) => {
  const { email, password }: LoginReqType = req.body;
  const lowerEmail = email.toLowerCase();
  try {
    const user: FoundUserType | null = await PrivateUser.findOne({
      where: { email: lowerEmail },
      include: [
        {
          model: PublicUser,
          as: "publicUser",
          required: false,
        },
      ],
    });

    if (user) {
      const passwordRes = await bcrypt.compare(password, user.password);
      if (!passwordRes) {
        res.status(200).json(null);
        return;
      }

      if (!user.publicUser) {
        const newPublicUser = await createPublicUser(user.id);
        await newPublicUser.save();
        user.publicUser = newPublicUser;
      }
      const publicUser = user.publicUser as PublicUser;
      res.status(200).json({ ...publicUser.get() });
      return;
    } else {
      res.status(200).json(null);
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
    return;
  }
});

router.post("/signup", async (req: Request, res: Response) => {
  const { email, password }: LoginReqType = req.body;
  const lowerEmail = email.toLowerCase();

  if (!isValidEmail(lowerEmail) || !isValidPassword(password)) {
    res.status(200).json(null);
    return;
  }

  try {
    const user: PrivateUserAttributes | null = await PrivateUser.findOne({
      where: { email: lowerEmail },
    });

    if (user) {
      res.status(200).json(null);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newPrivateUser = await createPrivateUser(email, hashedPassword);
      newPrivateUser.save();
      const newPublicUser = await createPublicUser(newPrivateUser.id);
      newPublicUser.save();
      res.status(200).json({ ...newPublicUser.get() });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
    return;
  }
});

type UpdateReqBody = {
  user: PublicUserAttributes;
};

router.patch("/updateProfile", async (req: Request, res: Response) => {
  const { user }: UpdateReqBody = req.body;
  try {
    const [numRowsUpdated] = await PublicUser.update(user, {
      where: { id: user.id },
    });

    if (numRowsUpdated == 0) {
      res.status(404).json({ message: "Unable To Update User" });
      return;
    }

    res.status(200).json({ message: "Update Successful" });
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
});

const createPublicUser = async (privateId: number): Promise<PublicUser> => {
  const newPublicUser = await PublicUser.create({
    privateId,
    firstName: null,
    lastName: null,
    dob: null,
    gender: null,
    interestedIn: {
      minAge: 18,
      maxAge: 99,
      maxDistance: 100,
      genders: [],
    },
    curLikes: 0,
    location: null,
    imageUrls: [],
    prompts: [],
    is_profile_complete: false,
  });
  return newPublicUser as PublicUser;
};

const createPrivateUser = async (
  email: string,
  password: string
): Promise<PrivateUser> => {
  const newPrivateUser = await PrivateUser.create({
    email,
    password,
  });

  return newPrivateUser as PrivateUser;
};

export default router;
