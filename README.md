# Horizon MPA｜電商網站舊版

## 專案介紹

此作品為 Horizon 電商網站的早期版本，採用 MPA（Multi-Page Application，多頁式應用程式）架構開發。

網站以電競周邊商品為主題，包含首頁、商品列表、商品詳細、活動、品牌介紹、會員登入與購物車等頁面。

專案主要使用 HTML、CSS、JavaScript 與 Vue CDN 製作，並透過 JSON 資料、網址查詢參數與 Local Storage，完成商品顯示、分類篩選、頁面跳轉與購物車資料保存。

此版本也是後續 Vue 與 Nuxt 版本的前身，主要用於練習完整電商網站流程與多頁式網站架構。

* **專案類型：** 電商網站
* **版本定位：** Horizon 舊版／MPA 版本
* **開發方式：** 個人專案
* **架構：** Multi-Page Application

---

## 網站內容

網站主要包含以下頁面與功能：

* 電商首頁
* 商品分類選單
* 品牌分類選單
* 商品列表
* 商品詳細頁
* 商品搜尋與篩選
* 活動頁面
* 關於我們
* 會員登入頁面
* 購物車頁面
* 導覽列迷你購物車
* 商品數量與金額計算
* 手機版導覽選單
* RWD 響應式版型

---

## 使用技術

* HTML5
* CSS3
* JavaScript
* Vue CDN
* Swiper
* JSON
* Fetch API
* Local Storage
* URL Search Params
* CSS Flexbox
* CSS Grid
* Media Query
* SVG Icon

---

## 專案特色

### MPA 多頁式網站架構

此版本採用 MPA 架構，每個主要功能分別建立獨立 HTML 頁面，例如：

* `index.html`
* `productlist.html`
* 商品詳細頁
* `cart.html`
* `login.html`
* `Activity.html`
* `aboutus.html`

使用者切換功能時，瀏覽器會載入另一個 HTML 頁面。

相較於後續 Vue Router 或 Nuxt 的 SPA 架構，此版本可以呈現專案從原生多頁式網站，逐步重構為框架應用的學習歷程。

### 電商首頁

首頁包含：

* 主視覺輪播
* 商品宣傳內容
* 商品分類
* 品牌介紹
* 推薦商品
* 活動資訊
* Header 與 Footer

使用 Swiper 製作首頁 Banner，自動播放並提供：

* 上一張與下一張按鈕
* Pagination
* 循環播放
* 響應式輪播設定

### 商品分類導覽

Header 提供商品分類下拉選單，可快速前往：

* 全部商品
* 滑鼠
* 鍵盤
* 耳機
* 麥克風

分類連結會將條件加入網址：

```text
productlist.html?title=滑鼠
```

商品列表頁再根據網址參數顯示對應分類。

### 品牌分類導覽

網站提供品牌分類功能，例如：

* MSI
* Logitech
* Razer
* ROG

品牌條件同樣透過 Query String 傳遞：

```text
productlist.html?title=品牌&brand=Logitech
```

讓商品列表頁可以根據 `brand` 篩選對應商品。

### URL 查詢參數

使用網址查詢參數將分類、品牌或商品資訊傳遞到其他頁面。

例如：

```js
const params = new URLSearchParams(window.location.search);
const category = params.get("title");
const brand = params.get("brand");
```

這種方式適合多頁式網站，可讓不同頁面根據網址載入不同資料。

### 商品資料載入

商品內容由 JSON 資料提供，JavaScript 讀取資料後，再依照目前頁面的條件產生商品卡片。

主要流程包含：

1. 載入商品 JSON
2. 取得網址參數
3. 篩選符合條件的商品
4. 產生商品卡片
5. 插入商品列表
6. 顯示搜尋結果

藉此練習資料與畫面分離，而不是將所有商品直接寫死在 HTML 中。

### 商品列表與篩選

商品列表頁可以依照不同條件顯示商品，例如：

* 商品類別
* 商品品牌
* 商品名稱
* 價格
* 關鍵字

透過 JavaScript 的陣列方法處理資料：

```js
products.filter((product) => {
  return product.category === selectedCategory;
});
```

讓使用者能更快找到指定商品。

### 商品詳細頁

從商品列表點擊商品後，將商品 ID 傳入詳細頁。

詳細頁會根據 ID 找到對應商品，並顯示：

* 商品名稱
* 商品圖片
* 商品價格
* 商品介紹
* 商品規格
* 商品數量
* 加入購物車按鈕

藉此完成商品列表到詳細頁的資料串接流程。

### 購物車功能

購物車可保存使用者加入的商品，內容包含：

* 商品 ID
* 商品名稱
* 商品圖片
* 商品單價
* 商品數量
* 商品小計

加入相同商品時，可以更新數量，而不是重複新增完全相同的項目。

### Local Storage 資料保存

