import warnings
warnings.filterwarnings('ignore')

from flask import Flask, jsonify, render_template
import psycopg2

conn = psycopg2.connect("dbname=Project2_db user=postgres password=TRG19_sustain port=6969")

cursor1 = conn.cursor()
cursor1.execute('SELECT * FROM supercharged')
for row in cursor1:
    print(row)

cursor2 = conn.cursor()
cursor2.execute('SELECT * FROM tsla')
for row in cursor2:
    print(row)

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

if __name__ = "__main__":
    app.run(debug=True)
