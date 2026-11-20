import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, Heart, Menu, Search, ShoppingBag, X, Plus, Minus, Gift, Sparkles, Leaf } from 'lucide-react';
import './styles.css';

// Replace demonstration items and photos with your own product catalog before launch.
const categories = [
  { name: 'Kids & Family', slug: 'kids', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1000&q=85', caption: 'For the little moments' },
  { name: 'Home Organization', slug: 'home', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85', caption: 'A place for everything' },
  { name: 'Personalized Gifts', slug: 'gifts', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=85', caption: 'Made with them in mind' },
  { name: 'Everyday Essentials', slug: 'everyday', image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1000&q=85', caption: 'Small touches, big difference' },
];
const products = [
  { id: 1, name: 'Little Artist Organizer', price: 26, category: 'kids', tag: 'Personalizable', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=85', detail: 'A tidy home for all those creative tools.' },
  { id: 2, name: 'The Everyday Catchall', price: 19, category: 'home', tag: 'Popular pick', image: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1000&q=85', detail: 'A little landing spot for daily essentials.' },
  { id: 3, name: 'Little Moments Gift Set', price: 32, category: 'gifts', tag: 'Gift idea', image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1000&q=85', detail: 'A thoughtful gesture for someone special.' },
  { id: 4, name: 'Cozy Desk Companion', price: 23, category: 'everyday', tag: 'New', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=85', detail: 'Keep your space feeling put together.' },
];
const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value);

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const filtered = useMemo(() => products.filter(p => (activeCategory === 'all' || p.category === activeCategory) && (p.name.toLowerCase().includes(query.toLowerCase()) || p.detail.toLowerCase().includes(query.toLowerCase()))), [activeCategory, query]);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const scrollToShop = category => { setActiveCategory(category); setMenuOpen(false); setSearchOpen(false); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); };
  const add = item => { setCart(prev => { const found = prev.find(p => p.id === item.id); return found ? prev.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p) : [...prev, { ...item, qty: 1 }]; }); setCartOpen(true); };
  const changeQty = (id, diff) => setCart(prev => prev.map(p => p.id === id ? { ...p, qty: p.qty + diff } : p).filter(p => p.qty > 0));
  return <>
    <div className="announcement">A little something lovely for everyday life <span>✳</span> Welcome to Suday & Co.</div>
    <header className="site-header"><div className="nav-shell">
      <button className="icon-btn mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      <a className="wordmark" href="#top" onClick={() => { setActiveCategory('all'); setMenuOpen(false); }}>Suday <i>&</i> Co<span>.</span></a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
        <button onClick={() => scrollToShop('all')}>Shop All</button><button onClick={() => scrollToShop('kids')}>Kids & Family</button><button onClick={() => scrollToShop('home')}>Home Organization</button><button onClick={() => scrollToShop('gifts')}>Personalized Gifts</button><a href="#story" onClick={() => setMenuOpen(false)}>Our Story</a>
      </nav>
      <div className="nav-actions"><button className="icon-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search products"><Search size={22}/></button><button className="icon-btn cart-trigger" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${count} items`}><ShoppingBag size={22}/>{count > 0 && <span className="cart-count">{count}</span>}</button></div>
    </div>
    {searchOpen && <div className="search-panel"><Search size={18}/><input autoFocus placeholder="Search little lovely things..." value={query} onChange={e => { setQuery(e.target.value); setActiveCategory('all'); }} onKeyDown={e => e.key === 'Enter' && scrollToShop('all')}/><button onClick={() => scrollToShop('all')}>View results <ArrowRight size={16}/></button></div>}
    </header>
    <main id="top">
      <section className="hero"><div className="hero-image"/><div className="hero-scrim"/><div className="hero-inner"><div className="hero-copy"><div className="eyebrow"><span className="tiny-line"/> LITTLE DETAILS. LOVELY DAYS.</div><h1>Thoughtful things<br/>for <em>home & family.</em></h1><p>Practical, personal, and made to bring a little more joy to the everyday.</p><button className="btn btn-primary" onClick={() => scrollToShop('all')}>Explore the collection <ArrowRight size={19}/></button><span className="hero-footnote">Your everyday, made a little sweeter.</span></div></div></section>
      <div className="benefits"><div><Heart strokeWidth={1.5}/><span>Thoughtful by design</span></div><div><Gift strokeWidth={1.5}/><span>Personal touches</span></div><div><Sparkles strokeWidth={1.5}/><span>Little everyday joys</span></div><div><Leaf strokeWidth={1.5}/><span>Made with care</span></div></div>
      <section className="section collections" id="collections"><div className="section-header centered"><span className="eyebrow">FIND YOUR LITTLE SOMETHING</span><h2>Shop by collection</h2><p>Special pieces for the spaces and people you love.</p></div><div className="collection-grid">{categories.map(c => <button className="collection-card" key={c.slug} onClick={() => scrollToShop(c.slug)}><div className="collection-photo"><img src={c.image} alt={`${c.name} lifestyle inspiration`} loading="lazy"/></div><span className="collection-caption">{c.caption}</span><span className="collection-title">{c.name} <ArrowRight size={18}/></span></button>)}</div></section>
      <section className="statement"><span className="eyebrow">WELCOME TO SUDAY & CO.</span><h2>Because the little things<br/>make a house feel like <em>home.</em></h2><p>Useful pieces, lovely details, and thoughtful gifts for all the moments that make up everyday life.</p></section>
      <section className="section product-section" id="shop"><div className="section-header split"><div><span className="eyebrow">THE LITTLE GOOD THINGS</span><h2>Everyday favorites</h2><p>A few things we're dreaming up for your home.</p></div><div className="product-filters" aria-label="Product categories">{[{name:'All',slug:'all'}, ...categories].map(c => <button className={activeCategory === c.slug ? 'selected' : ''} onClick={() => setActiveCategory(c.slug)} key={c.slug}>{c.name}</button>)}</div></div><div className="products-grid">{filtered.map(p => <article className="product-card" key={p.id}><div className="product-photo"><img src={p.image} alt={`${p.name} concept reference`} loading="lazy"/><span className="product-tag">{p.tag}</span><button className="add-quick" onClick={() => add(p)} aria-label={`Add ${p.name} to cart`}><Plus size={22}/></button></div><div className="product-info"><div><h3>{p.name}</h3><p>{p.detail}</p></div><span className="price">{money(p.price)}</span></div></article>)}</div>{filtered.length === 0 && <div className="no-results">No items match that search. Try another term.</div>}<p className="demo-note">Storefront preview: products, pricing and photos are placeholders. Orders are not enabled yet.</p></section>
      <section className="story" id="story"><div className="story-photo" role="img" aria-label="Cozy sunlit interior"/><div className="story-copy"><span className="eyebrow">A NOTE FROM US</span><h2>Made for the moments<br/>in <em>between.</em></h2><p>It's the crayons after breakfast. The little treasures on the counter. The gift that makes somebody smile.</p><p>Suday & Co. is about making everyday spaces feel more considered, more functional, and a little more you.</p><button className="text-link" onClick={() => scrollToShop('all')}>Discover our pieces <ArrowRight size={18}/></button></div></section>
      <section className="newsletter"><span className="eyebrow">A LITTLE LOVE LETTER</span><h2>Good things in your inbox.</h2><p>New ideas, little launches, and the occasional lovely surprise.</p><form onSubmit={e => { e.preventDefault(); if(email.includes('@')) setJoined(true); }}><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" required placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)}/><button type="submit">Join the list <ArrowRight size={18}/></button></form>{joined && <span className="form-message">Thanks for the interest! Email signup is a demo until a mailing service is connected.</span>}</section>
    </main>
    <footer><div className="footer-top"><div><a className="footer-logo" href="#top">Suday & Co.</a><p>Little things for a lovely everyday.</p></div><div><strong>Explore</strong><button onClick={() => scrollToShop('all')}>Shop all</button><button onClick={() => scrollToShop('kids')}>Kids & family</button><button onClick={() => scrollToShop('home')}>Home organization</button></div><div><strong>Information</strong><span>Shipping details coming soon</span><span>Returns policy coming soon</span><span>Contact details coming soon</span></div><div><strong>Follow along</strong><span>Social links coming soon</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Suday & Co. All rights reserved.</span><span>Made for the little things.</span></div></footer>
    {cartOpen && <div className="drawer-backdrop" onMouseDown={e => e.target === e.currentTarget && setCartOpen(false)}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag"><div className="drawer-header"><div><span className="eyebrow">YOUR PICKS</span><h2>Shopping bag ({count})</h2></div><button className="icon-btn" onClick={() => setCartOpen(false)} aria-label="Close cart"><X/></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={42} strokeWidth={1}/><h3>Nothing in here just yet.</h3><p>Something lovely is waiting to be found.</p><button className="btn btn-primary" onClick={() => { setCartOpen(false); scrollToShop('all'); }}>Browse products <ArrowRight size={18}/></button></div> : <><div className="cart-items">{cart.map(p => <div className="cart-item" key={p.id}><img src={p.image} alt=""/><div><h3>{p.name}</h3><span>{money(p.price)}</span><div className="qty"><button onClick={() => changeQty(p.id,-1)} aria-label={`Remove one ${p.name}`}><Minus size={15}/></button><span>{p.qty}</span><button onClick={() => changeQty(p.id,1)} aria-label={`Add one ${p.name}`}><Plus size={15}/></button></div></div></div>)}</div><div className="cart-footer"><div><span>Subtotal</span><strong>{money(total)}</strong></div><p>Prototype cart only. Checkout isn't connected yet.</p><button className="btn btn-primary" disabled>Checkout coming soon</button></div></>}</aside></div>}
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
