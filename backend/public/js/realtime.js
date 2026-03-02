const socket = io()

// Renderizado en tiempo real
socket.on('updateProducts', (products) => {
  const list = document.getElementById('productsList')
  list.innerHTML = ''

  products.forEach(product => {
    const li = document.createElement('li')

    li.innerHTML = `
      <strong>${product.title}</strong> - $${product.price}
      <button data-id="${product.id}">Eliminar</button>
    `

    list.appendChild(li)
  })

  // Agregar evento a botones eliminar
  document.querySelectorAll('button[data-id]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id')
      socket.emit('deleteProduct', id)
    })
  })
})

// Manejo del formulario
const form = document.getElementById('productForm')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const formData = new FormData(form)

  const product = {
    title: formData.get('title'),
    price: Number(formData.get('price')),
    description: "Desde WebSocket",
    code: Date.now().toString(),
    status: true,
    stock: 1,
    category: "websocket",
    thumbnails: []
  }

  socket.emit('newProduct', product)

  form.reset()
})