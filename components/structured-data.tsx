export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pinkcart",
    "description": "Group shipping service from China to Kenya. Save up to 60% on shipping costs by joining our community of importers.",
    "url": "https://pinkcart.vercel.app",
    "logo": "https://pinkcart.vercel.app/placeholder-logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+254-736-381-425",
      "contactType": "customer service",
      "areaServed": "KE",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nairobi",
      "addressCountry": "KE"
    },
    "sameAs": [
      "https://chat.whatsapp.com/CtFf4VilvRzDeUeRRdTasC"
    ],
    "serviceType": "Group Shipping Service",
    "areaServed": {
      "@type": "Country",
      "name": "Kenya"
    },
    "offers": {
      "@type": "Offer",
      "description": "Group shipping from China to Kenya with up to 60% savings",
      "price": "0",
      "priceCurrency": "KES",
      "availability": "https://schema.org/InStock"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
