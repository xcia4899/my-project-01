import { fetchActive } from "./productService.js"; // 載入資料的函式

export const active = {
    data() {
        return {
            events: [],
        };
    },
    mounted() {
        fetchActive()
            .then((data) => {
                this.events = data;
                // console.log(this.events);
            })
            .catch((err) => console.error("讀取活動資料失敗：", err));
    },
};