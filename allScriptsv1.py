#!C:\Python27\python.exe -u
# -*- coding: utf-8 -*-

import smtplib
import cgi
import glob
import os, sys
import re
import time
from datetime import datetime, date
import json

import requests
import html
import xml.etree.ElementTree as ET
import base64

from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
from email.MIMEBase import MIMEBase
from email import Encoders

print 'Content-type: text/json; charset=utf-8\n\n'

form = cgi.FieldStorage()
tx = form["tx"].value

#global variable to replace for each clinic
#uri = os.environ["AXXIUM_WEBAPI_URL"]    # 'http://ec2-52-38-58-195.us-west-2.compute.amazonaws.com/axxium'
uri = 'http://ec2-52-38-58-195.us-west-2.compute.amazonaws.com/axxium'
if (tx == "getNextNumber"):
	try:
		f1 = open("currentNumber.txt")
		nextNumber = eval(f1.read()) + 1
		f1.close()
		f2 = open("currentNumber.txt","w")
		f2.write(str(nextNumber))
		f2.close()
		print str(nextNumber)
	except:
		print '{ "outcome" : "error", "message" : "getNextNumber error" } '

if (tx == "getPHOv1"):
	try:
		patID = form["patID"].value
		print '{ "files": [ '
		files = os.listdir("json/photos")
		files = ['json/photos/'+elt for elt in files ]
		files.sort(key=os.path.getmtime)
		files.reverse()
		comma = False
		ctr = 0
		for filename in files:
		    if filename.split('_')[1] == patID:
		    	if comma:
		    		print ','
		    	print '{ "code" : "%s" '%filename.split('_')[1]
		    	print ', "file" : "%s" '%filename.split('.')[0].split('/')[2]
 		   	mdate = os.path.getmtime(filename)
 		   	print ', "date" : "%s"'%time.strftime("%Y-%m-%d", time.localtime(mdate))
 		   	print ', "time" : "%s"'%time.strftime("%H:%M", time.localtime(mdate))
 		   	print " } "
 		   	comma = True
 		   	ctr = ctr + 1   
		print '], "count" : '+str(ctr)+' }'
	except:
		print '{ "outcome" : "error", "message" : "getPHOv1 error" } '

if (tx == "uploadPhoto3"):
	try:
		patID = form['patID'].value
		fileitem = form['file'].value
		fn = "F_"+patID+"_"+str(int(round(time.time() * 1000)))
		fh = open('json/photos/' + fn + ".jpg", "wb")
		fh.write(fileitem.split(',')[1].decode('base64'))
		fh.close()
		print '{ "outcome" : "success", "message" : "file uploaded" } '
	except:
		print '{ "outcome" : "error", "message" : "uploadPhoto3 error" } '

if (tx == "getLABOSv1"):
	try:
		clinID = form["clinID"].value
		print '{ "labos": [ '
		files = os.listdir("json/labos")
		files = ['json/labos/'+elt for elt in files ]
		comma = False
		ctr = 0
		for filename in files:
		    if comma:
		    	print ','
		    print '{ "code" : "%s" '%filename.split('_')[1]
		    print ', "file" : "%s" '%filename.split('.')[0].split('/')[2]		    
		    json_data = open(filename, 'r')
		    data = json.load(json_data)
		    print ', "num" : "%s" '%data["num"].encode('utf-8')
		    print ', "nompre" : "%s" '%data["nompre"].encode('utf-8')
		    print ', "labo" : "%s" '%data["labo"].encode('utf-8')
		    print ', "envoye" : "%s" '%data["envoye"].encode('utf-8')
		    print ', "retour" : "%s" '%data["retour"].encode('utf-8')
		    print ', "rdv" : "%s" '%data["rdv"].encode('utf-8')
		    print ', "note" : "%s" '%data["note"].encode('utf-8')
		    print ', "recu" : "%s" '%data["recu"].encode('utf-8')
		    json_data.close()    
		    mdate = os.path.getmtime(filename)
		    print ', "date" : "%s"'%time.strftime("%Y-%m-%d", time.localtime(mdate))
		    print ', "time" : "%s"'%time.strftime("%H:%M", time.localtime(mdate))
		    print " } "
		    comma = True
		    ctr = ctr + 1    
		print '], "count" : '+str(ctr)+' }'
	except:
		print '{ "outcome" : "error", "message" : "getLABOSv1 error" } '

if (tx == "getPATv1"):
	try:
		clinID = form["clinID"].value
		print '{ "patients": [ '
		files = os.listdir("json/patients")
		files = ['json/patients/'+elt for elt in files ]
		comma = False
		ctr = 0
		for filename in files:
		    if comma:
		    	print ','
		    print '{ "code" : "%s" '%filename.split('_')[1]
		    print ', "file" : "%s" '%filename.split('.')[0].split('/')[2]		    
		    json_data = open(filename, 'r')
		    data = json.load(json_data)
		    print ', "id" : "%s" '%data["id"].encode('utf-8')
		    print ', "first" : "%s" '%data["first"].encode('utf-8')
		    print ', "last" : "%s" '%data["last"].encode('utf-8')
		    print ', "NAM" : "%s" '%data["NAM"]
		    print ', "birth" : "%s" '%data["birth"]
		    if 'alert' in data:
		    	print ', "alert" : "%s" '%data["alert"].encode('utf-8')
		    else:
		    	print ', "alert" : "" '
		    if 'alertD' in data:
		    	print ', "alertD" : "%s" '%data["alertD"].encode('utf-8')
		    else:
		    	print ', "alertD" : "" '
		    if 'suivi' in data:
		    	print ', "suivi" : "%s" '%data["suivi"].encode('utf-8')
		    else:
		    	print ', "suivi" : "" '
		    if 'suiviD' in data:
		    	print ', "suiviD" : "%s" '%data["suiviD"].encode('utf-8')
		    else:
		    	print ', "suiviD" : "" '
		    if 'labo' in data:
		    	print ', "labo" : "%s" '%data["labo"].encode('utf-8')
		    else:
		    	print ', "labo" : "" '
		    if 'laboD' in data:
		    	print ', "laboD" : "%s" '%data["laboD"].encode('utf-8')
		    else:
		    	print ', "laboD" : "" '
		    json_data.close()    
		    mdate = os.path.getmtime(filename)
		    print ', "date" : "%s"'%time.strftime("%Y-%m-%d", time.localtime(mdate))
		    print ', "time" : "%s"'%time.strftime("%H:%M", time.localtime(mdate))
		    print " } "
		    comma = True
		    ctr = ctr + 1    
		print '], "count" : '+str(ctr)+' }'
	except:
		print '{ "outcome" : "error", "message" : "getPATv1 error" } '

if (tx == "getANTv1"):
	try:
		patID = form["patID"].value
		print '{ "files": [ '
		files = os.listdir("json/antecedents")
		files = ['json/antecedents/'+elt for elt in files ]
		files.sort(key=os.path.getmtime)
		files.reverse()
		comma = False
		ctr = 0
		for filename in files:
		    if filename.split('_')[1] == patID:
		    	if comma:
		    		print ','
		    	print '{ "code" : "%s" '%filename.split('_')[1]
		    	print ', "file" : "%s" '%filename.split('.')[0].split('/')[2]    
		    	json_data = open(filename, 'r')
		    	data = json.load(json_data)
		    	print ', "client" : "%s" '%data["qHeader"]["qClient"].encode('utf-8')
		    	print ', "first" : "%s" '%data["qHeader"]["qFirst"].encode('utf-8')
		    	print ', "last" : "%s" '%data["qHeader"]["qLast"].encode('utf-8')
		    	print ', "prot" : "%s" '%data["qHeader"]["firstJSON"]
		    	print ', "treated" : "%s" '%data["qHeader"]["qTreated"]
		    	json_data.close()    
		    	mdate = os.path.getmtime(filename)
		    	print ', "date" : "%s"'%time.strftime("%Y-%m-%d", time.localtime(mdate))
		    	print ', "time" : "%s"'%time.strftime("%H:%M", time.localtime(mdate))
		    	print " } "
		    	comma = True
		    	ctr = ctr + 1    
		print '], "count" : '+str(ctr)+' }'
	except:
		print '{ "outcome" : "error", "message" : "getANTv1 error" } '

