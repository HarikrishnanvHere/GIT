import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess";
import { DataBase } from "../../../app/server_app/data/DataBase";

const insertMock = jest.fn();
const getByMock = jest.fn();

const newObj = {
  id: "",
  username: "Hari",
  password: "Hari",
};

jest.mock("../../../app/server_app/data/DataBase", () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        getBy: getByMock,
      };
    }),
  };
});

describe("User Credentials Test Suite", () => {
  let sut;

  beforeEach(() => {
    sut = new UserCredentialsDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should test for creation of mocked database", async () => {});

  it("should insert the user and return the id", async () => {
    insertMock.mockResolvedValueOnce("12345");
    const actualId = await sut.addUser(newObj);
    expect(actualId).toBe("12345");
    expect(insertMock).toHaveBeenCalledWith(newObj);
  });

  it("should take the id and return the user details", async () => {
    getByMock.mockResolvedValueOnce(newObj);
    const actualUser = await sut.getUserById("12345");
    expect(actualUser).toBe(newObj);
    expect(getByMock).toHaveBeenCalledWith("id", "12345");
  });

  it("should take the name and return the user details", async () => {
    getByMock.mockResolvedValueOnce(newObj);
    const actualUser = await sut.getUserByUserName("Hari");
    expect(actualUser).toBe(newObj);
    expect(getByMock).toHaveBeenCalledWith("userName", "Hari");
  });
});
