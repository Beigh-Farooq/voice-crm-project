from django.db import models

class EvalResult(models.Model):
    transcription = models.TextField()
    structured_output = models.JSONField()
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Eval {self.id} - Verified: {self.verified}"
