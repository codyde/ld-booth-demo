import json
from flask_cors import CORS
from flask import Flask,jsonify, request, render_template, session
from flask_session import Session 
import ldclient
from ldclient.config import Config
import os
import eventlet
import uuid
import boto3
eventlet.monkey_patch()
from config import ApplicationConfig
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_url_path='',
                  static_folder='build',
                  template_folder='build')
app.config.from_object(ApplicationConfig)

server_session = Session(app)

LD_KEY = os.environ.get('LD_SERVER_KEY')
AWS_DEFAULT_REGION = os.environ.get('AWS_DEFAULT_REGION')

status_api = 'v2.3344'

fallback = '{"dbhost":"db","mode":"local"}'

user = {
    "key": "anonymous"
}
ldclient.set_config(Config(LD_KEY))


@app.route('/')
def default_path():
    return render_template("index.html")


@app.route("/login", methods=["POST"])
def app_login():
    request_data = request.get_json()
    session['key'] = request_data['key']
    status = {
        "status": session['key']+" has been logged in"
    }
    return jsonify(status) 

@app.route("/logout")
def app_logout():
    session.pop('key', default=None)
    status = {
        "status":"logged out"
    }
    return jsonify(status)


@app.route("/health")
def get_api():
    ldclient.set_config(Config(LD_KEY))
    print(session)
    try: 
        user = {
            "key": session['key']
        }
    except:
        user = {
            "key": 'debuguser'
        }
    ldclient.get().identify(user)
    dbinfo = ldclient.get().variation('dbinfo', user, fallback)
    print(user)
    if dbinfo['mode'] == "cloud":
        stats = {
            'version': '2',
            'status': 'Healthy - Migration Successful',
            'location': 'Cloud'
        }
    elif dbinfo['mode'] == "local":
        stats = {
            'version': '1',
            'status': 'Not Migrated',
            'location': 'Local'
        } 
    else:
        stats = {
            'version': '???',
            'status': 'unhealthy',
            'location': 'DebugData'
        }
    return jsonify(stats)

@app.route("/datas", methods=["GET", "POST"])
def thedata():
    ldclient.set_config(Config(LD_KEY))
    try: 
        print(session)
        user = {
            "key": session['key']
        }
    except:
        user = {
            "key": 'debuguser'
        }
    ldclient.get().identify(user)

    ############################################################################################
    #                                                                                          #
    #                                                                                          #
    #             Code for implementing a database read feature flag is below                  #
    #                                                                                          #
    #                                                                                          #
    ############################################################################################

    dbinfo = ldclient.get().variation('dbinfo', user, fallback)
    print(dbinfo)
    if dbinfo['mode'] == 'local':
        dummyData = [(
            {
                "id":1,
                "title":"Debug Ipsum 1",
                "text":"This is our debug text. Charlie ate the last candy bar."
            },
            {
                "id":2,
                "title":"Debug Ipsum 2",
                "text":"We're debugging all the Unicorns. They are trampling our code."
            },
            {
                "id":3,
                "title":"Debug Ipsum 3",
                "text":"Will it ever end? Speculation is nay. It likely won't."
            }
        )]
        return jsonify(dummyData)
    else:
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('LD_Demo_Dynamo')
        data = table.get_item(Key={'id': 1})
        realData = [(
            {
                "id":1,
                "title":data['Item']['name'],
                "text":data['Item']['region']
            }
        )]
        return jsonify(realData)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods',
                         'GET,PUT,POST,DELETE,OPTIONS')
    return response
