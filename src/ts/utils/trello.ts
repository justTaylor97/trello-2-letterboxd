import axios, { AxiosResponse } from "axios";

const trelloApi = axios.create({
  baseURL: "https://api.trello.com/1/",
});

type trelloAuth = {
  apiKey: string;
  apiToken: string;
};

type BoardFields =
  | "id"
  | "name"
  | "desc"
  | "descData"
  | "closed"
  | "idMemberCreator"
  | "idOrganization"
  | "pinned"
  | "url"
  | "shortUrl"
  | "prefs"
  | "labelNames"
  | "starred"
  | "limits"
  | "memberships"
  | "enterpriseOwned";

type GetBoardsRequest = {
  fields: BoardFields[];
} & trelloAuth;

type Slick<T> = { [K in BoardFields]: T };

// TODO: create test for this

export const getMyBoards = ({
  fields,
  apiKey,
  apiToken,
}: GetBoardsRequest): Promise<AxiosResponse<any, any>> => {
  const fieldsString = fields.join(",");
  return trelloApi.get(
    `members/me/boards?fields=${fieldsString}&key=${apiKey}&token=${apiToken}`
  );
};

// TODO: flesh this out
type GetBoardListsRequest = {
  boardId: string;
  cards?: "all" | "closed" | "none" | "open";
  card_fields?: "all"; // TODO: or other board fields
  filter?: "all" | "closed" | "none" | "open";
  fields?: "all";
} & trelloAuth;
export const getBoardLists = ({
  boardId,
  apiKey,
  apiToken,
}: GetBoardListsRequest) => {
  return trelloApi.get(
    `boards/${boardId}/lists?key=${apiKey}&token=${apiToken}`
  );
};

// TODO: flesh this out
type GetCardsInListRequest = {
  listId: string;
} & trelloAuth;
export const getCardsInList = ({
  listId,
  apiKey,
  apiToken,
}: GetCardsInListRequest) => {
  return trelloApi.get(
    `lists/${listId}/cards?key=${apiKey}&token=${apiToken}`,
    {
      headers: {
        "Accept-Encoding": "application/json",
      },
    }
  );
};
