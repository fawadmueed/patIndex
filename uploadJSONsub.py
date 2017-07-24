#!C:\Python27\python.exe -u

from datetime import datetime, date, time, timedelta

import os, sys
import cgi

form = cgi.FieldStorage()

# A nested FieldStorage instance holds the file
subFolder = form['sub'].value
fName = form['name'].value
jsonString = form['json'].value

logFile = open("json/"+subFolder+"/"+fName+'.json', 'w')
logFile.write(jsonString)
logFile.close()

print "Content-type: text/html\n\n"
