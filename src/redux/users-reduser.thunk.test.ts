import { APIResponseType, ResultCodesEnum } from "../API/api";
import { usersAPI } from "../API/users-api";
import { actions, follow, unfollow } from "./users-reducer";

jest.mock("../API/users-api");
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const result: APIResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
};

usersAPIMock.followSuccess.mockReturnValue(Promise.resolve(result));
usersAPIMock.unfollowSuccess.mockReturnValue(Promise.resolve(result));

test("Success follow thunk", async () => {
  const thunk = follow(1);
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleIsFollowingProgress(true, 1)
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleIsFollowingProgress(false, 1)
  );
});

test("Success unfollow thunk", async () => {
  const thunk = unfollow(1);
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleIsFollowingProgress(true, 1)
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleIsFollowingProgress(false, 1)
  );
});
