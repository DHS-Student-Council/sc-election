import os
import pandas as pd
pd.options.mode.chained_assignment = None  # default='warn'

def update(cat):
    import pandas as pd
    df = pd.read_excel("./candidate-data/datasheets/candidate_data_final.xlsx", sheet_name=(cat+"_candidate_data"), engine="openpyxl")
    list_of_ids = list(df['id'])
    list_of_names = list(df['name'])

    df["catalog"] = ""
    df["profile"] = ""
    df["introvid-vid"] = ""
    df["introvid-thumbnail"] = ""
    df["dtalk-vid"] = ""
    df["dtalk-thumbnail"] = ""
    
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


    df.to_csv("./candidate-data/datasheets/"+cat+"_candidates.csv", index=False)
    print(cat, "CSV update completed")

update("jh")
update("sh")