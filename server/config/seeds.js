const db = require("./connection");
const { User, Project, Chapter } = require("../models");

db.once("open", async () => {
  await Chapter.deleteMany();

  const chapters = await Chapter.insertMany([
    {
      authorName: "TestTester", // I altered the model for chapter to include an author field.
      title: "test chapter - the testening you get it right... right?",
      chapterText: "lorem ipsum dromem, yadahahahaha you found me the secret easter egg that will brighten your day, hopefully, yay!!!!!",
      isPublic: true,
      comments: [
        {
          commentText: "This is a comment - yup that's all this is, just a comment, nothing special here.",
          username: "theotheruser",
          reactions: [
            {
              reactionBody: "This is a reaction",
              username: "TestTester",
            },
          ],
        },
      ],
      commits: [
        {
          commitText: "This is a commit",
          commitType: "comment/criticism",
          username: "TestTester",
        },
      ],
    },
    {
      authorName: "theotheruser",
      title: "test chapter 2 - does anyone read this stuff?",
      chapterText: "lorem ipsum dromem, yadahahahaha, the lore of this project is simple and it is this, its just a test from a seed file, move along.",
      isPublic: true,
      comments: [
        {
          commentText: "This is a comment 2 - what did you expect from a seeded comment.",
          username: "TestTester",
          reactions: [
            {
              reactionBody: "This is a reaction 2",
              username: "theotheruser",
            },
          ],
        },
      ],
      commits: [
        {
          commitText: "This is a commit",
          commitType: "comment/criticism",
          username: "theotheruser",
        },
      ],
    },
    {
      authorName: "Testy", // I altered the model for chapter to include an author field.
      title: "test chapter 3 - it's like shrek the third except just a test",
      chapterText: "lorem ipsum dromem, yadahahahaha - still trying to find my bonus text, I hope you are enjoying the extra surprises.",
      comments: [
        {
          commentText: "This is a comment 3 - more comments from the seed file, if you want to know why I wrote more, well it doesn't really matter now does it.",
          username: "theotheruser",
          reactions: [
            {
              reactionBody: "This is a reaction3",
              username: "TestTester",
            },
          ],
        },
      ],
      commits: [
        {
          commitText: "This is a commit",
          commitType: "comment/criticism",
          username: "Testy",
        },
      ],
    },
  ]);

  await Project.deleteMany();

  const projects = await Project.insertMany([
    {
      title: "Test Title - The Reckoning",
      summary: "This is a test - yup this is a test project, so if this appears it looks like I did something right... I think.",
      genre: "Action/Adventure",
      authorName: "TestTester",
      isPublic: true,
      chapters: [chapters[0]],
    },
    {
      title: "Test Title 2 - The Electric Boogaloo",
      summary: "This is a test 2, does anyone actually know what a Boogaloo is, just curious.",
      genre: "History",
      authorName: "theotheruser",
      isPublic: true,
      chapters: [chapters[1]],
    },
  ]);

  await User.deleteMany();

  const users = await User.insertMany([
    {
      username: "TestTester",
      email: "test@test.com",
      password: "test12345",
      projects: [projects[0]._id],
    },
    {
      username: "theotheruser",
      email: "theotheruser@test.com",
      password: "test12345",
      projects: [projects[1]._id],
    },
  ]);

  newproject = await Project.insertMany([
    {
      title: "Test Title 3 - The Story of My Life",
      summary: "This is a test 3 - I wonder if anyone will notice the genre and the title and the little joke they make...",
      genre: "Self Help",
      authorName: "Testy",
      isPublic: true,
      chapters: [chapters[2]],
      collabsToAddOrDenyList: [users[0]._id, users[1]._id]
    },
  ]);
  newusers = await User.insertMany([
    {
      username: "Testy",
      email: "testy@test.com",
      password: "test12345",
      projects: [newproject[0]._id],
    },
    {
      username: "IreadStuff",
      email: "IreeadStuff@test.com",
      password: "readingisfun",
    },
  ]);
  console.log("I think its all seeded");
  process.exit();
});
