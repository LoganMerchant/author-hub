const db = require("./connection");
const { User, Project, Chapter } = require("../models");

db.once("open", async () => {
  await Chapter.deleteMany();

  const chapters = await Chapter.insertMany([
    {
      authorName: "TestTester", // I altered the model for chapter to include an author field.
      title: "Test Chapter",
      chapterText: "lorem ipsum dromem, yadahahahaha, asdfljl;jsadf, asdl;fkjqer, asd;fadsfa, asdl;fjasdleqdsfxzv sadl;fjadsfl;kajxzc,adf sad;fsadflk,sadf sadkfjasdl;fk, sadkfljsadfl; ,sadf lksa;dfjdsa,s dlkdsajqoer,xzcpoj, sadkf;saljfoqwerl, asldk;fjopqwerlm,fdsvlkjdsafoia, asdlfkzxl;c,fopwerk",
      isPublic: true,
      comments: [
        {
          commentText: "This is a comment, hey everyone congrats on the projects and graduating",
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
      title: "Test Chapter 2",
      chapterText: "lorem ipsum dromem, yadahahahaha you found me ;->. Legend of Zelda stuff is in here yeah.",
      isPublic: true,
      comments: [
        {
          commentText: "This is a comment 2 - does anyone read these, if you are please give a thumbs up on the screen.",
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
      title: "Test Chapter 3",
      chapterText: "lorem ipsum dromem, yadahahahaha, - you know if I write random stuff here, someone is bound to read it, and if someone reads it that means they will potentially smile at the stupid stuff I write, if I get a smile, that means I've helped out making someones day better.",
      comments: [
        {
          commentText: "This is a comment3",
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
      summary: "This is a test, no really that is all this project is.",
      genre: "Action/Adventure",
      authorName: "TestTester",
      isPublic: true,
      chapters: [chapters[0]],
    },
    {
      title: "Test Title 2 - The Electric Boogaloo",
      summary: "This is a test 2, yup just another test, you know that to be true.",
      genre: "Fantasy",
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
      title: "Test Title 3 - The Story of my Life",
      summary: "This is a test 3, more tests, more stuff to do.",
      genre: "Biography",
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
