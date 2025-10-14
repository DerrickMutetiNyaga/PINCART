import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Pinkcart',
  description: 'Pinkcart Admin Dashboard',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
