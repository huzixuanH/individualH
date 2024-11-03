import { PrismaClient } from "@prisma/client";
import { selectUserById } from "db/model/users";
import { NextRequest } from "next/server";
import { returnMissingParamsResp } from "../constants";

const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 *
 * /api/user:
 *   get:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: query
 *         description: user id
 *         required: true
 *         schema:
 *         type: string
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: server error
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const id = searchParams.get("id");
  if (!id) {
    return returnMissingParamsResp();
  }
  const prismaUser = await prisma.user.findUnique({ where: { id } });

  const drizzleUser = await selectUserById(id);

  return Response.json([drizzleUser, prismaUser]);
}
