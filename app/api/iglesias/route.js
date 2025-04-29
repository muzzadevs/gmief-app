import { getConnection } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const subzonaId = searchParams.get("subzonaId");

  try {
    const connection = await getConnection();
    let query = "SELECT id, nombre, direccion, municipio, provincia, cp, subzona_id FROM iglesias";
    const params = [];

    if (subzonaId) {
      query += " WHERE subzona_id = ?";
      params.push(subzonaId);
    }

    const [rows] = await connection.execute(query, params);
    await connection.end();

    return new Response(JSON.stringify(rows), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error al obtener iglesias:", error);
    return new Response(JSON.stringify({ error: "Error al obtener iglesias" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}