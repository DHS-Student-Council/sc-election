import os
import pandas as pd

movekeywords = ["featurewall"]
expectfiles = 1

def movefile(cat):
    df = pd.read_excel("./candidate-data/datasheets/candidate_data_final.xlsx", sheet_name=(cat+"_candidate_data"), engine="openpyxl")
    list_of_ids = list(df['id'])
    list_of_names = list(df['name'])

    for i in range(len(list_of_ids)):
        id = list_of_ids[i]
        name = list_of_names[i]
        fullname = id + " " + name
        k = 0
        for _ in os.listdir(f"./candidate-data/assets/{fullname}"):
            k += 1
        if k != expectfiles:
            print(f"NUMBER OF FILES DIFFERS FROM EXPECTED, FILES: {k}, ID: {id}")

movefile("jh")
movefile("sh")