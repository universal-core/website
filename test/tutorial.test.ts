/**
 * @jest-environment node
 */
import {
  buildTree,
  changedLines,
  createState,
  isDirty,
  parseLines,
  reducer,
  shownFiles,
} from "../src/components/tutorial/state";

describe("tutorial state", () => {
  const start = { "/quest/a.quest": "one\ntwo\n", "config.yml": "x: 1\n" };
  const solution = { "quest/a.quest": "one\nTWO\n", "quest/lib/b.lua": "b\n", "config.yml": "x: 1\n" };

  test("paths are normalised and the first file opens", () => {
    const state = createState(start, solution);
    expect(Object.keys(state.files).sort()).toEqual(["config.yml", "quest/a.quest"]);
    expect(state.active).toBe("config.yml");
    expect(createState(start, solution, "./quest/a.quest").active).toBe("quest/a.quest");
  });

  test("a step updates the step state, focuses and marks changed lines", () => {
    let state = createState(start, solution);
    state = reducer(state, { type: "step", path: "quest/a.quest", code: "one\nTWO\nthree\n" });
    expect(state.active).toBe("quest/a.quest");
    expect(state.base["quest/a.quest"]).toBe("one\nTWO\nthree\n");
    expect(state.highlight?.lines).toEqual([2, 3]);
  });

  test("edits stay until reset, which restores the last step", () => {
    let state = createState(start, solution);
    state = reducer(state, { type: "edit", path: "config.yml", code: "x: 2\n" });
    expect(isDirty(state)).toBe(true);
    state = reducer(state, { type: "reset" });
    expect(state.files["config.yml"]).toBe("x: 1\n");
    expect(isDirty(state)).toBe(false);
  });

  test("solve shows the solution read-only and returns to the edits", () => {
    let state = createState(start, solution, "quest/a.quest");
    state = reducer(state, { type: "edit", path: "quest/a.quest", code: "mine\n" });
    state = reducer(state, { type: "solve" });
    expect(shownFiles(state)["quest/lib/b.lua"]).toBe("b\n");
    expect(reducer(state, { type: "edit", path: "quest/a.quest", code: "z" })).toBe(state);
    state = reducer(state, { type: "open", path: "quest/lib/b.lua" });
    state = reducer(state, { type: "solve" });
    expect(state.files["quest/a.quest"]).toBe("mine\n");
    expect(state.active).toBe("quest/a.quest");
  });

  test("show only focuses files that exist", () => {
    const state = createState(start);
    expect(reducer(state, { type: "step", path: "nope.lua" })).toBe(state);
    const shown = reducer(state, { type: "step", path: "quest/a.quest", lines: [2] });
    expect(shown.active).toBe("quest/a.quest");
    expect(shown.highlight?.lines).toEqual([2]);
  });
});

describe("tutorial helpers", () => {
  test("changedLines", () => {
    expect(changedLines(undefined, "a")).toEqual([]);
    expect(changedLines("a\nb\nc", "a\nb\nc")).toEqual([]);
    expect(changedLines("a\nb\nc", "a\nx\nb\nc")).toEqual([2]);
    expect(changedLines("a\nb\nc\nd", "a\nc\nX\nd")).toEqual([3]);
  });

  test("parseLines", () => {
    expect(parseLines("3-5, 9")).toEqual([3, 4, 5, 9]);
    expect(parseLines(7)).toEqual([7]);
    expect(parseLines(undefined)).toBeUndefined();
  });

  test("buildTree puts folders first", () => {
    const tree = buildTree(["z.yml", "quest/lib/b.lua", "quest/a.quest"]);
    expect(tree.map((n) => n.name)).toEqual(["quest", "z.yml"]);
    expect(tree[0].children?.map((n) => n.name)).toEqual(["lib", "a.quest"]);
  });
});
