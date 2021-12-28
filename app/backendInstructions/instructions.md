cd into backend folder "app"
in console run "pipenv shell" to launch virtual env
this once running, enter "flask run" to begin the server.


IF YOU EVER CHANGE THE LOCATION OF THE FOLDER CONTAINING THE PROJECT, MAKE SURE YOU DELETE YOUR VIRTUAL ENVIROMENT FOLDER THEN RUN
THESE COMMANDS IN THE ROOT DIRECTORY WHERE YOUR PIPLOCK FILE IS IN.


pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt

but make your your requirements.txt is up to date
so run this first

pipenv lock -r > requirements.txt




~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




INSTRUCTIONS / TIPS ABOUT MODIFYING ANYTHING ON THE BACKEND DATABASE:


Worst Case Scenario / Everything is unfixable:
----------------------------------------------

- Drop the DB
- Delete all the files in the Migrations Folder on the Backend
- Remake the db in PSQL
- In Terminal run |-  pipenv shell  -|
- Once in virtual enviroment, in Terminal run |-  flask db migrate  -|
- Then in Terminal run |-  flask db upgrade  -|
- Then in Terminal run |-  flask db seed all -|






Upon modifying any table / columns / seeders:
----------------------------------------------

- Delete ALL tables in Postbird
- Delete Alembic Table in Postbird as well
- Delete ALL THE FILES IN THE VERSIONS FOLDER
- Then in Terminal in PipEnv run |-  flask db migrate -m "migration message of your choosing"  -|
- Then in Terminal in PipEnv run |-  flask db upgrade  -|







