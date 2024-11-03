import { eq } from "drizzle-orm";
import { db } from "db";
import { user } from "db/schema";

export const selectUserById = async (id: string) => {
  const result = await db.select().from(user).where(eq(user.id, id));
  return result[0];
};
