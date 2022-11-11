# What is Imposture? 
The Imposture app leverages Speechly's speech recognition AI to provide a safe space to improve your public speaking, practice a scripted speech or audition piece, or just to create awareness of your speaking habits. The idea is to provide as much of a private and anonymous experience as possible, yet improving upon the old talk-to-yourself-in-the-mirror trick through the addition of useful technology and applied theories.


## The Recipe
I created the app with Node.js and Express.js. Authentication is with Passport Local, and all snippets, sessions, and login data are stored in MongoDB Atlas. 

### Terms of Use
Terms: As the creator and owner of the database, I have access to your snippets of speech, but you will be able to update or permanently delete any snippets from your account, so that I never have further access. I will not back these up. Be aware that, despite using reasonable security measures, such as passwords, firewalls, and secure connections, that theoretically, a bad actor could intercept your sign-up email, the password for Imposture that you created, and the contents of your Imposture Practica (the speech snippets vault). Such is unlikely, especially if you observe reasonable safety protocols as you use it. And I shouldn't have to say this, but your rights to usage are terminated and you may be subject to applicable laws if you deliberately attempt to abuse the information of someone else or the product itself.

Be advised that Speechly does have access to the snippets of your speech. However, they allow no one outside of the company to access it. [Read more about Speechly's policies here.](https://www.speechly.com/privacy)

### Currently Cooking
- Visual signals of non-assertive language, displayed in real time

### On the Back Burner
- Ability to upload scripts and read them, watching your output speech to see if it matches
- Ability to upload question / answer format scripts (think interviews)
- Ability to retain sound clips
- Ability to analyze sentiment
- Ability to watch speed of speech and length of time between words and phrases
- Analytics dashboard
- "Marketplace" of donated/shared scripts
- Using overall speech analysis to recommend specific areas of improvement 
- Delivery of therapeutic suggestions/tasks

