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

    await User.create({
        username: 'TestTester',
        email: 'test@test.com',
        password: 'test12345',
        projects: [
            projects[0]._id
        ]
    })

    await User.create({
        username: 'theotheruser',
        email: 'theotheruser@test.com',
        password: 'test12345',
        projects: [
            projects[1]._id
        ]
    })
    console.log('I think its all seeded');
    process.exit();
});