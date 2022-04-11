# YOU MUST RUN expandfile IN 02_movefile-a.py first

import os
import cv2
import pandas as pd
from PIL import Image

"""
the naming convention is
DTALK/OTHER TASK
    DHXX JOHN.mp4
    DHXX MARY.mp4
running expandfile() is recommended
upName() moves the files from the temporary folder to the correct candidate-data folder

keywords indicate the keywords to look for
it iterates through every candidate [A] -> looks for file that matches naming convention -> reiterate to A
"""

def updateName(id, name):
    video_filepath = f"./candidate-data/dtalk_temp/{id}_DTALK.mp4"
    new_video_filepath = f"./candidate-data/assets/{id} {name}/{id}_dtalk_video.mp4"
    os.rename(video_filepath, new_video_filepath)

def updateCandidates(cat):
    df = pd.read_excel("./candidate-data/datasheets/candidate_data_final.xlsx", sheet_name=(cat+"_candidate_data"), engine="openpyxl")
    list_of_ids = list(df['id'])
    list_of_names =  list(df['name'])
    for i in range(len(list_of_ids)):
        try:
            updateName(list_of_ids[i], list_of_names[i])
        except:
            print(f"!ERROR: Failed for ID: {list_of_ids[i]}")

    print(f"!LOG: Successfully updated {cat}")

updateCandidates("jh")
updateCandidates("sh")