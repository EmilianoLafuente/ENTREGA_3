const socket = io()

socket.on('updateProducts', (products) => {
  const list = document.getElementById('productsList')

  list.innerHTML = ''

  products.forEach(product => {
    const li = document.createElement('li')
    li.innerHTML = `<strong>${product.title}</strong> - $${product.price}`
    list.appendChild(li)
  })
})