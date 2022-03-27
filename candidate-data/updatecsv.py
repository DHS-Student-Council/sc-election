import os
import pandas as pd
pd.options.mode.chained_assignment = None  # default='warn'

def update(cat):
    df = pd.read_csv("./candidate-data/datasheets/"+cat+"_candidates.csv")
    list_of_ids = list(df['id'])
    list_of_names = list(df['name'])
    print(list_of_ids)
    
    for i in range(len(list_of_ids)):
        id = list_of_ids[i]
        name = list_of_names[i]
        outcounter = 0
        for filename in os.listdir("./candidate-data/" + id + " " + name + "/"):
            if "feature wall" in filename:
                df['catalog'][i] = "./candidate-data/" + id + " " + name + "/" + filename
            elif "profile" in filename:
                df['profile'][i] = "./candidate-data/" + id + " " + name + "/" + filename
            elif "intro_video" in filename:
                df['introvid-vid'][i] = "./candidate-data/" + id + " " + name + "/" + filename
            elif "intro_thumbnail" in filename:
                df['introvid-thumbnail'][i] = "./candidate-data/" + id + " " + name + "/" + filename
            else:
                df['dtalk-thumbnail'][i] = "./candidate-data/" + id + " " + name + "/" + filename
                outcounter += 1

        if outcounter > 1:
            print("DUPLICATE FILE TYPES DETECTED: ID", id)


    df.to_csv("./candidate-data/datasheets/"+cat+"_candidates.csv")
    print(cat, "CSV update completed")

update("sh")