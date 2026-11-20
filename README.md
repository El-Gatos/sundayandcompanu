# Suday & Co. storefront prototype

Responsive React + Vite storefront inspired by the approved Suday & Co. homepage mockup.

## Local setup

```bash
npm install
npm run dev
```

For a production bundle, run `npm run build`.

## What works
- Responsive navigation and mobile menu
- Browse/filter collections
- Product search
- Add to cart, change quantity, remove from cart, and subtotal
- Email signup *demo interaction*

## Before launching
This is a **visual storefront prototype**, not a live e-commerce backend. Products, prices, and Unsplash photography are illustrative placeholders, not actual inventory or product images. Checkout is disabled, and newsletter entries are not stored. Replace assets with your own product photography, connect your preferred commerce provider (Shopify, Stripe, etc.), configure fulfillment/tax/shipping/policies, add a real email provider, and confirm product claims before going live.

## Deploy
Works on Vercel with framework preset **Vite** and default `npm run build` / output directory `dist`.
