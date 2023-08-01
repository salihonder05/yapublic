export async function POST(req) {
    const { customerId, token } = await req.json();
    // console.log("userTokensss" , customerId);

    const API_URL = process.env.API_URL;
    const query = `
    query{customer_addresses(customer_id: ${customerId}){
        id
        address_name
        address_phone
        address_row
        address_lat
        address_long
        address_text
        address_direction
        address_location 
        address_type {
          id
          type_name
        }
        town {
          id
          name
        }
        district {
          id
          name
        }
        citiy {
          id
          name
        }
        neighborhood {
          id
          name
        } 
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