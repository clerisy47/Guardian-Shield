from fastapi import FastAPI, HTTPException
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModelForSeq2SeqLM
import torch
from pydantic import BaseModel
import uvicorn
import torch.nn.functional as F


app = FastAPI()

class SummarizationRequest(BaseModel):
    text: str


class SummarizationResponse(BaseModel):
    summary: str

class InputText(BaseModel):
    text: str


tokenizer_mail = AutoTokenizer.from_pretrained("bert-base-uncased")
tokenizer_summarize = AutoTokenizer.from_pretrained("./models/tokenizer_summarize")
model_mail = AutoModelForSequenceClassification.from_pretrained('./models/model_spam')
model_summarize = AutoModelForSeq2SeqLM.from_pretrained('./models/model_summarize')

@app.post("/predict")
def predict_spam_ham(item: InputText):
    inputs = tokenizer_mail(item.text, return_tensors="pt")
    with torch.no_grad():
        outputs = model_mail(**inputs)    
    logits = outputs.logits
    probabilities = F.softmax(logits, dim=1)
    spam_probability = probabilities[0][0].item()
    return {"text": round(spam_probability*100, 2)}

@app.post("/summarize")
async def summarize(request: SummarizationRequest):
    try:
        inputs = tokenizer_summarize(request.text, max_length=1024, truncation=True, return_tensors="pt")
        summary_ids = model_summarize.generate(inputs["input_ids"], max_length=128, length_penalty=0.8, num_beams=8)
        summary = tokenizer_summarize.decode(summary_ids[0], skip_special_tokens=True, clean_up_tokenization_spaces=True)

        return SummarizationResponse(summary=summary)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
if __name__ == "__main__":
    uvicorn.run(app, port=8000)