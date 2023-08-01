export async function POST(req) {
    const { name, email, pw } = await req.json();

    // return new Response(JSON.stringify(name), {
    //     headers: { "Content-Type": "application/json" },
    //     status: 200,
    // });

    const API_URL = process.env.API_URL;
    const query = `mutation {createUser(name: "${name}", email: "${email}", password: "${pw}") {
        token, 
        user {
            id
        }
        }}
        `;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });
        const data = await response.json();

        if (response.ok) {
            
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