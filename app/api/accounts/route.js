export async function POST() {
    const API_URL = process.env.API_URL;
    const query = `
        {
            accounts{
            id
            account_title
            address{ 
                citiy{
                name
                }
            }
        }
    }
    `;

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