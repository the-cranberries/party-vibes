# Party Vibes

**Site: https://demo-party-vibes.herokuapp.com/**

**Demo: https://youtu.be/AbJtMJYvZkI**

## Description

Party Vibes is a place where you can virtually socialize with your friends and family in real time. The idea was originally conceived during the COVID-19 pandemic in 2020, when most people were restricted to staying at home. We wanted to create an app that could mimic the vibe of a party so that people could still enjoying connecting with others online, both during the pandemic and also any time that you want to catch up long distance.

The app currently contains the following features:

* new users can sign up as a party host
* hosts have a dashboard where they can create a private party with a randomly generated access code, select a profile picture, and delete their party
* guests can join this party with the access code, select a profile picture, and chat with other guests in real time
* the host may end the party from the room at any time

Future features we would like to add include:

* real time music streaming
* games
* movable avatars

## Technologies

Party Vibes uses Express to handle server calls, and stores host and party informatioin in a PostgreSQL database accessed via Sequelize. On the front end, party and host state is handled by Redux, and the user interface is managed by React. Guest information is stored in sessionStorage, and all real-time interactions are managed by Socket.io.

Party Vibes was created by [Arielle Domantay](https://github.com/ArielleDOM), [Jennifer Li](https://github.com/jli09), [Lani Tran](https://github.com/lawnee), and [Adriana Winkelman](https://github.com/Awinkelman) as the final capstone project for the Grace Hopper Program at Fullstack Academy.
