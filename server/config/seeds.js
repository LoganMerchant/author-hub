const db = require('./connection');
const { User, Project } = require('../models');

db.once('open', async () => {
    await Project.deleteMany();

    const projects = await Project.insertMany([
        {
            title: 'Test Title',
            summary: 'This is a test',
            genre: 'test',
            authorName: 'TestTester',
            isPublic: true,
            chapters: [
                {
                    author: 'TestTester', // I altered the model for chapter to include an author field.
                    title: 'test chapter',
                    chapterText: 'lorem ipsum dromem, yadahahahaha',
                    comments: [
                        {
                            commentText: 'This is a comment',
                            username: 'theotheruser',
                            reactions: [
                                {
                                    reactionBody: 'This is a reaction',
                                    username: 'TestTester'
                                }
                            ]
                        }
                    ],
                    commits: [
                        {
                            commitText: 'This is a commit',
                            commitType: 'comment/criticism',
                            username: 'TestTester'
                        }
                    ]
                }
            ]
        },
        {
            title: 'Test Title 2',
            summary: 'This is a test 2',
            genre: 'test',
            authorName: 'theotheruser',
            isPublic: true,
            chapters: [
                {
                    author: 'theotheruser',
                    title: 'test chapter2',
                    chapterText: 'lorem ipsum dromem, yadahahahaha',
                    comments: [
                        {
                            commentText: 'This is a comment 2',
                            username: 'TestTester',
                            reactions: [
                                {
                                    reactionBody: 'This is a reaction 2',
                                    username: 'theotheruser'
                                }
                            ]
                        }
                    ],
                    commits: [
                        {
                            commitText: 'This is a commit',
                            commitType: 'comment/criticism',
                            username: 'theotheruser'
                        }
                    ]
                }
            ]
        }
    ])

    await User.deleteMany();

    const users = await User.insertMany([
        {
            username: 'TestTester',
            email: 'test@test.com',
            password: 'test12345',
            projects: [
                projects[0]._id
            ]
        },
        {
            username: 'theotheruser',
            email: 'theotheruser@test.com',
            password: 'test12345',
            projects: [
                projects[1]._id
            ]
        }
    ]);

    newproject = await Project.insertMany([
        {
            title: 'Test Title3',
            summary: 'This is a test3',
            genre: 'test',
            authorName: 'Testy',
            isPublic: true,
            chapters: [
                {
                    author: 'Testy', // I altered the model for chapter to include an author field.
                    title: 'test chapter3',
                    chapterText: 'lorem ipsum dromem, yadahahahaha',
                    comments: [
                        {
                            commentText: 'This is a comment3',
                            username: 'theotheruser',
                            reactions: [
                                {
                                    reactionBody: 'This is a reaction3',
                                    username: 'TestTester'
                                }
                            ]
                        }
                    ],
                    commits: [
                        {
                            commitText: 'This is a commit',
                            commitType: 'comment/criticism',
                            username: 'Testy'
                        }
                    ]
                }
            ],
            upvotes: [
                {
                    userId: users[0]._id
                }
            ]
        }
    ]);
    newusers = await User.insertMany([
        {
            username: 'Testy',
            email: 'testy@test.com',
            password: 'test12345',
            projects: [
                newproject[0]._id
            ]
        },
        {
            username: 'IreadStuff',
            email: 'IreeadStuff@test.com',
            password: 'readingisfun',
        }
    ])
    console.log('I think its all seeded');
    process.exit();
});