import gdown
import zipfile


url = 'https://drive.google.com/uc?export=download&id=1vgjA18cNYKzl87tIssqSC505xw6Hyr71'
output = 'models.zip'
gdown.download(url, output, quiet=False)

with zipfile.ZipFile("models.zip", 'r') as zip_ref:
    zip_ref.extractall("models")


