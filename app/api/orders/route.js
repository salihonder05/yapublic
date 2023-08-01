export async function POST(req) {
    const { costumerId } = await req.json(); 
    const API_URL = process.env.API_URL;
    const query = `query {
        all_orders(customer_id: ${costumerId}) {
            id
            customer {
              id
              customer_name
              customer_pic
            }
            account {
              id
              account_title
              brand {
                id
                brand_name
                brand_banner
              }
            }
            address {
              id
              address_name
              address_text
            }
            order_price
            order_point_use
            ordertype {
              id
              type_name
            }
            status {
              id
              statu_name
            }
            orderpayrule {
              id
              payrule_type
              payrule_name
            }
            order_json
            order_receive_time
            order_table
            order_confirm {
              id
              table
              code
            }
            order_note {
              id
              note_text
            }
            created_at
            updated_at
          }
        }`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });

        if (response.ok) {
            const data = await response?.json();
            var kitchensData = { "data": data };
            return new Response(JSON.stringify(kitchensData), {
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