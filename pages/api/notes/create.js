import { db } from "../../../prisma/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(401).json({
      success: false,
      message: "method not allowed",
    });
  }
  try {
    const data = await req.body;
    const createNote = await db.notes.create({
      data: data,
    });
    return res.status(201).json({
      success: true,
      query: createNote,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: error.message,
    });
  }
}
