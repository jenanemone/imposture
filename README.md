#### What is Imposture? 
The Imposture app leverages Speechly's speech recognition AI to provide a safe space for improving your public speaking, practice a scripted speech or audition piece, or just create awareness of your speaking habits. The idea is to create as much of a private and anonymous experience as possible, but improving upon the old talk-to-yourself-in-the-mirror trick through the addition of useful technology and applied theories.


#### The Recipe
I created the app with Node.js and Express.js. Authentication is with Passport Local, and all snippets, sessions, and login data are stored in MongoDB Atlas. 

#### Terms of Use
Terms: As the creator and owner of the database, I have access to your snippets of speech, but you will be able to permanently update or fully delete any snippets from your account, so that I never have further access. I will not back these up. Be aware that, despite using reasonable security measures, such as passwords, firewalls, and secure connections, that it could theoretically be possible for a bad actor to intercept your sign-up email, the password for Imposture that you create, and the contents of your Imposture Practica (the speech snippets vault). Such is unlikely, especially if you observe reasonable safety protocols as you use it. And I shouldn't have to say this, but your rights to usage are terminated if you deliberately attempt to abuse the information of someone else.

Be advised that Speechly does have access to the snippets of your speech. However, they allow no one outside to access it. [Read more about Speechly's policies here.](https://www.speechly.com/privacy)

##### Currently Cooking
- Visual signals of non-assertive language, displayed in real time

##### On the Back Burner
- Ability to upload scripts and read them, watching your output speech as it matches
- Ability to upload question / answer format scripts
- Ability to retain sound clips
- Ability to analyze sentiment
- Ability to watch speed of speech and length of time between words and phrases
- Analytics dashboard

