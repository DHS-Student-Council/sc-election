import os
import pandas as pd
pd.options.mode.chained_assignment = None  # default='warn'

def update(cat):
    import pandas as pd
    df = pd.read_excel("./candidate-data/datasheets/candidate_data_final.xlsx", sheet_name=(cat+"_candidate_data"), engine="openpyxl")
    list_of_ids = list(df['id'])
    list_of_names = list(df['name'])
    list_of_groups = list(df['group_id'])

    group_dict = {}

    for i in range(len(list_of_ids)):
        if list_of_groups[i] not in group_dict:
            group_dict[list_of_groups[i]] = []
            group_dict[list_of_groups[i]].append(list_of_ids[i] + " " + list_of_names[i])
        else:
            group_dict[list_of_groups[i]].append(list_of_ids[i] + " " + list_of_names[i])

    for i in group_dict.keys():
        group_dict[i] = [i, ', '.join(group_dict[i])]
        for filename in os.listdir("./candidate-data/assets/" +cat+ "_groupwork/"):
            if i.upper() in filename.upper():
                group_dict[i].append("./candidate-data/assets/" +cat+ "_groupwork/"+filename)
        #group_dict[i].append("") # COMMENT OUT THIS LINE IF THERE IS AN ACTUAL INFOGRAPHIC
                
    df_new = pd.DataFrame.from_dict(group_dict, orient="index", columns=["group_id", "members", "infographic"])
    df_new.to_csv("./candidate-data/datasheets/group_"+cat+"_data.csv", index=False)

    print("!LOG:",cat,"CSV update completed")

    
update("jh")
update("sh")
