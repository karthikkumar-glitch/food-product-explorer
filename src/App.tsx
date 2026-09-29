import { useMemo, useState } from 'react'

const products = [
  { name: 'Organic Avocados', category: 'Fresh Fruits', price: '$4.90', tag: 'Top Pick', emoji: '🥑', accent: 'avocado' },
  { name: 'Sunrise Citrus Mix', category: 'Juices', price: '$6.20', tag: 'New', emoji: '🍊', accent: 'orange' },
  { name: 'Garden Greens Box', category: 'Vegetables', price: '$8.50', tag: 'Farm Fresh', emoji: '🥬', accent: 'green' },
  { name: 'Berry Bliss', category: 'Snacks', price: '$5.75', tag: 'Best Seller', emoji: '🫐', accent: 'berry' },
  { name: 'Golden Mango', category: 'Fresh Fruits', price: '$3.80', tag: 'Seasonal', emoji: '🥭', accent: 'mango' },
  { name: 'Protein Oats Bowl', category: 'Breakfast', price: '$7.30', tag: 'Healthy', emoji: '🥣', accent: 'oat' },
  { name: 'Farm Eggs', category: 'Dairy', price: '$4.40', tag: 'Local', emoji: '🥚', accent: 'egg' },
  { name: 'Herb Pasta Pack', category: 'Pantry', price: '$9.10', tag: 'Chef Pick', emoji: '🍝', accent: 'pasta' },
]

const categories = ['All', 'Fresh Fruits', 'Vegetables', 'Snacks', 'Breakfast', 'Pantry']
const weeklyPicks = [products[0], products[2], products[4]]

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)
  const [addedProduct, setAddedProduct] = useState<string | null>(null)
  const [customerName, setCustomerName] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [cart, setCart] = useState<Record<string, { product: (typeof products)[number]; quantity: number }>>({})

  const cartItems = Object.values(cart)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const visibleProducts = selectedCategory === 'All'
    ? products
    : products.filter((product) => product.category === selectedCategory)

  const cartTotal = useMemo(
    () =>
      cartItems.reduce((total, item) => {
        const price = Number.parseFloat(item.product.price.replace('$', ''))
        return total + price * item.quantity
      }, 0),
    [cartItems],
  )

  const addToCart = (product: (typeof products)[number]) => {
    setIsOrderPlaced(false)
    setIsCheckoutOpen(false)
    setAddedProduct(product.name)
    window.setTimeout(() => setAddedProduct(null), 2200)
    setCart((currentCart) => {
      const existing = currentCart[product.name]
      return {
        ...currentCart,
        [product.name]: {
          product,
          quantity: existing ? existing.quantity + 1 : 1,
        },
      }
    })
    setIsCartOpen(true)
  }

  const placeOrder = () => {
    if (cartItems.length === 0) return

    setCart({})
    setIsCheckoutOpen(false)
    setIsOrderPlaced(true)
    setIsCartOpen(true)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">K</div>
          <div>
            <p className="brand-name">K Fresh Mart</p>
            <span className="brand-sub">fresh every day</span>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main menu">
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#offers">Offers</a>
          <a href="#about">About</a>
        </nav>

        <button className="cart-button" type="button" onClick={() => setIsCartOpen((open) => !open)}>
          Cart ({cartCount})
        </button>
      </header>

      <main className="content">
        <section className="hero-panel" id="home">
          <div className="hero-copy">
            <span className="eyebrow">Fresh groceries delivered</span>
            <h1>Healthy food for your everyday life.</h1>
            <p>
              Discover hand-picked produce, organic essentials, and pantry favorites that keep your kitchen full and vibrant.
            </p>

            <div className="hero-actions">
              <a href="#shop" className="primary-btn">Shop now</a>
              <a href="#offers" className="secondary-btn">View deals</a>
            </div>

            <div className="stats-row" aria-label="Store stats">
              <div>
                <strong>1200+</strong>
                <span>Items</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>Rating</span>
              </div>
              <div>
                <strong>25 min</strong>
                <span>Delivery</span>
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-label="Fresh groceries display">
            <div className="food-badge badge-top">Organic</div>
            <div className="fruit-stack">
              <div className="product-orb avocado">🥑</div>
              <div className="product-orb orange">🍊</div>
              <div className="product-orb berry">🫐</div>
            </div>
            <div className="mini-card">
              <span>Today’s basket</span>
              <strong>$28.40</strong>
            </div>
          </div>
        </section>

        <section className="catalog-section" id="shop">
          <div className="section-head">
            <div>
              <span className="eyebrow accent">Popular picks</span>
              <h2>Fresh selection</h2>
            </div>

            <div className="chip-row" aria-label="Product categories">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={category === selectedCategory ? 'chip active' : 'chip'}
                  aria-pressed={category === selectedCategory}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article key={product.name} className="product-card">
                <div className={`product-emoji ${product.accent}`}>{product.emoji}</div>
                <span className="product-tag">{product.tag}</span>
                <div className="product-info">
                  <p>{product.category}</p>
                  <h3>{product.name}</h3>
                </div>
                <div className="product-meta">
                  <strong>{product.price}</strong>
                  <button type="button" onClick={() => addToCart(product)}>Add</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="offers-section" id="offers">
          <div className="section-head">
            <div>
              <span className="eyebrow accent">Picked for you</span>
              <h2>This week at K Fresh Mart</h2>
              <p className="section-description">Fresh favorites we’re highlighting this week. Add a pick directly to your basket.</p>
            </div>
            <a className="offers-shop-link" href="#shop">Browse all products</a>
          </div>
          <div className="offer-grid">
            {weeklyPicks.map((product) => (
              <article key={product.name} className="offer-item">
                <div className={`product-emoji ${product.accent}`}>{product.emoji}</div>
                <div className="offer-item-copy">
                  <span>{product.category}</span>
                  <h3>{product.name}</h3>
                  <strong>{product.price}</strong>
                </div>
                <button type="button" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`}>
                  Add
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-heading">
            <span className="eyebrow">A little about us</span>
            <h2>Good food, made easy.</h2>
          </div>
          <div className="about-copy">
            <p>
              K Fresh Mart brings fresh produce, pantry staples, and everyday favorites together in one simple place. We believe
              choosing good food should feel straightforward, whether you’re planning the week or picking up one last thing for dinner.
            </p>
            <a href="#shop" className="about-shop-link">Explore the shop <span aria-hidden="true">→</span></a>
          </div>
        </section>
      </main>

      {addedProduct && (
        <div className="add-toast" role="status" aria-live="polite">
          <span aria-hidden="true">✓</span> {addedProduct} added to your cart
        </div>
      )}

      <aside className={`cart-panel ${isCartOpen ? 'open' : ''}`} aria-label="Shopping cart panel">
        <div className="cart-header">
          <div>
            <p className="cart-label">Your basket</p>
            <h3>{cartCount} item{cartCount === 1 ? '' : 's'}</h3>
          </div>
          <button type="button" className="close-cart" onClick={() => setIsCartOpen(false)}>
            ✕
          </button>
        </div>

        {isOrderPlaced ? (
          <div className="thank-you-card">
            <div className="thank-you-icon">✅</div>
            <h3>Thank you, {customerName}!</h3>
            <p>Your order has been placed successfully and will be delivered to:</p>
            <p className="delivery-address">{customerAddress}</p>
            <button
              type="button"
              className="checkout-btn"
              onClick={() => {
                setIsOrderPlaced(false)
                setCustomerName('')
                setCustomerAddress('')
                setIsCartOpen(false)
              }}
            >
              Continue shopping
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <span>Add fresh items to get started.</span>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.name} className="cart-item">
                  <div className={`mini-emoji ${product.accent}`}>{product.emoji}</div>
                  <div className="cart-item-copy">
                    <strong>{product.name}</strong>
                    <span>
                      {product.price} × {quantity}
                    </span>
                  </div>
                  <span className="cart-item-total">
                    ${(Number.parseFloat(product.price.replace('$', '')) * quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {isCheckoutOpen ? (
              <form
                className="checkout-form"
                onSubmit={(event) => {
                  event.preventDefault()
                  placeOrder()
                }}
              >
                <div className="checkout-total">
                  <span>Order total</span>
                  <strong>${cartTotal.toFixed(2)}</strong>
                </div>
                <label>
                  Your name
                  <input
                    type="text"
                    autoComplete="name"
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    required
                  />
                </label>
                <label>
                  Delivery address
                  <textarea
                    autoComplete="street-address"
                    value={customerAddress}
                    onChange={(event) => setCustomerAddress(event.target.value)}
                    rows={3}
                    required
                  />
                </label>
                <button type="submit" className="checkout-btn">Confirm Order</button>
                <button type="button" className="cancel-checkout" onClick={() => setIsCheckoutOpen(false)}>
                  Back to cart
                </button>
              </form>
            ) : (
              <div className="cart-summary">
                <div>
                  <span>Subtotal</span>
                  <strong>${cartTotal.toFixed(2)}</strong>
                </div>
                <button type="button" className="checkout-btn" onClick={() => setIsCheckoutOpen(true)}>
                  Place Order
                </button>
              </div>
            )}
          </>
        )}
      </aside>
    </div>
  )
}

export default App
