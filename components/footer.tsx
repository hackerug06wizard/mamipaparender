import Link from 'next/link';
import { Mail, Phone, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-foreground mb-3">About Us</h3>
            <p className="text-sm text-muted-foreground">
              Mami Papa Babies is your trusted source for quality baby products. We provide safe, tested, and reliable items for your little ones.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-muted-foreground hover:text-primary transition">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-muted-foreground hover:text-primary transition">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-foreground mb-3">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a
                  href="mailto:barbarakatusabe999@gmail.com"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  barbarakatusabe999@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <a
                  href="https://wa.me/256753979539"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Mami Papa Babies. All rights reserved.</p>
          <p className="mt-2">Accepting MTN, Airtel, and Bank Payments</p>
        </div>
      </div>
    </footer>
  );
}
