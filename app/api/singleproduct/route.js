export async function POST(req) {
  const { productId, accountId } = await req.json();
  const API_URL = process.env.API_URL;
  const query = `query {
    product(id: ${productId}, account: ${accountId}) {
      id
      product_group {
        id
        product_group_main {
          id
          main_group_name 
          img_url
        }
      }
      account_product_name{except_p_data}
      product_group2 {
        id
        product_group_main {
          id
          main_group_name 
          img_url
        }
      }
      account_product_price{
        except_c_value
        except_c_takeaway
        except_c_eatin
    }
      product_name 
      product_type{id type_name}
      product_number
      product_is_menu
      product_price{id price_value price_takeaway price_eatin price_active price_group}  
      product_detail{id detail_text detail_type}
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
      product_active
      product_sort
      img_url
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