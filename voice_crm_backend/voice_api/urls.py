from django.urls import path
from .views import (
    SpeechToTextView,
    ExtractCRMDataView,
    VoiceToJSONView
)


urlpatterns = [
    path("stt/", SpeechToTextView.as_view(), name="speech-to-text"),
    path("extract/", ExtractCRMDataView.as_view()),
    path("voice-to-json/", VoiceToJSONView.as_view()),
]
