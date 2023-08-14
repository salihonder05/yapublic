export async function POST(req) {
    const { addressId } = await req.json();


    const API_URL = process.env.API_URL;
    const query = `
            query {
                address(id: ${parseInt(addressId)}) {
                  id
                  address_name
                  address_text 
                  citiy {
                    id
                    name
                  }
                  town {
                    id
                    name
                  }
                  district {
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