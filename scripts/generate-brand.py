#!/usr/bin/env python3
"""Génère le logo, le favicon et l'image Open Graph de CalculPulse."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
INK = (42, 47, 134, 255)
CREAM = (255, 255, 255, 255)
AMBER = (242, 182, 50, 255)
DEEP = (16, 17, 20, 255)


def font(size, serif=False):
    candidates = [
        "/usr/share/fonts/truetype/noto/NotoSerif-BoldItalic.ttf" if serif else "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif-BoldItalic.ttf" if serif else "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def mark(size, radius_ratio=0.28):
    image = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    margin = int(size * 0.08)
    draw.rounded_rectangle((margin, margin, size - margin, size - margin), radius=int(size * 0.18), fill=INK)
    w = max(3, size // 15)
    def line(x1, y1, x2, y2, color=CREAM):
        draw.line((x1 * size, y1 * size, x2 * size, y2 * size), fill=color, width=w)
    line(0.27, 0.375, 0.45, 0.375); line(0.36, 0.285, 0.36, 0.465)
    line(0.55, 0.375, 0.73, 0.375)
    line(0.27, 0.66, 0.45, 0.66)
    line(0.55, 0.6, 0.73, 0.6); line(0.55, 0.72, 0.73, 0.72)
    line(0.2, 0.84, 0.8, 0.84, AMBER)
    return image


def main():
    PUBLIC.mkdir(exist_ok=True)
    icon = mark(512)
    icon.save(PUBLIC / "logo-512.png")
    icon.resize((180, 180), Image.Resampling.LANCZOS).save(PUBLIC / "apple-touch-icon.png")
    icon.resize((32, 32), Image.Resampling.LANCZOS).save(PUBLIC / "favicon-32.png")
    icon.resize((32, 32), Image.Resampling.LANCZOS).save(PUBLIC / "favicon.ico")

    og = Image.new("RGB", (1200, 630), INK[:3])
    draw = ImageDraw.Draw(og)
    badge = mark(360)
    og.paste(badge, (70, 135), badge)
    draw.text((470, 180), "CalculPulse", font=font(78), fill=CREAM[:3])
    draw.text((470, 300), "Calculatrices et conversions", font=font(36), fill=AMBER[:3])
    draw.text((470, 390), "Gratuit · en français · dans le navigateur", font=font(28), fill=CREAM[:3])
    draw.text((470, 500), "calculpulse.maketru.com", font=font(28), fill=(217, 209, 198))
    og.save(PUBLIC / "og.png", optimize=True)


if __name__ == "__main__":
    main()
