// cart-vue.js
export const MiniCart = {
  data() {
    return {
      products: [],
      cartItems: [],
      total: 0,
      billType: "", 
      Remarkopen:false,
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
    saveCart(cart) {
      if (!Array.isArray(cart)) {
        console.error("嘗試儲存非陣列型 cart：", cart);
        return;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cart-updated"));
    },
    removeFromCart(id) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart = cart.filter((item) => item.id !== id);

      this.saveCart(cart);
      this.updateCartItems();
    },
    addQuantity(id) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      // 找到要增加數量的項目
      const item = cart.find((item) => item.id === id);
      if (item) {
        item.quantity++;
      }

      this.saveCart(cart);
      this.updateCartItems();
    },
    subtractQuantity(id) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const item = cart.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity--;
      }

      this.saveCart(cart);
      this.updateCartItems();
    },
    Remarkcontront(){
      this.Remarkopen =!this.Remarkopen;
    }
  },
};
