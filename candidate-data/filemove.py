import os
import pandas as pd
df = pd.read_csv("./candidate-data/datasheets/sh_candidates.csv")
list_of_ids = list(df['id'])
list_of_names = list(df['name'])
print(list_of_ids)

for i in range(len(list_of_ids)):
    newpath = "./candidate-data/" + list_of_ids[i] + " " + list_of_names[i] +  "/"
    if not os.path.exists(newpath):
        os.makedirs(newpath)
    for filename in os.listdir("./thumbnails"):
        if list_of_ids[i] in filename:
            os.rename("./thumbnails/" + filename, newpath + filename)
