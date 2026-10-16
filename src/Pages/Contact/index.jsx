import React, { useState } from "react";
import Button from "@mui/material/Button";
import BreedCrumps from "../../components/BreedCrumps/BreedCrumps";

const Contact = () => {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const inputCls =
    "w-full border border-[rgba(0,0,0,0.2)] rounded-md px-4 py-3 text-[14px] outline-none focus:border-[#ff5252] transition";

  return (
    <>
      <BreedCrumps items={[{ label: "Contact Us" }]} />
      <section className="py-12 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <h1 className="text-[30px] font-[700]">Get in Touch</h1>
            <p className="text-[14.5px] text-[rgba(0,0,0,0.55)] mt-2">
              Questions about a watch, your order or a return? We reply within
              24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              {[
                ["📍", "Visit Our Store", "Sha-38/1, Middle Badda, Dhaka-1212"],
                ["📞", "Call Us", "(+880) 1799018864", "Sat–Thu, 10am – 8pm"],
                ["✉️", "Email Us", "contact@olevswatchshop.com", "Replies within 24h"],
              ].map(([icon, title, line1, line2]) => (
                <div
                  key={title}
                  className="flex items-start gap-4 bg-[#fafafa] rounded-xl p-5 border border-[rgba(0,0,0,0.05)]"
                >
                  <span className="text-[26px]">{icon}</span>
                  <div>
                    <h3 className="text-[15px] font-[700]">{title}</h3>
                    <p className="text-[13.5px] text-[rgba(0,0,0,0.6)] mt-1">
                      {line1}
                    </p>
                    {line2 && (
                      <p className="text-[12px] text-[rgba(0,0,0,0.45)]">
                        {line2}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2">
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center bg-[#fff5f5] rounded-xl border border-[#ff5252]/20 p-12 text-center">
                  <span className="text-[52px]">✅</span>
                  <h3 className="text-[20px] font-[700] mt-3">Message Sent!</h3>
                  <p className="text-[14px] text-[rgba(0,0,0,0.55)] mt-2">
                    Thanks for reaching out — our team will get back to you
                    within 24 hours.
                  </p>
                  <Button
                    onClick={() => setSent(false)}
                    variant="outlined"
                    className="!mt-5 !normal-case !border-black !text-black"
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={submit}
                  className="bg-[#fafafa] rounded-xl border border-[rgba(0,0,0,0.05)] p-6 space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      required
                      placeholder="Your Name"
                      className={inputCls}
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      className={inputCls}
                    />
                  </div>
                  <input placeholder="Subject" className={inputCls} />
                  <textarea
                    required
                    rows="6"
                    placeholder="Your message..."
                    className={`${inputCls} resize-none`}
                  />
                  <Button
                    type="submit"
                    className="btn-org !normal-case !px-8 !py-3"
                  >
                    Send Message →
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
