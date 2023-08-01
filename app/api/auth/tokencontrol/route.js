export async function POST(req) {
  const { userToken } = await req.json();
  // console.log("İlk gelen userToken verisi: " + userToken);

  const API_URL = process.env.API_URL;
  const query = ` 
    query {
      activeUser {
        id
        name
        customer {
          id
          customer_name
          customer_pic
          customer_order_source
          user{
            password
          }
          external_customer {
            id
            name
            contact
            external_id
            external_source
            created_at
            updated_at
          }
        }
        email
        email_verified_at
        password
        remember_token
        phone
        birth_date
        email_permission
        reset_token
        reset_token_expiry
        passive
        passive_text
        fcm_token
        user_role {
          user_id 
          id
        }
      }
    }
      `;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken
      },
      body: JSON.stringify({ query }),
    });

    if (response.ok) {
      const data = await response.json();
      const user = data.data.activeUser;
      // console.log(user)

      const resActiveUserID = data.data.activeUser.id;
      if (resActiveUserID > 0) {
        return new Response(JSON.stringify({ user }), {
          headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
          status: 200,
        });
      } else {
        console.log("Buraya anlamlı response alamıyoruz. Token Kontrol Endpointi istendikten sonra buraya response işlenip buradaki hata mesajına göre auth componentinde kalan işlemlere devam edilecek.");
      }


      //var token = { "token": data.data.signIn.token };
      return new Response(JSON.stringify({ data }), {
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
        status: 200,
      });

    } else {
      //console.error("Form submission failed");
    }
  } catch (error) {
    //console.error("Error submitting form:", error);
  }
};