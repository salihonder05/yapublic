export async function POST(req) {
    const { cityId } = await req.json();


    const API_URL = process.env.API_URL;
    const query = `
    query{
        delivery_point_city(c_id:${cityId}, order_type:1) {
            id
            point_fee
            point_row {
              name
            }
            point_account {
              id
              account_title
              brand {
                brand_name
                brand_banner
              }
              account_opening
              account_closing
              address {
                town {
                  name
                }
                neighborhood {
                  name
                }
              }
              account_point {
                id
                set_type
                set_percent
                set_percent_takeaway
              }
              account_kitchen {
                kitchen_id {
                  id
                  name
                }
              }
            }
            point_min_pay
            point_time
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