import { getConnection } from "@/lib/db";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      "SELECT id, nombre, zona_id FROM subzonas WHERE zona_id = ?",
      [id]
    );
    await connection.end();

    return new Response(JSON.stringify(rows), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error al obtener subzonas:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener subzonas" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
