const { releaseState } = require("../plugins/blog-release");

const now = new Date("2026-11-04T12:00:00Z");

test("a dated post is live once its date has passed", () => {
  expect(releaseState({ date: "2026-11-04" }, now)).toBe("live");
  expect(releaseState({ date: "2026-10-19" }, now)).toBe("live");
});

test("a future-dated post is scheduled", () => {
  expect(releaseState({ date: "2026-11-05" }, now)).toBe("scheduled");
});

test("a draft stays hidden whatever its date", () => {
  expect(releaseState({ draft: true, date: "2026-10-19" }, now)).toBe("draft");
});
