import { db } from "../../../prisma/db";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(401).json({
      success: false,
      message: "req method not allowed",
    });
  }

  try {
    // req query
    const { id } = await req.query;
    const deleteNote = await db.notes.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(201).json({
      success: true,
      message: "data has been deleted",
      query: deleteNote,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: error.message,
    });
  }
}
