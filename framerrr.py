from PIL import Image
import os

def extract_frames(gif_path):
    # Open the GIF file
    with Image.open(gif_path) as im:
        # Get the total number of frames
        try:
            while True:
                # Get the current frame number (0-based)
                current = im.tell()
                
                # Convert to RGB if necessary
                frame = im.convert('RGB')
                
                # Save the frame with 1-based numbering
                frame.save(f'frame{current + 1}.png')
                
                # Go to next frame
                im.seek(current + 1)
        except EOFError:
            pass  # End of frames

# Usage
if __name__ == "__main__":
    # Check if selector.gif exists in the current directory
    if os.path.exists("selector.gif"):
        extract_frames("selector.gif")
        print("Frames have been extracted successfully!")
    else:
        print("Error: selector.gif not found in the current directory")
