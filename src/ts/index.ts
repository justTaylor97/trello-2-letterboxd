import * as trello from "./utils/trello";
import inquirer from "inquirer";

// TODO: get trello board
// TODO: iterate over board lists, ask if convert or not (maybe convert mode? Log vs watchlist)

const trelloAPIToken =
  "bba78b5730770b99673f5aee249425b1e409d77849baf3afb03dec203ae27fd4";
const trelloAPIKey = "2f024004d590ddf687f7bd40d1ab1e7d";

export const main = async () => {
  const { data: myBoards } = await trello.getMyBoards({
    fields: ["id", "name"],
    apiKey: trelloAPIKey,
    apiToken: trelloAPIToken,
  });

  const { boardId } = await inquirer.prompt([
    {
      type: "list",
      name: "boardId",
      message: "What board would you like to scrape?",
      choices: myBoards.map((board: any) => {
        return {
          name: board.name,
          value: board.id,
        };
      }),
    },
  ]);

  const { data: boardLists } = await trello.getBoardLists({
    apiKey: trelloAPIKey,
    apiToken: trelloAPIToken,
    boardId: boardId as string,
  });

  const { listsToScrape } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "listsToScrape",
      message: "What lists would you like to scrape?",
      choices: boardLists.map((list: any) => {
        return { name: list.name, value: list.id, checked: false };
      }),
    },
  ]);
  console.log(listsToScrape);

  // TODO: actions for entire lists to set the default?
  for (let list of listsToScrape) {
    const { data: cards } = await trello.getCardsInList({
      apiKey: trelloAPIKey,
      apiToken: trelloAPIToken,
      listId: list,
    });

    for (let card of cards) {
      const { cardAction } = await inquirer.prompt([
        {
          type: "expand",
          name: "cardAction",
          message: `What would you like to do with ${card.name}?`,
          choices: [
            {
              key: "w",
              name: "Add the film to your watchlist",
              value: "watchlist",
            },
            {
              key: "l",
              name: "Log the film",
              value: "log",
            },
          ],
        },
      ]);

      switch (cardAction) {
        default:
          console.log(cardAction);
          break;
      }
    }
  }

  // TODO: checkmark which lists to scrape, default all true.
  // TODO: scrape options for watchlist or other letterboxd lists.
};

main();
