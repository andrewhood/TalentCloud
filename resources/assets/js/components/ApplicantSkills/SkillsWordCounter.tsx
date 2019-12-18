/* eslint-disable @typescript-eslint/camelcase */
import * as React from "react";
import ReactDOM from "react-dom";
import { injectIntl, defineMessages, WrappedComponentProps } from "react-intl";
import WordCounterWrapper from "../WordCounter/WordCounterWrapper";
import IntlContainer from "../../IntlContainer";

export const wordCounterMessages = defineMessages({
  skillsPlaceholder: {
    id: "wordCounter.skills.placeholder",
    defaultMessage: "Start typing your answer above.",
    description: "Placeholder text for an empty input.",
  },
  veryShortMessage: {
    id: "wordCounter.skills.veryShortMessage",
    defaultMessage:
      "This seems too short. Did you include examples or lessons learned?",
    description: "Message displayed to user when the word count is very low.",
  },
  shortMessage: {
    id: "wordCounter.skills.shortMessage",
    defaultMessage:
      "This seems a bit short. Do you have another example or lesson learned to add?",
    description: "Message displayed to user when the word count is low.",
  },
  slightlyLongMessage: {
    id: "wordCounter.skills.slightlyLongMessage",
    defaultMessage: "This is starting to get a bit long.",
    description:
      "Message displayed to user when the word count is a little high.",
  },
  longMessage: {
    id: "wordCounter.skills.longMessage",
    defaultMessage:
      "This looks too long. Can you summarize some of your response?",
    description: "Message displayed to user when the word count is high.",
  },
  veryLongMessage: {
    id: "wordCounter.skills.veryLongMessage",
    defaultMessage:
      "500 word limit reached. This is way too long. Check out one of our examples to see what a concise skill description looks like.",
    description: "Message displayed to user when the word count is very high.",
  },
});

interface SkillsWordCounterProps {
  elementId: string;
}

const SkillsWordCounter: React.FunctionComponent<SkillsWordCounterProps &
  WrappedComponentProps> = ({ elementId, intl }): React.ReactElement => {
  const placeholder = intl.formatMessage(wordCounterMessages.skillsPlaceholder);
  const messages = [
    {
      count: 1,
      message: intl.formatMessage(wordCounterMessages.veryShortMessage),
    },
    {
      count: 100,
      message: intl.formatMessage(wordCounterMessages.shortMessage),
    },
    { count: 200, message: "" },
    {
      count: 350,
      message: intl.formatMessage(wordCounterMessages.slightlyLongMessage),
    },
    {
      count: 425,
      message: intl.formatMessage(wordCounterMessages.longMessage),
    },
    {
      count: 500,
      message: intl.formatMessage(wordCounterMessages.veryLongMessage),
    },
  ];
  const minWords = 200;
  const maxWords = 350;
  const wordLimit = 500;
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

const addSoftSkillButton: HTMLElement | null = document.getElementById(
  "add-soft-skill",
);
const addHardSkillButton: HTMLElement | null = document.getElementById(
  "add-hard-skill",
);

const updateWordCounters = (): void => {
  // Find all skills textarea elements
  if (document.querySelectorAll("div[data-word-counter-id]")) {
    const wordCounters = document.querySelectorAll("div[data-word-counter-id]");

    wordCounters.forEach((wordCounter): void => {
      if (
        wordCounter !== null &&
        wordCounter.hasAttribute("data-word-counter-id")
      ) {
        const { previousElementSibling } = wordCounter;

        const textarea =
          previousElementSibling && previousElementSibling.lastElementChild;
        const elementId: string = textarea
          ? textarea.id
          : "error element is null";

        const SkillsWordCounterIntl = injectIntl(SkillsWordCounter);
        const locale = document.documentElement.lang;
        const safeLocale = locale === "en" || locale === "fr" ? locale : "en";
        ReactDOM.render(
          <IntlContainer locale={safeLocale}>
            <SkillsWordCounterIntl elementId={elementId} />
          </IntlContainer>,
          wordCounter,
        );
      }
    });
  }
};

// TODO: Find better solution then firing this event listener last by using setTimeout.
if (addSoftSkillButton) {
  setTimeout(() => {
    addSoftSkillButton.addEventListener("click", updateWordCounters);
  }, 1000);
}

if (addHardSkillButton) {
  setTimeout(() => {
    addHardSkillButton.addEventListener("click", updateWordCounters);
  }, 1000);
}

updateWordCounters();

export default injectIntl(SkillsWordCounter);
