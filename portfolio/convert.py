import os
import glob
try:
    import fitz
except ImportError:
    os.system("python -m pip install PyMuPDF")
    import fitz

pdf_files = glob.glob('d:/Projects/Portfolio_/portfolio/public/*.pdf')
for f in pdf_files:
    if 'UPDATED_CV_IPSITA' in f:
        continue
    try:
        doc = fitz.open(f)
        page = doc.load_page(0)
        pix = page.get_pixmap(dpi=150)
        out_path = f.replace('.pdf', '.png')
        pix.save(out_path)
        print(f"Saved {out_path}")
    except Exception as e:
        print(f"Error processing {f}: {e}")
