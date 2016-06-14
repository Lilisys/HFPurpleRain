from flask import *
import requests 
import json
import os 
import math

main = Blueprint('main', __name__, template_folder='templates')

@main.route('/')
def main_route():
    options = {}
    return render_template("index.html", **options)

@main.route('/edit')
def edit(text):
    options["edit"] = True
    options["generated"] = True
    options["text"] = text
    return render_template("index.html", **options)

@main.route('/', methods=['POST'])
def main_route_form():
    options = {}
    r = requests.get("http://localhost:8081/")
    result = json.loads(r.text)
    options["generated"] = True
    options["edit"] = False
    titles = ""
    for i in range(len(result["message"])):
        titles += result["message"][i]
        titles += '\n'

    options["text"] = titles
    return render_template("index.html", **options)










