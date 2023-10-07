import json

from flask import Flask, Response, json, jsonify
from service import dataTrainer

app = Flask(__name__)


@app.route('/recommend/<user_id>', methods = ['GET'])
def recommend(user_id):
    res = jsonify({'recommend':dataTrainer.recommendations(user_id,12)})
    res.headers.add('Access-Control-Allow-Origin','*')
    return res

@app.route('/trigger/train', methods = ['GET'])
def train():
    return dataTrainer.trainData()

if __name__ == '__main__':
    app.run()