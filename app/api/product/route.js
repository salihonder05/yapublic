export async function POST(req) {
    const { id, account } = await req.json();
    const API_URL = process.env.API_URL;
    const query = `product(id: ${id},account:${account}){
        id
        product_name
        product_is_menu`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });

        if (response.ok) {
            const data = await response.json();

            var token = { "token": data };
            // console.log("sdsd: " + token);
            return new Response(JSON.stringify(token), {
                headers: { "Content-Type": "application/json" },
                status: 200,
            });

        } else {
            console.error("Form submission failed");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
}; 