if (tx == "getALLsub"):
	try:
		subFolder = form['sub'].value
		patID = form["patID"].value
		print '{ "files": [ '
		files = os.listdir('json/'+subFolder)
		files = ['json/'+subFolder+'/'+elt for elt in files ]
		flist = [ ]
		for filename in files:
		    if filename.split('_')[1] == patID:    
		    	json_data = open(filename, 'r')
		    	data = json.load(json_data)
		    	json_data.close()
		    	try:
		    		aTime = data["time"]
		    	except:
		    		aTime = "00:00"    	
		    	flist.append((data["date"],aTime,filename.split('.')[0].split('/')[2]))
		slist = sorted(flist, key=lambda flist: (flist[0],flist[1],flist[2]), reverse=True)
		comma = False
		ctr = 0
		for atra in slist:
			if comma:
				print ','
			print '{ "date" : "%s" '%atra[0]
			print ', "time" : "%s" '%atra[1]
			print ', "file" : "%s" '%atra[2]
			print " } "
			comma = True
			ctr = ctr + 1    
		print '], "count" : '+str(ctr)+' }'
	except:
		print '{ "outcome" : "error", "message" : "getALLsub error" } '

if (tx == "getDOCv2"):
	try:
		patID = form["patID"].value
		print '{ "files": [ '
		files = os.listdir("json/documents")
		files = ['json/documents/'+elt for elt in files ]
		files.sort(key=os.path.getmtime)
		files.reverse()
		comma = False
		ctr = 0
		for filename in files:
		    if filename.split('_')[1] == patID:
		    	if comma:
		    		print ','
		    	print '{ "code" : "%s" '%filename.split('_')[1]
		    	print ', "file" : "%s" '%filename.split('.')[0].split('/')[2]
		    	mdate = os.path.getmtime(filename)
		    	print ', "date" : "%s"'%time.strftime("%Y-%m-%d", time.localtime(mdate))
		    	print ', "time" : "%s"'%time.strftime("%H:%M", time.localtime(mdate))
		    	print " } "
		    	comma = True
		    	ctr = ctr + 1    
		print '], "count" : '+str(ctr)+' }'
	except:
		print '{ "outcome" : "error", "message" : "getDOCv2 error" } '

if (tx == "getEXAv1"):
	try:
		patID = form["patID"].value
		print '{ "files": [ '
		files = os.listdir("json/examens")
		files = ['json/examens/'+elt for elt in files ]
		files.sort(key=os.path.getmtime)
		files.reverse()
		comma = False
		ctr = 0
		for filename in files:
		    if filename.split('_')[1] == patID:
		    	if comma:
		    		print ','
		    	print '{ "code" : "%s" '%filename.split('_')[1]
		    	print ', "file" : "%s" '%filename.split('.')[0].split('/')[2]
		    	json_data = open(filename, 'r')
		    	data = json.load(json_data)
		    	print ', "client" : "%s" '%data["qHeader"]["qClient"].encode('utf-8')
		    	print ', "first" : "%s" '%data["qHeader"]["qFirst"].encode('utf-8')
		    	print ', "last" : "%s" '%data["qHeader"]["qLast"].encode('utf-8')
		    	print ', "prot" : "%s" '%data["qHeader"]["firstJSON"]
		    	print ', "treated" : "%s" '%data["qHeader"]["qTreated"]
		    	json_data.close()
		    	mdate = os.path.getmtime(filename)
		    	print ', "date" : "%s"'%time.strftime("%Y-%m-%d", time.localtime(mdate))
		    	print ', "time" : "%s"'%time.strftime("%H:%M", time.localtime(mdate))
		    	print " } "
		    	comma = True
		    	ctr = ctr + 1    
		print '], "count" : '+str(ctr)+' }'
	except:
		print '{ "outcome" : "error", "message" : "getEXAv1 error" } '

if (tx == "updatePrix"):
	import json 

	try:
		code=str(form["code"].value)
		prix=form["prix"].value
		ramq=form["ramq"].value
		insurance=form["insurance"].value
		special=form["special"].value
		print 'Code changing value for: ', code 
		
		
		import json

		json_file=open("json/params/codeFawad.JSON",'r') 
		json_dict = json.load(json_file)
		json_file.close()

		# print(json_data) 
		print '=== Right Now values are ===='
		print ' prix : ',json_dict[code]['prix']
	 	print ' ramq  : ',json_dict[code]['ramq']
	 	print ' insurance : ',json_dict[code]['insurance']
	 	print ' special  : ',json_dict[code]['special']
	 	print '================================'
		
		json_dict[code]['prix']= prix
		json_dict[code]['ramq']= ramq
		json_dict[code]['insurance']= insurance
		json_dict[code]['special']= special

		print '======== CHANGED TO ============'
	 	print 'changed prix to : ',json_dict[code]['prix']
	 	print 'changed ramq to : ',json_dict[code]['ramq']
	 	print 'changed insurance to : ',json_dict[code]['insurance']
	 	print 'changed special to : ',json_dict[code]['special']
	 	print '==================================='
		backToJson=json.dumps(json_dict)

		print 'printing backToJson data : ', backToJson

		json_file_write=open("json/params/blank.json",'w')

		json.dump(json_dict,json_file_write)
		json_file_write.close()


		#  print 'changing it to 00000 '
		# json_dict['02115']['prix']=00000;
		# print json_data['02115']['prix']

		    # print json_data

		    # new=json.dumps(json_data)

		    # json_dataJSON=json.dumps(json_data)
		    # json_file.write(json_data)
		    # print json_dataJSON

		    

		# myfile=open('json/params/codeFawad.JSON','r')
		# print myfile.read()
		# myfile.close()
		# print insurance

	except:
		print '{ In the EXCEPT - Hello Fadi }'	
		


if (tx == "getFile"):
	try:
		pKey = form["pKey"].value
		prot = form["prot"].value
		extID = form["extID"].value
		lang = form["lang"].value
		file = open("protCohort/"+extID+".json")
		data = file.read()
		print data
		file.close()
	except:
		print '{ "outcome" : "error", "message" : "getFile error" } '

if (tx == "getJSONsub"):
	try:
		subFolder = form["sub"].value
		qCode = form["code"].value
		file = open("json/"+subFolder+"/"+qCode+".json")
		data = file.read()
		print data
		file.close()
	except:
		print '{ "outcome" : "error", "message" : "getJSONsub error" } '


if (tx == "uploadJSONP"):
	try:
		fName = form['name'].value
		subName = form['sub'].value
		jsonString = form['json'].value
		logFile = open('json/'+subName+'/'+fName+'.json', 'w')
		logFile.write(jsonString)
		logFile.close()
		print '{ "outcome" : "success", "message" : "file uploaded" } '
	except:
		print '{ "outcome" : "error", "message" : "uploadJSONP error" } '

if (tx == "uploadJSONsub"):
	try:
		subFolder = form['sub'].value
		fName = form['name'].value
		jsonString = form['json'].value
		logFile = open("json/"+subFolder+"/"+fName+'.json', 'w')
		logFile.write(jsonString)
		logFile.close()
		print '{ "outcome" : "success", "message" : "file uploaded" } '
	except:
		print '{ "outcome" : "error", "message" : "uploadJSONsub error" } '

if (tx == "uploadDOC"):
	#try:
	import msvcrt
	msvcrt.setmodde (0, os.O_BINARY) # stdin  = 0
	msvcrt.setmode (1, os.O_BINARY) # stdout = 1
	fileitem = form['file']
	patID = form["dPatID"].value
	fn = "D_"+patID+"_"+str(int(round(time.time() * 1000)))
	if fileitem.filename:
		open('json/documents/' + fn + ".pdf", 'wb').write(fileitem.file.read())
	#fh = open('json/documents/' + fn + ".pdf", "wb").write(fileitem.read())
	#fh.close()
	print '{ "outcome" : "success", "message" : "file uploaded" } '
	#except:
	#	print '{ "outcome" : "error", "message" : "uploadDOC error" } '

	
