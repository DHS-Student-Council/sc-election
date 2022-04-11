import os
import pandas as pd

def create_directory(cat):
    df = pd.read_excel("./candidate-data/datasheets/candidate_data_final.xlsx", sheet_name=(cat+"_candidate_data"), engine="openpyxl")
    list_of_ids = list(df['id'])
    list_of_names = list(df['name'])
    print(list_of_ids)

    for i in range(len(list_of_ids)):
        if list_of_ids[i] != "nan":
            newpath = "./candidate-data/assets/" + list_of_ids[i] + " " + list_of_names[i] +  "/"
            if not os.path.exists(newpath):
                os.makedirs(newpath)
    print(f"!LOG: Successfully updated {cat}")
    
create_directory("jh")
create_directory("sh")