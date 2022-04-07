import os
import pandas as pd

keywords = ["featurewall", "profile", "intro_video", "intro_thumbnail"]
expectfiles = 4

def checkfile(cat):
    df = pd.read_excel("./candidate-data/datasheets/candidate_data_final.xlsx", sheet_name=(cat+"_candidate_data"), engine="openpyxl")
    list_of_ids = list(df['id'])
    list_of_names = list(df['name'])

    for i in range(len(list_of_ids)):
        keyword_dict = {
            "featurewall": 0,
            "profile": 0,
            "intro_video": 0,
            "intro_thumbnail": 0
        }
        id = list_of_ids[i]
        name = list_of_names[i]
        fullname = id + " " + name
        k = 0
        for filepath in os.listdir(f"./candidate-data/assets/{fullname}"):
            if "intro_video" in filepath and "mov" in filepath:
                print(f"Illegal file extension used. ID: {id}, filepath: {id} {name}/{filepath}")
            filesize = (os.stat("./candidate-data/assets/" + id + " " + name + "/" + filepath).st_size)/1000000
            if filesize>49.5: # 0.5mb buffer range for inaccurate calc
                print(f"Filesize exceeds 50mb limit. ID: {id}, filepath: {id} {name}/{filepath}, filesize: {filesize*100//1/100}")
            temp = 0
            for keyword in keywords:
                if keyword in filepath:
                    keyword_dict[keyword] += 1
                    k += 1
                    temp += 1
            if temp > 1:
                print(f"FILE MATCHED MORE THAN 1 ({temp}) KEYWORDS, FILE: ./candidate-data/assets/{fullname}/{filepath}, ID: {id}")
            elif temp ==  0 and "DS_Store" not in filepath:
                print(f"FILE MATCHED 0 KEYWORDS, FILE: ./candidate-data/assets/{fullname}/{filepath}, ID: {id}")
        
        for key in keyword_dict.keys():
            if keyword_dict[key] > 1:
                print(f"KEYWORD ({key}) WAS MATCHED MORE THAN 1 ({keyword_dict[key]}) TIME, ID:{id}")
            elif keyword_dict[key] == 0:
                print(f"KEYWORD ({key}) WAS MATCHED 0 TIMES, ID: {id}")
        if k != expectfiles:
            print(f"NUMBER OF FILES DIFFERS FROM EXPECTED, FILES: {k}, ID: {id}")

checkfile("jh")
checkfile("sh")