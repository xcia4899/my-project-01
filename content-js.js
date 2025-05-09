//sec-row 點擊控制
    let row3_Num = 0;
    const items = document.querySelectorAll(".secnod-row-02 .item");
    const content = document.querySelector(".sec-row-area");

    items.forEach((item, index) => {
      item.addEventListener("click", () => {
        row3_Num = index;
        content.style.left = row3_Num * -100 + "%";
        items.forEach(i => {
          i.classList.remove("item-color");
        })
        item.classList.add("item-color");

      });
    });
    items[0].classList.add("item-color");

    //-----------
    //Carousel小輪播程式判斷
    var swiper = new Swiper(".littl-swip", {
      slidesPerView: 2,
      spaceBetween: 16,
      pagination: {
        el: ".littl-swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next", // 加這兩行就能控制左右按鈕
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        300: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        920: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 32,
        },
      },
    });