/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-undef */
import {
  Criteria,
  Assessment,
  RatingGuideQuestion,
  RatingGuideAnswer,
  Skill,
} from "../../models/types";
import {
  SkillLevelId,
  SkillTypeId,
  AssessmentTypeId,
  CriteriaTypeId,
} from "../../models/lookupConstants";
import { clipboardData, ClipboardTableRowProps } from "./RatingGuideClipboard";
// import { getSkillById } from "../../store/skill/skillSelector";

const jediSkill: Skill = {
  id: 1,
  name: "jedi",
  description: "laser sword user",
  skill_type_id: SkillTypeId.Hard,
  en: { name: "English Jedi", description: "English Laser Sword User" },
  fr: { name: "French Jedi", description: "French Laser Sword User" },
};

jest.mock("../../store/skill/skillSelector", () => {
  return {
    // Define Function Mock Return Values
    getSkillById: jest.fn((x, y) => jediSkill),
  };
});

const someSkills: Skill[] = [
  {
    id: 1,
    name: "jedi",
    description: "laser sword user",
    skill_type_id: SkillTypeId.Hard,
    en: { name: "English jedi", description: "English Laser Sword User" },
    fr: { name: "French jedi", description: "French Laser Sword User" },
  },
  {
    id: 2,
    name: "hacking",
    description: "manipulator of technology",
    skill_type_id: SkillTypeId.Hard,
    en: {
      name: "English hacking",
      description: "English manipulator of technology",
    },
    fr: {
      name: "French hacking",
      description: "French manipulator of technology",
    },
  },
  {
    id: 3,
    name: "ninja",
    description: "silent and stealthy",
    skill_type_id: SkillTypeId.Hard,
    en: { name: "English ninja", description: "English silent and stealthy" },
    fr: { name: "French ninja", description: "French silent and stealthy" },
  },
  {
    id: 4,
    name: "joker",
    description: "humorist, teller of jokes",
    skill_type_id: SkillTypeId.Soft,
    en: { name: "English joker", description: "English teller of jokes" },
    fr: { name: "French joker", description: "French teller of jokes" },
  },
];

const someCriteria: Criteria[] = [
  {
    id: 1,
    criteria_type_id: CriteriaTypeId.Essential,
    job_poster_id: 1,
    skill_id: 1,
    skill_level_id: SkillLevelId.Basic,
    description: "Stringy", // TODO: remove un-localized description
    skill: jediSkill, // TODO: remove skill from here
    en: {
      description: "English for my first critical criterion",
    },
    fr: {
      description: "French for my first critical criterion",
    },
  },
  {
    id: 2,
    criteria_type_id: CriteriaTypeId.Asset,
    job_poster_id: 1,
    skill_id: 2,
    skill_level_id: SkillLevelId.Intermediate,
    description: "Stringy", // TODO: remove un-localized description
    skill: jediSkill, // TODO: remove skill from here
    en: {
      description: "English for my second critical criterion",
    },
    fr: {
      description: "French for my second critical criterion",
    },
  },
  {
    id: 3,
    criteria_type_id: CriteriaTypeId.Essential,
    job_poster_id: 1,
    skill_id: 3,
    skill_level_id: SkillLevelId.Advanced,
    description: "Stringy", // TODO: remove un-localized description
    skill: jediSkill, // TODO: remove skill from here
    en: {
      description: "English for my third critical criterion",
    },
    fr: {
      description: "French for my third critical criterion",
    },
  },
  {
    id: 4,
    criteria_type_id: CriteriaTypeId.Essential,
    job_poster_id: 1,
    skill_id: 4,
    skill_level_id: SkillLevelId.Expert,
    description: "Stringy", // TODO: remove un-localized description
    skill: jediSkill, // TODO: remove skill from here
    en: {
      description: "English for my fourth critical criterion",
    },
    fr: {
      description: "French for my fourth critical criterion",
    },
  },
];

const badCriteria: Criteria[] = [
  // Skill ID out of range
  {
    id: 4,
    criteria_type_id: CriteriaTypeId.Essential,
    job_poster_id: 1,
    skill_id: 42,
    skill_level_id: SkillLevelId.Expert,
    description: "Stringy", // TODO: remove un-localized description
    skill: jediSkill, // TODO: remove skill from here
    en: {
      description: "English for my fourth critical criterion",
    },
    fr: {
      description: "French for my fourth critical criterion",
    },
  },
];

const badRatingGuideAnswers: RatingGuideAnswer[] = [
  // Criterion ID out of range
  {
    id: 1,
    rating_guide_question_id: 1,
    criterion_id: 42,
    expected_answer:
      "The first answer will make complete sense once you know the question.",
  },
];

const someAssesments: Assessment[] = [
  {
    id: 1,
    criterion_id: 1,
    assessment_type_id: AssessmentTypeId.NarrativeAssessment,
  },
  {
    id: 2,
    criterion_id: 2,
    assessment_type_id: AssessmentTypeId.ApplicationScreeningQuestion,
  },
  {
    id: 3,
    criterion_id: 3,
    assessment_type_id: AssessmentTypeId.GroupTest,
  },
];

