import os

from github import Github

import json

token = os.environ['token'].replace(" ", "")

user = Github(token)


full_name_of_repo = "musify_auth_strorage"

repo = user.get_user().get_repo(full_name_of_repo)


def login(email, password):
    accounts = repo.get_contents('account.json').decoded_content.decode()
    # print(accounts)
    try:
        accounts = json.loads(accounts)
        h = (email, password) in accounts.items()

    except Exception as e:
        h = False
        print(e)
    return h


def create_account(email, password, account_email):
    file = repo.get_contents("account.json")
    accounts = file.decoded_content.decode()
    
    accounts = json.loads(accounts)
    data_for_person = {'email': account_email}

    repo.create_file("user data/" + email + ".json", 'Added data', content=json.dumps(data_for_person))
    if email in accounts.keys():
        return False

    else:


        accounts[email] = password

    repo.update_file("account.json", 'Changed', json.dumps(accounts), file.sha)

    


