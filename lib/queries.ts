export function fetchProducts(limit?: number, skip?: number) {
  // return fetch(`https://dummyjson.com/products${limit ? `?limit=${limit}` : ''}${skip ? `&skip=${skip}` : ''}`).then(
  //   (res) => res.json()
  // );
  const params = new URLSearchParams();
  if (limit) params.set('limit', limit.toString());
  if (skip) params.set('skip', skip.toString());
  return fetch(`https://dummyjson.com/products?${params.toString()}`).then((res) => res.json());
}

export function fetchProductsByCategory(category: string) {
  return fetch(`https://dummyjson.com/products/category/${category}`).then((res) => res.json());
}

export function fetchProductsByQuery(query: string) {
  return fetch(`https://dummyjson.com/products/search?q=${query}`).then((res) => res.json());
}

export function fetchProduct(id: number) {
  return fetch(`https://dummyjson.com/products/${id}`).then((res) => res.json());
}

export function fetchCategories() {
  return fetch('https://dummyjson.com/products/categories').then((res) => res.json());
}

export function fetchCarts() {
  return fetch('https://dummyjson.com/carts').then((res) => res.json());
}

export function fetchCart(id: number) {
  return fetch(`https://dummyjson.com/carts/${id}`).then((res) => res.json());
}

export function fetchCartByUser(userId: number) {
  return fetch(`https://dummyjson.com/carts/user/${userId}`).then((res) => res.json());
}

export function updateCart(cartId: number, products: { id: number; quantity: number }[], merge = false) {
  return fetch(`https://dummyjson.com/carts/${cartId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      merge,
      products,
    }),
  }).then((res) => res.json());
}
