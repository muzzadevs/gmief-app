import { getConnection } from "@/lib/db";

export async function GET(request, { params }) {
  const { iglesia_id } = params;

  try {
    const connection = await getConnection();
    const query = `
      SELECT 
        m.id, m.nombre, m.apellidos, m.alias, m.codigo, m.telefono, m.email, 
        m.aprob, e.nombre AS estado,
        GROUP_CONCAT(c.cargo SEPARATOR ', ') AS cargos
      FROM ministerios m
      LEFT JOIN estados e ON m.estado_id = e.id
      LEFT JOIN ministerio_cargo mc ON m.id = mc.ministerio_id
      LEFT JOIN cargos c ON mc.cargo_id = c.id
      WHERE m.iglesia_id = ?
      GROUP BY m.id, m.nombre, m.apellidos, m.alias, m.codigo, m.telefono, m.email, m.aprob, e.nombre
    `;
    const [rows] = await connection.execute(query, [iglesia_id]);
    await connection.end();

    return new Response(JSON.stringify(rows), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error al obtener ministerios:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener ministerios" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
