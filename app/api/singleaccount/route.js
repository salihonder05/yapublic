export async function POST(req) {
  const { accountId } = await req.json();


  const API_URL = process.env.API_URL;
  const query = `
        query{account(id: ${accountId}) {
            id
            account_order_accept
            account_opening
            account_closing
            account_delivery
            account_takeaway
            account_eatin
            address {
              id
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
            account_kitchen {
              id
              kitchen_account {
                id
                account_title
              }
              kitchen_id {
                id
                name
                image
              }
            }
            account_work_hours {
              id
              monday_opening
              monday_closing
	        		tuesday_opening
              tuesday_closing
              wednesday_opening
              wednesday_closing
              thursday_opening
              thursday_closing
              friday_opening
              friday_closing
              saturday_opening
              saturday_closing
              sunday_opening
              sunday_closing
            }
            account_title
            account_e_mail
            account_gsm_no
            brand {
              id
              brand_banner
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