#!C:\Python27\python.exe -u

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

print 'Content-type: text/json; charset=utf-8\n\n'

form = cgi.FieldStorage()
tx = form["tx"].value

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
		
if (tx == "translator"):
	try:
		import json

		data=form["thisTag"].value
		json_file_write=open("json/translator.json",'w')
		print data;
		json_file_write.write(data)
		json_file_write.close()

	except:
		print '{ Error file not written with data }'	

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
def CleanXML(s):
	s = s.replace("\\r\\n","")
	s = s.replace("\\n","")
	s = s.replace("\\r","")
	s = s.replace("\"<","<")
	s = s.replace(">\"",">")
	s = s.replace("  ","")
	s = s.replace("\\\"","\"")
	return s

def date(datestr="", format="%Y-%m-%d"):
    if not datestr:
        return datetime.today().date()
    return datetime.strptime(datestr, format).date()
    
if (tx == "getRamqData"):   
    try:
        #read parameters from request
        clinicId = form['clinicId'].value
        patientId = form['patientId'].value
        dataJson = json.loads(form['json'].value)
        xmlreq = dataJson["request"]
      
        #read the parameters for credentials
        json_data = open('json/ramqCredentials/'+clinicId+'.json', 'r')
        data = json.load(json_data)
        json_data.close()
        UserPass= data["MachineIdPass"]	
        UserId= data["MachineId"]	

        #send the request to WebApi that calls RAMQ server
        dataJSON = { 'UserId': UserId, 'UserPass': UserPass, 'XmlToSend': CleanXML(xmlreq)}
        headers = {'content-type': 'application/json; charset=utf-8'} # set what your server accepts
        r = requests.post('http://semiosisaxxiumwebapi20171101022833.azurewebsites.net/api/RamqWebApi/PostPaymentRequest', json=dataJSON, headers=headers)

        if r.status_code != 200:
            print '{ "outcome" : "error", "message" : "Something was wrong" }'
        else:
            resp = r.text
            #In case, something happen in server side code 500
            if(resp is None or resp.find("Error") > -1):
                print '{ "outcome" : "error", "message" : "%s" }'%resp    
            else:
                #clean XMl
                xmlstring = resp
                #define namespace for read xml       
                nsmap = {'n': 'urn:ramq-gouv-qc-ca:RFP'}

                #Get the tocken from request to create filename later         
                root = ET.fromstring(CleanXML(xmlreq.encode('utf-8')))
                nofactext = root.find('n:liste_fact/n:fact_serv_denta_chirg_denti_1_1_0/n:no_fact_ext', namespaces=nsmap).text
        
                #verify if the response is ok or not
                root = ET.fromstring(CleanXML(xmlstring.encode('utf-8')))            
                nbrerror = root.find('n:sta_recev', namespaces=nsmap).text
                if(nbrerror == "1"): #1: ok, 2: Fail
                    xmlreq = xmlreq.replace("\"", "\\\"").replace("\r","").replace("\n","").replace("  ","")
                    xmlstring = xmlstring.replace("\"<","<").replace(">\"",">").replace("\r","").replace("\n","").replace("  ","").replace('\\r','').replace('\\n','')
                    dataJSON = {'xmlreq': xmlreq, 'xmlresp': xmlstring}
                    logFile = open('json/ramq/'+ patientId + '_' + nofactext + '.json', 'w')
                    logFile.write(json.dumps(dataJSON).decode('unicode-escape').encode('utf8'))
                    logFile.close()
                                
                message = {'outcome' : 'success', 'message': xmlstring}
                print json.dumps(message)
    except:
        print '{ "outcome" : "error", "message" : "%s" }'%sys.exc_info()[0]

    
if (tx == "getEtatCompte"):   
    try:
        clinicId = form['clinicId'].value
        TypEntIntvnEchgs = form['TypEntIntvnEchgs'].value

        #verify if folder exists if not, create it
        if(not os.path.isdir('json/ec/'+ clinicId)):
            os.makedirs('json/ec/'+ clinicId)

        #read the parameters for credentials
        json_data = open('json/ramqCredentials/'+clinicId+'.json', 'r')
        data = json.load(json_data)
        json_data.close()
        UserPass= data["MachineIdPass"]	
        UserId= data["MachineId"]
        IdEntIntvnEchg= data["NoIntervenant"]

        #get Etat Compte
        headers = {'content-type': 'application/json; charset=utf-8'} # set what your server accepts
        dataJSON = { 'UserId': UserId, 'UserPass': UserPass, 'IdEntIntvnEchg': IdEntIntvnEchg, 'TypEntIntvnEchg': TypEntIntvnEchgs }
        r = requests.post('http://semiosisaxxiumwebapi20171101022833.azurewebsites.net/api/RamqWebApi/PostReceiveEtatDeCompteAsByteArray', json=dataJSON, headers=headers)

        if(r.status_code != 200):
            print '{ "outcome" : "error", "message" : "Something was wrong" }'
        else:
            resp = r.json()
            ErrorMessage = resp["ErrorMessage"]
            if(ErrorMessage != ""):
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
                message = {'outcome' : 'success', 'message': 'http://' + os.environ['HTTP_HOST'] + '/axxium/json/ec/' + clinicId + '/' + FileName}
                print (json.dumps(message))         
    except:
        print '{ "outcome" : "error", "message" : "%s" }'%sys.exc_info()[0]

