#!/usr/bin/env node

/**
 * Script to help clear Vercel cache
 * Run this after deploying to ensure fresh data
 */

console.log('🚀 Vercel Cache Clearing Helper')
console.log('================================')
console.log('')
console.log('To clear Vercel cache, you have several options:')
console.log('')
console.log('1. 🔄 Redeploy your application:')
console.log('   - Go to your Vercel dashboard')
console.log('   - Click "Redeploy" on your latest deployment')
console.log('   - Or trigger a new deployment by pushing to your main branch')
console.log('')
console.log('2. 🛠️  Use Vercel CLI (if you have it installed):')
console.log('   vercel --prod --force')
console.log('')
console.log('3. 🌐 Clear browser cache:')
console.log('   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)')
console.log('   - Or open in incognito/private mode')
console.log('')
console.log('4. 🔧 Force API cache refresh:')
console.log('   - The API routes now have proper cache control headers')
console.log('   - Client-side requests include cache-busting timestamps')
console.log('   - This should resolve the caching issue automatically')
console.log('')
console.log('✅ Changes made to fix caching:')
console.log('   - Added cache control headers to /api/products')
console.log('   - Added cache control headers to /api/categories') 
console.log('   - Added cache control headers to /api/notifications')
console.log('   - Updated client-side fetch calls with cache-busting')
console.log('')
console.log('🎯 The issue should be resolved after the next deployment!')
