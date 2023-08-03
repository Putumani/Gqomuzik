import os
from moviepy.editor import AudioFileClip, VideoFileClip

def convert_mp3_to_mp4(mp3_path, video_path):
    audio_clip = AudioFileClip(mp3_path)
    video_clip = VideoFileClip("../gqomuzik.png")  # Replace with your desired background image
    final_video = video_clip.set_audio(audio_clip)
    final_video.write_videofile(video_path, codec='libx264', audio_codec='aac')





