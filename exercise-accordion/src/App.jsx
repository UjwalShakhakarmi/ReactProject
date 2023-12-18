import { useState } from "react";
import "./styles.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion faqs={faqs} />
    </div>
  );
}

function Accordion({ faqs }) {
  const [currOpen, setCurrOpen] = useState(null);
  return (
    <div className="accordion">
      {faqs.map((item, index) => (
        <AccordionItem
          curOpen={currOpen}
          onOpen={setCurrOpen}
          title={item.title}
          num={index}
          key={item.title}
        >
          {item.text}
        </AccordionItem>
      ))}
      <AccordionItem
        curOpen={currOpen}
        onOpen={setCurrOpen}
        title="TEst 1"
        num={22}
        key="TEst 1"
      >
        <p>Allows React Developers to:</p>
        <ul>
          <li>Break up UI into components</li>
          <li>Make components reusable</li>
          <li>Place state efficiently</li>
        </ul>
      </AccordionItem>
    </div>
  );
}
function AccordionItem({ title, text, num, curOpen, onOpen, children }) {
  const isOpen = num === curOpen;
  function handleAnswer() {
    onOpen(isOpen ? null : num);
    // setIsopen((isOpen) => !isOpen);
  }
  return (
    <>
      {/* <div className={isOpen ? "item open" : "item "} onClick={handleAnswer}> */}
      <div className={`item ${isOpen ? "open" : ""}`} onClick={handleAnswer}>
        <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
        <p className="title">{title}</p>
        {isOpen ? <p className="icon">-</p> : <p className="icon">+</p>}

        {isOpen && (
          <div className="content-box">
            <p>{children}</p>
          </div>
        )}
      </div>
    </>
  );
}
