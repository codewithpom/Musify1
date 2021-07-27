from flask import Flask, request, render_template, make_response
import email_check
import data

app = Flask(__name__)

default_profile_logo = "https://drive.google.com/uc?export=view&id=1HGaUpfFMvjkbvYccAslSeV-HRaItvbOy"

@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route("/login", methods=['GET', 'POST'])
def login_page():
    if request.method == "GET":
        
        return render_template("login.html", show_alert="true")

    elif request.method == "POST":
        username = request.form['username']
        password = request.form['password']
        correct = data.login(username, password)
        response = make_response("Correct Password")
        if correct:
            if 'remember' in request.form:
                response.set_cookie("username", username)
                response.set_cookie("password", password)

            return response

        else:
            return render_template('login.html', alert_message='Wrong Password', show_alert="false", id_="login-alert")


@app.route("/create", methods=['POST'])
def create():
    if 'username' in request.form and 'password' in request.form and 'email' in request.form:
        username = request.form['username']
        password = request.form['password']
        
        email = request.form['email']
        correct_email = email_check.check(email)
        if not correct_email:
            return render_template("login.html", alert_message='Wrong Email Address', show_alert="false", id_="signin-form")
        if len(password) < 6:
            return render_template("login.html", alert_message='So small password', show_alert="false", id_="signin-form")
        
        username_exists = data.create_account(username, password, email)
        
        if not username_exists:
            return "Account Made"
        
        else:
            return render_template("login.html", alert_message='Already such username', show_alert="false", id_="signin-form")

@app.route("/logout")
def logout():
    response = make_response("Logged Out")

    response.set_cookie('account', '', expires=0)
    response.set_cookie('password', '', expires=0)
    return response


if __name__ == '__main__':
    app.run(debug=True)
