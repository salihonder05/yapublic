"use client";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "Neredeyiz?",
    answer:
      "Begüm Bilgisayar Yazılım Donanım Ltd.Şti. Caddebostan Mah, Caddebostan Plaj Yolu Sk. No:21A D:2, 34728 Kadıköy/İstanbul",
  },
  {
    question: "Telefon:",
    answer: "(216) 411 14 54 / (542) 415 46 80",
  }, 
  // More questions...
];

export default function FAQs() {
  return (
    <div className="bg-white">
      <div className="px-6 py-12 mx-auto max-w-7xl sm:py-12 lg:px-8 lg:py-12">
        <div className="max-w-4xl mx-auto divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Sıkça Sorulan Sorular
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex items-start justify-between w-full text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="flex items-center ml-6 h-7">
                          {open ? (
                            <MinusSmallIcon
                              className="w-6 h-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="w-6 h-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="pr-12 mt-2">
                      <p className="text-base leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