# ROBERTO CODE


def getdate(datestr="", format="%Y-%m-%d"):
    if not datestr:
        return datetime.today().date()
    return datetime.strptime(datestr, format).date()

def CleanXML(s, escapeguillemet=True):
    s = s.replace("\\n", "")
    s = s.replace("\\r", "")
    s = s.replace("\"<", "<")
    s = s.replace(">\"", ">")
    s = s.replace("  ", "")
    if escapeguillemet:
        s = s.replace("\\\"", "\"")
    return s

if tx == "getFactureInfo":
    try:
        patientId = form['patientId'].value
        nodossier = form['nodossier'].value
        nofactext = form['nofact'].value
        clinicId = form['clinicId'].value

        #read info
        json_data = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'r')
        data = json.load(json_data)
        json_data.close()

        rows = []
        infos = []

        #amq section
        if data["amq"] is not None:
            if data["amq"]["req"] is not None:
                for item in data["amq"]["req"][1]:
                    rows.append(item)
                for item in data["amq"]["req"][2]:
                    infos.append(item)
        #cas
        if data["cas"] is not None:
            if data["cas"]["req"] is not None:
                for item in data["cas"]["req"]:
                    rows.append(item)
        #ins
        if data["ins"] is not None:
            if data["ins"]["req"] is not None:
                for item in data["ins"]["req"]:
                    rows.append(item)        

        facture = { 'rows' : rows, 'infos' : infos}

        print json.dumps(facture)       
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno)

if tx == "updateFacture":
    try:
        patientId = form['patientId'].value
        nodossier = form['nodossier'].value
        nofactext = form['nofact'].value
        clinicId = form['clinicId'].value
        dataJson = json.loads(form['json'].value)

        #read info
        json_data = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'r')
        data = json.load(json_data)
        json_data.close()

        #update file
        if dataJson["amq"] is not None:
            if len(dataJson["amq"]) > 0:
                data["amq"] = {'req': dataJson["amq"], 'resp' : None, 'date' : None, 'status' : 0, 'nofact' : nofactext}
        
        if dataJson["ins"] is not None:
            if len(dataJson["ins"]) > 0:
                data["ins"] = {'req': dataJson["ins"], 'resp' : None, 'date' : None, 'status' : 0, 'nofact' : nofactext, 'transaction': None, 'info' : None}

        if dataJson["cas"] is not None:
            if len(dataJson["cas"]) > 0:
                data["cas"] = {'req': dataJson["cas"], 'date' : None, 'status' : 0, 'nofact' : nofactext}

        logFile = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'w')
        logFile.write(json.dumps(data).decode('unicode-escape').encode('utf8'))
        logFile.close()

        message = {'outcome' : 'success', 'message': 'ok'}
        print json.dumps(message)
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno)


if tx == "createFacture":
    try:
        clinicId = form['clinicId'].value
        patientId = form['patientId'].value
        nodossier = form['nodossier'].value

        #read the nofact for credentials
        json_data = open('json/ramqCredentials/'+clinicId+'.json', 'r')
        data = json.load(json_data)
        json_data.close()
        nofact = data.get('nofact', 0)
        nofact = nofact + 1

        #save the new nofact
        logFile = open('json/ramqCredentials/'+clinicId+'.json', 'w')
        data["nofact"] = nofact
        logFile.write(json.dumps(data))
        logFile.close()

        #verify if log folder exists if not, create it
        if not os.path.isdir('json/facturation/%s/%s/log'%(clinicId, patientId)):
            os.makedirs('json/facturation/%s/%s/log'%(clinicId, patientId))

        #save the new nofact
        dataJSON = {'status': 0, 'amq': None, 'cas': None, 'ins': None}
        logFile = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofact), 'w')
        logFile.write(json.dumps(dataJSON))
        logFile.close()

        message = {'outcome' : 'success', 'nofact': nofact}
        print json.dumps(message)
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno) 

if tx == "getPatientLogs":
    try:
        patientId = form['patientId'].value
        clinicId = form['clinicId'].value

        if not os.path.isdir('json/facturation/%s/%s/log'%(clinicId, patientId)):
            print '{ "logs": [ ] }'
        else:
            #In case, the dates are missing
            try:
                datefrom = getdate(form['dFrom'].value)
            except:
                d = datetime.today().date()
                datefrom = date(d.year if d.month > 1 else d.year - 1, d.month - 1 if d.month > 1 else 12, 1)

            try:
                dateto = getdate(form['dTo'].value)  
            except:
                dateto = getdate()
                
            billfrom = int(form.getvalue('billFrom', 1))
            billTo = int(form.getvalue('billTo', 10000))

            logs = []
            jsondata = {}
            files = os.listdir("json/facturation/%s/%s/log"%(clinicId, patientId))
            files = ['json/facturation/%s/%s/log/'%(clinicId, patientId)+elt for elt in files if elt.endswith(".xml")]
            files.sort(key=os.path.getctime)
            files.reverse()
            for filename in files:
                mdate = os.path.getctime(filename)
                datefile = datetime.fromtimestamp(mdate).date()
                if datefile >= datefrom and datefile <= dateto:
                    nofacture = int(filename.split('/')[5].split('_')[1])
                    if  billfrom <= nofacture and nofacture <= billTo:
                        #read info
                        file = open(filename, 'r')
                        xmlstring = file.read()
                        file.close()

                        tmp_log = {}
                        tmp_log["facture"] = nofacture
                        tmp_log["nodossier"] = filename.split('/')[5].split('_')[0]
                        tmp_log["xml"] = xmlstring.replace("\"", "\\\"") 
                        tmp_log["datecreation"] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(mdate))
                        logs.append(tmp_log)
                                                 
            jsondata["logs"] = logs
            print json.dumps(jsondata).decode('unicode-escape').encode('utf8')   

    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno)  

if tx == "getPatientFactures":
    try:
        patientId = form['patientId'].value
        clinicId = form['clinicId'].value
        section = form.getvalue('section', 'amq') #default section
        if not os.path.isdir('json/facturation/%s/%s'%(clinicId, patientId)):
            print '{ "factures": [ ] }'
        else:
            #In case, the dates are missing
            try:
                datefrom = getdate(form['dFrom'].value)
            except:
                d = datetime.today().date()
                datefrom = date(d.year if d.month > 1 else d.year - 1, d.month - 1 if d.month > 1 else 12, 1)

            try:
                dateto = getdate(form['dTo'].value)  
            except:
                dateto = getdate()

            factures = []
            jfactures = {}
            files = os.listdir("json/facturation/%s/%s"%(clinicId, patientId))
            files = ['json/facturation/%s/%s/'%(clinicId, patientId)+elt for elt in files if elt.endswith(".json")]
            files.sort(key=os.path.getctime)
            files.reverse()
            for filename in files:
                mdate = os.path.getctime(filename)
                datefile = datetime.fromtimestamp(mdate).date()
                if datefile >= datefrom and datefile <= dateto:
                    #read info
                    json_data = open(filename, 'r')
                    data = json.load(json_data)
                    json_data.close()
                    
                    if section == 'amq':
                        #verify if the is or not empty bill
                        if data["amq"] is not None:
                            tmp_fact = {}
                            tmp_fact["facture"] = filename.split('/')[4].split('_')[1].split('.')[0]
                            tmp_fact["nodossier"] = filename.split('/')[4].split('_')[0]
                            tmp_fact["info"] = data["amq"]["req"]
                            tmp_fact["xml"] = '' if data["amq"]["resp"] is None else data["amq"]["resp"].replace("\"", "\\\"")
                            tmp_fact["dateregie"] = '' if data["amq"]["date"] is None else data["amq"]["date"]
                            tmp_fact["datecreation"] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(mdate))
                            tmp_fact["status"] = data["amq"]["status"]
                            factures.append(tmp_fact)
                    elif section == 'ins':
                        if data["ins"] is not None:
                            tmp_fact = {}
                            tmp_fact["facture"] = filename.split('/')[4].split('_')[1].split('.')[0]
                            tmp_fact["nodossier"] = filename.split('/')[4].split('_')[0]
                            tmp_fact["info"] = data["ins"]["info"] if 'info' in data["ins"] else {'Ass': None, 'Nom': None, 'Prenom': None}
                            tmp_fact["req"] = data["ins"]["req"]
                            tmp_fact["resp"] = '' if data["ins"]["resp"] is None else data["ins"]["resp"]
                            tmp_fact["datetransaction"] = data["ins"]["date"]
                            tmp_fact["datecreation"] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(mdate))
                            tmp_fact["status"] = data["ins"]["status"]
                            tmp_fact["transaction"] = data["ins"]["transaction"]
                            factures.append(tmp_fact)
                    elif section == 'cas':
                        if data["cas"] is not None:
                            tmp_fact = {}
                            tmp_fact["facture"] = filename.split('/')[4].split('_')[1].split('.')[0]
                            tmp_fact["nodossier"] = filename.split('/')[4].split('_')[0]
                            tmp_fact["info"] = data["cas"]["req"]
                            tmp_fact["datetransaction"] = data["cas"]["date"]
                            tmp_fact["datecreation"] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(mdate))
                            factures.append(tmp_fact)
                            
            jfactures["factures"] = factures
            print json.dumps(jfactures).decode('unicode-escape').encode('utf8')   
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno)  

