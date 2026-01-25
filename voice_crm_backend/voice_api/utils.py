import re
from datetime import datetime

def extract_crm_data(text: str) -> dict:
    # ---------------- NAME ----------------
    name_match = re.search(
        r"(customer|client)\s+([A-Z][a-z]+\s[A-Z][a-z]+)",
        text
    )
    full_name = name_match.group(2) if name_match else None

    # ---------------- PHONE ----------------
    # 1. Try numeric phone
    phone_match = re.search(r"\b\d{10}\b", text)
    phone = phone_match.group(0) if phone_match else None

    # 2. Fallback: spoken numbers
    if not phone:
        number_map = {
            "zero": "0", "one": "1", "two": "2", "three": "3",
            "four": "4", "five": "5", "six": "6",
            "seven": "7", "eight": "8", "nine": "9"
        }
        words = re.findall(
            r"(zero|one|two|three|four|five|six|seven|eight|nine)",
            text.lower()
        )
        phone = "".join(number_map[w] for w in words) if len(words) >= 10 else None

    # ---------------- ADDRESS ----------------
    address = None
    addr_match = re.search(r"stays at ([^,]+)", text, re.IGNORECASE)
    if addr_match:
        address = addr_match.group(1).strip()

    # ---------------- LOCALITY ----------------
    locality = None
    loc_match = re.search(r",\s*([^,]+)\s+Kolkata", text, re.IGNORECASE)
    if loc_match:
        locality = loc_match.group(1).strip()

    # ---------------- CITY ----------------
    city = None
    city_match = re.search(r"\b(Kolkata|Delhi|Mumbai|Bangalore|Chennai)\b", text)
    if city_match:
        city = city_match.group(1)

    # ---------------- SUMMARY ----------------
    summary = None

    summary_match = re.search(
        r"(discuss|discussed|discussing|talk|talked|talking|cover|covered|review|reviewed)[^.,]*",
        text,
        re.IGNORECASE
    )

    if summary_match:
        summary = summary_match.group(0).strip()

    return {
        "customer": {
            "full_name": full_name,
            "phone": phone,
            "address": address,
            "city": city,
            "locality": locality,
        },
        "interaction": {
            "summary": summary,
            "created_at": datetime.utcnow().isoformat() + "Z",
        }
    }
