import { DataBase } from "../../../app/server_app/data/DataBase";
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";

type SomeTypeWIthId = {
  id: string;
  name: string;
  color: string;
};

const someObject = {
  id: "1",
  name: "Hari",
  color: "Blue",
};

const someOtherObject = {
  id: "2",
  name: "Krishnan",
  color: "Blue",
};

describe("testing database class suite", () => {
  let sut: DataBase<SomeTypeWIthId>;
  const fakeId = "1234";

  beforeEach(() => {
    sut = new DataBase<SomeTypeWIthId>();
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValue("1234");
  });

  it("should return a string with a random id", async () => {
    const actual = await sut.insert({ id: "", name: "", color: "" });
    expect(actual).toBe(fakeId);
  });

  it("should insert an object and return the object", async () => {
    const id = await sut.insert({ id: "1", name: "Hari", color: "Blue" });
    const actual = await sut.getBy("id", id);
    console.log(actual);
    expect(actual).toStrictEqual({ id: "1234", name: "Hari", color: "Blue" });
  });

  it("should insert 2 objects and return the objects since it has common property", async () => {
    const id1 = await sut.insert(someObject);
    const id2 = await sut.insert(someOtherObject);
    const actual = await sut.findAllBy("color", "Blue");
    const expected = [someObject, someOtherObject];

    expect(actual).toStrictEqual(expected);
  });

  it("should change the color of the object", async () => {
    const id1 = await sut.insert(someObject);
    await sut.update(id1, "color", "red");
    const returnedObject = await sut.getBy("id", id1);
    const actualColor = returnedObject.color;

    expect(actualColor).toBe("red");
  });

  it("should return undefined for deleted object", async () => {
    const id1 = await sut.insert(someObject);
    await sut.delete(id1);

    const actual = sut.getBy("id", id1);
    expect(actual).toBeUndefined;
  });

  it("should return list of all objects", async () => {
    const id1 = await sut.insert(someObject);
    const id2 = await sut.insert(someOtherObject);

    const expected = [someObject, someOtherObject];
    const actual = await sut.getAllElements();
    expect(actual).toEqual(expected);
  });
});
