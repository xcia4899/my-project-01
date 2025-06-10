// productlist.js
import { fetchProducts, fetchFilters } from "./productService.js"; // 載入抓商品跟篩選器資料的函式
import cartLogic from './cartLogic.js'; // 載入購物車操作邏輯
import { handleResponsiveResize } from "./responsiveHelper.js"; // 響應式尺寸處理函式

export const productlist = {
  data() {
    return {
      products: [],           // 商品資料陣列
      selectedproducts: [],   // 篩選器選取的標籤
      filterSections: [],     // 篩選器分類資料
      widthsize: 920,         // 預設寬度（用於響應式）
      sidebar: true,          // 側邊欄顯示狀態
      hasAutoOpened: false,   // 側邊欄自動開啟旗標
      hasAutoClosed: false,   // 側邊欄自動關閉旗標
      openSections: [],       // 篩選器展開區塊索引
      currentPage: 1,         // 當前頁碼（分頁用）
      itemsPerPage: window.innerWidth < 600 ? 4 : 9, // 每頁商品數，依視窗大小調整
    };
  },
  mounted() {
    // 載入商品資料
    fetchProducts()
      .then(data => { this.products = data; })
      .catch(err => { console.error(err); });

    // 載入篩選器資料
    fetchFilters()
      .then(data => {
        this.filterSections = data;
        this.applyInitialFilterFromURL(); // 新增：根據網址展開
      })
      .catch(err => { console.error(err); });
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  beforeUnmount() {
    // 離開元件前移除視窗大小調整事件監聽
    window.removeEventListener("resize", this.handleResize);

  },
  methods: {
    goDetail(id) {
      // 跳轉商品詳細頁
      window.location.href = `product-detail.html?id=${id}`;
    },
    clearFilters() {
      // 清除所有篩選標籤
      this.selectedproducts = [];
    },
    removeTag(tag) {
      // 移除指定篩選標籤
      this.selectedproducts = this.selectedproducts.filter(t => t !== tag);
    },
    toggleSection(index) {
      // 切換篩選區塊展開/收合狀態
      const i = this.openSections.indexOf(index);
      if (i > -1) this.openSections.splice(i, 1);
      else this.openSections.push(index);
    },
    applyInitialFilterFromURL() {
      // 從網址中取得名為 "title" 的查詢參數
      const titleTag = new URLSearchParams(window.location.search).get("title");
      if (!titleTag) return; //沒有 title，直接結束

      // 在篩選器中找到 title 相符的篩選區塊
      const matchedSection = this.filterSections.find(sec => sec.title === titleTag);
      // 如果找不到對應的區塊，或該區塊沒有 options，直接結束
      if (!matchedSection || !Array.isArray(matchedSection.options)) return;

      //加入所有options
      this.selectedproducts = [...matchedSection.options];

      // 在篩選器中找出該區
      const sectionIndex = this.filterSections.indexOf(matchedSection);
      // 如果該區未展開，加入 openSections 
      if (!this.openSections.includes(sectionIndex)) {
        this.openSections.push(sectionIndex);
      }
    },
    toggleSidebar() {
      // 切換側邊欄顯示狀態
      this.sidebar = !this.sidebar;
    },
    handleResize() {
      // 響應式視窗尺寸調整邏輯
      handleResponsiveResize(this.widthsize, this);
    },
    addToCart(product) {
      // 加入購物車並提示使用者
      const result = cartLogic.addToCart(product);
      if (result === "existing") {
        alert(`商品已在購物車中，數量 +1: ${product.name}`);
      } else {
        alert(`加入購物車: ${product.name}`);
      }
    },
    goToPage(page) {
      // 跳轉至指定分頁
      this.currentPage = page;
      this.scrollToProductContent();
    },
    prevPage() {
      // 上一頁分頁功能
      if (this.currentPage > 1) this.currentPage--;
      this.scrollToProductContent();
    },
    nextPage() {
      // 下一頁分頁功能
      if (this.currentPage < this.totalPages) this.currentPage++;
      this.scrollToProductContent();
    },
    scrollToProductContent() {
      // 捲動到產品列表區塊（滑動效果）
      const target = document.querySelector(".product-content");
      if (target) target.scrollIntoView({ behavior: "smooth" });
    },
  },
  computed: {
    showClearBtn() {
      // 判斷是否顯示清除篩選按鈕
      return this.selectedproducts.length > 0;
    },
    filteredProducts() {
      // 根據選取的篩選標籤，過濾商品列表
      if (this.selectedproducts.length === 0) return this.products;
      return this.products.filter(product => {
        if (!Array.isArray(product.tags)) return false;
        return this.selectedproducts.some(tag => product.tags.includes(tag));
      });
    },
    paginatedProducts() {
      // 取得當前頁分頁的商品
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },
    totalPages() {
      // 計算分頁總頁數
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
  },
  watch: {
    selectedproducts() {
      // 當篩選條件改變時，重設分頁回第一頁
      this.currentPage = 1;
    },
  },
};
