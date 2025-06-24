export const appabout = {
        data() {
          return {};
        },
        mounted() {
          this.$nextTick(() => {
            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                  }
                });
              },
              {
                // 上方縮 50% 視窗高度，讓觸發點落在畫面中間
                rootMargin: "-30% 0px -25% 0px",
                threshold: 1,
              }
            );

            document
              .querySelectorAll(".fade-in")
              .forEach((el) => observer.observe(el));
          });
        },
      };