if tx == "cancelRamqData":
    try:
        #read parameters from request
        clinicId = form['clinicId'].value
        patientId = form['patientId'].value
        nodossier = form['nodossier'].value
        nofactext = form['nofact'].value
        dataJson = json.loads(form['json'].value)
        xmlreq = dataJson["request"]
        datainputs = dataJson["info"]
  
        #define namespace for read xml       
        nsmap = {'n': 'urn:ramq-gouv-qc-ca:RFP'}

        #read the parameters for credentials
        json_data = open('json/ramqCredentials/'+clinicId+'.json', 'r')
        data = json.load(json_data)
        json_data.close()
        UserPass= data["MachineIdPass"]	
        UserId= data["MachineId"]
        

        #send the request to WebApi that calls RAMQ server
        dataJSON = { 'UserId': UserId, 'UserPass': UserPass, 'XmlToSend': CleanXML(xmlreq)}
        headers = {'content-type': 'application/json; charset=utf-8'} # set what your server accepts
        r = requests.post(uri + '/api/RamqWebApi/PostPaymentRequest', json=dataJSON, headers=headers)

        if r.status_code != 200:
            print '{ "outcome" : "error", "message" : "Something was wrong" }'
        else:
            xmlresp = r.text
            if xmlresp is None or not xmlresp:          
                print '{ "outcome" : "error", "message" : "Something was wrong" }'
            else:         
                if xmlresp.find("Error") > -1 or xmlresp.find("null") > -1:   #In case, something happen in server side code 500
                    if xmlresp.find("null") > -1:
                        xmlresp = 'Le fichier XML envoyé n\'est pas conforme'
                    message = {'outcome': 'error', 'message': CleanXML(xmlresp, False)}
                    print json.dumps(message)
                else:         
                    #verify if the response is ok or not
                    root = ET.fromstring(CleanXML(xmlresp.encode('utf-8')))               
                    nbrerror = int(root.find('n:sta_recev', namespaces=nsmap).text) #1: ok, 2: Fail                     
                    
                    #clean data before saving
                    xmlresp = CleanXML(xmlresp, False)

                    if nbrerror == 1:   
                        #read the bill
                        json_data = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'r')
                        data = json.load(json_data)
                        json_data.close()
                        #change status and date transaction
                        data["amq"]["date"] = datetime.today().strftime("%Y-%m-%d %H:%M:%S")
                        data["amq"]["status"] = 3 # Canceled
                        data["amq"]["resp"] = data["amq"]["resp"].replace("\"", "\\\"")
                        logFile = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'w')
                        logFile.write(json.dumps(data).decode('unicode-escape').encode('utf8'))
                        logFile.close()

                    #create log file
                    logFile = open('json/facturation/%s/%s/log/%s_%s_%s_amq.xml'%(clinicId, patientId, nodossier, nofactext, datetime.today().strftime("%Y%m%d%H%M%S")), 'w')
                    logFile.write(CleanXML(xmlresp, True).encode('utf8'))
                    logFile.close()                        
                            
                    message = {'outcome' : 'success', 'message': xmlresp}
                    print json.dumps(message)
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno) 

if tx == "getAcceptedBills": #ACCEPTED 
    try:
        clinicId = form['clinicId'].value      
        patientId = form.getvalue('patientId')

        #In case, the dates are missing
        try:
            datefrom = getdate(form['dFrom'].value)
        except:
            d = datetime.today().date()
            datefrom = date(d.year if d.month > 1 else d.year - 1, d.month - 1 if d.month > 1 else 12, 1)

        try:
            dateto = getdate(form['dTo'].value)  
        except:
            dateto = getdate()

        factures = []
        jfactures = {}
        fichiers = []

        if patientId is not None and patientId != '':
            if os.path.isdir('json/facturation/%s/%s/log'%(clinicId, patientId)):
                fichiers = os.listdir("json/facturation/%s/%s"%(clinicId, patientId))
                fichiers = ['json/facturation/%s/%s/'%(clinicId, patientId)+elt for elt in fichiers if elt.endswith(".json")]
        else:
            for path, subdirs, files in os.walk('json/facturation/%s'%clinicId):
                files = [elt for elt in files if elt.endswith(".json")]
                for name in files:
                    fichiers.append(os.path.join(path, name).replace("\\","/")) #fix bug for slash vs back slash

        fichiers.sort(key=os.path.getctime)
        fichiers.reverse()
        for filename in fichiers:
            mdate = os.path.getctime(filename)
            datefile = datetime.fromtimestamp(mdate).date()
            if datefile >= datefrom and datefile <= dateto:
                #read info
                json_data = open(filename, 'r')
                data = json.load(json_data)
                json_data.close()    

                if data["amq"] is not None:
                    if int(data["amq"]["status"]) == 1: #ACCEPTED
                        tmp_fact = {}
                        tmp_fact["facture"] = filename.split('/')[4].split('_')[1].split('.')[0]
                        tmp_fact["nodossier"] = filename.split('/')[4].split('_')[0]
                        tmp_fact["patientId"] = filename.split('/')[3]
                        tmp_fact["dateregie"] = data["amq"]["date"]
                        tmp_fact["xml"] = '' if data["amq"]["resp"] is None else data["amq"]["resp"].replace("\"", "\\\"")
                        tmp_fact["Payment"] = data["amq"].get('Payment', None) 
                        factures.append(tmp_fact)                              

        jfactures["factures"] = factures
        print json.dumps(jfactures).decode('unicode-escape').encode('utf8')   
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno) 

if tx == "addpayment":
    try:
        clinicId = form['clinicId'].value      
        patientId = form['patientId'].value
        nodossier = form['nodossier'].value
        nofactext = form['nofact'].value
        NoRecu = form['NoRecu'].value
        Code = form['Code'].value
        Raison = form['Raison'].value
        Payment = form['Payment'].value
        Effectue = form['Effectue'].value

        #read the bill
        json_data = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'r')
        data = json.load(json_data)
        json_data.close()
        #update payement
        data["amq"]["Payment"] = {'NoRecu' : NoRecu, 'Code' : Code, 'Raison' : Raison, 'Payment' : Payment, 'Effectue' : Effectue }
        data["amq"]["resp"] = data["amq"]["resp"].replace("\"", "\\\"")
        logFile = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'w')
        logFile.write(json.dumps(data).decode('unicode-escape').encode('utf8'))
        logFile.close()   

        message = {'outcome' : 'success', 'message': 'OK'}
        print json.dumps(message)     
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno) 

