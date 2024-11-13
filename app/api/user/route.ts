import { selectUserById } from "db/model/users";
import { NextRequest } from "next/server";
import { returnMissingParamsResp } from "../constants";

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

  const drizzleUser = await selectUserById(id);

  return Response.json(drizzleUser);
}
