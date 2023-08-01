export async function POST(req) {
    const { addressId, token } = await req.json();
    // console.log("userTokensss" , addressId);

    const API_URL = process.env.API_URL;
    const query = `
    mutation{ 
        delete_address(id: ${addressId}){
            success
            message
            }
        }`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
            body: JSON.stringify({ query }),
        });
        const data = await response.json();
        // console.log("responsedata: ", data);
        if (response.ok) {

            return new Response(JSON.stringify({ data }), {
                headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
                status: 200,
            });

        } else {
            console.error("Form submission failed");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
};