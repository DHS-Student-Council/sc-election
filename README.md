# SC Election Campaign
This repository contains basic templates, rendering files and others for the Student Council Elections Campaigns 2022.

Commit messages are written using [gitmoji](https://gitmoji.dev/) notation.

# 2022 Data Information
The development files may be somewhat engineered to fit this naming convention. There may be changes made based on the naming convention.
Tasks:
- Feature wall (candidate images): "DH00_featurewall.jpeg"
- Profile (Individual infographic): "DH00_profile.jpeg"
- Introductory video (Thumbnail): "DH00_intro_thumbnail.jpeg"
- Introductory video (Video): "DH00_intro_video.mp4"
- DTALK (Thumbnail): "DH00_dtalk_thumbnail.jpeg" \[AUTO-GENERATED]
- DTALK (Video): "DH00_DTALK.mp4" --> "DH00_dtalk_video.mp4" \[RENAMED]
- Group infographic: "GRJ0_infographic.jpeg"

*Note: all video files must be in mp4 (with format H.264 HD), images in .jpeg or .png

**DO NOT engineer your files to strictly use the naming convention given. There will always be issues with the naming convention.**

Provided file format (excludes DTALK) - runs **movefiles_a**:
- Group J1 and J2
    - DH11 Ian Tan (this is a folder containing their files)
    - DH02 Darrius Lee
    - ...
    - GROUP SUBMISSIONS
        - Group J1
            - GRJ1_infographic.jpeg
            - ...
        - Group J2
            - GRJ2_infographic.jpeg
            - ...
- Group J3 and J4
    - DH11 Ian Tan
    - DH12 Darrius Lee
    - ...
    - GROUP SUBMISSIONS
        - Group J3
            - GRJ1_infographic.jpeg
            - ...
        - Group J4
            - GRJ2_infographic.jpeg
            - ...

Provided file format (DTALK only) - runs **movefiles_b**:
- DTALK
    - DH01_DTALK.mp4
    - DH02_DTALK.mp4
    - ...

# Actually updating the repository
Note: all development scripts (python files) is found in `./candidate-data/...`
1. Download the data files as .zip and unzip
2. Download the excel file containing candidate data (into `./candidate-data/datasheets/candidate_data_final.xlsx`)
3. Remove the old files, either by manually deleted or running `00_archive.py` (run this AT YOUR OWN RISK. this is an UNTESTED file)
4. Run `01_directory.py` to generate the individual folders in `./candidate-data/assets/...`
5. If you have to update files, you MUST FIRST UPDATE THE VARIABLE `movekeywords` before running `02_movefiles_a.py` (all files containing the keywords will be moved in)
6. Run `02_movefiles_b.py` specially for dtalk videos if they follow the 2022 format.
7. Run `06_generatethumbnail.py` for dtalk videos (if a thumbnail isn't provided) -> It will grab the 21st frame of the video and save it as an image.
8. Run `03_updateindivcsv.py` to update the csv files (WATCH THE ERRORS)
9. Run `04_updategroupcsv.py` to update the csv files (WATCH THE ERRORS)
10. YOU MUST RUN `05_checkfiles.py` to ensure your files follow the given format and do NOT exceed the file limit. Any files over 50mb will throw a warning by github, and over 100mb your changes cannot be pushed
11. Python files need to be run in a local compiler to modify the files locally. Push changes using git.
12. Use VSCode to run the python files. IDLE won't work

# Dependencies
- [Bootstrap v5.1.3](https://getbootstrap.com/docs/5.1/getting-started/introduction/)
- [Plyr v3.6.12](https://github.com/sampotts/plyr/releases/tag/v3.6.12)
- [jQuery v3.6.0](https://api.jquery.com/)

# Others
Have fun?

Request the SCs to use the same format as much as possible to make this as painless as possible.
