from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, JSONParser
from faster_whisper import WhisperModel
import tempfile
import os
from datetime import datetime
import re

from .utils import extract_crm_data


# Load Whisper once
whisper_model = WhisperModel("small", compute_type="int8")

class SpeechToTextView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        audio = request.FILES.get("audio")
        if not audio:
            return Response({"error": "audio file required"}, status=400)

        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
            for chunk in audio.chunks():
                tmp.write(chunk)
            temp_path = tmp.name

        segments, _ = whisper_model.transcribe(temp_path, language="en")
        transcription = " ".join([s.text for s in segments]).strip()

        os.remove(temp_path)

        return Response({
            "transcription": transcription
        })




class ExtractCRMDataView(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        text = request.data.get("transcription")

        if not text:
            return Response({"error": "transcription is required"}, status=400)

        structured = extract_crm_data(text)
        return Response(structured)




class VoiceToJSONView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        audio = request.FILES.get("audio")
        if not audio:
            return Response({"error": "audio file required"}, status=400)

        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
            for chunk in audio.chunks():
                tmp.write(chunk)
            temp_path = tmp.name

        segments, _ = whisper_model.transcribe(temp_path, language="en")
        transcription = " ".join([s.text for s in segments]).strip()
        os.remove(temp_path)

        structured = extract_crm_data(transcription)

        return Response({
            "transcription": transcription,
            "structured_output": structured
        })
