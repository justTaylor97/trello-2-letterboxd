import axios from "axios";

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

// TODO: create test for this
export const getMyBoards = ({ fields, apiKey, apiToken }: GetBoardsRequest) => {
  const fieldsString = fields.join(",");
  return trelloApi.get(
    `members/me/boards?fields=${fieldsString}&key=${apiKey}&token=${apiToken}`
  );
};
