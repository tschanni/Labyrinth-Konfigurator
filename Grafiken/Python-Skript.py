# simple Anwendung, um png-Dateien, die in einem Ordner vorliegen, in binaerer Form in der SQLite-Datenbank zu speichern

import sqlite3
import os
import re

def convertToBinaryData(filename):
    with open(filename, 'rb') as file:
        blobData = file.read()
    
    return blobData

def insertBLOB(name, imgData):
    try:
        sqliteConnection = sqlite3.connect('C:\Workspace\labyrinth-konfigurator\LabyrinthKonfigurator.db')
        #sqliteConnection = sqlite3.connect('testDb.db')
        cursor = sqliteConnection.cursor()
        print("Connected to SQLite")

        print("imgData:", imgData)

        sqlite_insert_blob_query = """ INSERT INTO tileDesigns (tile, img) VALUES (?, ?) """

        bin_image = convertToBinaryData(imgData)

        data_tuple = (name, bin_image)

        print("data_tuple:", tuple)

        cursor.execute(sqlite_insert_blob_query, data_tuple)
        sqliteConnection.commit()
        print("erfolgreich eingefuegt")
        cursor.close()

    except sqlite3.Error as error:
        print("Failed to insert", error)

    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("Connection closed")

folder_name = input(r"Enter only the name of the folder")

files = os.listdir(folder_name)

#files = [f for f in files if re.match(f, ".[0-9].png")]

print(*files, sep="\n")

#insertBLOB(files[0], folder_name + "/" + files[0])

for file in files:
    insertBLOB(file, folder_name + "/" + file)
