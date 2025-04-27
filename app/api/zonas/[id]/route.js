// app/api/zonas/[id]/route.js
import { getConnection } from "@/lib/db";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      "SELECT id, nombre, codigo FROM zonas WHERE id = ?",
      [id]
    );
    await connection.end();

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: "Zona no encontrada" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(rows[0]), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error al obtener zona por ID:", error);
    return new Response(JSON.stringify({ error: "Error al obtener zona" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
