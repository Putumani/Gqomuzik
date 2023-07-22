import datetime
import time
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

CLIENT_SECRETS_FILE = './ytcreds/client-secret.json'
SCOPES = ['https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.upload']

def authenticate():
    flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRETS_FILE, SCOPES)
    credentials = flow.run_local_server()
    return credentials

def video_upload():
    credentials = authenticate()
    youtube = build('youtube', 'v3', credentials=credentials)

    video_file = './videos/Ihamba-feat-Witness-Gvng.mp4'
    media_file = MediaFileUpload(video_file)

    request_body = {
        'snippet': {
            'title': 'youtube video upload',
            'description': 'testing youtube api to upload a video',
            'categoryId': '10',  
            'tags': ['youtube api', 'upload a video'],
        },
        'status': {
            'privacyStatus': 'private',
            'selfDeclaredMadeForKids': False
        },
        'notifySubscribers': False
    }

    try:
        # Perform the video upload request with retries
        response_video_upload = youtube.videos().insert(
            part='snippet,status',
            body=request_body,
            media_body=media_file
        ).execute(num_retries=5)  # Use num_retries to retry on failure

        uploaded_video_id = response_video_upload.get('id')
        print("Video uploaded! Video ID:", uploaded_video_id)
    except Exception as e:
        print('An error occurred during video upload:', e)

if __name__ == "__main__":
    video_upload()

