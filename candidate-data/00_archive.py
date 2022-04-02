import os
import sys

confirm = input("THE FOLLOWING ACTION IS NOT REVERSIBLE. PLEASE TYPE 'CONFIRM DELETE' TO PROCEED: ")

if confirm != "CONFIRM DELETE":
    print("RUN CANCELLED")
    sys.exit()

for filename in os.listdir("./candidate-data/"):
    if "." not in filename and "DH" in filename:
        for filepath in os.listdir("./candidate-data/" + filename):
            os.remove("./candidate-data/" + filename + "/" + filepath)
        os.rmdir("./candidate-data/" + filename)

print("COMPLETED")