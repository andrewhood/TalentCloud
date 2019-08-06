import * as React from "react";
import ReactDOM from "react-dom";
import WordCounterWrapper from "../WordCounter/WordCounterWrapper";
import {
  messages,
  minWords,
  maxWords,
  wordLimit,
  placeholder,
} from "./SkillsWordCounterMessages";

interface SkillsWordCounterProps {
  elementId: string;
}

const SkillsWordCounter: React.FunctionComponent<SkillsWordCounterProps> = ({
  elementId,
}): React.ReactElement => {
  return (
    <WordCounterWrapper
      elementId={elementId}
      messages={messages}
      wordLimit={wordLimit}
      minWords={minWords}
      maxWords={maxWords}
      placeholder={placeholder}
    />
  );
};

// Find all skills textarea elements
if (document.querySelectorAll("div[data-word-counter-id]")) {
  const elements = document.querySelectorAll("div[data-word-counter-id]");

  elements.forEach(
    (container): void => {
      if (container != null && container.hasAttribute("data-word-counter-id")) {
        const elementId = JSON.parse(container.getAttribute(
          "data-word-counter-id",
        ) as string);
        console.log(elementId);
        ReactDOM.render(<SkillsWordCounter elementId={elementId} />, container);
      }
    },
  );
}

export default SkillsWordCounter;
