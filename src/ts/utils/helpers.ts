import inquirer from "inquirer";
import format from "date-fns/format";
import { TrelloCard } from "./trello.types";
import { isFiveStarRating, LetterboxdReviewCSV } from "./letterboxd.types";

export const logFilmFromCard = async (
  card: TrelloCard
): Promise<LetterboxdReviewCSV> => {
  const { rating } = await inquirer.prompt([
    {
      type: "number",
      name: "rating",
      message: `What is your rating of ${card.name} out of 5?`,
      default: 2.5,
      validate(input, answers) {
        return isFiveStarRating(answers);
      },
      // FIXME: validation function is a little wonky on failure states
    },
  ]);

  const { isRewatch } = await inquirer.prompt([
    {
      type: "confirm",
      name: "isRewatch",
      message: `Is this a rewatch of ${card.name}?`,
      default: false,
    },
  ]);

  const dateWatched = new Date(card.dateLastActivity);

  return {
    Title: card.name,
    Rating: rating,
    WatchedDate: format(dateWatched, "yyyy-MM-dd"),
    Rewatch: isRewatch,
  };
};
