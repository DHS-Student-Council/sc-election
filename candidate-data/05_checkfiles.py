import os
import pandas as pd

keywords = ["featurewall", "profile", "intro_video", "intro_thumbnail", "dtalk_video", "dtalk_thumbnail"]
expectfiles = 6

def checkfile(cat):
    df = pd.read_excel("./candidate-data/datasheets/candidate_data_final.xlsx", sheet_name=(cat+"_candidate_data"), engine="openpyxl")
    list_of_ids = list(df['id'])
    list_of_names = list(df['name'])

    for i in range(len(list_of_ids)):
        keyword_dict = dict.fromkeys(keywords, 0)
        id = list_of_ids[i]
        name = list_of_names[i]
        fullname = id + " " + name
        k = 0
        for filepath in os.listdir(f"./candidate-data/assets/{fullname}"):
            if "intro_video" in filepath and "mov" in filepath:
                print(f"!ERROR: Illegal file extension used. ID: {id}, filepath: {id} {name}/{filepath}")
            filesize = (os.stat("./candidate-data/assets/" + id + " " + name + "/" + filepath).st_size)/1000000
            if filesize>49.5: # 0.5mb buffer range for inaccurate calc
                print(f"!ERROR: Filesize exceeds 50mb limit. ID: {id}, filepath: {id} {name}/{filepath}, filesize: {filesize*100//1/100}")
            temp = 0
            for keyword in keywords:
                if keyword in filepath:
                    keyword_dict[keyword] += 1
                    k += 1
                    temp += 1
            if temp > 1:
                print(f"!ERROR: File matched more than 1 ({temp}) keyword, file: ./candidate-data/assets/{fullname}/{filepath}, ID: {id}")
            elif temp ==  0 and "DS_Store" not in filepath:
                print(f"!ERROR: File matched 0 keywords, file: ./candidate-data/assets/{fullname}/{filepath}, ID: {id}")
        
        for key in keyword_dict.keys():
            if keyword_dict[key] > 1:
                print(f"!ERROR: Keyword ({key}) was matched more than 1 ({keyword_dict[key]}) time, ID:{id}")
            elif keyword_dict[key] == 0:
                print(f"!ERROR: Keyword ({key}) was matched 0 times, ID: {id}")
        if k != expectfiles:
            print(f"!ERROR: Number of files differs from expected, files: {k}, ID: {id}")
    print(f"!LOG: File check for {cat} completed")

checkfile("jh")
checkfile("sh")