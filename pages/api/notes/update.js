import { db } from "../../../prisma/db";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(401).json({
      success: false,
      message: "method is not allowed",
    });
  }

  try {
    const { id } = await req.query;
    const newData = await req.body;
    const updateNote = await db.notes.update({
      where: {
        id: parseInt(id),
      },
      data: newData,
    });
    return res.status(201).json({
      success: true,
      message: "data has been updated",
      query: updateNote,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: error.message,
    });
  }
}