if tx == "modifyRamqData":
    try:
        #read parameters from request
        clinicId = form['clinicId'].value
        patientId = form['patientId'].value
        nodossier = form['nodossier'].value
        nofactext = form['nofact'].value
        dataJson = json.loads(form['json'].value)
        xmlreq = dataJson["request"]
        datainputs = dataJson["info"] 
        #define namespace for read xml       
        nsmap = {'n': 'urn:ramq-gouv-qc-ca:RFP'}

        #read the parameters for credentials
        json_data = open('json/ramqCredentials/'+clinicId+'.json', 'r')
        data = json.load(json_data)
        json_data.close()
        UserPass = data["MachineIdPass"]	
        UserId = data["MachineId"]

        #send the request to WebApi that calls RAMQ server
        dataJSON = { 'UserId': UserId, 'UserPass': UserPass, 'XmlToSend': CleanXML(xmlreq)}
        headers = {'content-type': 'application/json; charset=utf-8'} # set what your server accepts
        r = requests.post(uri + '/api/RamqWebApi/PostPaymentRequest', json=dataJSON, headers=headers)
        
        if r.status_code != 200:
            print '{ "outcome" : "error", "message" : "Something was wrong" }'
        else:
            xmlresp = r.text
            if xmlresp is None or not xmlresp:          
                print '{ "outcome" : "error", "message" : "Something was wrong" }'
            else:         
                if xmlresp.find("Error") > -1 or xmlresp.find("null") > -1:   #In case, something happen in server side code 500
                    if xmlresp.find("null") > -1:
                        xmlresp = 'Le fichier XML envoyé n\'est pas conforme'
                    message = {'outcome': 'error', 'message': CleanXML(xmlresp, False)}
                    print json.dumps(message)
                else:         
                    #verify if the response is ok or not
                    root = ET.fromstring(CleanXML(xmlresp.encode('utf-8')))               
                    nbrerror = int(root.find('n:sta_recev', namespaces=nsmap).text) #1: ok, 2: Fail

                    #clean data before saving
                    xmlresp = CleanXML(xmlresp, False)

                    #set input row
                    if nbrerror == 1:   
                        #read the bill
                        json_data = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'r')
                        data = json.load(json_data)
                        json_data.close()
                        data["amq"]["req"] = datainputs
                        data["amq"]["resp"] = xmlresp
                        data["amq"]["status"] = 1 #OK
                        logFile = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'w')
                        logFile.write(json.dumps(data).decode('unicode-escape').encode('utf8'))
                        logFile.close()
                    
                    #create log file
                    logFile = open('json/facturation/%s/%s/log/%s_%s_%s_amq.xml'%(clinicId, patientId, nodossier, nofactext, datetime.today().strftime("%Y%m%d%H%M%S")), 'w')
                    logFile.write(CleanXML(xmlresp, True).encode('utf8'))
                    logFile.close()

                    message = {'outcome' : 'success', 'message': xmlresp}
                    print json.dumps(message)
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno) 

if tx == "getRamqData":   
    try:
        #read parameters from request
        clinicId = form['clinicId'].value
        patientId = form['patientId'].value
        nodossier = form['nodossier'].value
        nofactext = form['nofact'].value
        
        dataJson = json.loads(form['json'].value)
        xmlreq = dataJson["request"]
        datainputs = dataJson["info"]
  
        #define namespace for read xml       
        nsmap = {'n': 'urn:ramq-gouv-qc-ca:RFP'}

        #read the parameters for credentials
        json_data = open('json/ramqCredentials/'+clinicId+'.json', 'r')
        data = json.load(json_data)
        json_data.close()
        UserPass = data["MachineIdPass"]	
        UserId = data["MachineId"]

        #send the request to WebApi that calls RAMQ server
        dataJSON = {'UserId': UserId, 'UserPass': UserPass, 'XmlToSend': CleanXML(xmlreq)}
        headers = {'content-type': 'application/json; charset=utf-8'} # set what your server accepts
        r = requests.post(uri + '/api/RamqWebApi/PostPaymentRequest', json=dataJSON, headers=headers)
       
        if r.status_code != 200:
            json_data = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'r')
            data = json.load(json_data)
            json_data.close()  
            
            data["amq"] = {'req': datainputs, 'resp' : None, 'date' : None, 'status' : 0, 'nofact' : nofactext}
            logFile = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'w')
            logFile.write(json.dumps(data).decode('unicode-escape').encode('utf8'))
            logFile.close()  
        
            print '{ "outcome" : "error", "message" : "Something was wrong" }'
        else:
            xmlresp = r.text
            if xmlresp is None or not xmlresp:          
                json_data = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'r')
                data = json.load(json_data)
                json_data.close()  

                data["amq"] = {'req': datainputs, 'resp' : None, 'date' : None, 'status' : 0, 'nofact' : nofactext}
                logFile = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'w')
                logFile.write(json.dumps(data).decode('unicode-escape').encode('utf8'))
                logFile.close()     

                print '{ "outcome" : "error", "message" : "Something was wrong. Response empty" }'
            else:         
                if xmlresp.find("Error") > -1 or xmlresp.find("null") > -1:   #In case, something happen in server side code 500
                    if xmlresp.find("null") > -1:
                        xmlresp = 'Le fichier XML envoyé n\'est pas conforme'

                    json_data = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'r')
                    data = json.load(json_data)
                    json_data.close()  
                    
                    data["amq"] = {'req': datainputs, 'resp' : None, 'date' : None, 'status' : 0, 'nofact' : nofactext}
                    logFile = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'w')
                    logFile.write(json.dumps(data).decode('unicode-escape').encode('utf8'))
                    logFile.close()   

                    message = {'outcome': 'error', 'message': CleanXML(xmlresp, False)}
                    print json.dumps(message)
                else:         
                    #verify if the response is ok or not
                    root = ET.fromstring(CleanXML(xmlresp.encode('utf-8')))               
                    nbrerror = int(root.find('n:sta_recev', namespaces=nsmap).text) #1: ok, 2: Fail

                    #clean data before saving
                    xmlresp = CleanXML(xmlresp, False)     

                    #read the empty bill
                    json_data = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'r')
                    data = json.load(json_data)
                    json_data.close()
                    
                    #set input row              
                    data["amq"] = {'req': datainputs, 'resp' : xmlresp if nbrerror == 1 else None, 'date' : datetime.today().strftime("%Y-%m-%d %H:%M:%S"), 'status' : nbrerror, 'nofact' : nofactext}
                    logFile = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'w')
                    logFile.write(json.dumps(data).decode('unicode-escape').encode('utf8'))
                    logFile.close()
                    
                    #create log file
                    logFile = open('json/facturation/%s/%s/log/%s_%s_%s_amq.xml'%(clinicId, patientId, nodossier, nofactext, datetime.today().strftime("%Y%m%d%H%M%S")), 'w')
                    logFile.write(CleanXML(xmlresp, True).encode('utf8'))
                    logFile.close()
                    
                    message = {'outcome' : 'success', 'message': xmlresp}
                    print json.dumps(message)
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno) 
   
if tx == "getEtatCompte":   
    try:
        clinicId = form['clinicId'].value
        TypEntIntvnEchgs = form['TypEntIntvnEchgs'].value

        #verify if folder exists if not, create it
        if not os.path.isdir('json/ec/'+ clinicId):
            os.makedirs('json/ec/'+ clinicId)

        #read the parameters for credentials
        json_data = open('json/ramqCredentials/'+clinicId+'.json', 'r')
        data = json.load(json_data)
        json_data.close()
        UserPass = data["MachineIdPass"]	
        UserId = data["MachineId"]
        IdEntIntvnEchg = data["NoIntervenant"]

        #get Etat Compte
        headers = {'content-type': 'application/json; charset=utf-8'} # set what your server accepts
        dataJSON = {'UserId': UserId, 'UserPass': UserPass, 'IdEntIntvnEchg': IdEntIntvnEchg, 'TypEntIntvnEchg': TypEntIntvnEchgs}
        r = requests.post(uri + '/api/RamqWebApi/PostReceiveEtatDeCompteAsByteArray', json=dataJSON, headers=headers)

        if r.status_code != 200:
            print '{ "outcome" : "error", "message" : "Something was wrong" }'
        else:
            resp = r.json()
            ErrorMessage = resp["ErrorMessage"]
            if ErrorMessage != "":
                message = {'outcome' : 'error', 'message': ErrorMessage}
                print json.dumps(message)
            else:        
                FileData = resp["FileData"]
                FileName = resp["FileName"]
                file_64_decode = base64.decodestring(FileData)
                #write the binary zip file
                logFile = open('json/ec/'+ clinicId + '/' + FileName, 'wb')
                logFile.write(file_64_decode)
                logFile.close()
                message = {'outcome' : 'success', 'message': 'http://%s/json/ec/%s/%s'%(os.environ['HTTP_HOST'], clinicId, FileName)}
                print (json.dumps(message))         
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno) 

