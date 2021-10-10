cd into backend folder "app"
in console run "pipenv shell" to launch virtual env
this once running, enter "flask run" to begin the server.


IF YOU EVER CHANGE THE LOCATION OF THE FOLDER CONTAINING THE PROJECT, MAKE SURE YOU DELETE YOUR VIRTUAL ENVIROMENT FOLDER THEN RUN
THESE COMMANDS IN THE ROOT DIRECTORY WHERE YOUR PIPLOCK FILE IS IN.


pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt

but make your your requirements.txt is up to date
so run this first

pipenv lock -r > requirements.txt