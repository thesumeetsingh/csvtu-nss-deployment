import React, { useState } from "react";
import bgImage from '../../assets/about-container-bg.jpg'; // Reusing same background

const faqs = [
  {
    question: "What is the National Service Scheme?",
    answer:
      "NSS is a program under the Ministry of Youth Affairs & Sports that promotes student involvement in community service while pursuing their studies.",
  },
  {
    question: "What is the Motto of NSS?",
    answer:
      "“NOT ME BUT YOU” – It emphasizes the spirit of selfless service and the importance of the community over the individual.",
  },
{
  question: "What are the aims & objectives of NSS?",
  answer:
    "Aims & Objectives of NSS are:\n" +
    "i. To understand the community in which they work;\n" +
    "ii. To understand themselves in relation to their community;\n" +
    "iii. To identify the needs and problems of the community and involve them in the problem-solving process;\n" +
    "iv. To develop among themselves a sense of social and civic responsibility;\n" +
    "v. To utilize their knowledge in finding practical solutions to individual and community problems;\n" +
    "vi. To develop competence required for group-living and sharing of responsibilities;\n" +
    "vii. To gain skills in mobilizing community participation;\n" +
    "viii. To acquire leadership qualities and democratic attitude;\n" +
    "ix. To develop capacity to meet emergencies and natural disasters;\n" +
    "x. To practice national integration and social harmony.",
},
  {
    question: "What is the overall objective of NSS?",
    answer:
      "Development of Student’s personality through community service.",
  },
  {
    question: "What does the colour Navy blue depict in NSS badge?",
    answer:
      "The navy blue colour indicates the cosmos of which the NSS is a tiny part, ready to contribute its share for the welfare of the mankind.",
  },
  {
    question: "What colour red depict in NSS badge?",
    answer:
      "The Red colour in the badge indicates that the NSS volunteers are full of blood i.e. lively, active, energetic and full of high spirit.",
  },
  {
    question: "What are the obligations of NSS Volunteers?",
    answer:
      "To work for two continued years along with their studies, putting in 120 hours service each year and participating in one special camping Programme.",
  },
   {
    question: "Where is the NSS headquarter located?",
    answer:
      "The NSS Headquarter located in New Delhi.",
  },
  {
    question: "When was NSS launched?",
    answer:
      "NSS was launched on 24th September 1969 by Dr. V.K.R.V. Rao in 37 universities with 40,000 volunteers.",
  },
  {
    question: "What is the Goal of NSS?",
    answer:
      "To develop students’ personalities through community service and promote national integration.",
  },
   {
    question: "What is the NSS symbol?",
    answer:
      "The NSS symbol is based on the Rath wheel of the Konark Sun Temple situated in Odisha.",
  },
   {
    question: "What does the giant wheel depicts in NSS symbol?",
    answer:
      "The giant wheels portray the cycle of creation, preservation and release, and signify the movement in the life across time and space.",
  },
    {
    question: "When is the NSS day observed?",
    answer:
      "The NSS day is observed on 24th September every year.",
  },
    {
    question: "What is the pride of NSS Volunteers?",
    answer:
      "NSS Badge, NSS Certificate and Identity card are the pride of NSS Volunteers.",
  },
   {
    question: "What are the principal elements of NSS?",
    answer:
      "There are four principal elements in the NSS programme process; they are Students, Teachers, Community and the programme.",
  },
  {
    question: "What does the NSS logo symbolize?",
    answer:
      "It is inspired by the Rath Wheel of Konark Sun Temple, symbolizing the cycle of creation, preservation, and release, and the dynamic spirit of volunteers.",
  },
  {
    question: "Who is the National Head controlling this scheme?",
    answer:
      "The Programme Adviser, NSS, New Delhi is the National Head controlling this scheme.",
  },
  {
    question: "How many NSS unit can be allotted to an institution?",
    answer:
      "It depends upon the student strength of an institution. A unit can be of 100 students.",
  },
   {
    question: "How can one join NSS?",
    answer:
      "Simply by enrolling/registering yourself in NSS unit through the Programme Officer concerned However, before joining you must be a bona fide student of school, college or university.",
  },
  {
    question: "I am a graduate and still very keen to be a part of NSS. How can I continue my association with NSS?",
    answer:
      "You can join in an NSS open unit.",
  },
  {
    question: "What is the uniform in NSS?",
    answer:
      "There is no uniform prescribed for NSS volunteers.",
  },
  {
    question: "Is it compulsory to wear NSS badge?",
    answer:
      "It is obligatory to wear NSS badge during community service..",
  },
];

function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
  <div
    className="min-h-screen py-16 px-6 bg-cover bg-center"
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundAttachment: "fixed",
      backgroundBlendMode: "overlay",
      backgroundColor: "rgba(243,244,246,0.7)",
    }}
  >
    <h1 className="text-4xl font-bold text-center text-blue-900 mb-10 drop-shadow">
      FREQUENTLY ASKED QUESTIONS
    </h1>

    {/* Search Bar */}
    <div className="max-w-xl mx-auto mb-10">
      <input
        type="text"
        placeholder="Search your question..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>

    {/* Filtered Results */}
    <div className="max-w-5xl mx-auto space-y-6">
      {filteredFaqs.length > 0 ? (
        filteredFaqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#f5f5f5] rounded-lg shadow-md border-l-4 border-blue-600 transition-all duration-300 hover:shadow-xl"
          >
            <button
              className="w-full text-left p-5 text-lg font-semibold text-gray-200 hover:bg-blue-600 hover:text-white transition-all duration-300"
              onClick={() => toggle(index)}
            >
              {faq.question}
            </button>
            {activeIndex === index && (
              <div className="px-5 pb-5 text-gray-700 leading-relaxed whitespace-pre-line">
                {faq.answer}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-700">
          <p className="text-lg mb-4">No matching questions found.</p>
          <a
            href="/contact-us"
            className="inline-block px-5 py-2 bg-white text-black border border-gray-300 rounded hover:bg-blue-600 hover:text-black transition"
          >
            Go to Feedback & Ask Your Question
          </a>
        </div>
      )}
    </div>
  </div>
);

}

export default FAQs;