if (tx == "getECFiles"):   
    try:
        clinicId = form['clinicId'].value
        if not os.path.isdir("json/ec/"+clinicId):
            print '{ "files": [ ] }'
        else:
            #In case, the dates are missing
            try:
                datefrom = getdate(form['dFrom'].value)
            except:
                d = datetime.today().date()
                datefrom = date(d.year if d.month > 1 else d.year - 1, d.month - 1 if d.month > 1 else 12, 1)

            try:
                dateto = getdate(form['dTo'].value)  
            except:
                dateto = getdate()
                
            print '{ "files": [ '
            files = os.listdir("json/ec/"+clinicId)
            files = ['json/ec/'+clinicId+'/'+elt for elt in files]
            files.sort(key=os.path.getctime)
            files.reverse()
            comma = False
            ctr = 0
            for filename in files:
                mdate = os.path.getctime(filename)
                datefile = datetime.fromtimestamp(mdate).date()
                if datefile >= datefrom and datefile <= dateto:
                    if comma:
                        print ','
                    print '{ "file" : "%s"'%filename.split('/')[3]
                    print ', "url" : "http://%s/%s"'%(os.environ['HTTP_HOST'], filename)
                    print ', "date" : "%s"'%time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(mdate))
                    print " } "
                    comma = True
                    ctr = ctr + 1  

            print '], "count" : '+str(ctr)+' }'        
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno) 

if (tx == "GenerIdMachine"):   
    try:
        clinicId = form['clinicId'].value
        pNoIntervenant = form['NoIntervenant'].value
        pIdUtilisateur = form['IdUtilisateur'].value
        pMotDePasse = form['MotDePasse'].value

        headers = {'content-type': 'application/json; charset=utf-8'} # set what your server accepts
        dataJSON = {'CodeErreur': None, 'NoIntervenant': pNoIntervenant, 'IdUtilisateur': pIdUtilisateur, 'MotDePasse': pMotDePasse, 'IdMachine': None, 'MotDePasseMachine': None, 'ServerError': None}
        r = requests.post(uri + '/api/RamqWebApi/PostGenerIdMacine', json=dataJSON, headers=headers)

        if(r.status_code != 200):
            print '{ "outcome" : "error", "message" : "Something was wrong" }'
        else:
            resp = r.json()
            IdMachine = resp["IdMachine"]
            MotDePasseMachine = resp["MotDePasseMachine"]
            CodeErreur = resp["CodeErreur"]
            ServerError = resp["ServerError"]
            
            if not CodeErreur is None:
                message = {'outcome' : 'error', 'message': '%s'%CodeErreur}
                print json.dumps(message)
            else:
                if not ServerError is None:
                    message = {'outcome' : 'error', 'message': '%s'%ServerError}
                    print json.dumps(message)
                else:        
                    dataJSON = {'ClinicId': clinicId, 'MachineId': IdMachine, 'MachineIdPass': MotDePasseMachine, 'NoIntervenant': pNoIntervenant, 'CreationDate' : datetime.now().strftime('%Y-%m-%d')}
                    logFile = open('json/ramqCredentials/'+ clinicId + '.json', 'w')
                    logFile.write(json.dumps(dataJSON))
                    logFile.close()
                    print '{ "outcome" : "success", "message" : "" }'         
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno) 

if (tx == "ChangePassword"):   
    try:
        clinicId = form['clinicId'].value

        #read the parameters for credentials
        json_data = open('json/ramqCredentials/'+clinicId+'.json', 'r')
        data = json.load(json_data)
        json_data.close()
        pMachineIdPass = data["MachineIdPass"]	
        pMachineId = data["MachineId"]
        pNoIntervenant = data["NoIntervenant"]

        headers = {'content-type': 'application/json; charset=utf-8'} # set what your server accepts
        dataJSON = {'CodeErreur': None, 'NoIntervenant': pNoIntervenant, 'IdMachine': pMachineId, 'AncienMotDePasse': pMachineIdPass, 'MotDePasseMachine': '', 'ServerError': None}
        r = requests.post(uri + '/api/RamqWebApi/PostChangePassword', json=dataJSON, headers=headers)

        if(r.status_code != 200):
            print '{ "outcome" : "error", "message" : "Something was wrong" }'
        else:
            resp = r.json()
            IdMachine = resp["IdMachine"]
            MotDePasseMachine = resp["MotDePasseMachine"]
            CodeErreur = resp["CodeErreur"]
            ServerError = resp["ServerError"]
            
            if not CodeErreur is None:
                message = {'outcome' : 'error', 'message': '%s'%CodeErreur}
                print json.dumps(message)
            else:
                if not ServerError is None:
                    message = {'outcome' : 'error', 'message': '%s'%ServerError}
                    print json.dumps(message)
                else:        
                    dataJSON = {'ClinicId': clinicId, 'MachineId': IdMachine, 'MachineIdPass': MotDePasseMachine, 'NoIntervenant': pNoIntervenant, 'CreationDate' : datetime.now().strftime('%Y-%m-%d')}
                    logFile = open('json/ramqCredentials/'+ clinicId + '.json', 'w')
                    logFile.write(json.dumps(dataJSON))
                    logFile.close()
                    print '{ "outcome" : "success", "message" : "" }'          
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno) 
        

if (tx == "sendInsurance"):   
    try:
        #read parameters from request
        clinicId = form['clinicId'].value
        patientId = form['patientId'].value
        nodossier = form['nodossier'].value
        nofactext = form['nofact'].value
        lun = form['lun'].value
        dataJson = json.loads(form['json'].value)
        strreq = dataJson["request"]
        datainputs = dataJson["info"] 

        #read the bill
        json_data = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'r')
        data = json.load(json_data)
        json_data.close()

        if data["amq"] is not None :
            if data["amq"]["resp"] is not None:
                data["amq"]["resp"] = data["amq"]["resp"].replace("\"", "\\\"")

        dataJSON = { 'Input': strreq, 'LUN': lun}
        headers = {'content-type': 'application/json; charset=utf-8'} # set what your server accepts
        r = requests.post(uri + '/api/InsuranceWebApi/PostSendTransaction', json=dataJSON, headers=headers)

        if r.status_code != 200:            
            data["ins"] = {'req': data["ins"]["req"], 'resp' : None, 'date' : datetime.today().strftime("%Y-%m-%d %H:%M:%S"), 'status' : 0, 'nofact' : nofactext, 'transaction': strreq, 'info' : datainputs}
            logFile = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'w')
            logFile.write(json.dumps(data).decode('unicode-escape').encode('utf8'))
            logFile.close()

            resp = r.json()
            print '{ "outcome" : "error", "message" : "' + resp["message"] + '" }'
        else:
            resp = r.json()
            txtresp = resp["resp"]             
            transCode = strreq[20:22]
            #Is it a reversal ?
            if(transCode == '02'): 
                statut = 3
            else:
                statut = 1

            #verify if transaction was a success 
            if(txtresp.split(',')[1] != '0'):
                statut = 2

            #add the new insurnace     
            data["ins"] = {'req': data["ins"]["req"], 'resp' : txtresp, 'date' : datetime.today().strftime("%Y-%m-%d %H:%M:%S"), 'status' : statut, 'nofact' : nofactext, 'transaction': strreq, 'info' : datainputs}
            logFile = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'w')
            logFile.write(json.dumps(data).decode('unicode-escape').encode('utf8'))
            logFile.close()

            message = {'outcome' : 'success', 'message': txtresp }
            print json.dumps(message)
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno) 


