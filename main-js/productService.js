// productService.js

//async/await寫法
// export async function fetchProducts() {
//   const res = await fetch("./json/multi_brand_products.json");
//   return await res.json();
// }

// export async function fetchFilters() {
//   const res = await fetch("./json/filters.json");
//   return await res.json();
// }

//fetch寫法
export function fetchProducts() {
  return fetch("./json/multi_brand_products.json")
    .then(res => res.json());
}

export function fetchFilters() {
  return fetch("./json/filters.json")
    .then(res => res.json());
}
export function fetchActive() {
  return fetch("./json/events.json")
    .then((res) => res.json());
}
