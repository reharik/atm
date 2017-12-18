
PreRequisites:
1) docker must be installed ( probably the latest community edition )
2) docker-compose must be installed

Run application:
1) On command line in root folder run :make dockerUp
2) visit localhost:4000 for swagger
3) post something like the following {"userName": "frank", "text": "hi ma", "timeout": 100}

Visit DB
1) On command line in root folder run :make db;
2) password = password;
3) select jsonb_pretty(document) from client;

Kill DB
1) On command line in root folder run :make killDB;

mea culpa
1) REST is not my strong point. I've seen it a million ways, right or wrong.
If you tell me how you like it I'll do it that way
2) I didn't feel like I had enough context to make a very strong persistence design. I chose a fairly easy one.
I can explain my choice as well as several alternatives that would be better for various circumstances
3) I have included a swagger validation middleware that I largely wrote, cannibalized, and transpiled.  It is fairly
complex but I use it in various projects.  I didn't include tests for it. The code is in the utilities/swaggerMiddleware
4) tests are only written for the chatController.  There's a lot of stuff here and I didn't have time to write tests
for it all plus see #5
5) a fair amount of this is just infrastructure I already have in projects.  I use DI container so I had to strip that
out and that would have broken all tests for that stuff in other projects so I just brought over the code.