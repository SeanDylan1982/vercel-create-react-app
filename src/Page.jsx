import { sql } from "@vercel/postgres";

export default async function users({ params }) {
  const { rows } = await sql`SELECT * from users where user_id=${params.user}`;

  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>
          {row.id} - {row.quantity}
        </div>
      ))}
    </div>
  );
}