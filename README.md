TODO:
- Configure the routes for /record and /recordings based on index.js
- Pick a CSS package or build myself
- Debug saving session (probably due to #1 issues)
- Create analysis page
- Hook up STT and SA
- Fix logout


Config: has .env, also has link to db and passport creation methods

CONTROLLERS:
- HOME
- AUTH 
    - login success / failure / set session
    - password salting
    - account creation / signup
    - logout
- PRACTICA
    - create practicum obj
    - delete practicum
    - ... add on ... update / edit STT
    - insert to db
    - redirect to analysis if triggered
- ANALYSIS
    - generate a report
    - contact / execute NLP methods:
        - Generate statistics
        - Compare against dictionary of filler words
    - view analysis document contents
    - delete analysis
- MIDDLEWARE
    - guest
- HELPERS
    - need to do some work here!!!!
    - will help validate 
    - maybe only need for title validation
- MODELS
    - PRACTICUM
    - USER
    - ANALYSIS
- ROUTES
    - auth was not added (based on BUB)
    - MAIN will have 
        - login
        - logout
        - landing page (index) for not authenticated session
        - prompt central (logged in landing page) 
            => after login page and successful authentication
            - go to public speech
            - go to past practica
    - PUBLICSPEECH
        - create Practicum
        - delete Practicum
        - analyze
    - ANALYSIS
        - delete practicum
        - delete analysis
        - generate analysis
- VIEWS
    - PARTIALS /
        - HEADER
        - FOOTER
        - TRANSCRIPT
        - RESULTS of analysis
    - LOGIN
    - SIGNUP
    - MAIN (index landing page no login)
    - PROMPT CENTRAL (after logging in)
    - PUBLIC SPEECH
    - PAST PRACTICA
    - ANALYSIS (single practicum)
    