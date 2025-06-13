import cartLogic from './cartLogic.js';
import { fetchProducts } from "./productService.js";

export const ProductDetail = {
  data() {
    return {
      product: {
        brand: '',
        name: '',
        price: 0,
        originalPrice: 0,
        images: {
          main: '',
          thumbnails: []
        },
        subtitle: ''
        // 其他你有用到的欄位預設空值也補上
      },
      currentImage: '',
      openStates: [], // 用於控制每個區塊是否開啟
    }
  }
  ,
  mounted() {
    // 從 URL 查詢參數取得商品 id
    const id = new URLSearchParams(location.search).get('id');
    if (!id) {
      alert("錯誤：網址沒有指定商品 id");
      return;
    }
    // 載入所有商品，並找出符合 id 的商品賦值給 product
    fetchProducts()
      .then(data => {

        this.product = data.find(p => p.id == id);
        console.log("找到的商品：", this.product);
        this.currentImage = this.product.images.main; // ✅ 預設主圖
        this.openStates = this.product.details.map(() => false);
      })
      .catch(err => {
        console.error("讀取商品資料錯誤:", err);
      });

  },
  methods: {
    addToCart(product) {
      // 使用 cartLogic 加入購物車，並根據回傳結果提示訊息
      const result = cartLogic.addToCart(product);
      if (result === "existing") {
        alert(`商品已在購物車中，數量 +1: ${product.name}`);
      } else {
        alert(`加入購物車: ${product.name}`);
      }
    },
    //detailed-content開關
    toggleSection(index) {
      this.openStates[index] = !this.openStates[index];
    }
  },

};
