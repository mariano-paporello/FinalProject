import { Request, Response } from "express";
import { getMessages } from "../api/messages";

export const chat = async (req: Request, res: Response) => {
  res.render("chat", { data: req.session.dataUser });
};

export const chatById = async (req: Request, res: Response) => {
  const id = req.session.dataUser?._id;
  if (id) {
    const messagesOfUser = await getMessages(id);
    res.status(200).json({
      messages: messagesOfUser,
    });
  }
};