if (tx == "SendXmlToVisionR"):   
    try:
        #read parameters from request
        nodossier = form['nodossier'].value
        nofactext = form['nofact'].value
        dataJson = json.loads(form['json'].value)
        dataxml = dataJson["data"] 
        
        #send the request to WebApi that calls RAMQ server
        dataJSON = { 'Input': CleanXML(dataxml), 'LUN': nodossier + '-' + nofactext}
        headers = {'content-type': 'application/json; charset=utf-8'} # set what your server accepts
        r = requests.post(uri + '/api/InsuranceWebApi/PostSaveTransaction', json=dataJSON, headers=headers)

        resp = r.json()
        if r.status_code != 200:
            message = {'outcome' : 'error', 'message': resp["message"] }
        else:           
            message = {'outcome' : 'success', 'message': resp["message"] }

        print json.dumps(message)
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno) 


if (tx == "SendUpdateToVisionR"):   
    try:
        #read parameters from request
        clinicId = form['clinicId'].value
        nodossier = form['nodossier'].value
        patientId = form['patientId'].value
        nofactext = form['nofact'].value
        dataJson = json.loads(form['json'].value)
        dataxml = dataJson["xml"] 
        datacas = dataJson["cas"] 

        #read the bill
        json_data = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'r')
        data = json.load(json_data)
        json_data.close()

        #to replace backlash for xml
        if data["amq"] is not None :
            if data["amq"]["resp"] is not None:
                data["amq"]["resp"] = data["amq"]["resp"].replace("\"", "\\\"")

        #save cash info
        data["cas"] = {'req': datacas, 'date' : datetime.today().strftime("%Y-%m-%d %H:%M:%S"), 'status' : 2, 'nofact' : nofactext}
        logFile = open('json/facturation/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, nofactext), 'w')
        logFile.write(json.dumps(data).decode('unicode-escape').encode('utf8'))
        logFile.close()

        #send the request to WebApi that calls RAMQ server
        dataJSON = { 'Input': CleanXML(dataxml), 'LUN': nodossier + '-' + nofactext}
        headers = {'content-type': 'application/json; charset=utf-8'} # set what your server accepts
        r = requests.post(uri + '/api/InsuranceWebApi/PostSaveTransaction', json=dataJSON, headers=headers)

        resp = r.json()
        if r.status_code != 200:
            message = {'outcome' : 'error', 'message': resp["message"] }
        else:           
            message = {'outcome' : 'success', 'message': resp["message"] }

        print json.dumps(message)
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno) 

if (tx == "SendPlanTraitement"):   
    try:
        #read parameters from request
        clinicId = form['clinicId'].value
        patientId = form['patientId'].value
        nodossier = form['nodossier'].value
        sendReq = form['sendReq'].value
        noseq = form.getvalue('noseq','000000')
        lun = form['lun'].value
        dataJson = json.loads(form['json'].value)
        strreq = dataJson["request"]
        datainputs = dataJson["inputs"] 

        #verify if folder exists if not, create it
        if not os.path.isdir('json/PlanTraitement/%s/%s'%(clinicId, patientId)):
            os.makedirs('json/PlanTraitement/%s/%s'%(clinicId, patientId))

        if noseq == '000000':
            #Get the numero sequence
            fichiers = []
            if os.path.isdir('json/PlanTraitement/%s/%s'%(clinicId, patientId)):
                fichiers = os.listdir("json/PlanTraitement/%s/%s"%(clinicId, patientId))
                fichiers = ['json/PlanTraitement/%s/%s/'%(clinicId, patientId)+elt for elt in fichiers if elt.endswith(".json")]
                fichiers.sort(key=os.path.getmtime)
                fichiers.reverse()

            if len(fichiers) > 0:
                noseq = str(int(fichiers[0].split('_')[1].split('.')[0]) + 1).rjust(6,'0')
            else:
                noseq = '000001'
        
        #Send the request to CDANet
        if sendReq.lower() in ("yes", "true", "1"):
            dataJSON = { 'Input': strreq, 'LUN': lun}
            headers = {'content-type': 'application/json; charset=utf-8'} # set what your server accepts
            r = requests.post(uri + '/api/InsuranceWebApi/PostSendTransaction', json=dataJSON, headers=headers)

            if r.status_code != 200:
                resp = r.json()
                print '{ "outcome" : "error", "message" : "' + resp["message"] + '" }'
            else:
                resp = r.json()
                txtresp = resp["resp"]     

                #Save plan traitement
                data = {'req': strreq, 'resp' : txtresp, 'date' : datetime.today().strftime("%Y-%m-%d %H:%M:%S"), 'info' : datainputs}
                logFile = open('json/PlanTraitement/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, noseq), 'w')
                logFile.write(json.dumps(data).decode('unicode-escape').encode('utf8'))
                logFile.close()

                message = {'outcome' : 'success', 'message': txtresp }
                print json.dumps(message)
        else:
            #Save plan traitement
            data = {'req': strreq, 'resp' : None, 'date' : datetime.today().strftime("%Y-%m-%d %H:%M:%S"), 'info' : datainputs}
            logFile = open('json/PlanTraitement/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, noseq), 'w')
            logFile.write(json.dumps(data).decode('unicode-escape').encode('utf8'))
            logFile.close()           
            message = {'outcome' : 'success', 'message': 'Operation was successful' }
            print json.dumps(message)
            
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno) 


if (tx == "DeletePlanTraitement"):   
    try:
        #read parameters from request
        clinicId = form['clinicId'].value
        patientId = form['patientId'].value
        nodossier = form['nodossier'].value
        noseq = form['noseq'].value
     
        #verify if folder exists if not, create it
        if os.path.exists('json/PlanTraitement/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, noseq)):
            os.remove('json/PlanTraitement/%s/%s/%s_%s.json'%(clinicId, patientId, nodossier, noseq))

        message = {'outcome' : 'success', 'message': 'Operation was successful' }
        print json.dumps(message)   
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno) 

if tx == "getPlanTraitements":
    try:
        patientId = form['patientId'].value
        clinicId = form['clinicId'].value

        if not os.path.isdir('json/PlanTraitement/%s/%s'%(clinicId, patientId)):
            print '{ "Traitements": [ ] }'
        else:
            #In case, the dates are missing
            try:
                datefrom = getdate(form['dFrom'].value)
            except:
                d = datetime.today().date()
                datefrom = date(d.year if d.month > 1 else d.year - 1, d.month - 1 if d.month > 1 else 12, 1)

            try:
                dateto = getdate(form['dTo'].value)  
            except:
                dateto = getdate()

            traitements = []
            jtraitements = {}
            files = os.listdir("json/PlanTraitement/%s/%s"%(clinicId, patientId))
            files = ['json/PlanTraitement/%s/%s/'%(clinicId, patientId)+elt for elt in files if elt.endswith(".json")]
            files.sort(key=os.path.getctime)
            files.reverse()
            for filename in files:
                mdate = os.path.getctime(filename)
                datefile = datetime.fromtimestamp(mdate).date()
                if datefile >= datefrom and datefile <= dateto:
                    #read info
                    json_data = open(filename, 'r')
                    data = json.load(json_data)
                    json_data.close()
                    
                    tmp_fact = {}
                    tmp_fact["numero"] = filename.split('_')[1].split('.')[0]
                    tmp_fact["info"] = data["info"]
                    tmp_fact["resp"] = data["resp"]
                    tmp_fact["req"] = data["req"]
                    tmp_fact["date"] = data["date"]
                    tmp_fact["datecreation"] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(mdate))
                    traitements.append(tmp_fact)
                            
            jtraitements["Traitements"] = traitements
            print json.dumps(jtraitements).decode('unicode-escape').encode('utf8')   
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno)


