// cart-vue.js
export const MiniCart = {
  data() {
    return {
      products: [],
      cartItems: [],
      total: 0,
    };
  },
  mounted() {
    fetch("/json/multi_brand_products.json")
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
        this.updateCartItems();
      })
      .catch((err) => {
        console.error("讀取 JSON 檔案錯誤:", err);
      });

    window.addEventListener("cart-updated", () => {
      this.updateCartItems();
    });
  },
  methods: {
    updateCartItems() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      this.cartItems = cart.map((cartItem) => {
        const product = this.products.find((p) => p.id === cartItem.id);
        return {
          ...product,
          quantity: cartItem.quantity,
          subtotal: product.price * cartItem.quantity,
        };
      });

      this.total = this.cartItems.reduce((sum, item) => sum + item.subtotal, 0);
    },
    removeFromCart(id) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart = cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));

      this.updateCartItems();
      window.dispatchEvent(new Event("cart-updated"));
    },
  },
};
