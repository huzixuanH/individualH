import { PrismaClient } from "@prisma/client";

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
 * 
 */
export async function GET(request: Request) {
  const user = await prisma.user.findFirst();

  return new Response(JSON.stringify(user), {
    status: 200,
  });
}