const someRatingGuideQuestions: RatingGuideQuestion[] = [
  {
    id: 1,
    job_poster_id: 1,
    assessment_type_id: AssessmentTypeId.GroupTest,
    question:
      "What is the first question of the meaning of life, the universe and everything?",
  },
  {
    id: 2,
    job_poster_id: 1,
    assessment_type_id: AssessmentTypeId.GroupTest,
    question:
      "What is the second question of the meaning of life, the universe and everything?",
  },
  {
    id: 3,
    job_poster_id: 1,
    assessment_type_id: AssessmentTypeId.GroupTest,
    question:
      "What is the third question of the meaning of life, the universe and everything?",
  },
];

const badRatingGuideQuestions: RatingGuideQuestion[] = [
  // No question referenced by RatingGuideAnswers
  {
    id: 42,
    job_poster_id: 1,
    assessment_type_id: AssessmentTypeId.GroupTest,
    question:
      "What is the third question of the meaning of life, the universe and everything?",
  },
];

const someRatingGuideAnswers: RatingGuideAnswer[] = [
  {
    id: 1,
    rating_guide_question_id: 1,
    criterion_id: 1,
    expected_answer:
      "The first answer will make complete sense once you know the question.",
  },
  {
    id: 2,
    rating_guide_question_id: 2,
    criterion_id: 2,
    expected_answer:
      "The second answer will make complete sense once you know the question.",
  },
  {
    id: 3,
    rating_guide_question_id: 3,
    criterion_id: 3,
    expected_answer:
      "The third answer will make complete sense once you know the question.",
  },
  {
    id: 4,
    rating_guide_question_id: 3,
    criterion_id: 4,
    expected_answer:
      "The fourth answer will make complete sense once you know the question.",
  },
];

const defaultClipboardData = clipboardData(
  someCriteria,
  someSkills,
  someRatingGuideQuestions,
  someRatingGuideAnswers,
  "en",
);

describe("ClipboardData", (): void => {
  it("returns a truthy object", (): void => {
    expect(defaultClipboardData).toBeTruthy();
  });
  it("raise an error when a skill is not found from a skill_id", (): void => {
    function badSkillID(): void {
      clipboardData(
        badCriteria,
        someSkills,
        someRatingGuideQuestions,
        someRatingGuideAnswers,
        "en",
      );
    }
    expect(badSkillID).toThrow("Skill with id 42 not found.");
  });
  it("returns an array equal to the number of Criteria", (): void => {
    expect(defaultClipboardData.length).toEqual(someCriteria.length);
  });
  it("returns the associated localized skill name for each criteria", (): void => {
    expect(defaultClipboardData[0].skillName).toEqual("English jedi");
    expect(defaultClipboardData[1].skillName).toEqual("English hacking");
    expect(defaultClipboardData[2].skillName).toEqual("English ninja");
    expect(defaultClipboardData[3].skillName).toEqual("English joker");
  });
  it("raise an error when a ratingGuideAnswer is not found from a criterion id", (): void => {
    function badCriterionID(): void {
      clipboardData(
        someCriteria,
        someSkills,
        someRatingGuideQuestions,
        badRatingGuideAnswers,
        "en",
      );
    }
    expect(badCriterionID).toThrow("RatingGuideAnswer associated with criterion 1 not found.");
  });
  it("returns the associated answer description for each criteria", (): void => {
    expect(defaultClipboardData[0].modelAnswer).toEqual(
      "The first answer will make complete sense once you know the question.",
    );
    expect(defaultClipboardData[1].modelAnswer).toEqual(
      "The second answer will make complete sense once you know the question.",
    );
    expect(defaultClipboardData[2].modelAnswer).toEqual(
      "The third answer will make complete sense once you know the question.",
    );
    expect(defaultClipboardData[3].modelAnswer).toEqual(
      "The fourth answer will make complete sense once you know the question.",
    );
  });
  it("raise an error when a ratingGuideQuestion is not found from a ratingGuideAnswer", (): void => {
    function badQuestionId(): void {
      clipboardData(
        someCriteria,
        someSkills,
        badRatingGuideQuestions,
        someRatingGuideAnswers,
        "en",
      );
    }
    expect(badQuestionId).toThrow("RatingGuideQuestion 1 not found.");
  });
  it("returns the associated question description for each criteria", (): void => {
    expect(defaultClipboardData[0].question).toEqual(
      "What is the first question of the meaning of life, the universe and everything?",
    );
    expect(defaultClipboardData[1].question).toEqual(
      "What is the second question of the meaning of life, the universe and everything?",
    );
    expect(defaultClipboardData[2].question).toEqual(
      "What is the third question of the meaning of life, the universe and everything?",
    );
    expect(defaultClipboardData[3].question).toEqual(
      "What is the third question of the meaning of life, the universe and everything?",
    );
  });
});
