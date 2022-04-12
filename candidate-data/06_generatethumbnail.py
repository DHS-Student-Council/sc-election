import os
import cv2
import pandas as pd
from PIL import Image

warn_if_thumbnail_exists = False

# !! YOU MAY NEED TO RUN 03_updateindivcsv.py again
# !! YOU MAY NEED TO RUN 04_updategroupcsv.py again

def getFrame(id, name):
    video_filepath = f"./candidate-data/assets/{id} {name}/{id}_dtalk_video.mp4"
    thumbnail_path = f"./candidate-data/assets/{id} {name}/{id}_dtalk_thumbnail.jpg"
    if not os.path.exists(thumbnail_path):
        vidcap = cv2.VideoCapture(video_filepath)
        success, image = vidcap.read()
        for i in range(20):
            success, image = vidcap.read()
        if success:
            cv2.imwrite(thumbnail_path, image)
    elif warn_if_thumbnail_exists:
        print(f"!WARNING: Thumbnail exists for ID: {id}, filepath: {thumbnail_path}")

def updateFrames(cat):
    df = pd.read_excel("./candidate-data/datasheets/candidate_data_final.xlsx", sheet_name=(cat+"_candidate_data"), engine="openpyxl")
    list_of_ids = list(df['id'])
    list_of_names = list(df['name'])
    for i in range(len(list_of_ids)):
        try:
            getFrame(list_of_ids[i], list_of_names[i])
        except:
            print(f"!ERROR: Failed for {list_of_ids[i]}")
    print(f"!LOG: Successfully updated {cat}")

updateFrames("jh")
updateFrames("sh")