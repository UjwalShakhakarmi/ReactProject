import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];
export default function Test() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>
      <TabContent content={content[activeTab]} />
    </div>
  );
}
function Button() {}
function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? " tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}
function TabContent({ content }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);
  function handleLikes() {
    setLikes(likes + 1);
  }
  return (
    <div className="tab-content">
      <h4>{content.summary}</h4>
      <p>{showDetails && content.details}</p>
      <div className="tab-actions">
        <button onClick={() => setShowDetails((e) => !e)}>
          {showDetails ? " Hide Details" : "Show Details"}
        </button>
        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleLikes}>+</button>
          <button>+++</button>
        </div>
      </div>
      <div className="tab-undo">
        <button>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}