購物車資料使用 Local Storage 保存。

```js
localStorage.setItem("cart", JSON.stringify(cartItems));
```

重新開啟頁面時，再將資料轉回 JavaScript 陣列：

```js
const cartItems =
  JSON.parse(localStorage.getItem("cart")) || [];
```

因此即使切換到其他 HTML 頁面或重新整理，購物車內容仍可保留。

### 迷你購物車

Header 右側提供購物車圖示與商品數量。

當購物車內有商品時，會顯示：

* 購物車商品數量
* 商品圖片
* 商品名稱
* 購買數量
* 商品小計
* 購物車總金額
* 刪除商品
* 前往結帳

迷你購物車使用 Vue CDN 管理資料與畫面更新。

### 購物車金額計算

每筆商品小計：

```js
subtotal = price * quantity;
```

購物車總金額則由全部商品小計加總：

```js
const total = cartItems.reduce((sum, item) => {
  return sum + item.subtotal;
}, 0);
```

當商品數量或購物車內容改變時，總金額會重新計算。

### Vue CDN 局部應用

此版本不是完整的 Vue CLI 或 Vite 專案，而是在傳統 HTML 頁面中透過 Vue CDN，處理購物車等需要響應式更新的區塊。

例如：

```html
<div v-for="item in cartItems" :key="item.id">
  <img :src="item.images.main" :alt="item.name" />
  <div>{{ item.name }}</div>
  <div>數量：{{ item.quantity }}</div>
</div>
```

這是從原生 JavaScript 過渡到 Vue 框架的重要練習。

### RWD 響應式設計

針對桌面、平板與手機版調整：

* Header 導覽列
* 手機版漢堡選單
* 商品卡片欄數
* 主視覺高度
* 商品詳細頁排列
* 購物車表格
* 按鈕與字體尺寸
* 區塊留白

讓網站在不同裝置上都能維持基本操作與閱讀體驗。

---

## 專案結構

```text
Horizon_MPA/
├── images/
│   ├── bg/
│   ├── logo/
│   ├── pic-detal/
│   └── pictrue/
├── js/
├── json/
├── main-css/
│   └── webindex.css
├── index.html
├── productlist.html
├── cart.html
├── login.html
├── Activity.html
├── aboutus.html
└── README.md
```

---

## 與新版 Horizon 的差異

此專案為 Horizon 的初期 MPA 版本，後續版本逐步重構為 Vue 與 Nuxt 架構。

### 舊版 MPA

* 每個功能使用獨立 HTML
* 使用網址參數傳遞條件
* 使用 JavaScript 操作 DOM
* 使用 Vue CDN 處理局部功能
* 使用 Local Storage 保存購物車
* 商品資料來自本地 JSON

### 後續版本

* 使用 Vue 3／Nuxt
* 使用 Vue Router 或檔案式路由
* 使用元件化架構
* 使用 Pinia 管理狀態
* 使用 TypeScript
* 串接 RESTful API
* 使用 Supabase 管理資料與會員
* 部署至 Vercel

這個版本主要呈現從傳統網頁開發，逐步學習框架、狀態管理與後端資料串接的過程。

---

## 學習重點

透過此專案練習並加強以下能力：

* 建立完整的多頁式電商網站
* 規劃首頁、列表、詳細頁與購物車
* 使用 HTML 與 CSS 完成電商切版
* 使用 JavaScript 動態產生商品內容
* 使用 JSON 管理商品資料
* 使用 Fetch API 讀取本地資料
* 使用 URL Search Params 傳遞頁面條件
* 實作商品分類與品牌篩選
* 實作商品列表與商品詳細頁
* 使用 Local Storage 保存購物車
* 計算商品數量、小計與總金額
* 使用 Vue CDN 建立局部響應式功能
* 使用 Swiper 製作首頁輪播
* 建立桌面版與手機版介面
* 理解 MPA 與 SPA 架構差異

---

## 執行方式

此專案不需要安裝 npm 套件，可直接使用瀏覽器開啟。

但因為專案可能使用 Fetch API 讀取本地 JSON，建議透過本機伺服器執行。

例如使用 VS Code Live Server：

```text
1. 使用 VS Code 開啟專案
2. 安裝 Live Server 擴充功能
3. 在 index.html 點擊右鍵
4. 選擇 Open with Live Server
```

避免直接以 `file://` 開啟時，瀏覽器阻擋本地資料讀取。

---

## 專案連結

* **GitHub：** [xcia4899/Horizon_MPA](https://github.com/xcia4899/Horizon_MPA)
* **預設分支：** `new-main`

---

## 備註

本專案為 Horizon 電商網站的早期學習版本，主要展示多頁式網站、商品資料處理與購物車流程。

目前部分結構與程式碼已由後續 Vue、Nuxt 版本重新設計，因此此 Repository 適合作為開發歷程與框架重構前後的對照。
