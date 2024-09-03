import { db } from "~/server/db";

/**
 * Function to get a user by their ID from the database
 *
 * @param {string} id - The ID of the user
 */
export const getUserById = async (id: string) => {
	try {
		return await db.user.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				role: true,
			},
		});
	} catch {
		return null;
	}
};
