# Separate file for downloading model as github has a limit of 100MB per file and the modesl are around 5 gb in total

import gdown
import zipfile
import os


url = 'https://drive.google.com/uc?export=download&id=1vgjA18cNYKzl87tIssqSC505xw6Hyr71'
output = 'models.zip'
gdown.download(url, output, quiet=False)

with zipfile.ZipFile("models.zip", 'r') as zip_ref:
    zip_ref.extractall("")

os.remove("models.zip")


