const { db } = require("../models/User");

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
                            username: 'theotheruser'
                        }
                    ]
                }
            ],
            upvotes: [
                {
                    userId: 1
                }
            ]
        }
    ])

    await User.deleteMany();

    await User.create({
        _id: 1,
        username: 'TestTester',
        email: 'test@test.com',
        password: 'test12345',
        projects: [
            {
                projects: [projects[0]]
            }
        ]
    })

    await User.create({

    })
    console.log('I think its all seeded');
    process.exit();
});