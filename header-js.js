//first-row 自動輪播
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    init: function () {
      // Swiper 初始化完成，手動加第一次的 progress
      const bullets = document.querySelectorAll(".swiper-pagination-bullet");
      const activeBullet = bullets[this.realIndex];
      if (activeBullet) {
        activeBullet.classList.remove("progress");
        void activeBullet.offsetWidth;
        activeBullet.classList.add("progress");
      }
    },
    slideChangeTransitionStart: function () {
      // 清除所有 progress
      document
        .querySelectorAll(".swiper-pagination-bullet")
        .forEach((bullet) => {
          bullet.classList.remove("progress");
        });
    },
    slideChangeTransitionEnd: function () {
      // 加新的 progress
      const bullets = document.querySelectorAll(".swiper-pagination-bullet");
      const activeBullet = bullets[this.realIndex];
      if (activeBullet) {
        activeBullet.classList.remove("progress");
        void activeBullet.offsetWidth;
        activeBullet.classList.add("progress");
      }
    },
  },
});



//----------------------------------
//header 透明滾動判斷
const header = document.querySelector("header");
const headerinner = document.getElementById("header-inner");
const allLinks = headerinner.querySelectorAll("a");

const triggers = document.querySelectorAll(".trigger");
const dropdowns = document.querySelectorAll(".dropdown-content");
// const navAllLiTag = document.querySelectorAll("nav li");
const closeButtons = document.querySelectorAll(".dropdown-close");

const navbar = document.querySelector(".navbar");
const navAllLiTag = document.querySelectorAll(".navbar li");
const navallATag = document.querySelectorAll(".navbar a");
const menutoggle = document.querySelector(".menu-toggle");

function updateHeaderOnScroll() {
  // 判斷目前是否已經滾動超過 100px，高於就回傳 true，否則 false
  const shouldAdd = window.scrollY > 100;
  // 如果 shouldAdd 為 true，就加上 header-bgcolors；為 false，就移除它
  header.classList.toggle("header-bgcolors", shouldAdd);
  headerinner.classList.toggle("header-colors", shouldAdd);
  allLinks.forEach((link) => link.classList.toggle("header-colors", shouldAdd));
}
document.addEventListener("DOMContentLoaded", updateHeaderOnScroll);

window.addEventListener("scroll", updateHeaderOnScroll);

//dropdow header 程式控制

triggers.forEach((trigger) => {
  // 根據 trigger 的 ID（例如 trigger-shoplist），轉換出對應的 dropdown ID（例如 dropdown-shoplist）
  const targetId = trigger.id.replace("trigger-", "dropdown-");
  const targetDropdown = document.getElementById(targetId);
  const parentLi = trigger.closest("li");

  trigger.addEventListener("mouseenter", () => {
    if (window.innerWidth > 920) {
      closeAllDropdownsExcept(targetDropdown); // 關閉其他 dropdown，只開啟當前這個
      targetDropdown.classList.add("dropdrop-open");
    }
  });

  trigger.addEventListener("click", (e) => {
    e.stopPropagation(); // 阻止事件冒泡，避免觸發 document 的 click 事件
    const isOpen = targetDropdown.classList.contains("dropdrop-open"); // 判斷目前是否開啟
    closeAllDropdownsExcept(null); // 先關閉全部 dropdown

    if (!isOpen) {
      targetDropdown.classList.add("dropdrop-open");
    }
  });

  targetDropdown.addEventListener("mouseenter", () => {
    if (parentLi) {
      parentLi.classList.add("li-color");
      const aTag = parentLi.querySelector("a");
      if (aTag) {
        aTag.classList.add("li-color");
      }
    }
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // 找到最接近的 .dropdown-content 父層
    const dropdown = button.closest(".dropdown-content");
    if (dropdown) {
      dropdown.classList.remove("dropdrop-open");
      closeLicolor();
    }
  });
});

document.addEventListener("click", (e) => {
  // console.log("你點到了：", e.target);
  dropdowns.forEach((dropdown) => {
    // 如果點擊的地方不在 dropdown 就關閉該 dropdown
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("dropdrop-open");
      closeLicolor();
      // trigger.classList.remove("li-color");
    }
  });
});

// 輔助函式：關閉所有 dropdown，除了指定的那一個（如果傳入 null，則全部都關）
function closeAllDropdownsExcept(target) {
  dropdowns.forEach((dropdown) => {
    dropdown.style.transition = "";
    if (dropdown !== target) {
      if (window.innerWidth > 920) {
        dropdown.style.transition = "none";
      }
      dropdown.classList.remove("dropdrop-open");
    }
  });
}
//當滑進非 trigger 的 <li> 時，關閉所有 dropdown

// const navAllLiTag = document.querySelectorAll("nav li");
navAllLiTag.forEach((item) => {
  if (!item.classList.contains("trigger")) {
    item.addEventListener("mouseenter", () => {
      if (window.innerWidth > 920) {
        closeAllDropdownsExcept(null);
      }
    });
  }
});

navAllLiTag.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    const linkatag = link.querySelector("a");
    closeLicolor();
    // linkatag.classList.add("li-color");
  });
});
function closeLicolor() {
  navallATag.forEach((Links) => {
    Links.classList.remove("li-color");
  });
  navAllLiTag.forEach((Links) => {
    Links.classList.remove("li-color");
  });
}
window.addEventListener("resize", () => {
  const headerinner = document.querySelector("#header-inner");
  if (window.innerWidth > 920) {
    headerinner.classList.remove("header-toggle");
    navbar.classList.remove("mobile-nav");
  }
});
//menu-toggle
menutoggle.addEventListener("click", () => {
  navbar.classList.toggle("mobile-nav");
  headerinner.classList.toggle("header-toggle");
});
