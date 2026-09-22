#!/usr/bin/env python3
"""Regenerate public/cv.pdf from Jimmy Wu's public profile data.

Run from the project root:
    python3 scripts/generate_cv.py

Edit the DATA section below (or ask an AI to) and re-run to refresh the CV.
The website's "Download CV" button serves whatever is at public/cv.pdf —
you can also simply drop your own PDF there instead.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.cidfonts import UnicodeCIDFont

pdfmetrics.registerFont(UnicodeCIDFont("STSong-Light"))  # CJK-capable built-in

OUT = "public/cv.pdf"

# ----------------------------- DATA ---------------------------------------
DATA = {
    "name": "WU Chun Ming (Jimmy Wu) 胡駿銘",
    "headline": "Founder of AeroRelief · MPhil in Computer Science & Engineering, HKUST",
    "contact": [
        "Kowloon, Hong Kong SAR",
        "LinkedIn: linkedin.com/in/jimmy-wu-unlimited",
        "Google Scholar: scholar.google.com/citations?user=TltSHEoAAAAJ",
    ],
    "interests": "UAV / UAS · Wireless Networks · IoT · LPWAN · Low-Altitude Economy · Mixed Reality",
    "education": [
        (
            "MPhil in Computer Science and Engineering",
            "The Hong Kong University of Science and Technology (HKUST), Sep 2025 – Jun 2027",
        ),
        (
            "BSc in Integrative Systems and Design, Dean's List (Spring 2022), GPA 3.438",
            "The Hong Kong University of Science and Technology (HKUST), 2021 – 2025",
        ),
    ],
    "publications": [
        (
            "Demo: AeroRelief: UAV-based Emergency Rescue for Time-Critical Missions",
            "C.M. Wu, S. Li, Z. Ye, T.H. Fan, L.Y.G. Wong, M. Li — ACM MobiCom 2025. "
            "First Place, Student Research Competition.",
        ),
        (
            "Nature: Metaphysics+ Metaphor (N:M+M): Exploring Persistence, Feedback, "
            "and Visualisation in Mixed Reality Performance Arts",
            "T. Braud, B. Lau, D.H.L. Chan, C.M. Wu, Z. Wu, V.J.S. Yong, K. Shatilov "
            "— SIGGRAPH Asia 2024 Art Papers",
        ),
    ],
    "awards": [
        (
            "Gold Medal with Congratulations of the Jury — AeroRelief",
            "51st International Exhibition of Inventions Geneva, Mar 2026",
        ),
        ("iF Design Award 2026 — VR force-feedback device (gyroscopic precession)", "iF Design, Mar 2026"),
        ("First Place, Student Research Competition — AeroRelief demo", "ACM MobiCom 2025, Nov 2025"),
        ("Gold Award — ASMPT Technology Award 2025 (AeroRelief)", "ASMPT, Jun 2025"),
        ("Chinachem PrimeMovership Scholarship", "Chinachem Group, Jun 2023"),
        ("Champion — Neighbourhood First App-building Hackathon", "HK Federation of Youth Groups, Feb 2019"),
    ],
    "media": [
        ("CNN — Tech for Good feature on AeroRelief", "Oct 2025"),
        ("TVBS News — AI aerial rescue feature", "Nov 2025"),
        ("TVB News — HKUST drone rescue system report", "Jan 2025"),
        ("HKUST News — Low-Altitude Economy feature & Geneva 2026 record wins", "2025 / 2026"),
    ],
    "experience": [
        ("Founder — AeroRelief", "Mar 2025 – Present · HKSAR LAE Regulatory Sandbox pilot project"),
        ("Founder — Jinfinite Unlimited (design & technology studio)", "Mar 2023 – Present"),
        ("Graphic & Web Designer — Colku Electric Appliance Co., Ltd.", "Jun 2022 – Present"),
        ("Website Developer / Photo / Videographer — ENTRU", "Jan 2022 – Oct 2025"),
        ("President — ISD Students' Society, HKUSTSU", "Mar 2022 – Mar 2023"),
    ],
    "projects": [
        (
            "AeroRelief — Autonomous UAV First-Responder System",
            "Founder & Team Lead. AI-driven dispatch with LLM agents + SMS-based locating; "
            "winch-based mid-air delivery within the 'golden 10 minutes'. Geneva Gold Medal "
            "with Congratulations of the Jury; MobiCom 2025 SRC First Place; ASMPT Gold Award; "
            "featured on CNN Tech for Good, TVB, TVBS; HKSAR LAE Regulatory Sandbox pilot "
            "presented to the Chief Executive.",
        ),
        (
            "Through the Years to Touch You — VR Force-Feedback Device",
            "Designer & Prototyper. Gyroscopic-precession haptics for VR. iF Design Award 2026.",
        ),
        (
            "N:M+M — Mixed Reality Performance Arts",
            "Co-author. Persistent, feedback-driven MR performance system; "
            "SIGGRAPH Asia 2024 Art Papers.",
        ),
    ],
}
# ---------------------------------------------------------------------------

ACCENT = HexColor("#0284c7")
INK = HexColor("#0f172a")
MUTED = HexColor("#475569")


def draw_section(c, title, items, y, width):
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(20 * mm, y, title.upper())
    y -= 2.2 * mm
    c.setStrokeColor(ACCENT)
    c.setLineWidth(0.6)
    c.line(20 * mm, y, width - 20 * mm, y)
    y -= 6.5 * mm
    for head, sub in items:
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 10)
        # wrap head
        for line in wrap(c, head, "Helvetica-Bold", 10, width - 40 * mm):
            c.drawString(20 * mm, y, line)
            y -= 4.6 * mm
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 9)
        for line in wrap(c, sub, "Helvetica", 9, width - 40 * mm):
            c.drawString(20 * mm, y, line)
            y -= 4.2 * mm
        y -= 2.8 * mm
    return y - 3 * mm


def wrap(c, text, font, size, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if c.stringWidth(trial, font, size) <= max_w:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def main():
    w, h = A4
    c = canvas.Canvas(OUT, pagesize=A4)
    y = h - 20 * mm

    # Header
    c.setFillColor(INK)
    c.setFont("STSong-Light", 20)
    c.drawString(20 * mm, y, DATA["name"])
    y -= 8 * mm
    c.setFillColor(ACCENT)
    c.setFont("Helvetica", 11)
    c.drawString(20 * mm, y, DATA["headline"])
    y -= 7 * mm
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 9)
    for line in DATA["contact"]:
        c.drawString(20 * mm, y, line)
        y -= 4.4 * mm
    y -= 1 * mm
    c.setFillColor(MUTED)
    c.drawString(20 * mm, y, "Research interests: " + DATA["interests"])
    y -= 8 * mm

    for section, key in [
        ("Education", "education"),
        ("Experience", "experience"),
        ("Projects", "projects"),
        ("Publications", "publications"),
        ("Awards & Honours", "awards"),
        ("Selected Media Coverage", "media"),
    ]:
        y = draw_section(c, section, DATA[key], y, w)
        if y < 30 * mm:
            c.showPage()
            y = h - 20 * mm

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8)
    c.drawString(20 * mm, 12 * mm, "Generated from jimmywu personal website content — see docs/MAINTENANCE.md")
    c.save()
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
