export async function POST(req) {
    const { productId } = await req.json();
    const API_URL = process.env.API_URL;
    const query = `query {
        product_menus(product:${productId}) {
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
            var product_menus = { "data": data };
            return new Response(JSON.stringify(product_menus), {
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