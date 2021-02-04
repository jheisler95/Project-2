# Import Dependencies
import warnings
warnings.filterwarnings('ignore')

from flask import Flask, jsonify, render_template
import psycopg2


# Establish Connection to the SQL Database
conn = psycopg2.connect("dbname=Project2_db user=postgres password=TRG19_sustain port=6969")

cursor1 = conn.cursor()
cursor1.execute('SELECT * FROM supercharged')

cursor2 = conn.cursor()
cursor2.execute('SELECT * FROM tsla')

app = Flask(__name__)

@app.route("/")
def read():
    cursor1.execute('SELECT * FROM supercharged')
    id_list = []
    for row in cursor1:
        id_list.append(row)
    cursor2.execute('SELECT * FROM tsla')
    id_list2 =[]
    for row in cursor2:
        id_list2.append(row)
    return render_template("index.html",id_list2=id_list2,id_list=id_list)

@app.route("/stock")
def stock():
    cursor1.execute('SELECT * FROM supercharged')
    id_list =[]
    for row in cursor2:
        id_list.append(row)
    return render_template("index.html",id_list=id_list)
@app.route("/charger")
def charge():
    cursor2.execute('SELECT * FROM tsla')
    id_list2 =[]
    for row in cursor2:
        id_list2.append(row)
    return render_template("index.html",id_list2=id_list2)

if __name__ == "__main__":
    app.run(debug=True)
