export const deleteSession = async (sessionId) =>
	fetch(`http://localhost:3005/users/${sessionId}`, {
		method: "DELETE",
	});
