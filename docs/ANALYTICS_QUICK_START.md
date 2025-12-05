# Analytics Quick Start Guide

Get your GA4 and GTM analytics up and running in 5 minutes!

## 🚀 Quick Setup (3 Steps)

### Step 1: Get Your IDs

#### Google Analytics 4 (GA4)
1. Visit [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon bottom left)
3. Under **Property** → **Data Streams**
4. Click your web stream (or create one)
5. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

#### Google Tag Manager (GTM)
1. Visit [Google Tag Manager](https://tagmanager.google.com/)
2. Click your container (or create one)
3. Look for **Container ID** in the top navigation (format: `GTM-XXXXXXX`)

### Step 2: Add Your IDs

Open `/config/analytics.config.ts` and replace the placeholder values:

```typescript
export const analyticsConfig = {
  ga4MeasurementId: 'G-ABC123DEF4',  // ← Your GA4 ID here
  gtmContainerId: 'GTM-ABC1234',     // ← Your GTM ID here
  enableInDev: false,
  debug: false,
};
```

### Step 3: Test It!

That's it! Your analytics is now active. Test it:

1. Set `debug: true` in the config file
2. Open your browser console
3. Use your app (add items to cart, browse categories, etc.)
4. You'll see analytics events logged in the console

## ✅ Verify It's Working

### Check GA4 Real-time Reports
1. Go to [Google Analytics](https://analytics.google.com/)
2. Navigate to **Reports** → **Realtime**
3. Use your app in another tab
4. Events should appear within seconds!

### Check GTM Preview Mode
1. In GTM, click **Preview** (top right)
2. Enter your app URL
3. GTM debug panel shows all events firing

## 📊 What's Already Tracked

Your ecommerce app automatically tracks:

- ✅ **Product Views** - When products are displayed
- ✅ **Add to Cart** - When users add items
- ✅ **Remove from Cart** - When users remove items
- ✅ **View Cart** - When cart is opened
- ✅ **Begin Checkout** - When checkout starts
- ✅ **Purchase** - When order is completed
- ✅ **Category Changes** - When filtering by category

All standard GA4 ecommerce events!

## 🛠️ Configuration Options

```typescript
// Development Mode - Track events in dev environment
enableInDev: true

// Debug Mode - Log all events to console
debug: true
```

## 📝 Next Steps

1. **View Full Documentation**: See `/docs/ANALYTICS.md` for complete guide
2. **See Examples**: Check `/examples/analytics-examples.tsx` for code samples
3. **Customize Events**: Add your own custom tracking

## 🎯 Common Use Cases

### Track a Button Click
```typescript
import { useAnalytics } from './hooks/useAnalytics';

function MyComponent() {
  const analytics = useAnalytics();
  
  return (
    <button onClick={() => analytics.trackEvent('button_click', {
      button_name: 'Subscribe',
      location: 'Header'
    })}>
      Subscribe
    </button>
  );
}
```

### Track Form Submission
```typescript
const handleSubmit = () => {
  analytics.trackConversion('newsletter_signup');
};
```

### Track Custom Ecommerce Event
```typescript
const handleAddToWishlist = () => {
  analytics.trackEvent('add_to_wishlist', {
    item_id: product.id,
    item_name: product.name,
    value: product.price
  });
};
```

## 🔍 Troubleshooting

**Events not showing?**
- Make sure IDs are correct (check format: `G-XXXXXXXXXX` and `GTM-XXXXXXX`)
- Check browser console for errors
- Disable ad blockers
- Set `debug: true` to see console logs

**Only working in dev?**
- Set `enableInDev: true` for development testing
- In production, it works automatically

**Need Help?**
- Check `/docs/ANALYTICS.md` for detailed troubleshooting
- Verify GTM container is **published** (not just saved)

## 📚 Resources

- [Full Documentation](/docs/ANALYTICS.md)
- [Code Examples](/examples/analytics-examples.tsx)
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GTM Documentation](https://developers.google.com/tag-platform/tag-manager/web)

---

**That's it!** You now have enterprise-level analytics tracking in your ecommerce app. 🎉
