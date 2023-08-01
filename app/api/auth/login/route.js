export async function POST(req) {
    const { email, pw } = await req.json();


    const API_URL = process.env.API_URL;
    const query = `mutation{  signIn(email:"${email}",password:"${pw}"){ token  } }`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({query}),
        });
        //console.log("response: ", response);
        const data = await response.json();
        if (response.ok) {
            // console.log("sdsd: " + data.data.signIn.token);
            // console.log(data);
            //return data;

            var token = { "token": data.data.signIn.token };
            return new Response(JSON.stringify({ token }), {
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