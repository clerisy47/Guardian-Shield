from fastapi import FastAPI, HTTPException
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModelForSeq2SeqLM
import torch
import uvicorn
import torch.nn.functional as F


app = FastAPI()

# Loads pretrained models and tokenizers
tokenizer_mail = AutoTokenizer.from_pretrained("bert-base-uncased")
tokenizer_summarize = AutoTokenizer.from_pretrained("./models/tokenizer_summarize")
model_mail = AutoModelForSequenceClassification.from_pretrained('./models/model_spam')
model_summarize = AutoModelForSeq2SeqLM.from_pretrained('./models/model_summarize')

# Endpoint for predicting spam or ham
@app.post("/predict")
def predict_spam_ham(text: str):
    inputs = tokenizer_mail(text, return_tensors="pt")
    with torch.no_grad():
        outputs = model_mail(**inputs)    
    logits = outputs.logits
    probabilities = F.softmax(logits, dim=1)
    spam_probability = probabilities[0][0].item()
    print({"text": round(spam_probability*100, 2)})
    return {"text": round(spam_probability*100, 2)}

# Endpoint for summarizing text
@app.post("/summarize")
async def summarize(text: str):
    try:
        inputs = tokenizer_summarize(text, return_tensors="pt")
        with torch.no_grad():
            outputs = model_summarize.generate(**inputs, min_length=len(text)//10)
        summary = tokenizer_summarize.decode(outputs[0], skip_special_tokens=True)
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during summarization: {str(e)}")
    
if __name__ == "__main__":
    uvicorn.run(app, port=8000)