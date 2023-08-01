export async function POST(req) {
    const {
        id,
        address_name,
        address_phone,
        address_city,
        address_town,
        address_district,
        address_neighborhood,
        address_text,
        token } = await req.json(); 

    const API_URL = process.env.API_URL;
    const query = `
    mutation{ 
        updateAddress(
            id:${id}
            address_name:"${address_name}"
            address_phone:"${address_phone}"
            address_country: ${212}
            address_city: ${address_city}
            address_town: ${address_town}
            address_district: ${address_district}
            address_neighborhood: ${address_neighborhood}
            address_text:"${address_text}"
            address_direction:"no"
            address_location:"no"
            address_lat: ${0}
            address_long:${0}
            address_type: ${2}
            address_row: ${0}
        ){
            id
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