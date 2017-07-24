#!C:\Python27\python.exe -u

from datetime import datetime, date, time, timedelta

import os, sys
import cgi

form = cgi.FieldStorage()

# A nested FieldStorage instance holds the file
fName = form['name'].value
jsonString = form['json'].value

accessPTIM = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
logFile = open('json/antecedents/'+fName+'.json', 'w')
logFile.write(jsonString)
logFile.close()

print "Content-type: text/html\n\n"
