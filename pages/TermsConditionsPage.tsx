import React, { useEffect } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';

const TermsConditionsPage: React.FC = () => {
  usePageMeta({
    title: 'Terms & Conditions — Arham Animal Ambulance',
    description: 'Terms and conditions for using the Arham Animal Ambulance website.',
    canonical: 'https://arhamanimalambulance.com/terms-conditions',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FFFBF5] min-h-screen">
      <div className="bg-white border-b border-[#E8E0D8]">
        <div className="container mx-auto px-4 pt-28 pb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#292524]">Terms & Conditions</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8 text-[#44403C] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[#292524] mb-3">Welcome to arham.org!</h2>
            <p>
              These terms and conditions outline the rules and regulations for the use of Arham's Website,
              located at https://www.arham.org.
            </p>
            <p className="mt-3">
              By accessing this website we assume you accept these terms and conditions. Do not continue to
              use arham.org if you do not agree to take all of the terms and conditions stated on this page.
            </p>
            <p className="mt-3">
              The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer
              Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this
              website and compliant to the Company's terms and conditions. "The Company", "Ourselves", "We",
              "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client
              and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary
              to undertake the process of our assistance to the Client in the most appropriate manner for the
              express purpose of meeting the Client's needs in respect of provision of the Company's stated
              services, in accordance with and subject to, prevailing law of India.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#292524] mb-3">Cookies</h2>
            <p>
              We employ the use of cookies. By accessing arham.org, you agreed to use cookies in agreement
              with the Arham's Privacy Policy.
            </p>
            <p className="mt-3">
              Most interactive websites use cookies to let us retrieve the user's details for each visit.
              Cookies are used by our website to enable the functionality of certain areas to make it easier
              for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#292524] mb-3">License</h2>
            <p>
              Unless otherwise stated, Arham and/or its licensors own the intellectual property rights for all
              material on arham.org. All intellectual property rights are reserved. You may access this from
              arham.org for your own personal use subjected to restrictions set in these terms and conditions.
            </p>
            <p className="mt-3">You must not:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Republish material from arham.org</li>
              <li>Sell, rent or sub-license material from arham.org</li>
              <li>Reproduce, duplicate or copy material from arham.org</li>
              <li>Redistribute content from arham.org</li>
            </ul>
            <p className="mt-3">This Agreement shall begin on the date hereof.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#292524] mb-3">Comments</h2>
            <p>
              Parts of this website offer an opportunity for users to post and exchange opinions and
              information in certain areas of the website. Arham does not filter, edit, publish or review
              Comments prior to their presence on the website. Comments do not reflect the views and opinions
              of Arham, its agents and/or affiliates. Comments reflect the views and opinions of the person
              who post their views and opinions.
            </p>
            <p className="mt-3">
              To the extent permitted by applicable laws, Arham shall not be liable for the Comments or for
              any liability, damages or expenses caused and/or suffered as a result of any use of and/or
              posting of and/or appearance of the Comments on this website.
            </p>
            <p className="mt-3">
              Arham reserves the right to monitor all Comments and to remove any Comments which can be
              considered inappropriate, offensive or causes breach of these Terms and Conditions.
            </p>
            <p className="mt-3">You warrant and represent that:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so</li>
              <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party</li>
              <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
              <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity</li>
            </ul>
            <p className="mt-3">
              You hereby grant Arham a non-exclusive license to use, reproduce, edit and authorize others to
              use, reproduce and edit any of your Comments in any and all forms, formats or media.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#292524] mb-3">Hyperlinking to our Content</h2>
            <p>The following organizations may link to our Website without prior written approval:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Government agencies</li>
              <li>Search engines</li>
              <li>News organizations</li>
              <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses</li>
              <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site</li>
            </ul>
            <p className="mt-3">
              These organizations may link to our home page, to publications or to other Website information
              so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship,
              endorsement or approval of the linking party and its products and/or services; and (c) fits
              within the context of the linking party's site.
            </p>
            <p className="mt-3">We may consider and approve other link requests from the following types of organizations:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Commonly-known consumer and/or business information sources</li>
              <li>Dot.com community sites</li>
              <li>Associations or other groups representing charities</li>
              <li>Online directory distributors</li>
              <li>Internet portals</li>
              <li>Accounting, law and consulting firms</li>
              <li>Educational institutions and trade associations</li>
            </ul>
            <p className="mt-3">
              We will approve link requests from these organizations if we decide that: (a) the link would not
              make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does
              not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink
              compensates the absence of Arham; and (d) the link is in the context of general resource
              information.
            </p>
            <p className="mt-3">
              If you are one of the organizations listed above and are interested in linking to our website,
              you must inform us by sending an e-mail to Arham. Please include your name, your organization
              name, contact information as well as the URL of your site, a list of any URLs from which you
              intend to link to our Website, and a list of the URLs on our site to which you would like to
              link. Wait 2-3 weeks for a response.
            </p>
            <p className="mt-3">Approved organizations may hyperlink to our Website as follows:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>By use of our corporate name</li>
              <li>By use of the uniform resource locator being linked to</li>
              <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party's site</li>
            </ul>
            <p className="mt-3">
              No use of Arham's logo or other artwork will be allowed for linking absent a trademark license
              agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#292524] mb-3">iFrames</h2>
            <p>
              Without prior approval and written permission, you may not create frames around our Webpages
              that alter in any way the visual presentation or appearance of our Website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#292524] mb-3">Content Liability</h2>
            <p>
              We shall not be hold responsible for any content that appears on your Website. You agree to
              protect and defend us against all claims that is rising on your Website. No link(s) should
              appear on any Website that may be interpreted as libelous, obscene or criminal, or which
              infringes, otherwise violates, or advocates the infringement or other violation of, any third
              party rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#292524] mb-3">Your Privacy</h2>
            <p>Please read our Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#292524] mb-3">Reservation of Rights</h2>
            <p>
              We reserve the right to request that you remove all links or any particular link to our Website.
              You approve to immediately remove all links to our Website upon request. We also reserve the
              right to amend these terms and conditions and it's linking policy at any time. By continuously
              linking to our Website, you agree to be bound to and follow these linking terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#292524] mb-3">Removal of links from our website</h2>
            <p>
              If you find any link on our Website that is offensive for any reason, you are free to contact
              and inform us any moment. We will consider requests to remove links but we are not obligated to
              or so or to respond to you directly.
            </p>
            <p className="mt-3">
              We do not ensure that the information on this website is correct, we do not warrant its
              completeness or accuracy; nor do we promise to ensure that the website remains available or that
              the material on the website is kept up to date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#292524] mb-3">Disclaimer</h2>
            <p>
              To the maximum extent permitted by applicable law, we exclude all representations, warranties
              and conditions relating to our website and the use of this website. Nothing in this disclaimer
              will:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Limit or exclude our or your liability for death or personal injury</li>
              <li>Limit or exclude our or your liability for fraud or fraudulent misrepresentation</li>
              <li>Limit any of our or your liabilities in any way that is not permitted under applicable law</li>
              <li>Exclude any of our or your liabilities that may not be excluded under applicable law</li>
            </ul>
            <p className="mt-3">
              The limitations and prohibitions of liability set in this Section and elsewhere in this
              disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising
              under the disclaimer, including liabilities arising in contract, in tort and for breach of
              statutory duty.
            </p>
            <p className="mt-3">
              As long as the website and the information and services on the website are provided free of
              charge, we will not be liable for any loss or damage of any nature.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
