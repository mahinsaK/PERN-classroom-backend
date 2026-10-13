import { eq } from "drizzle-orm";
import { db } from "./db/index.js";
import { departments } from "./db/schema/index.js";

async function main() {
  console.log("Performing CRUD operations...");

  const [newDepartment] = await db
    .insert(departments)
    .values({
      code: "ADMIN",
      name: "Administration",
      description: "Administrative department",
    })
    .returning();

  if (!newDepartment) {
    throw new Error("Failed to create department");
  }
  console.log("CREATE:", newDepartment);

  const [foundDepartment] = await db
    .select()
    .from(departments)
    .where(eq(departments.id, newDepartment.id));
  console.log("READ:", foundDepartment);

  const [updatedDepartment] = await db
    .update(departments)
    .set({ name: "Super Administration" })
    .where(eq(departments.id, newDepartment.id))
    .returning();

  if (!updatedDepartment) {
    throw new Error("Failed to update department");
  }
  console.log("UPDATE:", updatedDepartment);

  await db.delete(departments).where(eq(departments.id, newDepartment.id));
  console.log("DELETE: Department deleted.");
  console.log("CRUD operations completed successfully.");
}

main().catch((error: unknown) => {
  console.error("Error performing CRUD operations:", error);
  process.exitCode = 1;
});
