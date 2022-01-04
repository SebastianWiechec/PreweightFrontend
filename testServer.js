/* eslint-disable no-undef */
import "whatwg-fetch";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { API_TYPES } from "./src/actions/api";

const server = setupServer(
  rest.get(`${API_TYPES.SPENDINGS}`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({"idSpendings":1,"date":"2020-10-12T00:00:00","carID":2,"costID":2,"price":912,"idUser":"2391ec09-dd54-4203-9f5c-bedf69e263c6"}));
  }),
  rest.get("*", (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: "You must add request handler." })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };