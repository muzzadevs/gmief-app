import { getConnection } from "@/lib/db";

export async function GET() {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute("SELECT id, nombre FROM subzonas");
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
