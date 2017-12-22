#!C:\Python27\python.exe -u


import json
import sys
from json import dumps
from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

jsonfolder = "C:/Program Files/Apache Software Foundation/Apache2.2/htdocs/axxium/json/ramqCredentials"

class RamqUpdateCredentials(Resource): 
    def get(self, clinicId, MachineId, MachineIdPass):
        data = {
            'clinicId' : clinicId,
            'MachineId' : MachineId,
            'MachineIdPass' : MachineIdPass
            }

        try:
            with open(jsonfolder + clinicId + ".json", "w", encoding='utf-8') as jsonfile:
                json.dump(data, jsonfile, ensure_ascii=False)

            result = {'status': 1}
        except IOError as e:
            result = {'status': -1}

        return result

class RamqCreateCredentials(Resource): 
    def get(self, clinicId): 
        data = {
            'clinicId' : clinicId,
            'MachineId' : '',
            'MachineIdPass' : ''
            }

        try:
            with open(jsonfolder + clinicId + ".json", "w", encoding='utf-8') as jsonfile:
                json.dump(data,jsonfile,ensure_ascii=False)
            result = {'status': 1}
        except IOError as e:
            result = {'status': -1}

        return result
class GetRamqCredentials(Resource): 
    def get(self, clinicId):
        try:
            with open(jsonfolder + clinicId + ".json", "r", encoding='utf-8') as jsonfile:
                data = json.load(jsonfile)
        except IOError as e:
            data = {'error:' : "I/O error({0}): {1}".format(e.errno, e.strerror)}

        return data

api.add_resource(RamqCreateCredentials, '/RamqCreateCredentials/<string:clinicId>')
api.add_resource(RamqUpdateCredentials, '/RamqUpdateCredentials/<string:clinicId>/<string:MachineId>/<string:MachineIdPass>')
api.add_resource(GetRamqCredentials, '/GetRamqCredentials/<string:clinicId>')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
