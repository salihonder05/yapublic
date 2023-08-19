export async function POST(req) {
    const { name, email, phone, password, token } = await req.json(); 
    const API_URL = process.env.API_URL;
    // ${name ? 'name: "' + name + '"' : ''} 
    // ${email ? 'email: "' + email + '"' : ''} 
    // ${phone ? 'phone: "' + phone + '"' : ''} 
    // ${password ? 'password: "' + password + '"' : ''} 
    const query = `
    mutation{ 
        updateUser(
            ${name ? 'name: "' + name + '"' : ''} 
            ${email ? 'email: "' + email + '"' : ''} 
            ${phone ? 'phone: "' + phone + '"' : ''} 
            ${password ? 'password: "' + password + '"' : ''} 
        ){
            user{
                id
            }
            }
        }`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({ query }),
        });
        const data = await response.json();
        // console.log("responsedata: ", data);
        // if (response.ok) {
        return new Response(JSON.stringify({ data }), {
            headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
            status: 200,
        });
        // } else {
        //     console.error("Form submission failed");
        // }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
};