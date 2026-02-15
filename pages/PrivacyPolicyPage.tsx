import React, { useEffect } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';

const PrivacyPolicyPage: React.FC = () => {
  usePageMeta({
    title: 'Privacy Policy — Arham Animal Ambulance',
    description: 'Privacy policy for Arham Animal Ambulance.',
    canonical: 'https://arhamanimalambulance.com/privacy-policy',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FFFBF5] min-h-screen">
      <div className="bg-white border-b border-[#E8E0D8]">
        <div className="container mx-auto px-4 pt-28 pb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#292524]">Privacy Policy</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8 text-[#44403C] leading-relaxed">
          <p>
            At arham.org, accessible from www.arham.org, one of our main priorities is the privacy of our
            visitors. This Privacy Policy document contains types of information that is collected and recorded
            by arham.org and how we use it.
          </p>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not
            hesitate to contact us through email at support@arham.org
          </p>

          <section>
            <h2 className="text-xl font-semibold text-[#292524] mb-3">Log Files</h2>
            <p>
              arham.org follows a standard procedure of using log files. These files log visitors when they
              visit websites. All hosting companies do this and a part of hosting services' analytics. The
              information collected by log files include internet protocol (IP) addresses, browser type,
              Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the
              number of clicks. These are not linked to any information that is personally identifiable. The
              purpose of the information is for analyzing trends, administering the site, tracking users'
              movement on the website, and gathering demographic information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#292524] mb-3">Cookies and Web Beacons</h2>
            <p>
              Like any other website, arham.org uses 'cookies'. These cookies are used to store information
              including visitors' preferences, and the pages on the website that the visitor accessed or
              visited. The information is used to optimize the users' experience by customizing our web page
              content based on visitors' browser type and/or other information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#292524] mb-3">Privacy Policies</h2>
            <p>
              You may consult this list to find the Privacy Policy for each of the advertising partners of
              arham.org. Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or
              Web Beacons that are used in their respective advertisements and links that appear on arham.org,
              which are sent directly to users' browser. They automatically receive your IP address when this
              occurs. These technologies are used to measure the effectiveness of their advertising campaigns
              and/or to personalize the advertising content that you see on websites that you visit. Note that
              arham.org has no access to or control over these cookies that are used by third-party advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#292524] mb-3">Children's Information</h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We
              encourage parents and guardians to observe, participate in, and/or monitor and guide their
              online activity.
            </p>
            <p className="mt-3">
              arham.org does not knowingly collect any Personal Identifiable Information from children under
              the age of 13. If you think that your child provided this kind of information on our website,
              we strongly encourage you to contact us immediately and we will do our best efforts to promptly
              remove such information from our records.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#292524] mb-3">Online Privacy Policy Only</h2>
            <p>
              This Privacy Policy applies only to our online activities and is valid for visitors to our
              website with regards to the information that they shared and/or collect in arham.org. This
              policy is not applicable to any information collected offline or via channels other than this
              website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#292524] mb-3">Consent</h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its Terms and
              Conditions.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
