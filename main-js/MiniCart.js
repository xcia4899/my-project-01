import cartLogic from './cartLogic.js';
import { fetchProducts } from "./productService.js";

export const MiniCart = {
  data() {
    return {
      products: [],      // 所有商品資料
      cartItems: [],     // 購物車中商品資料(從localstorage抓取)
      total: 0,          // 購物車總價
      billType: "",      // 用於發票類型
      Remarkopen: false, // 備註欄顯示狀態
    };
  },
  mounted() {
    // 載入商品資料後更新購物車顯示
    fetchProducts()
      .then(data => {
        this.products = data;
        this.updateCartItems();
      })
      .catch(err => {
        console.error("讀取商品資料錯誤:", err);
      });

    // 監聽購物車更新事件，自動刷新購物車內容
    window.addEventListener("cart-updated", this.updateCartItems);
  },
  beforeUnmount() {
    // 元件卸載時移除事件監聽，避免記憶體泄漏
    window.removeEventListener("cart-updated", this.updateCartItems);
  },
  methods: {
    updateCartItems() {
      // 取得購物車資料並對應商品細節，計算每項小計與總價
      const cart = cartLogic.getCart();
      this.cartItems = cart.map(cartItem => {
        const product = this.products.find(p => p.id === cartItem.id);
        if (!product) return null;  // 找不到商品就略過
        const price = product.onsale ? product.price : product.originalPrice;
        return {
          ...product,
          quantity: cartItem.quantity,
          subtotal: price * cartItem.quantity,
        };
      }).filter(Boolean);
      this.total = this.cartItems.reduce((sum, item) => sum + item.subtotal, 0);
    },
    removeFromCart(id) {
      // 從購物車移除指定商品
      cartLogic.removeFromCart(id);
    },
    updateQuantity(item) {
      // 更新商品數量，防止輸入非數字
      const qty = parseInt(item.quantity);
      cartLogic.updateQuantity(item.id, isNaN(qty) ? 1 : qty);
    },
    addQuantity(id) {
      // 增加商品數量 +1
      const item = this.cartItems.find(i => i.id === id);
      if (item) cartLogic.updateQuantity(id, item.quantity + 1);
    },
    subtractQuantity(id) {
      // 商品數量減 1，但數量最低是 1
      const item = this.cartItems.find(i => i.id === id);
      if (item && item.quantity > 1) cartLogic.updateQuantity(id, item.quantity - 1);
    },
    Remarkcontront() {
      // 切換備註欄顯示/隱藏
      this.Remarkopen = !this.Remarkopen;
    }
  }
};