if tx == "sendPdf":
    try:
        #convert and save pdf file.
        pdfString = form['input'].value
        toaddr = form['email'].value
        dirName = 'PDF'
        fileName = str(int(round(time.time() * 1000))) + '.pdf'
        pdfFilePath = dirName + '/' + fileName

        code = pdfString.split(',')[1].decode('base64')
        with open(pdfFilePath, 'wb') as fout:
            fout.write(code)
        
        # Get credentials from config file
        email_body = ''
        email_from_display_name  = ''
        email_port = ''
        email_host = ''
        email_ssl = ''
        email_subject = ''
        email_cc = ''
        email_from = ''
        email_user = ''
        email_password = ''

        tree = ET.parse('VisionxReports.exe.Config')
        root = tree.getroot()
        for elem in tree.iterfind('appSettings'):
            for a in elem.iter('add'):
                k = a.get('key').encode('utf-8')
                v = a.get('value').encode('utf-8')
                if k == 'EmailBody':
                   email_body = v
                elif k == 'EmailFromDisplayName':
                    email_from_display_name = v
                elif k == 'EmailPort':
                    email_port = v
                elif k == 'Host':
                    email_host = v
                elif k == 'Ssl':
                    email_ssl = v
                elif k == 'EmailSubject':
                    email_subject = v
                elif k == 'EmailCC':
                    email_cc = v
                elif k == 'EmailFrom':
                    email_from = v
                elif k == 'User':
                    email_user = v
                elif k == 'Password':
                    email_password =v

        # Send email with attachment

        msg = MIMEMultipart()
        msg['From'] = email_from
        msg['To'] = toaddr
        msg['Subject'] = email_subject

        body = email_body
        msg.attach(MIMEText(body, 'plain'))

        attachFn = "Facture.pdf"
        attachment = open(pdfFilePath,'rb')

        part = MIMEBase('application','octet-stream')
        part.set_payload((attachment).read())
        Encoders.encode_base64(part)
        part.add_header('Content-Disposition', "attachment; filename= %s" % attachFn)
        msg.attach(part)

        server = smtplib.SMTP(email_host + ':' + email_port )
        server.starttls()
        server.login(email_user,email_password)
        text = msg.as_string()
        server.sendmail(email_from, toaddr, text)
        server.quit()

        
        #if os.path.exists(pdfFilePath):
            #os.remove(pdfFilePath)

        print '{ "outcome":"success"}'
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno)

if tx == "deletePdf":
	folder = 'PDF'
	for the_file in os.listdir(folder):
		file_path = os.path.join(folder, the_file)
		try:
			if os.path.isfile(file_path):
				os.unlink(file_path)
		except:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno)

#send email with one attachment
if tx == "sendPdf2":
    try:
        #convert and save pdf file.
        pdfString = form['input'].value
        toaddr = form['email'].value
        clinicId = form['clinicId'].value
        dirName = 'PDF'
        fileName = str(int(round(time.time() * 1000))) + '.pdf'
        pdfFilePath = dirName + '/' + fileName
		
		
        code = pdfString.split(',')[1].decode('base64')
        with open(pdfFilePath, 'wb') as fout:
            fout.write(code)
        
        # Get credentials from config file
        email_body = ''
        email_from_display_name  = ''
        email_port = ''
        email_host = ''
        email_ssl = ''
        email_subject = ''
        email_cc = ''
        email_from = ''
        email_user = ''
        email_password = ''
		
		#read the parameters for credentials
        json_data = open('json/ramqCredentials/'+clinicId+'.json', 'r')
        data = json.load(json_data)
        json_data.close()

        email_body = data["emailBody"].encode('utf-8')
        email_from_display_name  = data["emailFromDisplayName"].encode('utf-8')
        email_port = data["emailPort"].encode('utf-8')
        email_host = data["emailHost"].encode('utf-8')
        email_ssl = data["emailSsl"].encode('utf-8')
        email_subject = data["emailSubject"].encode('utf-8')
        email_cc = data["emailCC"].encode('utf-8')
        email_from = data["emailFrom"].encode('utf-8')
        email_user = data["emailUser"].encode('utf-8')
        email_password = data["emailPassword"].encode('utf-8')

        # Send email with attachment

        msg = MIMEMultipart()
        msg['From'] = email_from
        msg['To'] = toaddr
        msg['Subject'] = email_subject

        body = email_body
        msg.attach(MIMEText(body, 'plain'))

        attachFn = "Facture.pdf"
        attachment = open(pdfFilePath,'rb')

        part = MIMEBase('application','octet-stream')
        part.set_payload((attachment).read())
        Encoders.encode_base64(part)
        part.add_header('Content-Disposition', "attachment; filename= %s" % attachFn)
        msg.attach(part)

        server = smtplib.SMTP(email_host + ':' + email_port )
        server.starttls()
        server.login(email_user,email_password)
        text = msg.as_string()
        server.sendmail(email_from, toaddr, text)
        server.quit()


        print '{ "outcome":"success"}'
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno)

#send email with multiple attachment
if tx == "sendPdf3":
    try:
        #convert and save pdf file.
        #pdfString = form['input'].value
        jsonArrPdfFiles = form['json'].value
        toaddr = form['email'].value
        clinicId = form['clinicId'].value
        dirName = 'PDF'
       
        dataArrPdfFiles = json.loads(jsonArrPdfFiles)
        dataArr = dataArrPdfFiles['pdfFiles']

        
		
       
        # Get credentials from config file
        email_body = ''
        email_from_display_name  = ''
        email_port = ''
        email_host = ''
        email_ssl = ''
        email_subject = ''
        email_cc = ''
        email_from = ''
        email_user = ''
        email_password = ''
		
		#read the parameters for credentials
        json_data = open('json/ramqCredentials/'+clinicId+'.json', 'r')
        data = json.load(json_data)
        json_data.close()

        email_body = data["emailBody"].encode('utf-8')
        email_from_display_name  = data["emailFromDisplayName"].encode('utf-8')
        email_port = data["emailPort"].encode('utf-8')
        email_host = data["emailHost"].encode('utf-8')
        email_ssl = data["emailSsl"].encode('utf-8')
        email_subject = data["emailSubject"].encode('utf-8')
        email_cc = data["emailCC"].encode('utf-8')
        email_from = data["emailFrom"].encode('utf-8')
        email_user = data["emailUser"].encode('utf-8')
        email_password = data["emailPassword"].encode('utf-8')

        if(email_user and email_password):
             # Send email with attachment
            msg = MIMEMultipart()
            msg['From'] = email_from
            msg['To'] = toaddr
            msg['Subject'] = email_subject

            body = email_body
            msg.attach(MIMEText(body, 'plain'))

           # Create pdf files from base64
            fileNum = 1
            for pdfFile in dataArr:
                try:
                    fileName = str(fileNum) + '.pdf'
                    pdfFilePath = dirName + '/' + fileName
                    code = pdfFile.split(',')[1].decode('base64')
                    with open(pdfFilePath, 'wb') as fout:
                        fout.write(code)

                    part = MIMEBase('application','octet-stream')
                    part.set_payload((open(pdfFilePath,'rb')).read())
                    Encoders.encode_base64(part)
                    part.add_header('Content-Disposition', "attachment; filename= Facture%s.pdf" %str(fileNum))
                    msg.attach(part)
                    
                    fileNum = fileNum + 1
                except:
                    print '{ "outcome" : "error", "message" : "Could not attache file." }'


            server = smtplib.SMTP(email_host + ':' + email_port )
            server.starttls()
            server.login(email_user,email_password)
            text = msg.as_string()
            server.sendmail(email_from, toaddr, text)
            server.quit()


            print '{ "outcome":"success"}'
        else:
            print '{ "outcome" : "error", "message" : "Les informations d\'identification sont manquantes." }'
            
        

        
    except:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print '{ "outcome" : "error", "message" : "%s, %s. %s, line %s" }'%(exc_type, exc_obj, fname, exc_tb.tb_lineno)