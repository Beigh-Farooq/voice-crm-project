from django.urls import path
from .views import (
    SpeechToTextView,
    ExtractCRMDataView,
    VoiceToJSONView,
    EvalListView,
    EvalExportCSV
)


urlpatterns = [
    path("stt/", SpeechToTextView.as_view(), name="speech-to-text"),
    path("extract/", ExtractCRMDataView.as_view()),
    path("voice-to-json/", VoiceToJSONView.as_view()),

    path("evals/", EvalListView.as_view()),
     path("evals/export/", EvalExportCSV.as_view()),
]
