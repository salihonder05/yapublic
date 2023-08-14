export async function POST(req) {
    const { accountId, payruleTypeId } = await req.json();


    const API_URL = process.env.API_URL;
    const query = `
            query { 
                account_payrules(payrule_account: ${accountId}, payrule_type: ${payruleTypeId}) {
                    id
                    orderpayrule {
                        id
                        payrule_name
                        }  
                }  
            }`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query }),
        });
        const data = await response.json();
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