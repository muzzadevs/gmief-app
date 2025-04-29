import { getConnection } from "@/lib/db";

export async function GET(request, context) {
  const { params } = await context; // Await the context to access params
  const { id } = params;

  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      "SELECT nombre FROM subzonas WHERE id = ?",
      [id]
    );
    await connection.end();

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: "Subzona no encontrada" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(rows[0]), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error al obtener subzona:", error);
    return new Response(JSON.stringify({ error: "Error al obtener subzona" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
