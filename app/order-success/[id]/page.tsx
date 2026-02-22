import Header from '@/components/header';
import Footer from '@/components/footer';
import OrderSuccessView from '@/components/order-success-view';

interface Props {
  params: {
    id: string;
  };
}

export default function OrderSuccessPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <OrderSuccessView orderId={params.id} />
      </main>
      <Footer />
    </div>
  );
}
