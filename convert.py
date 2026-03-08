import fitz
import os

pdf_files = [
    "White And Brown Minimalist Modern Furniture Instagram post_20260307_023702_0000.pdf",
    "White Brown Minimalist Kitchen Presentation_20260307_024651_0000.pdf",
    "Cream Modern Interior Design Business Presentation_20260307_112648_0000.pdf",
    "Brown And Beige Modern Interior Design Instagram Post_20260307_111523_0000.pdf",
    "Black & White Modern Professional Real Estate Designer Instagram Post_20260307_112433_0000.pdf",
    "Black & White Modern Professional Real Estate Designer Instagram Post_20260307_111714_0000.pdf"
]

for pdf in pdf_files:
    if os.path.exists(pdf):
        print(f"Processing {pdf}")
        doc = fitz.open(pdf)
        page = doc.load_page(0) # first page
        pix = page.get_pixmap(dpi=300)
        output_name = pdf.replace(".pdf", ".png")
        pix.save(output_name)
        print(f"Saved {output_name}")
    else:
        print(f"Not found: {pdf}")