if (tx == "getECFiles"):   
    try:
        clinicId = form['clinicId'].value

        #In case, the dates are missing
        try:
            datefrom = date(form['dFrom'].value)
        except:
            datefrom = date()

        try:
            dateto = date(form['dTo'].value)  
        except:
            dateto = date()
            
        print '{ "files": [ '
        files = os.listdir("json/ec/"+clinicId)
        files = ['json/ec/'+clinicId+'/'+elt for elt in files ]
        files.sort(key=os.path.getmtime)
        files.reverse()
        comma = False
        ctr = 0
        for filename in files:
            mdate = os.path.getmtime(filename)
            datefile = datetime.fromtimestamp(mdate).date()
            if datefile >= datefrom and datefile <= dateto:
                if comma:
                    print ','
                print '{ "file" : "%s"'%filename.split('/')[3]
                print ', "url" : "http://%s/axxium/%s"'%(os.environ['HTTP_HOST'], filename)
                print ', "date" : "%s"'%time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(mdate))
                print " } "
                comma = True
                ctr = ctr + 1  

        print '], "count" : '+str(ctr)+' }'        
    except:
        print '{ "outcome" : "error", "message" : "%s" }'%sys.exc_info()[0]

if (tx == "GenerIdMachine"):   
    try:
        clinicId = form['clinicId'].value
        pNoIntervenant = form['NoIntervenant'].value
        pIdUtilisateur = form['IdUtilisateur'].value
        pMotDePasse = form['MotDePasse'].value

        headers = {'content-type': 'application/json; charset=utf-8'} # set what your server accepts
        dataJSON = { 'CodeErreur': None, 'NoIntervenant': pNoIntervenant, 'IdUtilisateur': pIdUtilisateur, 'MotDePasse': pMotDePasse, 'IdMachine': None, 'MotDePasseMachine': None, 'ServerError': None}
        r = requests.post('http://semiosisaxxiumwebapi20171101022833.azurewebsites.net/api/RamqWebApi/PostGenerIdMacine', json=dataJSON, headers=headers)

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
                    dataJSON = { 'ClinicId': clinicId, 'MachineId': IdMachine, 'MachineIdPass': MotDePasseMachine, 'NoIntervenant': pNoIntervenant, 'CreationDate' : datetime.now().strftime('%Y-%m-%d') }
                    logFile = open('json/ramqCredentials/'+ clinicId + '.json', 'w')
                    logFile.write(json.dumps(dataJSON))
                    logFile.close()
                    print '{ "outcome" : "success", "message" : "" }'         
    except:
        print '{ "outcome" : "error", "message" : "%s" }'%sys.exc_info()[0]

if (tx == "ChangePassword"):   
    try:
        clinicId = form['clinicId'].value

        #read the parameters for credentials
        json_data = open('json/ramqCredentials/'+clinicId+'.json', 'r')
        data = json.load(json_data)
        json_data.close()
        pMachineIdPass= data["MachineIdPass"]	
        pMachineId= data["MachineId"]
        pNoIntervenant= data["NoIntervenant"]

        headers = {'content-type': 'application/json; charset=utf-8'} # set what your server accepts
        dataJSON = { 'CodeErreur': None, 'NoIntervenant': pNoIntervenant, 'IdMachine': pMachineId, 'AncienMotDePasse': pMachineIdPass, 'MotDePasseMachine': '', 'ServerError': None}
        r = requests.post('http://semiosisaxxiumwebapi20171101022833.azurewebsites.net/api/RamqWebApi/PostChangePassword', json=dataJSON, headers=headers)

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
                    dataJSON = { 'ClinicId': clinicId, 'MachineId': IdMachine, 'MachineIdPass': MotDePasseMachine, 'NoIntervenant': pNoIntervenant, 'CreationDate' : datetime.now().strftime('%Y-%m-%d') }
                    logFile = open('json/ramqCredentials/'+ clinicId + '.json', 'w')
                    logFile.write(json.dumps(dataJSON))
                    logFile.close()
                    print '{ "outcome" : "success", "message" : "" }'          
    except:
        print '{ "outcome" : "error", "message" : "%s" }'%sys.exc_info()[0]