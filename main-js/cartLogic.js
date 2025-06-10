// cartLogic.js
export default {
  // 取得購物車資料（從 localStorage，沒有則回傳空陣列）
  getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  },

  // 儲存購物車資料並觸發事件（讓其他元件可監聽 "cart-updated"）
  saveCart(cart) {
    if (!Array.isArray(cart)) return;
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
  },

  // 加入商品到購物車，若已存在則增加數量
  addToCart(product, quantity = 1) {
    const cart = this.getCart();
    const existing = cart.find((item) => item.id === product.id);
    let message = "";

    if (existing) {
      existing.quantity += quantity;
      message = "existing";
    } else {
      cart.push({ id: product.id, quantity });
      message = "new";
    }

    this.saveCart(cart);
    return message; // 可用於 alert 顯示不同狀態
  },

  // 移除指定商品
  removeFromCart(id) {
    const cart = this.getCart().filter((item) => item.id !== id);
    this.saveCart(cart);
  },

  // 更新指定商品數量（小於 1 會自動設為 1）
  updateQuantity(id, quantity) {
    const cart = this.getCart();
    const item = cart.find((item) => item.id === id);
    if (item) {
      item.quantity = quantity < 1 ? 1 : quantity;
      this.saveCart(cart);
    }
  }
};
