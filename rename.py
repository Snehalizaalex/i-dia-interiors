import os

pdf_files = [
    "White And Brown Minimalist Modern Furniture Instagram post_20260307_023702_0000.png",
    "White Brown Minimalist Kitchen Presentation_20260307_024651_0000.png",
    "Cream Modern Interior Design Business Presentation_20260307_112648_0000.png",
    "Brown And Beige Modern Interior Design Instagram Post_20260307_111523_0000.png",
    "Black & White Modern Professional Real Estate Designer Instagram Post_20260307_112433_0000.png",
    "Black & White Modern Professional Real Estate Designer Instagram Post_20260307_111714_0000.png"
]

for i, f in enumerate(pdf_files, 1):
    new_name = f"our-work-{i}.png"
    if os.path.exists(f):
        os.rename(f, new_name)
        print(f"Renamed {f} to {new_name}")
    else:
        print(f"Not found: {f}")
