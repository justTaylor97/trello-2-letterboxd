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
        return { name: list.name, value: list, checked: false };
      }),
    },
  ]);
  console.log(listsToScrape);

  // TODO: actions for entire lists to set the default?
  for (let list of listsToScrape) {
    const { listAction } = await inquirer.prompt([
      {
        type: "expand",
        name: "listAction",
        message: `What would you like to do with ${list.name}?`,
        choices: [
          {
            key: "w",
            name: "Add the films in the list to your watchlist",
            value: "watchlist",
          },
          {
            key: "l",
            name: "Log the films in the list",
            value: "log",
          },
        ],
      },
    ]);

    const { cardOverride } = await inquirer.prompt([
      {
        type: "confirm",
        name: "cardOverride",
        message: "Do you want to manually override any films in the list?",
        default: false,
      },
    ]);

    const { data: cards } = await trello.getCardsInList({
      apiKey: trelloAPIKey,
      apiToken: trelloAPIToken,
      listId: list.id,
    });

    for (let card of cards) {
      let action = listAction;
      if (cardOverride) {
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
        action = cardAction;
      }

      switch (action) {
        case "watchlist":
        // TODO: helper function watchlist card
        case "log":
        default:
          console.log(action, card.name);
          // TODO: helper function log card
          break;
      }
    }
  }

  // TODO: checkmark which lists to scrape, default all true.
  // TODO: scrape options for watchlist or other letterboxd lists.
};

main();
