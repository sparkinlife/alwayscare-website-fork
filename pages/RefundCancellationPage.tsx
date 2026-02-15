import React, { useEffect } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';

const RefundCancellationPage: React.FC = () => {
  usePageMeta({
    title: 'Refund & Cancellation — Arham Animal Ambulance',
    description: 'Refund and cancellation policy for donations to Arham Animal Ambulance.',
    canonical: 'https://arhamanimalambulance.com/refund-cancellation',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FFFBF5] min-h-screen">
      <div className="bg-white border-b border-[#E8E0D8]">
        <div className="container mx-auto px-4 pt-28 pb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#292524]">Refund & Cancellation Policy</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8 text-[#44403C] leading-relaxed">
          <p>
            Our policy on refund and cancellation of donations received for Arham activities on secure online
            payment gateway as under:
          </p>
          <p>
            Any request for cancellations and refund of online donations once duly placed on the website,
            shall not be entertained under any circumstances. No cash or refund of money will be allowed after
            completing the online donation as it is an extremely cumbersome process. We therefore request you
            to be sure before you donate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundCancellationPage;
