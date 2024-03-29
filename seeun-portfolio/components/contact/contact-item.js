import { useState } from "react";

export default function ContactItem() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const sendContactEmail = async (emailForm) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(emailForm),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        throw new Error(data.message || "서버 요청에 실패함");
      }

      return data;
    } catch (error) {
      console.log(error);
      throw new Error(`이메일 전송 실패: ${error.message}`);
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate name
      if (!name.trim()) {
        alert("이름을 입력해주세요.");
        return;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim() || !emailRegex.test(email)) {
        alert("유효한 이메일 주소를 입력해주세요.");
        return;
      }

      // Validate subject
      if (!subject.trim()) {
        alert("제목을 입력해주세요.");
        return;
      }

      // Validate message
      if (!message.trim()) {
        alert("내용을 입력해주세요.");
        return;
      }
      console.log("Form submitted:", { name, email, subject, message });

      const emailForm = { name, email, message };
      const data = await sendContactEmail(emailForm);
      alert("메일보내기 성공!");
      console.log("Email sent successfully", data);
    } catch (error) {
      alert("메일 보내기 실패");
      console.error("Failed to send email", error);
    }
  };
  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0"
            title="map"
            src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=서울 중랑구&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
            style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
          ></iframe>
          <div className="bg-white relative flex flex-wrap py-6 px-12 rounded shadow-md">
            <div className="lg:w-1/2  flex-grow">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                ADDRESS
              </h2>
              <p className="mt-1">서울 중랑구</p>
            </div>
            <div className="lg:w-1/2  mt-4 lg:mt-0 flex-grow">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                EMAIL
              </h2>
              <p>cocobell3@dgu.ac.kr</p>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Contact
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            언제든 연락주세요!
          </p>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="subject"
              className="leading-7 text-sm text-gray-600"
            >
              Subject
            </label>
            <input
              type="subject"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-600"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
          <button
            onClick={handleSubmit}
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Button
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Chicharrones blog helvetica normcore iceland tousled brook viral
            artisan.
          </p>
        </div>
      </div>
    </section>
  );
}
