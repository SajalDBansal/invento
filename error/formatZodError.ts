export default function formatZodErrors(error: any) {
    const flattened = error.flatten();

    const result: Record<string, string> = {};

    for (const key in flattened.fieldErrors) {
        const messages = flattened.fieldErrors[key];
        if (messages && messages.length > 0) {
            result[key] = messages[0]; // take first error only
        }
    }

    return result;
}