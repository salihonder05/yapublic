export async function POST(req) {
  const API_URL = process.env.API_URL;
  const { accountId } = await req.json();

  const query = `
        {
            product_groups(group_account: ${accountId}) {
                id
                product_group_main {
                  id
                  main_group_name
                  account_group_name{except_g_data}
                }
                products {
                  id
                  product_name
                  account_product_name{except_p_data}
                  account_product_not_show{except_p_not_show}
                  product_detail{
                    detail_text
                  }
                  product_price{
                    price_value
                  }
                  product_type{id type_name}
                  product_is_menu
                  product_number
                  img_url
                  product_menu {
                    id
                    menu_type
                    menu_name
                    product_items {
                        id
                        item_price
                        product {
                            id
                            product_name
                            product_number
                            product_type{id type_name}
                        }
                    }
                }
                  account_product_price{
                    except_c_value
                    except_c_takeaway
                    except_c_eatin
                  }
                }
              } 
    }
    `;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (response.ok) {
      const data = await response.json();

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