#!C:\Python27\python.exe -u

import cgi, os
import cgitb; cgitb.enable()

try: # Windows needs stdio set for binary mode.
    import msvcrt
    msvcrt.setmode (0, os.O_BINARY) # stdin  = 0
    msvcrt.setmode (1, os.O_BINARY) # stdout = 1
except ImportError:
    pass

form = cgi.FieldStorage()

# A nested FieldStorage instance holds the file
fileitem = form['file']

# Test if the file was uploaded
if fileitem.filename:
   
   # strip leading path from file name to avoid directory traversal attacks
   fn = os.path.basename(fileitem.filename)
   open('json/documents/' + fn, 'wb').write(fileitem.file.read())
   message = 'The file "' + fn + '" was uploaded successfully'
   
else:
   message = 'No file was uploaded'


print "Content-type: text/html\n\n"

print message
