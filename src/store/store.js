import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useStore = defineStore('store', () => {
  const theme = ref('theme-dark')
  const cart = ref([]);

  const sheet = computed(() => {
    return theme.value == 'theme-dark' ? 'bg-surface-900' : 'bg-surface-200'
  })

  const addToCart = (product) => {
    const productInCart = cart.value.find(item => item.id == product.id);

    if (productInCart) {
      productInCart.qty++
    } else {
      if (cart.value.length && !cart.value.find(item => item.restaurant_id == product.restaurant_id)) return

      cart.value.push({
        id: product.id,
        restaurant_id: product.restaurant_id,
        image: product.image,
        name: product.name,
        price: product.price,
        qty: 1
      })
    }
  }

  const removeFromCart = (product) => {
    const productIndex = cart.value.findIndex(item => product.id == item.id)

    if (productIndex) {
      const productInCart = cart.value[productIndex]
      if (product.qty > 1) {
        product.qty--
      } else {
        cart.value.splice(productIndex, 1)
      }
    }
  }

  const resetCart = () => {
    cart.value = [];
  }

  const productInCartCount = (product) => {
    const productInCart = cart.value.find(item => item.id == product.id)
    return productInCart?.qty
  }

  const qtyInCartCount = () => {
    return cart.value.reduce((accumulator, item) => {
      return accumulator + item.qty
    }, 0)
  }

  const getCartGrandTotal = () => {
    return cart.value.reduce((accumulator, item) => {
      return accumulator + (item.qty * item.price)
    }, 0)
  }

  return { theme, sheet, cart, addToCart, removeFromCart, resetCart, productInCartCount, qtyInCartCount, getCartGrandTotal }
},
{
  persist: true 
})