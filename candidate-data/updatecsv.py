import os
import pandas as pd
pd.options.mode.chained_assignment = None  # default='warn'
"""
# constants: please update prior to running
# all data that requires manual entry (e.g. id, name, youtube links) must be in the excel
# all others file paths will be auto generated

# for each task, there should be a specific naming convention or format
# add any keyword that is unique to that task's filepath to identify it
# leave blank if the filepath should be left None (e.g. coming soon) / doesn't need auto updating (has manual data entry)
# colname (key) : keyword (value)
# all columns must be included in the keywords dictionary
"""
keywords = {
    "id": None,
    "name": None,
    "catalog": "feature wall",
    "profile": "profile",
    "introvid-vid": "intro_video",
    "introvid-thumbnail": "intro_thumbnail",
    "dtalk-vid": None,
    "dtalk-thumbnail": "##this value should never be accomplished##" # function update() sets any file which fails above values to dtalk-thumbnail
}

def update(cat):
    import pandas as pd
    df = pd.read_excel("./candidate-data/datasheets/candidate_data_final.xlsx", sheet_name=(cat+"_candidate_data"), engine="openpyxl")
    list_of_ids = list(df['id'])
    list_of_names = list(df['name'])

    for key in keywords.keys():
        if key not in df.columns:
            df[key] = ""
    
    for i in range(len(list_of_ids)):
        id = list_of_ids[i]
        name = list_of_names[i]
        for filename in os.listdir("./candidate-data/" + id + " " + name + "/"):
            success = 0
            for key in keywords.keys():
                if keywords[key] != None and keywords[key] in filename:
                    df[key][i] = "./candidate-data/" + id + " " + name + "/" + filename
                    success += 1
            if success > 1:
                print(f"Filepath matched more than 1 keyword: Matched {success} times. ID: {id}, filepath: {id} {name}/{filename}")
            elif success == 0:
                df["dtalk-thumbnail"][i] = "./candidate-data/" + id + " " + name + "/" + filename

    df.to_csv("./candidate-data/datasheets/"+cat+"_candidates.csv", index=False)
    print(cat, "CSV update completed")

update("jh")
update("sh")